// Helper functions for payment processing
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  IN_PROCESS: 'in_process'
};

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export const parsePaymentError = (error) => {
  // Errores específicos de Mercado Pago
  const mpErrors = {
    '205': 'Ingresa el número de tu tarjeta.',
    '208': 'Elige un mes.',
    '209': 'Elige un año.',
    '212': 'Ingresa tu documento.',
    '213': 'Ingresa tu documento.',
    '214': 'Ingresa tu documento.',
    '220': 'Ingresa tu banco emisor.',
    '221': 'Ingresa el nombre y apellido.',
    '224': 'Ingresa el código de seguridad.',
    'E301': 'Hay algo mal en el número. Vuelve a ingresarlo.',
    'E302': 'Revisa el código de seguridad.',
    'E601': 'Hay algo mal en el número. Vuelve a ingresarlo.',
    '316': 'Ingresa un nombre válido.',
    '322': 'Revisa tu documento.',
    '323': 'Revisa tu documento.',
    '324': 'Revisa tu documento.',
    '325': 'Revisa la fecha.',
    '326': 'Revisa la fecha.'
  };

  if (error?.cause && Array.isArray(error.cause)) {
    return error.cause.map(err => {
      return mpErrors[err.code] || err.description || err.message;
    }).join(', ');
  }

  if (error?.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Error desconocido al procesar el pago';
};

export const validateCardData = (formData) => {
  const errors = {};
  
  // Validar nombre del titular
  if (!formData.cardholderName?.trim()) {
    errors.cardholderName = 'El nombre del titular es requerido';
  } else if (formData.cardholderName.trim().length < 2) {
    errors.cardholderName = 'El nombre debe tener al menos 2 caracteres';
  }
  
  // Validar número de tarjeta
  const cardNumber = formData.cardNumber?.replace(/\s/g, '') || '';
  if (!cardNumber) {
    errors.cardNumber = 'El número de tarjeta es requerido';
  } else if (cardNumber.length < 13 || cardNumber.length > 19) {
    errors.cardNumber = 'Número de tarjeta inválido';
  } else if (!/^\d+$/.test(cardNumber)) {
    errors.cardNumber = 'El número de tarjeta solo debe contener dígitos';
  }
  
  // Validar mes de expiración
  const month = parseInt(formData.expirationMonth);
  if (!month || month < 1 || month > 12) {
    errors.expirationMonth = 'Mes inválido (1-12)';
  }
  
  // Validar año de expiración
  const year = parseInt(formData.expirationYear);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  if (!year || year < currentYear) {
    errors.expirationYear = 'Año inválido';
  } else if (year === currentYear && month < currentMonth) {
    errors.expirationYear = 'La tarjeta ha expirado';
  }
  
  // Validar código de seguridad
  const securityCode = formData.securityCode?.trim() || '';
  if (!securityCode) {
    errors.securityCode = 'El código de seguridad es requerido';
  } else if (securityCode.length < 3 || securityCode.length > 4) {
    errors.securityCode = 'Código de seguridad inválido (3-4 dígitos)';
  } else if (!/^\d+$/.test(securityCode)) {
    errors.securityCode = 'El código de seguridad solo debe contener dígitos';
  }
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email?.trim()) {
    errors.email = 'El email es requerido';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Email inválido';
  }
  
  // Validar documento
  const docNumber = formData.docNumber?.trim() || '';
  if (!docNumber) {
    errors.docNumber = 'El número de documento es requerido';
  } else if (docNumber.length < 7 || docNumber.length > 12) {
    errors.docNumber = 'Número de documento inválido (7-12 dígitos)';
  } else if (!/^\d+$/.test(docNumber)) {
    errors.docNumber = 'El documento solo debe contener dígitos';
  }
  
  return errors;
};

export const formatCardNumber = (value) => {
  // Remover todo lo que no sea dígito
  const cleaned = value.replace(/\D/g, '');
  
  // Agregar espacios cada 4 dígitos
  const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
  
  // Limitar a 19 caracteres (16 dígitos + 3 espacios)
  return formatted.substring(0, 19);
};

export const formatExpirationDate = (month, year) => {
  if (!month || !year) return '';
  return `${month.toString().padStart(2, '0')}/${year}`;
};
