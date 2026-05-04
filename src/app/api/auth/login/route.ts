import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { signAuth } from '@/lib/auth';
import { getPrisma } from '@/lib/prisma';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user || !user.active) return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });

    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });

    const token = await signAuth({ sub: user.id, role: user.role, name: user.name, email: user.email });
    const res = NextResponse.json({ user: { id: user.id, name: user.name, role: user.role, email: user.email } });
    res.cookies.set('auth_token', token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });
    return res;
  } catch {
    return NextResponse.json({ error: 'Erro no login' }, { status: 400 });
  }
}
