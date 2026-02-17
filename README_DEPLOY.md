# Guía de Despliegue - Purpurina Landing 🚀

Este proyecto está configurado para ser desplegado fácilmente en **Vercel**. Sigue estos pasos exactos para publicar la tienda.

## 1. Preparación de Credenciales

Asegúrate de tener a mano tus credenciales de **Supabase** (URL y Anon Key) desde el panel de `Settings > API`.

## 2. Pasos para Vercel

### Opción A: Vercel CLI (Recomendado)
Sigue estos comandos en tu terminal dentro de la carpeta del proyecto:

1. Instalar Vercel: `npm install -g vercel`
2. Iniciar sesión: `vercel login`
3. Desplegar: `vercel`
4. Configurar variables de entorno cuando se te solicite o a través del dashboard de Vercel (ver punto 3).

### Opción B: Dashboard de Vercel (Git)
1. Sube tu código a un repositorio de GitHub/GitLab.
2. Conecta tu repositorio en [vercel.com](https://vercel.com).
3. En la sección **Environment Variables**, añade:
   - `VITE_SUPABASE_URL`: Tu URL de Supabase.
   - `VITE_SUPABASE_ANON_KEY`: Tu Anon Key de Supabase.

## 3. Configuración Importante en el Dashboard

Para que las rutas de React (React Router) funcionen correctamente en Vercel, asegúrate de que el archivo `vercel.json` esté configurado (omitido si usas la configuración estándar de Vite que maneja Vercel automáticamente, pero recomendado).

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 4. Usuarios de Administrador

Recuerda que para acceder a `/admin`, debes crear al menos un usuario en:
**Supabase Dashboard > Authentication > Users > Add User**.

## 5. Verificación Final

Una vez desplegado, verifica:
- [ ] Que el formulario de contacto funcione.
- [ ] Que los precios aparezcan en formato COP ($ 0.000).
- [ ] Que el acceso a `/admin` pida login.

---
*Purpurina Landing - Listos para el éxito.*
