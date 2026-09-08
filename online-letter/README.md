# Online Letter

A romantic letter-sharing app built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, bcryptjs and Vercel KV.

## Local

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without KV environment variables, letters are stored in an in-memory Map and disappear when the server restarts.

For production, configure `KV_REST_API_URL` and `KV_REST_API_TOKEN` and optionally `NEXT_PUBLIC_APP_URL`.
