import { SignJWT, jwtVerify } from 'jose';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
export async function signAuth(payload: Record<string, unknown>){return await new SignJWT(payload).setProtectedHeader({alg:'HS256'}).setExpirationTime('12h').sign(secret)}
export async function verifyAuth(token:string){const {payload}=await jwtVerify(token,secret);return payload;}
