# Configuración de Pagos con Mercado Pago

Este documento explica cómo configurar y usar el sistema de pagos con Mercado Pago en el proyecto.

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Mercado Pago Configuration
NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-your-public-key-here
MP_ACCESS_TOKEN=TEST-your-access-token-here

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8085
```

### 2. Obtener Credenciales de Mercado Pago

1. Ve a [Mercado Pago Developers](https://www.mercadopago.com.ar/developers/)
2. Inicia sesión en tu cuenta
3. Ve a "Mis aplicaciones" y crea una nueva aplicación
4. Obtén tu **Public Key** y **Access Token** de prueba
5. Reemplaza los valores en `.env.local`

## Estructura del Sistema de Pagos

### Componentes Principales

1. **PaymentForm.jsx**: Formulario principal de pago
2. **PaymentFeedback.jsx**: Componentes de éxito y error
3. **useMercadoPago.js**: Hook para cargar e interactuar con MP SDK
4. **paymentHelpers.js**: Funciones auxiliares y validaciones

### Flujo de Pago

1. **Carga del SDK**: Se carga el SDK de Mercado Pago dinámicamente
2. **Validación**: Se validan los datos del formulario
3. **Tokenización**: Se crea un token seguro de la tarjeta
4. **Pago**: Se envía el token al backend para procesar
5. **Feedback**: Se muestra resultado (éxito/error) al usuario

### API Backend

El sistema espera que el backend tenga estos endpoints:

```
POST /payments/process-mp
```

**Payload esperado:**
```json
{
  "orderId": "123",
  "token": "card_token_from_mp",
  "email": "user@example.com",
  "amount": 1000,
  "description": "Orden #123",
  "paymentMethodId": "visa",
  "payer": {
    "email": "user@example.com",
    "identification": {
      "type": "DNI",
      "number": "12345678"
    }
  }
}
```

## Uso

### Ejemplo básico:

```jsx
import PaymentForm from '@/components/payment/PaymentForm';

function CheckoutPage() {
  const order = {
    idOrder: '123',
    totalPrice: 1000
  };

  const handlePaymentSuccess = () => {
    // Redirigir a página de confirmación
    router.push('/order-confirmation');
  };

  const handlePaymentCancel = () => {
    // Volver al carrito
    router.push('/cart');
  };

  return (
    <PaymentForm
      order={order}
      onSuccess={handlePaymentSuccess}
      onCancel={handlePaymentCancel}
    />
  );
}
```

## Manejo de Errores

El sistema maneja automáticamente diferentes tipos de errores:

1. **Errores de SDK**: Problemas al cargar Mercado Pago
2. **Errores de validación**: Datos incorrectos en el formulario
3. **Errores de tokenización**: Problemas con los datos de la tarjeta
4. **Errores de pago**: Rechazo del banco o problemas en el backend

## Testing

Para testing, puedes usar estas tarjetas de prueba:

```
Visa: 4509 9535 6623 3704
Mastercard: 5031 7557 3453 0604
Amex: 3711 803032 57522
```

Código de seguridad: cualquier número de 3-4 dígitos
Fecha de expiración: cualquier fecha futura

## Troubleshooting

### El SDK no carga
- Verifica que la public key esté correctamente configurada
- Revisa la consola del navegador para errores de red
- Asegúrate de que no haya bloqueadores de ads

### Error de configuración
- Verifica que las variables de entorno estén correctamente definidas
- Reinicia el servidor de desarrollo después de cambiar `.env.local`

### Errores de pago
- Revisa los logs del backend para más detalles
- Verifica que el backend esté funcionando correctamente
- Confirma que las credenciales de Mercado Pago sean válidas

## Seguridad

- **NUNCA** expongas tu Access Token en el frontend
- Los tokens de tarjeta se crean en el frontend pero se procesan en el backend
- Todos los pagos se procesan de forma segura a través de Mercado Pago

## Próximos Pasos

1. Implementar webhooks para confirmación de pago
2. Agregar soporte para otros métodos de pago
3. Implementar guardado de métodos de pago (con tokens)
4. Agregar analytics de pagos
