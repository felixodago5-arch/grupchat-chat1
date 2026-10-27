# grupchat-host

The main GrupChat app. It uses Next.js Multi-Zones to serve the
Group Plan Checklist from a separate app, `grupchat-chat`.

## How the microfrontend works

- `grupchat-chat` is its own Next.js app. It owns the `/chat` path
  (`basePath: "/chat"`) and serves its assets from `/chat-static`
  (`assetPrefix`).
- `grupchat-host` forwards those paths to the chat app using `rewrites`
  in `next.config.ts`, so the browser sees one site.
- Links between the two apps use plain `<a>` tags, not Next's `<Link>`,
  because `<Link>` can't soft-navigate across separate apps.

## Run locally

1. In `grupchat-chat`: `npm install`, then `npm run dev -- -p 3001`
2. In `grupchat-host`: `npm install`, then `npm run dev`
3. Open http://localhost:3000 and click "Open checklist".

## Notes

- Tasks are kept in browser memory, so a refresh resets them.
- The rewrite destinations in `next.config.ts` point to localhost.
  For deployment, change them to the chat app's deployed URL.
