# CamisApp React

Aplicación React creada con Vite que implementa el flujo de autenticación (registro e inicio de sesión)
contra Supabase. La interfaz está pensada para el curso de Programación Web.

## Requisitos previos

- Node.js 18 o superior
- Una cuenta y proyecto activo en [Supabase](https://supabase.com/)

## Configuración del entorno

1. Copia el archivo `.env.example` a `.env`.
2. Completa las variables con los valores de tu proyecto de Supabase.

```bash
cp .env.example .env
```

Variables necesarias:

```bash
VITE_SUPABASE_URL=https://incdfuzrzamixmnlvpas.supabase.co
VITE_SUPABASE_ANON_KEY=tu_llave_publica
```

> El archivo `.env` está ignorado en el repositorio para proteger las credenciales.

## Scripts disponibles

```bash
npm install      # Instala dependencias
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera la versión optimizada para producción
npm run preview  # Previsualiza la build de producción
```

## Estructura principal

- `src/lib/supabaseClient.js`: inicializa el cliente de Supabase utilizando las variables de entorno.
- `src/pages/LoginPage.jsx`: formulario para iniciar sesión.
- `src/pages/RegisterPage.jsx`: formulario de registro.
- `src/pages/HomePage.jsx`: pantalla posterior al login con cierre de sesión.
- `src/components/forms/AuthForm.jsx`: formulario reutilizable para ambos flujos.

## Notas

- La interfaz está en español y preparada para ampliarse con nuevas funcionalidades.
- El diseño utiliza estilos CSS modernos y responsivos definidos en `src/styles/global.css`.
