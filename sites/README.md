# Site boundaries

This repository keeps the Talkey platform, Climax, and Davaterm as separate site surfaces:

- `app/`: Talkey platform routes for `https://www.talkeyco.com/`, `/ventas`, `/soporte`, `/manuales`, and related pages.
- `sites/climax/`: Climax site implementation. Next.js route wrappers live in `app/climax` so the public URLs remain `https://www.talkeyco.com/climax` and `https://www.talkeyco.com/climax/productos`.
- `sites/davaterm/`: Static Davaterm showcase served by the `workers/davaterm-showcase` Cloudflare Worker at `https://www.talkeyco.com/davaterm/`.

Do not merge Davaterm or Climax implementation files into the Talkey platform components unless the public route wrappers require it.
