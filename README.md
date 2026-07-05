# Talkey Website

Sitio comercial de Talkey. Este proyecto contiene únicamente la experiencia de venta: propuesta de valor, demo interactiva, agenda y enlaces hacia el servicio Talkey.

El producto operativo vive en el proyecto hermano `Talkey MVP` y se publica por separado en `app.talkeyco.com`.

## Desarrollo local

```bash
nvm use
npm install
npm run dev -- -p 3002
```

## Validación

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Publicación

El proyecto usa Next.js, OpenNext y Cloudflare Workers. `wrangler.jsonc` configura:

- `talkeyco.com`
- `www.talkeyco.com`

Cuando Cloudflare esté autorizado y la zona DNS activa:

```bash
npm run deploy
```

Consulta `DEPLOYMENT.md` para la activación inicial del dominio.
