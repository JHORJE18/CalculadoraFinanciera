# Documentación del Servicio de Analytics

## Descripción General
El servicio de Analytics proporciona una capa de abstracción sobre Google Analytics para rastrear eventos e interacciones del usuario. Implementa el patrón Singleton para garantizar una única instancia en toda la aplicación.

## Eventos Disponibles

### Navegación
- **Vista de Página** (`page_view`)
  ```typescript
  analytics.pageView("calculadora-iva");
  `````
### Interacciones de Usuario
- **Clic en Botón** (`button_click`)
  ````typescript
  analytics.trackButtonClick("calcular", { section: "calculadora-descuentos" });
  `````
- **Envío de Formulario** (`form_submit`)
  ````typescript
  analytics.trackFormSubmit("formulario-financiacion", { success: true });
  `````
- **Cambio de Tema** (`theme_change`)
  ````typescript
  analytics.trackButtonClick("calcular", { section: "calculadora-descuentos" });
  `````
### Funcionalidades Core
- **Cálculos** (`calculation`)
  ````typescript
  analytics.trackCalculation("iva", {
    tax_rate: 21,
    amount: 100
  });
  `````
- **Selección de Moneda** (`select_currency`)
  ````typescript
  analytics.trackEvent('select_currency', {
    from: 'EUR',
    to: 'USD'
  });
  `````
### Compartir y Enlaces
- **Compartir Contenido** (`share`)
  ````typescript
  analytics.trackShare("whatsapp", "calculo-descuento");
  `````
- **Enlaces Externos** (`external_link_click`)
  ````typescript
  analytics.trackExternalLinkClick("linkedin", "https://linkedin.com/in/usuario");
  `````
## Parámetros Comunes
Todos los eventos pueden incluir parámetros adicionales:

`timestamp`: Añadido automáticamente
Cualquier combinación de: ``string``, ``number``, ``boolean``, ``null``, ``undefined``
## Manejo de Errores
El servicio incluye:
- Validación de Google Analytics
- Logs de advertencia
- Manejo de errores en tracking
## Consideraciones Técnicas
- Verifica `window.gtag` antes de cada tracking
- Incluye timestamp ISO automático
- Implementación Singleton
- Tipado completo con TypeScript

## Tipos de Evento Soportados 
- `page_view`
- `button_click`
- `form_submit`
- `calculation`
- `select_currency`
- `share`
- `theme_change`
- `external_link_click`