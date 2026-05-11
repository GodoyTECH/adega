import { SignJWT, jwtVerify } from 'jose';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (secret) {
    return new TextEncoder().encode(secret);
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET não configurado em produção');
  }

  return new TextEncoder().encode('dev-secret');
}

export async function signAuth(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('12h')
    .sign(getJwtSecret());
}

export async function verifyAuth(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecret());
  return payload;
}
