import { useState, useEffect } from 'react';

export const useMercadoPago = (publicKey) => {
  const [mp, setMp] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMercadoPago = async () => {
      if (!publicKey) {
        setError('Public key not provided');
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        // Verificar si ya está cargado
        if (window.MercadoPago) {
          const mercadoPago = new window.MercadoPago(publicKey);
          setMp(mercadoPago);
          setIsLoaded(true);
          setIsLoading(false);
          return;
        }

        // Cargar el script
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.async = true;
        
        const loadPromise = new Promise((resolve, reject) => {
          script.onload = () => {
            // Esperar un poco para asegurar que el SDK esté completamente cargado
            setTimeout(resolve, 100);
          };
          script.onerror = () => reject(new Error('Failed to load Mercado Pago SDK'));
          
          // Timeout después de 10 segundos
          setTimeout(() => reject(new Error('Mercado Pago SDK load timeout')), 10000);
        });
        
        document.head.appendChild(script);
        await loadPromise;

        // Verificar que MercadoPago esté disponible
        if (!window.MercadoPago) {
          throw new Error('Mercado Pago SDK not available after loading');
        }

        // Inicializar Mercado Pago con la public key
        const mercadoPago = new window.MercadoPago(publicKey);
        setMp(mercadoPago);
        setIsLoaded(true);
        
      } catch (err) {
        setError(err.message || 'Error loading Mercado Pago SDK');
        console.error('Error loading Mercado Pago SDK:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (publicKey && !isLoaded && !isLoading) {
      loadMercadoPago();
    }
  }, [publicKey, isLoaded, isLoading]);

  const createCardToken = async (cardData) => {
    if (!mp) {
      throw new Error('Mercado Pago SDK not loaded');
    }

    try {
      const tokenData = {
        cardNumber: cardData.cardNumber.replace(/\s/g, ''),
        cardholderName: cardData.cardholderName.trim(),
        cardExpirationMonth: cardData.expirationMonth.toString(),
        cardExpirationYear: cardData.expirationYear.toString(),
        securityCode: cardData.securityCode.toString(),
        identificationType: cardData.docType,
        identificationNumber: cardData.docNumber.toString(),
      };

      const token = await mp.createCardToken(tokenData);
      console.log('Card token created:', token);
      return token;
    } catch (error) {
      throw error;
    }
  };

  const getPaymentMethods = async () => {
    if (!mp) {
      throw new Error('Mercado Pago SDK not loaded');
    }

    try {
      // Obtener métodos de pago con filtros básicos para tarjetas de crédito
      return await mp.getPaymentMethods({
        bin: null, // Se puede especificar el BIN de la tarjeta si se tiene
        payment_method_id: null // Se puede filtrar por método específico
      });
    } catch (error) {
      console.error('Error getting payment methods:', error);
      // Si falla con parámetros, intentar sin parámetros
      try {
        return await mp.getPaymentMethods();
      } catch (fallbackError) {
        console.error('Error getting payment methods (fallback):', fallbackError);
        throw fallbackError;
      }
    }
  };

  const getIdentificationTypes = async () => {
    if (!mp) {
      throw new Error('Mercado Pago SDK not loaded');
    }

    try {
      return await mp.getIdentificationTypes();
    } catch (error) {
      console.error('Error getting identification types:', error);
      throw error;
    }
  };

  return {
    mp,
    isLoaded,
    error,
    isLoading,
    createCardToken,
    getPaymentMethods,
    getIdentificationTypes
  };
};

export default useMercadoPago;
