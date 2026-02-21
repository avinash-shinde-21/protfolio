'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const handler = () => {
            const y = window.scrollY;
            setHidden(y > lastY.current && y > 120);
            lastY.current = y;
        };
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '1.5rem 3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(248,245,240,0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(200,191,181,0.3)',
            }}
        >
            <a
                href="#hero"
                style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-dark)',
                }}
                data-cursor="pointer"
            >
                AS<span style={{ color: 'var(--color-warm-gray)' }}>.</span>
            </a>

            <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                {links.map((l) => (
                    <a
                        key={l.label}
                        href={l.href}
                        data-cursor="pointer"
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 500,
                            fontSize: '0.8rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--color-mid-gray)',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = 'var(--color-dark)')}
                        onMouseLeave={(e) => (e.target.style.color = 'var(--color-mid-gray)')}
                    >
                        {l.label}
                    </a>
                ))}
                <a
                    href="/resume.pdf"
                    data-cursor="pointer"
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--color-pearl)',
                        background: 'var(--color-dark)',
                        padding: '0.5rem 1.2rem',
                        borderRadius: '100px',
                        transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'var(--color-mid-gray)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'var(--color-dark)';
                    }}
                >
                    Résumé
                </a>
            </nav>
        </motion.header>
    );
}
