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
  const { createCardToken, isLoaded, error: mpError, isLoading: mpLoading } = useMercadoPago(MERCADO_PAGO_CONFIG.MP_PUBLIC_KEY);
  
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

  const validateForm = () => {
    const newErrors = validateCardData(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Verificar que Mercado Pago esté cargado
    if (!isLoaded) {
      setPaymentError('El sistema de pagos aún se está cargando. Por favor, espera un momento e intenta nuevamente.');
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
      // Paso 1: Tokenizar la tarjeta con Mercado Pago
      console.log('Tokenizing card with Mercado Pago...');
      console.log('Form data:', {
        cardNumber: formData.cardNumber ? '****-****-****-' + formData.cardNumber.slice(-4) : 'missing',
        cardholderName: formData.cardholderName || 'missing',
        expirationMonth: formData.expirationMonth || 'missing',
        expirationYear: formData.expirationYear || 'missing',
        securityCode: formData.securityCode ? '***' : 'missing',
        docType: formData.docType || 'missing',
        docNumber: formData.docNumber ? '****' + formData.docNumber.slice(-2) : 'missing',
        email: formData.email || 'missing'
      });
      
      const cardToken = await createCardToken({
        cardNumber: formData.cardNumber,
        cardholderName: formData.cardholderName,
        expirationMonth: formData.expirationMonth,
        expirationYear: formData.expirationYear,
        securityCode: formData.securityCode,
        docType: formData.docType,
        docNumber: formData.docNumber
      });
      
      const paymentPayload = {
        idUser: order.idUser,           // ✅ Usuario de la orden
        idOrder: order.idOrder,         // ✅ ID de la orden
        paymentMethod: cardToken.payment_method_id,  // ✅ Método de pago de MP
        installments: 1,                // ✅ Cuotas (1 por defecto)
        token: cardToken.id,            // ✅ Token de MP
        email: formData.email           // ✅ Email del usuario
      };
      
      // Paso 3: Enviar pago al backend
      const result = await processPaymentAction(paymentPayload);

      // Paso 4: Notificar éxito al componente padre
      if (onSuccess) {
        onSuccess(result);
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      
      // Usar la función helper para parsear errores
      const errorMessage = parsePaymentError(error);
      setPaymentError(errorMessage);
      
      // Notificar error al componente padre
      if (onError) {
        onError({ error: errorMessage, details: error });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Si hay un error de pago y está configurado localmente, mostrarlo
  if (paymentResult === 'success') {
    return (
      <PaymentSuccess 
        order={order} 
        onClose={() => {
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
        onClose={() => {
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

      {/* Mostrar error de configuración */}
      {!MERCADO_PAGO_CONFIG.MP_PUBLIC_KEY && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
          <div className={`${roboto.className} text-sm text-yellow-700`}>
            <strong>Configuración incompleta:</strong>
            <br />
            La clave pública de Mercado Pago no está configurada.
            <br />
            <span className="text-xs">Contacta al administrador del sitio.</span>
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
