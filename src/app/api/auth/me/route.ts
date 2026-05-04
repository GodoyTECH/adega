import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
export async function GET(req:Request){
  const c=req.headers.get('cookie')||''; const m=/auth_token=([^;]+)/.exec(c); if(!m) return NextResponse.json({user:null});
  try{return NextResponse.json({user:await verifyAuth(m[1])});}catch{return NextResponse.json({user:null});}
}
