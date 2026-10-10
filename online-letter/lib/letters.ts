import { kv } from "@vercel/kv";
import { Redis } from "@upstash/redis";
import type { Letter } from "./types";

const memory = new Map<string, Letter>();

// Support multiple env var names provided by user:
// Vercel KV: `KV_REST_API_URL`, `KV_REST_API_TOKEN`, optional read-only token `KV_REST_API_READ_ONLY_TOKEN`,
// or alternative `KV_URL` and `KV_TOKEN`.
const kvUrl = process.env.KV_REST_API_URL ?? process.env.KV_URL;
const kvToken = process.env.KV_REST_API_TOKEN ?? process.env.KV_TOKEN;
const useKV = !!kvUrl && !!kvToken;

// Upstash / Redis: prefer `UPSTASH_REST_URL` + `UPSTASH_TOKEN`, but also accept `REDIS_URL` (+ optional `REDIS_TOKEN`).
const upstashUrl = process.env.UPSTASH_REST_URL ?? process.env.REDIS_URL;
const upstashToken = process.env.UPSTASH_TOKEN ?? process.env.REDIS_TOKEN;
const useUpstash = !!upstashUrl && !!upstashToken;
const upstash = useUpstash ? new Redis({ url: upstashUrl!, token: upstashToken! }) : null;

const key = (id: string) => `letter:${id}`;

export async function saveLetter(letter: Letter) {
	memory.set(letter.id, letter);

	if (useKV) {
		try {
			await kv.set(key(letter.id), letter);
			return;
		} catch (error) {
			console.warn("Vercel KV save failed; using in-memory fallback.", error);
		}
	}

	if (useUpstash && upstash) {
		try {
			await upstash.set(key(letter.id), JSON.stringify(letter));
			return;
		} catch (error) {
			console.warn("Upstash save failed; using in-memory fallback.", error);
		}
	}
}

export async function getLetter(id: string) {
	const fallback = memory.get(id);

	if (useKV) {
		try {
			const letter = await kv.get<Letter>(key(id));
			if (letter) {
				memory.set(id, letter);
				return letter;
			}
			return fallback;
		} catch (error) {
			console.warn("Vercel KV read failed; using in-memory fallback.", error);
			return fallback;
		}
	}

	if (useUpstash && upstash) {
		try {
			const res = await upstash.get<string>(key(id));
			if (res) {
				const letter = JSON.parse(res) as Letter;
				memory.set(id, letter);
				return letter;
			}
			return fallback;
		} catch (error) {
			console.warn("Upstash read failed; using in-memory fallback.", error);
			return fallback;
		}
	}

	return fallback;
}
