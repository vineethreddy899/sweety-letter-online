import { kv } from "@vercel/kv";
import type { Letter } from "./types";
const memory=new Map<string,Letter>();
const useKV=!!process.env.KV_REST_API_URL&&!!process.env.KV_REST_API_TOKEN;
const key=(id:string)=>`letter:${id}`;
export async function saveLetter(letter:Letter){if(useKV) await kv.set(key(letter.id),letter); else memory.set(letter.id,letter)}
export async function getLetter(id:string){return useKV?await kv.get<Letter>(key(id)):memory.get(id)}
