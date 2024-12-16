const helmetOptions = {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "http://localhost:*"], // Permitir recursos desde localhost
        scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:*"], // Permitir scripts inline y desde localhost
        styleSrc: ["'self'", "'unsafe-inline'", "http://localhost:*"], // Permitir estilos inline y desde localhost
        imgSrc: ["'self'", "data:", "http://localhost:*"], // Permitir imágenes desde localhost y data URIs
        connectSrc: ["'self'", "ws://localhost:*", "http://localhost:*"], // Permitir conexiones WebSocket y HTTP desde localhost
        fontSrc: ["'self'", "http://localhost:*"], // Permitir fuentes desde localhost
        objectSrc: ["'none'"], // No permitir objetos embebidos
        upgradeInsecureRequests: [], // Convierte todas las solicitudes HTTP a HTTPS
      },
    },
    referrerPolicy: { policy: 'no-referrer' }, // Controla la información enviada en el encabezado Referer
    frameguard: { action: 'sameorigin' }, // Permitir iframes solo desde el mismo origen
    hsts: false, // Deshabilitar HSTS en desarrollo
    noSniff: true, // Previene ataques de tipo MIME
    xssFilter: true, // Habilita el filtro de XSS en los navegadores
};
export default helmetOptions;