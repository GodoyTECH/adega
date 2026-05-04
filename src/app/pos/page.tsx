'use client';
import { useState } from 'react';
import { BarcodeScanner } from '@/components/barcode-scanner';
export default function PosPage(){
  const [scan,setScan]=useState(false); const [code,setCode]=useState('');
  return <main className='p-6 space-y-4'><h1 className='text-2xl font-bold'>PDV</h1><button className='px-4 py-2 rounded bg-emerald-600' onClick={()=>setScan(s=>!s)}>Escanear com câmera</button>
  <input className='w-full p-2 rounded bg-slate-800' placeholder='Código de barras manual' value={code} onChange={e=>setCode(e.target.value)} />
  {scan && <BarcodeScanner onDetected={(v)=>{setCode(v);setScan(false);}}/>}
  <p>Código lido: {code||'-'}</p></main>
}
