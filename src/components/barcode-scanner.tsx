'use client';
import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

export function BarcodeScanner({ onDetected }: { onDetected: (code: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let stop = () => {};

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) videoRef.current.srcObject = stream;
        stop = () => stream.getTracks().forEach((t) => t.stop());

        if ('BarcodeDetector' in window) {
          // @ts-ignore
          const detector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'code_128', 'upc_a'] });
          const loop = async () => {
            if (!videoRef.current) return;
            try {
              const rs = await detector.detect(videoRef.current);
              if (rs[0]?.rawValue) {
                onDetected(rs[0].rawValue);
                stop();
                return;
              }
            } catch {}
            requestAnimationFrame(loop);
          };
          loop();
        } else {
          const reader = new BrowserMultiFormatReader();
          const controls = await reader.decodeFromVideoDevice(undefined, videoRef.current!, (result) => {
            if (result) {
              onDetected(result.getText());
              controls.stop();
              stop();
            }
          });
        }
      } catch {
        setError('Não foi possível acessar a câmera. Digite o código ou busque pelo nome.');
      }
    })();

    return () => stop();
  }, [onDetected]);

  return (
    <div>
      {error ? <p className='text-red-400'>{error}</p> : <video ref={videoRef} autoPlay playsInline className='w-full rounded-xl' />}
    </div>
  );
}
