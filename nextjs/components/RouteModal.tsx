'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

export default function RouteModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const background = useRef<HTMLDivElement>(null);

  // Disable body scroll while modal is open, and re-enable when modal is closed
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [router]);

  return (
    <div
      ref={background}
      style={{
        zIndex: 10,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={(e) => {
        if (e.target === background.current) {
          router.back();
        }
      }}
    >
      {children}
    </div>
  );
}
