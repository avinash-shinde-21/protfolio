'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isLink = el?.closest('a, button, [data-cursor="pointer"]');
      setIsPointer(!!isLink);
    };

    const loop = () => {
      if (!cursorRef.current || !ringRef.current) { raf.current = requestAnimationFrame(loop); return; }
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isPointer ? '8px' : '6px',
          height: isPointer ? '8px' : '6px',
          borderRadius: '50%',
          background: 'var(--color-pearl)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s, height 0.2s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          borderRadius: '50%',
          border: '1px solid rgba(248,245,240,0.5)',
          background: isPointer ? 'rgba(248,245,240,0.1)' : 'transparent',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.25s var(--ease-out-expo), height 0.25s var(--ease-out-expo), background 0.2s',
          willChange: 'transform',
          backdropFilter: isPointer ? 'blur(4px)' : 'none',
        }}
      />
    </>
  );
}
