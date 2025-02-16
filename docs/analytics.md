# Documentación del Servicio de Analytics

## Descripción General
El servicio de Analytics es una implementación del patrón Singleton que proporciona funcionalidades para el seguimiento de eventos y interacciones del usuario en la aplicación. Está diseñado para integrarse con Google Analytics y ofrece una API simple y tipada para registrar diferentes tipos de eventos.

## Características Principales
- Implementación del patrón Singleton para garantizar una única instancia
- Integración con Google Analytics (gtag)
- Tipado fuerte con TypeScript
- Manejo de errores y validaciones
- Registro automático de timestamp en cada evento

## Tipos de Eventos
El servicio soporta los siguientes tipos de eventos:

- `page_view`: Vistas de página
- `button_click`: Clics en botones
- `form_submit`: Envíos de formularios
- `calculation`: Eventos de cálculo
- `select_currency`: Eventos de selección de moneda
- `share`: Eventos de compartir

## API y Métodos

### Obtener Instancia
```typescript
const analytics = AnalyticsService.getInstance();
```

### Registro de Eventos

#### Vista de Página
```typescript
analytics.pageView("calculadora-iva");
```

#### Clic en Botón
```typescript
analytics.trackButtonClick("calcular", { 
  section: "calculadora-descuentos"
});
```

#### Envío de Formulario
```typescript
analytics.trackFormSubmit("formulario-financiacion", {
  success: true,
  fields_completed: 5
});
```

#### Evento de Cálculo
```typescript
analytics.trackCalculation("iva", {
  tax_rate: 21,
  amount: 100
});
```

#### Evento de Compartir
```typescript
analytics.trackShare("whatsapp", "calculo-descuento");
```

## Parámetros de Eventos
Cada método de tracking acepta parámetros adicionales opcionales que pueden incluir cualquier combinación de:
- Strings
- Numbers
- Booleans
- null
- undefined

## Manejo de Errores
El servicio incluye:
- Validación de inicialización de Google Analytics
- Manejo de errores en el tracking de eventos
- Logs de advertencia cuando GA no está disponible

## Consideraciones Técnicas
- El servicio verifica la disponibilidad de `window.gtag` antes de cada tracking
- Cada evento incluye automáticamente un timestamp ISO
- La implementación Singleton garantiza consistencia en el tracking

## Ejemplo de Implementación Completa
```typescript
// Obtener la instancia
const analytics = AnalyticsService.getInstance();

// Registrar una vista de página
analytics.pageView("inicio");

// Registrar un cálculo con parámetros adicionales
analytics.trackCalculation("descuento", {
  original_price: 100,
  discount_percentage: 20,
  final_price: 80,
  currency: "EUR"
});

// Registrar un evento de compartir
analytics.trackShare("email", "resultado-calculo");
```