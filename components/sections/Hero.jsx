'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import personal from '@/data/personal.json';

const ChromeOrb = dynamic(() => import('@/components/three/ChromeOrb'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const scrollProgress = useRef(0);
    const heroRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const subRef = useRef(null);
    const scrollLineRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Split name animation - 2 distinct lines
            const tl = gsap.timeline({ delay: 0.4 });

            tl.fromTo(firstNameRef.current,
                { y: 150, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' }
            );

            tl.fromTo(lastNameRef.current,
                { y: 150, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' },
                "-=1.1"
            );

            gsap.fromTo(
                subRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.2 }
            );

            gsap.fromTo(
                scrollLineRef.current,
                { scaleY: 0, opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.8, transformOrigin: 'top' }
            );

            // Scroll reactive effects
            ScrollTrigger.create({
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                onUpdate: (self) => {
                    scrollProgress.current = self.progress;
                    // Scale name slightly on scroll
                    if (firstNameRef.current) firstNameRef.current.style.transform = `scale(${1 - self.progress * 0.1})`;
                    if (lastNameRef.current) lastNameRef.current.style.transform = `scale(${1 - self.progress * 0.1})`;
                },
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const [firstName, lastName] = personal.fullName.split(' ');

    return (
        <section
            id="hero"
            ref={heroRef}
            style={{
                position: 'relative',
                minHeight: '120svh', // Increased height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--gradient-hero-bg)',
                overflow: 'hidden',
                paddingTop: '8rem',
            }}
        >
            {/* Dynamic Background Accents */}
            <div aria-hidden style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle, rgba(212,201,219,0.15) 0%, transparent 60%)',
                filter: 'blur(80px)',
                zIndex: 0,
            }} />

            {/* Three.js Orb */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                {!isMobile && <ChromeOrb scrollProgress={scrollProgress} />}
            </div>

            <div style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {/* Availability label */}
                <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--color-mid-gray)',
                    marginBottom: '3rem',
                }}>
                    {personal.availability} · GLOBAL
                </p>

                {/* 2-Line Kinetic Typography Name */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    lineHeight: 0.8,
                    marginBottom: '4rem',
                    width: '100%',
                }}>
                    <h1
                        ref={firstNameRef}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(3rem, 12vw, 15rem)',
                            letterSpacing: '-0.06em',
                            color: 'var(--color-dark)',
                            textTransform: 'uppercase',
                            willChange: 'transform, opacity',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {firstName}
                    </h1>
                    <h1
                        ref={lastNameRef}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(3rem, 12vw, 15rem)',
                            letterSpacing: '-0.06em',
                            color: 'transparent',
                            WebkitTextStroke: '2px var(--color-dark)',
                            textTransform: 'uppercase',
                            marginTop: '-1.5vw', // Reduced overlap
                            willChange: 'transform, opacity',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {lastName}
                    </h1>
                </div>

                {/* Tagline & Roles */}
                <div ref={subRef} style={{ opacity: 0, maxWidth: '800px', padding: '0 2rem' }}>
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: 'var(--text-xl)',
                        color: 'var(--color-dark)',
                        lineHeight: 1.1,
                        marginBottom: '4rem',
                    }}>
                        {personal.tagline}
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {personal.heroWords.map((w) => (
                            <span key={w} style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                padding: '0.6rem 1.5rem',
                                border: '1px solid var(--color-warm-gray)',
                                borderRadius: '100px',
                                color: 'var(--color-dark)',
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                            }}>
                                {w}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '4rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                zIndex: 2,
            }}>
                <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-mid-gray)',
                }}>Explore</span>
                <div
                    ref={scrollLineRef}
                    className="scroll-line"
                    style={{ height: '80px', background: 'var(--color-dark)' }}
                />
            </div>
        </section>
    );
}
