import { randomUUID } from "crypto";
import { hashPassword,verifyPassword } from "./password";
import { getLetter,saveLetter } from "./letters";
import { MAX_BODY_LENGTH,MAX_NAME_LENGTH,type CreateLetterInput,type LetterMetadata,type UnlockedLetter } from "./types";
const cleanName=(v?:string)=>v?.trim().slice(0,MAX_NAME_LENGTH)||undefined;
export async function createLetter(input:CreateLetterInput){const body=input.body?.trim()||"";if(!body) throw new Error("Please write something in your letter.");if(body.length>MAX_BODY_LENGTH) throw new Error("Letter is too long.");const id=randomUUID();const letter={id,toName:cleanName(input.toName),fromName:cleanName(input.fromName),body,passwordHash:input.password?await hashPassword(input.password):undefined,sealed:true,createdAt:new Date().toISOString()};await saveLetter(letter);const base=process.env.NEXT_PUBLIC_APP_URL||"http://localhost:3000";return {letter,shareUrl:`${base}/letter/${id}`}}
export async function getLetterMetadata(id:string):Promise<LetterMetadata|null>{const l=await getLetter(id);if(!l||!l.sealed)return null;return {id:l.id,toName:l.toName,fromName:l.fromName,hasPassword:!!l.passwordHash,sealed:l.sealed,createdAt:l.createdAt}}
export async function unlockLetter(id:string,password?:string):Promise<UnlockedLetter|null>{const l=await getLetter(id);if(!l||!l.sealed)return null;if(l.passwordHash&&!(password&&await verifyPassword(password,l.passwordHash)))return null;return {body:l.body,toName:l.toName,fromName:l.fromName}}
