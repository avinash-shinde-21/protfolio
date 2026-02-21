'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = ['BUILDING', 'CREATING', 'DREAMING', 'SHIPPING', 'CRAFTING', 'EXPLORING'];

export default function Surprise() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const tickerRef = useRef(null);
    const wordRef = useRef(null);
    const wordIndex = useRef(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background morphs to midnight and back
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    scrub: 0.8,
                },
            });

            tl.to(sectionRef.current, {
                backgroundColor: '#0D0C0B',
                duration: 0.5,
                ease: 'power2.inOut',
            })
                .to(tickerRef.current, {
                    opacity: 1,
                    duration: 0.3,
                }, '<')
                .to(sectionRef.current, {
                    backgroundColor: 'var(--color-cream)',
                    duration: 0.5,
                    ease: 'power2.inOut',
                })
                .to(tickerRef.current, {
                    opacity: 0.7,
                    duration: 0.3,
                }, '<');
        }, sectionRef);

        // Word morphing
        intervalRef.current = setInterval(() => {
            if (!wordRef.current) return;
            wordIndex.current = (wordIndex.current + 1) % words.length;
            gsap.fromTo(
                wordRef.current,
                { yPercent: -50, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
            );
            wordRef.current.textContent = words[wordIndex.current];
        }, 800);

        return () => {
            ctx.revert();
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-cream)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'background 0.3s',
            }}
        >
            {/* Kinetic ticker */}
            <div
                ref={tickerRef}
                style={{
                    overflow: 'hidden',
                    width: '100%',
                    padding: '1.5rem 0',
                    borderTop: '1px solid rgba(200,191,181,0.25)',
                    borderBottom: '1px solid rgba(200,191,181,0.25)',
                    opacity: 0.6,
                }}
            >
                <div style={{
                    display: 'flex',
                    gap: 0,
                    animation: 'marquee 12s linear infinite',
                    whiteSpace: 'nowrap',
                }}>
                    {[1, 2, 3].map((i) => (
                        <span key={i} style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(3rem, 8vw, 7rem)',
                            letterSpacing: '-0.05em',
                            background: 'var(--gradient-chrome-text)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'chromaShift 4s linear infinite',
                            paddingRight: '2rem',
                        }}>
                            {'BUILDING · CREATING · EXPLORING · SHIPPING · CRAFTING · '}
                        </span>
                    ))}
                </div>
            </div>

            {/* Center morphing word */}
            <div style={{
                padding: '4rem 2rem',
                textAlign: 'center',
            }}>
                <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-warm-gray)',
                    marginBottom: '1.5rem',
                }}>
                    Always
                </p>
                <div style={{ overflow: 'hidden', height: 'clamp(4rem, 10vw, 9rem)' }}>
                    <h2
                        ref={wordRef}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(4rem, 10vw, 9rem)',
                            letterSpacing: '-0.05em',
                            lineHeight: 1,
                            color: 'var(--color-dark)',
                        }}
                    >
                        {words[0]}
                    </h2>
                </div>
            </div>

            <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
        </section>
    );
}
