import { NextResponse } from "next/server"; import { getLetterMetadata } from "@/lib/letter-service";
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const l=await getLetterMetadata(id);return l?NextResponse.json(l):NextResponse.json({error:"Letter not found"},{status:404})}
