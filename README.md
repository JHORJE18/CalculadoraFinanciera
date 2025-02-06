# Calculadora Financiera

Una aplicación web progresiva (PWA) moderna que ofrece una suite completa de calculadoras financieras para uso diario. Desarrollada con React, TypeScript y Tailwind CSS, proporciona una experiencia de usuario fluida y responsive.

## 🌟 Características Principales

- **Diseño Moderno y Responsive**: Interfaz de usuario limpia y moderna que se adapta a cualquier dispositivo
- **Modo Oscuro/Claro**: Sistema de temas integrado que se adapta a las preferencias del usuario
- **Instalable como PWA**: Funciona offline y se puede instalar como una aplicación nativa
- **Persistencia de Datos**: Guarda automáticamente las últimas configuraciones utilizadas
- **Compartir Resultados**: Función integrada para compartir cálculos fácilmente

## 🧮 Calculadoras Disponibles

### Conversor de Divisas
- Conversión en tiempo real entre múltiples monedas
- Utiliza la API de ExchangeRate para tasas actualizadas
- Soporte para 9 monedas principales con sus banderas
- Función de compartir resultados con tasa de cambio detallada

### Calculadora de IVA
- Cálculo de IVA con diferentes tipos impositivos (21%, 10%, 4%)
- Modo dual: añadir o descontar IVA
- Desglose detallado de base imponible, IVA y total
- Persistencia de últimos valores utilizados

### Calculadora de Descuentos
- Cálculo instantáneo de descuentos porcentuales
- Muestra el ahorro total y precio final
- Interfaz intuitiva con validación de entrada
- Almacenamiento local de últimos valores

### Calculadora de Financiación
- Cálculo de cuotas mensuales
- Soporte para préstamos con y sin interés
- Cálculo detallado de intereses totales
- Persistencia de configuraciones previas

### Calculadora de Ofertas
- Análisis de ofertas tipo "Lleva X, Paga Y"
- Cálculo automático del precio por unidad
- Visualización clara del ahorro total
- Almacenamiento de últimas configuraciones

## 🛠️ Implementación Técnica

### Frontend
- **React + TypeScript**: Desarrollo robusto y tipado
- **Tailwind CSS**: Estilos modernos y responsivos
- **Radix UI**: Componentes accesibles y personalizables
- **Vite**: Build tool rápido y eficiente

### Características Técnicas
- **Estado Global**: Gestión eficiente del estado de la aplicación
- **Hooks Personalizados**: Para lógica de negocio reutilizable
- **LocalStorage**: Persistencia de datos del usuario
- **Web Share API**: Integración nativa para compartir

### PWA
- Manifest personalizado
- Service Worker para funcionamiento offline
- Caché de recursos estáticos
- Instalable en dispositivos móviles y escritorio

## 📥 Instalación y Uso

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar en modo desarrollo:
```bash
npm run dev
```

4. Construir para producción:
```bash
npm run build
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

---

*Este proyecto ha sido desarrollado con la asistencia de Replit AI y Trae.ai*