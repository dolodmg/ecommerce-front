
export const MERCADO_PAGO_CONFIG = {
  MP_PUBLIC_KEY: process.env.NEXT_PUBLIC_MP_PUBLIC_KEY
};

export const DOCUMENT_TYPES = [
  { value: 'DNI', label: 'DNI' },
  { value: 'CI', label: 'CI' },
  { value: 'LC', label: 'LC' },
  { value: 'LE', label: 'LE' },
  { value: 'Otro', label: 'Otro' }
];

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};
