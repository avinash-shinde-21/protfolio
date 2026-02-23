'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

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
                padding: '1.5rem 5vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(248,245,240,0.6)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)'
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

            <nav style={{ display: 'flex', gap: isMobile ? '1rem' : '2.5rem', alignItems: 'center' }}>
                {!isMobile && links.map((l) => (
                    <a
                        key={l.label}
                        href={l.href}
                        data-cursor="pointer"
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--color-mid-gray)',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = 'var(--color-dark)')}
                        onMouseLeave={(e) => (e.target.style.color = 'var(--color-mid-gray)')}
                    >
                        {l.label}
                    </a>
                ))}
                <a
                    href="/assets/Avinash_Shinde_Resume.pdf"
                    data-cursor="pointer"
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--color-pearl)',
                        background: 'var(--color-dark)',
                        padding: '0.7rem 1.6rem',
                        borderRadius: '100px',
                        transition: 'background 0.3s ease, transform 0.3s ease, color 0.3s ease',
                        boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'var(--color-mid-gray)';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'var(--color-dark)';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    Résumé
                </a>
            </nav>
        </motion.header>
    );
}
