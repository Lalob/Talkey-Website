# Publicar Talkey en talkeyco.com

El proyecto está preparado para Cloudflare Workers con OpenNext. La portada, la demo de chat y la agenda pueden funcionar en el plan gratuito de Cloudflare.

## Estado actual

- Node requerido: 22.23.0 o superior.
- Worker configurado: `talkey`.
- Dominios configurados: `talkeyco.com` y `www.talkeyco.com`.
- Build de Cloudflare validado localmente.
- Las rutas internas de administración están bloqueadas en producción.
- Este proyecto contiene solamente el sitio comercial. La aplicación operativa se despliega por separado desde `Talkey MVP`.

## 1. Autorizar Cloudflare

Desde la carpeta del proyecto:

```bash
nvm use
npx wrangler login
npx wrangler whoami
```

El segundo comando abre Cloudflare en el navegador. Inicia sesión o crea una cuenta gratuita y autoriza Wrangler.

## 2. Añadir el dominio a Cloudflare

1. En Cloudflare, selecciona **Add a domain**.
2. Escribe `talkeyco.com` sin `www`.
3. Selecciona el plan **Free**.
4. Revisa los registros DNS detectados y continúa.
5. Cloudflare mostrará dos nameservers propios. Déjalos abiertos para copiarlos.

## 3. Cambiar nameservers en Porkbun

El dominio usa actualmente los nameservers de Porkbun. En Porkbun:

1. Abre **Domain Management** y entra a `talkeyco.com`.
2. Abre **Authoritative Nameservers** y selecciona editar.
3. Elimina los cuatro nameservers de Porkbun.
4. Añade únicamente los dos nameservers entregados por Cloudflare.
5. Guarda los cambios.

Cloudflare marcará la zona como **Active** cuando detecte el cambio. Normalmente tarda minutos, aunque puede demorar hasta 24 horas.

## 4. Publicar

Cuando la zona esté activa:

```bash
nvm use
npm run deploy
```

El despliegue crea el Worker y conecta automáticamente ambos dominios configurados en `wrangler.jsonc`.

## 5. Comprobar

Abre:

- `https://www.talkeyco.com`
- `https://talkeyco.com`

Comprueba la portada, la demo comercial, el enlace de agenda y el acceso hacia `app.talkeyco.com`.

## Desarrollo local

```bash
nvm use
npm run dev -- -p 3002
```

Para probar exactamente el runtime de Cloudflare:

```bash
npm run preview
```
