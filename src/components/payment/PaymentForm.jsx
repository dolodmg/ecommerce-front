'use client'
import React, { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMercadoPago from "@/hooks/useMercadoPago";
import { processPaymentAction } from "@/server/payments/payments";
import { MERCADO_PAGO_CONFIG, DOCUMENT_TYPES } from "@/config/mercadoPago";
import { PaymentSuccess, PaymentError } from "./PaymentFeedback";
import { validateCardData, formatCardNumber, parsePaymentError } from "@/utils/paymentHelpers";

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'] 
});

export const PaymentForm = ({ order, onSuccess, onError, onCancel }) => {
  const { createCardToken, isLoaded, error: mpError, isLoading: mpLoading, mp } = useMercadoPago(MERCADO_PAGO_CONFIG.MP_PUBLIC_KEY);

  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
    email: '',
    docType: 'DNI',
    docNumber: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentResult, setPaymentResult] = useState(null); // 'success', 'error', null
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    if (mpError) {
      console.error('Mercado Pago loading error:', mpError);
    }
  }, [mpError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Formatear número de tarjeta
    if (name === 'cardNumber') {
      const formatted = formatCardNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      // Limpiar error del campo
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
      return;
    }
    
    // Formatear código de seguridad
    if (name === 'securityCode' && value.length > 4) {
      return;
    }
    
    // Formatear número de documento
    if (name === 'docNumber' && value.length > 12) {
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const findPaymentMethodId = (cardToken, paymentMethods) => {
    // cardToken.card_type puede ser: "visa", "master", "amex", etc.
    const cardType = cardToken.card_type?.toLowerCase();

    // Buscar el payment method que coincida con el tipo de tarjeta
    const method = paymentMethods.find(pm => pm.id.toLowerCase() === cardType);

    if (!method) {
      throw new Error(`No se encontró un método de pago compatible para la tarjeta: ${cardType}`);
    }

    return method.id;
  };


  const validateForm = () => {
    const newErrors = validateCardData(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validar formulario
  if (!validateForm()) return;

  // Verificar que Mercado Pago esté cargado
  if (!isLoaded) {
    setPaymentError('El sistema de pagos aún se está cargando. Por favor, espera un momento e intenta nuevamente.');
    return;
  }

  // Verificar que tengamos la instancia mp
  if (!mp) {
    setPaymentError('No se pudo inicializar el sistema de pagos. Por favor, recarga la página.');
    return;
  }

  // Verificar que tengamos la public key válida
  if (!MERCADO_PAGO_CONFIG.MP_PUBLIC_KEY || MERCADO_PAGO_CONFIG.MP_PUBLIC_KEY === 'TEST-your-public-key-here') {
    setPaymentError('Configuración de pago incompleta. La clave pública de Mercado Pago no está configurada correctamente.');
    return;
  }

  setIsLoading(true);
  setPaymentError(null);

  try {
    
    // Limpiar el nombre: remover acentos y caracteres especiales
    let cleanCardholderName = formData.cardholderName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^a-zA-Z\s]/g, '') // Solo letras y espacios
      .trim();
    
    // 🔍 Mercado Pago TEST: Solo acepta nombres de prueba específicos
    const isTestMode = MERCADO_PAGO_CONFIG.MP_PUBLIC_KEY.includes('TEST-');
    
    if (isTestMode) {
      // En modo TEST, usar nombres de prueba válidos de MP
      const testNames = ['APRO', 'OTHE', 'CONT', 'CALL', 'FUND', 'SECU', 'EXPI', 'FORM', 'Test User'];
      
      if (!testNames.includes(cleanCardholderName)) {
        console.log('🔧 MODO TEST: Convirtiendo nombre real a nombre de prueba');
        console.log('Nombre original:', cleanCardholderName);
        cleanCardholderName = 'APRO'; // Por defecto usar APRO (aprobado)
        console.log('Nombre de prueba usado:', cleanCardholderName);
      }
    }
    
    const cardToken = await createCardToken({
      cardNumber: formData.cardNumber,
      cardholderName: cleanCardholderName, // Usar nombre limpio
      expirationMonth: formData.expirationMonth,
      expirationYear: formData.expirationYear,
      securityCode: formData.securityCode,
      docType: formData.docType,
      docNumber: formData.docNumber
    });

    // 2️⃣ Obtener el payment_method_id correcto del first_six_digits
    let paymentMethodId = 'visa'; // fallback
    
    // ✅ Mapeo de BIN (primeros 6 dígitos) a payment_method_id específico
    const firstSixDigits = cardToken.first_six_digits;
    
    if (firstSixDigits) {
      // Mapeo común de BINs a payment methods específicos para Argentina
      if (firstSixDigits.startsWith('4')) {
        // Tarjetas Visa - usar diferentes IDs según el BIN
        if (firstSixDigits.startsWith('450995')) {
          paymentMethodId = 'visa'; // Visa estándar
        } else if (firstSixDigits.startsWith('4509')) {
          paymentMethodId = 'visa';
        } else {
          paymentMethodId = 'visa'; // Visa genérico
        }
      } else if (firstSixDigits.startsWith('5')) {
        paymentMethodId = 'master';
      } else if (firstSixDigits.startsWith('37') || firstSixDigits.startsWith('34')) {
        paymentMethodId = 'amex';
      }
    }
  

    // 3️⃣ Armar payload para backend - estructura EXACTA que funciona en Postman
    
    // Procesar nombre de forma más robusta
    const nameParts = cleanCardholderName.trim().split(/\s+/); // Split por cualquier espacio
    let firstName = nameParts[0] || 'Test';
    let lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'User';
    
    // 🔍 Manejo especial para nombres de prueba de MP (que son una sola palabra)
    const singleWordTestNames = ['APRO', 'OTHE', 'CONT', 'CALL', 'FUND', 'SECU', 'EXPI', 'FORM'];
    if (singleWordTestNames.includes(cleanCardholderName)) {
      firstName = cleanCardholderName;
      lastName = cleanCardholderName; // MP a veces requiere firstName y lastName iguales para nombres de prueba
    }
    
    const paymentPayload = {
      idOrder: order.idOrder,
      token: cardToken.id,
      paymentMethod: paymentMethodId,
      installments: 1,
      description: `Pago de orden #${order.idOrder}`,
      externalReference: `order_${order.idOrder}`,
      payer: {
        email: formData.email,
        firstName: firstName,
        lastName: lastName,
        identification: {
          type: formData.docType,
          number: String(formData.docNumber)
        }
      }
    };
    
    // 5️⃣ Llamar al backend
    const result = await processPaymentAction(paymentPayload);

    console.log('🔍 RESULTADO DEL PAGO:', result);
    console.log('Status recibido:', result.status);

    // 6️⃣ Verificar el status del pago y actuar en consecuencia
    if (result.status === 'APPROVED') {
      // ✅ Pago aprobado
      console.log('✅ Pago APROBADO');
      setPaymentResult('success');
      if (onSuccess) onSuccess(result);
    } else if (result.status === 'FAILED') {
      // ❌ Pago rechazado
      console.log('❌ Pago RECHAZADO');
      setPaymentResult('error');
      setPaymentError('El pago fue rechazado por Mercado Pago. Por favor, verifica los datos de tu tarjeta e intenta nuevamente.');
      if (onError) onError({ error: 'Pago rechazado', details: result });
    } else {
      // ⏳ Pago pendiente u otro estado
      console.log('⏳ Pago en estado:', result.status);
      setPaymentResult('error');
      setPaymentError(`El pago está en estado: ${result.status}. Por favor, contacta al soporte para más información.`);
      if (onError) onError({ error: `Pago en estado ${result.status}`, details: result });
    }

    } catch (error) {
      console.error('Error en el pago:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      // Si es un error de conexión/red, mostrar mensaje genérico
      const errorMessage = parsePaymentError(error);
      setPaymentResult('error');
      setPaymentError(errorMessage);
      if (onError) onError({ error: errorMessage, details: error });
    } finally {
      setIsLoading(false);
    }
  };


  // Si hay un resultado de pago específico, mostrar la pantalla correspondiente
  if (paymentResult === 'success') {
    return (
      <PaymentSuccess 
        order={order} 
        onContinueShopping={() => {
          setPaymentResult(null);
          if (onSuccess) onSuccess();
        }} 
      />
    );
  }

  if (paymentResult === 'error') {
    return (
      <PaymentError 
        error={paymentError}
        order={order}
        onRetry={() => {
          setPaymentResult(null);
          setPaymentError(null);
        }}
        onBackToCart={() => {
          setPaymentResult(null);
          if (onCancel) onCancel();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Mostrar estado de carga de Mercado Pago */}
      {mpLoading && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-center">
          <div className={`${roboto.className} text-sm text-blue-700`}>
            <div className="flex items-center justify-center mb-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="ml-2">Cargando sistema de pagos...</span>
            </div>
          </div>
        </div>
      )}

      {/* Mostrar error de Mercado Pago */}
      {mpError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded">
          <div className={`${roboto.className} text-sm text-red-700`}>
            <strong>Error al cargar el sistema de pagos:</strong>
            <br />
            {mpError}
            <br />
            <span className="text-xs">Por favor, recarga la página e intenta nuevamente.</span>
          </div>
        </div>
      )}

      {/* Mostrar error general de pago */}
      {paymentError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded">
          <div className={`${roboto.className} text-sm text-red-700`}>
            <strong>Error en el pago:</strong>
            <br />
            {paymentError}
          </div>
        </div>
      )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Datos de la tarjeta */}
            <div className="space-y-3">
              <h3 className={`${roboto.className} font-medium text-gray-800`}>Datos de la tarjeta</h3>
              
              <div>
                <Input
                  name="cardholderName"
                  placeholder="Nombre completo del titular"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  className={errors.cardholderName ? 'border-red-500' : ''}
                />
                {errors.cardholderName && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
                )}
              </div>
              
              <div>
                <Input
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={errors.cardNumber ? 'border-red-500' : ''}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    name="expirationMonth"
                    placeholder="MM"
                    type="number"
                    min="1"
                    max="12"
                    value={formData.expirationMonth}
                    onChange={handleInputChange}
                    className={errors.expirationMonth ? 'border-red-500' : ''}
                  />
                  {errors.expirationMonth && (
                    <p className="text-red-500 text-xs mt-1">{errors.expirationMonth}</p>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    name="expirationYear"
                    placeholder="AAAA"
                    type="number"
                    min={new Date().getFullYear()}
                    value={formData.expirationYear}
                    onChange={handleInputChange}
                    className={errors.expirationYear ? 'border-red-500' : ''}
                  />
                  {errors.expirationYear && (
                    <p className="text-red-500 text-xs mt-1">{errors.expirationYear}</p>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    name="securityCode"
                    placeholder="CVV"
                    type="number"
                    value={formData.securityCode}
                    onChange={handleInputChange}
                    className={errors.securityCode ? 'border-red-500' : ''}
                  />
                  {errors.securityCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.securityCode}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Datos del comprador */}
            <div className="space-y-3">
              <h3 className={`${roboto.className} font-medium text-gray-800`}>Datos del comprador</h3>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <select
                  name="docType"
                  value={formData.docType}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {DOCUMENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="flex-1">
                  <Input
                    name="docNumber"
                    placeholder="Número de documento"
                    type="number"
                    value={formData.docNumber}
                    onChange={handleInputChange}
                    className={errors.docNumber ? 'border-red-500' : ''}
                  />
                  {errors.docNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.docNumber}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => onCancel && onCancel()}
                variant="outline"
                className="flex-1"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !isLoaded || mpLoading || !!mpError || !MERCADO_PAGO_CONFIG.MP_PUBLIC_KEY}
                className="flex-1"
              >
                {isLoading ? "Procesando..." : "Pagar"}
              </Button>
            </div>
          </form>
        </div>
    );
};

export default PaymentForm;
