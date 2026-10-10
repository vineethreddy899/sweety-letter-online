# Online Letter

A romantic letter-sharing app built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, bcryptjs and Vercel KV.

## Local

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without KV environment variables, letters are stored in an in-memory Map and disappear when the server restarts.

For production, configure Vercel KV or Upstash/Redis and optionally `NEXT_PUBLIC_APP_URL`.

Supported environment variable names (any of the alternatives listed will be accepted):

- Vercel KV (write access): `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `KV_URL` and `KV_TOKEN`).
- Vercel KV (read-only token): `KV_REST_API_READ_ONLY_TOKEN` (optional).
- Upstash / Redis: `UPSTASH_REST_URL` and `UPSTASH_TOKEN`, or `REDIS_URL` and `REDIS_TOKEN`.

Examples:

```
KV_REST_API_URL=https://api.vercel.com/v0/kv/... 
KV_REST_API_TOKEN=xxxx

OR

KV_URL=https://api.vercel.com/v0/kv/...
KV_TOKEN=xxxx

OR (Upstash)
UPSTASH_REST_URL=https://<id>.upstash.io
UPSTASH_TOKEN=<token>

OR
REDIS_URL=rediss://...    # optional REDIS_TOKEN if required
REDIS_TOKEN=...
```

If neither Vercel KV nor Upstash are configured, the app falls back to an in-memory store (data lost on restart).
