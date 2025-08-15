# 🚨 CONFIGURACIÓN URGENTE: Credenciales de Mercado Pago

## El error que ves se debe a que las credenciales de Mercado Pago no están configuradas.

### ⚡ Solución Rápida (5 minutos):

#### 1. Obtén tus credenciales de prueba:

1. Ve a https://www.mercadopago.com.ar/developers/
2. Inicia sesión con tu cuenta de Mercado Pago
3. Crea una aplicación nueva o usa una existente
4. Ve a la sección "Credenciales de prueba"
5. Copia tu **Public Key** (empieza con `TEST-`)

#### 2. Actualiza el archivo `.env.local`:

Reemplaza esta línea en `.env.local`:
```
NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-your-public-key-here
```

Por tu public key real:
```
NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-1234567890-abcdef-ghijklmnop-qrstuvwxyz
```

#### 3. Reinicia el servidor:

```bash
npm run dev
```

### 🧪 Tarjetas de Prueba:

Una vez configurado, puedes usar estas tarjetas para testing:

**Visa (Aprobada):**
- Número: `4509 9535 6623 3704`
- CVV: `123`
- Fecha: `11/25` (cualquier fecha futura)

**Mastercard (Aprobada):**
- Número: `5031 7557 3453 0604` 
- CVV: `123`
- Fecha: `11/25`

**Para rechazos (testing):**
- Número: `4000 0000 0000 0002`

### 🔍 Verificar Configuración:

Después de configurar, verifica en la consola del navegador:
- ✅ "MP Public Key configured: Yes"
- ✅ "MP SDK loaded: true"

### ❌ Si sigue sin funcionar:

1. Verifica que la public key empiece con `TEST-`
2. Asegúrate de haber reiniciado el servidor
3. Revisa la consola del navegador para más errores
4. Verifica que no tengas bloqueadores de ads que impidan cargar el SDK

### 📞 Soporte:

Si necesitas ayuda adicional, revisa:
- https://www.mercadopago.com.ar/developers/es/docs/checkout-api/integration-configuration/card/integrate-via-javascript
