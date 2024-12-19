# Gestión de Guardería

## Descripción del proyecto

El proyecto "Gestión de Guardería" es una aplicación diseñada para administrar eficientemente las operaciones de una guardería, incluyendo la gestión de niños, personal, horarios y actividades, facilitando la comunicación entre padres y administradores.

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- TypeScript
- TypeORM

### Base de datos

- PostgreSQL

## Estructura de carpetas

La estructura de carpetas del proyecto es la siguiente:

```
Guarderia/
├── dist/                   # Archivos compilados
├── node_modules/           # Dependencias del proyecto
├── src/                    # Código fuente
│   ├── configuration/      # Configuraciones
│   │   ├── cors.options.config.ts
│   │   ├── database.config.ts
│   │   ├── enviorement.config.ts
│   │   ├── helmet.options.config.ts
│   │   ├── winston.config.ts
│   ├── controllers/        # Controladores
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   ├── dto/                # Data Transfer Objects
│   │   ├── request/
│   │   │   ├── authentication.request.dto.ts
│   │   ├── response/
│   │   │   ├── authentication.response.dto.ts
│   │   ├── user.dto.ts
│   ├── entity/             # Entidades de TypeORM
│   │   ├── Token.ts
│   │   ├── User.ts
│   ├── exeption/           # Manejo de excepciones
│   │   ├── authentication.error.ts
│   │   ├── authorization.error.ts
│   │   ├── bad.request.error.ts
│   │   ├── custom.error.ts
│   │   ├── database.error.ts
│   │   ├── not.found.error.ts
│   │   ├── validation.error.ts
│   ├── repository/         # Repositorios
│   │   ├── implements/
│   │   │   ├── token.implements.repository.ts
│   │   │   ├── user.implements.repository.ts
│   │   ├── interface/
│   │   │   ├── token.interface.repository.ts
│   │   │   ├── user.interface.repository.ts
│   ├── routes/             # Rutas de la aplicación
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   ├── security/           # Seguridad y middleware
│   │   ├── middleware/
│   │   │   ├── error.middleware.ts
│   │   ├── service/
│   │   │   ├── jwt.service.ts
│   ├── service/            # Servicios
│   │   ├── implement/
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   ├── interface/
│   │   │   ├── auth.interface.service.ts
│   │   │   ├── user.interface.service.ts
│   ├── utils/              # Utilidades y constantes
│   │   ├── constants/
│   │   │   ├── api.constant.ts
│   │   │   ├── auth.constant.ts
│   │   ├── enum/
│   │   │   ├── token.type.ts
│   │   │   ├── user.role.ts
│   ├── app.ts              # Configuración de la aplicación
│   ├── server.ts           # Punto de entrada de la aplicación
├── .env                    # Variables de entorno (ignorado por Git)
├── .env.example            # Ejemplo de archivo de variables de entorno
├── .gitignore              # Archivos y carpetas ignorados por Git
├── package.json            # Dependencias y scripts de NPM
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Documentación del proyecto

```

## Buenas prácticas utilizadas en este proyecto

### 1. Arquitectura limpia y modular

La arquitectura limpia y modular es un enfoque de diseño de software que promueve la separación de responsabilidades y la organización del código en módulos independientes. Esto facilita el mantenimiento, la escalabilidad y la reutilización del código.

### 1.1 Separacion de capas
- **Configuración (`configuration/`)**: Archivos de configuración para diferentes aspectos del proyecto, como la base de datos, CORS, Helmet, Winston, etc.
- **Controladores (`controllers/`)**: Manejan las solicitudes HTTP y delegan la lógica de negocio a los servicios correspondientes.
- **DTOs (`dto/`)**: Definen los objetos de transferencia de datos utilizados para la validación y normalización de datos entre capas.
- **Entidades (`entity/`)**: Representan los modelos de datos que se mapean a las tablas de la base de datos utilizando TypeORM.
- **Excepciones (`exeption/`)**: Clases de error personalizadas para manejar diferentes tipos de excepciones.
- **Repositorios (`repository/`)**: Encapsulan la lógica de acceso a datos y proporcionan métodos para interactuar con la base de datos.
- **Rutas (`routes/`)**: Definen las rutas de la aplicación y las asocian con los controladores correspondientes.
- **Seguridad (`security/`)**: Middleware y servicios relacionados con la seguridad, como JWT.
- **Servicios (`service/`)**: Contienen la lógica de negocio y procesan las solicitudes recibidas de los controladores.
- **Utilidades (`utils/`)**: Constantes, enumeraciones y otras utilidades utilizadas en todo el proyecto.


### 1.2 Beneficios de la arquitectura modular

- **Mantenimiento**: Facilita la localización y corrección de errores.
- **Escalabilidad**: Permite agregar nuevas funcionalidades sin afectar otras partes del sistema.
- **Reutilización**: Componentes modulares reutilizables en otros proyectos.
- **Pruebas**: Simplifica la creación de pruebas unitarias e integración.


### 2. Seguridad y autenticación

Se implementaron varias medidas de seguridad para proteger la aplicación y los datos de los usuarios. La autenticación se maneja utilizando JSON Web Tokens (JWT), con tokens de acceso y refresco almacenados en la base de datos. 

### 2.1. Autenticación con JWT

JSON Web Tokens (JWT) se utilizan para autenticar a los usuarios de manera segura. Los JWT son tokens compactos y seguros que se pueden utilizar para verificar la identidad de un usuario y autorizar el acceso a recursos protegidos.

- **Token de Acceso**: Un token de corta duración que se utiliza para acceder a los recursos protegidos.
- **Token de Refresco**: Un token de larga duración que se utiliza para obtener un nuevo token de acceso cuando este expira.

### 2.2. Almacenamiento de Tokens

Los tokens de acceso y refresco se almacenan en la base de datos para permitir la revocación y gestión de sesiones de usuario.


### 3. Gestión de errores

Los errores se manejan de forma centralizada mediante la creación de errores personalizados, permitiendo una respuesta coherente y uniforme ante excepciones.

### 4. Código limpio

Se siguen estándares y prácticas recomendadas para mantener un código limpio, como los principios SOLID y convenciones de estilo de TypeScript.

### 5. Reutilización y modularidad

Se promueve la reutilización y modularidad mediante la implementación de componentes y servicios que siguen los principios de diseño orientado a objetos.

### 6. Configuración centralizada

Todas las configuraciones del proyecto se centralizan en la carpeta `config`, facilitando su gestión y mantenimiento.

## Pendientes

### 8. Validación y normalización

Se realizaron validaciones con `class-validator` utilizando diversos decoradores, y se planea continuar mejorando la validación y normalización de datos para asegurar la integridad del sist