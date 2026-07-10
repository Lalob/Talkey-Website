# Davaterm Website

Proyecto independiente del sitio Davaterm.

Este proyecto es la fuente exportable de Davaterm como empresa separada de Talkey y Climax. Mientras Davaterm no tenga dominio propio, Talkey mantiene una copia temporal para publicar `https://www.talkeyco.com/davaterm`.

## Edit content

- Main copy and sections: `index.html`
- Visual design and animation styling: `styles.css`
- Scroll reveal, counter and canvas flow animation: `script.js`
- Brand assets: `assets/`

## Run locally

Open `index.html` directly in a browser, or serve the folder with:

```bash
python3 -m http.server 4174
```

Then visit `http://localhost:4174`.

## Deployment

This folder is ready for Cloudflare Pages as a static site. No build command is required.

When Davaterm has its own domain, update the temporary URLs in `index.html`, `robots.txt`, and `sitemap.xml`.
