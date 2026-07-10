# Site boundaries

This repository keeps the Talkey platform as the deploy host. Climax and Davaterm are separate brands with separate source projects in `/Users/lalob/Documents`.

- `app/`: Talkey platform routes for `https://www.talkeyco.com/`, `/ventas`, `/soporte`, `/manuales`, and related pages.
- `/Users/lalob/Documents/Climax Website`: Climax source project for future standalone export/deploy.
- `/Users/lalob/Documents/Davaterm Website`: Davaterm source project for future standalone export/deploy.
- `sites/climax/`: temporary deployment snapshot copied from `Climax Website` so Talkey can serve `https://www.talkeyco.com/climax`.
- `sites/davaterm/`: temporary deployment snapshot copied from `Davaterm Website`.
- `public/davaterm.html` and `public/davaterm-assets/`: generated temporary mount for `https://www.talkeyco.com/davaterm`.

Run `npm run sync:external-sites` before editing or deploying Talkey when Climax/Davaterm source projects changed.
