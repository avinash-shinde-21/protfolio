'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import contact from '@/data/contact.json';

gsap.registerPlugin(ScrollTrigger);

function MagneticLink({ children, href, style }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 20 });
    const springY = useSpring(y, { stiffness: 200, damping: 20 });

    const handleMouse = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * 0.4);
        y.set((e.clientY - cy) * 0.4);
    };
    const reset = () => { x.set(0); y.set(0); };

    return (
        <motion.a
            ref={ref}
            href={href}
            style={{ x: springX, y: springY, display: 'inline-block', ...style }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            data-cursor="pointer"
        >
            {children}
        </motion.a>
    );
}

export default function Contact() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const subRef = useRef(null);
    const emailRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const chars = headingRef.current?.querySelectorAll('.cta-word');
            if (chars) {
                gsap.fromTo(chars,
                    { yPercent: 110, opacity: 0 },
                    {
                        yPercent: 0, opacity: 1,
                        duration: 1.1, ease: 'power4.out', stagger: 0.08,
                        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
                    }
                );
            }
            gsap.fromTo(subRef.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3,
                    scrollTrigger: { trigger: subRef.current, start: 'top 88%' }
                }
            );
            gsap.fromTo(emailRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5,
                    scrollTrigger: { trigger: emailRef.current, start: 'top 90%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const words = contact.cta.split(' ');

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{
                background: 'var(--color-dark)',
                padding: 'var(--space-2xl) 3rem var(--space-l)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            {/* Background chrome circle accent */}
            <div aria-hidden style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-5%',
                width: 'clamp(200px, 40vw, 500px)',
                height: 'clamp(200px, 40vw, 500px)',
                borderRadius: '50%',
                background: 'var(--gradient-chrome)',
                opacity: 0.06,
                filter: 'blur(60px)',
                pointerEvents: 'none',
            }} />

            {/* Grain on dark bg */}
            <div aria-hidden style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
                opacity: 0.5,
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1200px', position: 'relative', zIndex: 2 }}>
                <p style={{
                    fontFamily: 'var(--font-display)', fontWeight: 500,
                    fontSize: 'var(--text-xs)', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(200,191,181,0.5)',
                    marginBottom: '3rem',
                }}>
                    06 / Contact
                </p>

                {/* Giant CTA */}
                <div ref={headingRef} style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 'var(--text-xl)', // Reduced from hero for visibility
                        letterSpacing: '-0.05em',
                        lineHeight: 0.95,
                        color: 'var(--color-pearl)',
                        maxWidth: '900px',
                    }}>
                        {words.map((word, i) => (
                            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
                                <span
                                    className="cta-word"
                                    style={{
                                        display: 'inline-block',
                                        color: i === words.length - 1 ? 'transparent' : 'var(--color-pearl)',
                                        background: i === words.length - 1 ? 'var(--gradient-chrome-text)' : 'none',
                                        backgroundSize: i === words.length - 1 ? '200% auto' : 'auto',
                                        WebkitBackgroundClip: i === words.length - 1 ? 'text' : 'initial',
                                        backgroundClip: i === words.length - 1 ? 'text' : 'initial',
                                        WebkitTextFillColor: i === words.length - 1 ? 'transparent' : 'var(--color-pearl)',
                                        animation: i === words.length - 1 ? 'chromaShift 4s linear infinite' : 'none',
                                    }}
                                >
                                    {word}
                                </span>
                            </span>
                        ))}
                    </h2>
                </div>

                <div ref={subRef} style={{ opacity: 0 }}>
                    <p style={{
                        fontFamily: 'var(--font-body)', fontWeight: 300,
                        fontSize: 'var(--text-m)', color: 'rgba(200,191,181,0.7)',
                        marginBottom: '2.5rem', maxWidth: '500px',
                    }}>
                        {contact.sub}
                    </p>
                </div>

                {/* Magnetic email */}
                <div ref={emailRef} style={{ opacity: 0, marginBottom: '4rem' }}>
                    <MagneticLink
                        href={`mailto:${contact.email}`}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: 'clamp(1.2rem, 3vw, 2.5rem)',
                            letterSpacing: '-0.02em',
                            color: 'var(--color-pearl)',
                            borderBottom: '1px solid rgba(248,245,240,0.3)',
                            paddingBottom: '4px',
                            transition: 'border-color 0.2s',
                        }}
                    >
                        {contact.email} →
                    </MagneticLink>
                </div>

                {/* Social links */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '5rem',
                }}>
                    {Object.entries(contact.social).map(([platform, url]) => (
                        <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="pointer"
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'rgba(200,191,181,0.5)',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = 'var(--color-pearl)')}
                            onMouseLeave={(e) => (e.target.style.color = 'rgba(200,191,181,0.5)')}
                        >
                            {platform}
                        </a>
                    ))}
                </div>

                {/* Footer bar */}
                <div style={{
                    borderTop: '1px solid rgba(200,191,181,0.15)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color: 'rgba(200,191,181,0.35)',
                        letterSpacing: '0.04em',
                    }}>
                        {contact.footerCredit}
                    </p>
                    <p style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(200,191,181,0.35)',
                    }}>
                        AS
                    </p>
                </div>
            </div>
        </section>
    );
}
