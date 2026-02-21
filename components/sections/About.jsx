'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import personal from '@/data/personal.json';

gsap.registerPlugin(ScrollTrigger);

const marqueeText = '✦ Available for Freelance  ✦ Open to Work  ✦ Creative Developer  ✦ Global / Remote  ✦ Let\'s Collaborate  ';

export default function About() {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const numberRef = useRef(null);
    const bgTextRef = useRef(null);
    const imageContainerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Card floating entrance
            gsap.fromTo(cardRef.current,
                { y: 150, opacity: 0, rotateX: 20 },
                {
                    y: 0, opacity: 1, rotateX: 0,
                    duration: 1.5,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 90%',
                    }
                }
            );

            // Number count up
            gsap.fromTo({ val: 0 },
                { val: 0 },
                {
                    val: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    snap: { val: 1 },
                    scrollTrigger: { trigger: numberRef.current, start: 'top 85%' },
                    onUpdate: function () {
                        if (numberRef.current) numberRef.current.textContent = Math.round(this.targets()[0].val) + '+';
                    }
                }
            );

            // Image Sculpture Parallax
            const images = imageContainerRef.current.querySelectorAll('.sculpture-img');
            images.forEach((img, i) => {
                gsap.to(img, {
                    y: (i + 1) * -40,
                    rotation: (i === 1 ? -3 : 3),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: i + 1,
                    }
                });
            });

            // BG Text drift
            gsap.to(bgTextRef.current, {
                x: -200,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{
                padding: 'var(--space-2xl) 2rem',
                minHeight: '130vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--color-pearl)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Decorative Text */}
            <div
                ref={bgTextRef}
                style={{
                    position: 'absolute',
                    top: '15%',
                    left: '50%',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '25vw',
                    color: 'rgba(26,23,20,0.025)',
                    zIndex: 0,
                    pointerEvents: 'none',
                    lineHeight: 1,
                }}
            >
                ESTABLISHED 2026
            </div>

            <div style={{ width: '100%', maxWidth: '1300px', position: 'relative', zIndex: 1 }}>
                <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'var(--color-warm-gray)',
                    marginBottom: '5rem',
                    textAlign: 'center'
                }}>
                    01 / STORY
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(400px, 1.2fr) 1fr',
                    gap: '6rem',
                    alignItems: 'center',
                }}>
                    {/* Left: Glass Card */}
                    <div
                        ref={cardRef}
                        style={{
                            background: 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255, 255, 255, 0.8)',
                            borderRadius: '32px',
                            padding: '4rem',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.03)',
                            position: 'relative',
                            zIndex: 10,
                        }}
                    >
                        {/* Overlapping Number */}
                        <div
                            ref={numberRef}
                            style={{
                                position: 'absolute',
                                top: '-2.5rem',
                                left: '3rem',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: '10rem',
                                letterSpacing: '-0.08em',
                                color: 'var(--color-dark)',
                                lineHeight: 1,
                                textShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            }}
                        >
                            1
                        </div>

                        <div style={{ marginTop: '5rem' }}>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                                color: 'var(--color-dark)',
                                letterSpacing: '-0.04em',
                                marginBottom: '2.2rem',
                                lineHeight: 0.9
                            }}>
                                Year of Focused <br />
                                <span className="chrome-text">Mastery.</span>
                            </h2>

                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontWeight: 400,
                                fontSize: '1.05rem',
                                lineHeight: 1.75,
                                color: 'var(--color-dark)',
                                opacity: 0.8,
                                marginBottom: '2.5rem'
                            }}>
                                {personal.bio}
                            </p>

                            {/* Stats Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '2.5rem',
                                borderTop: '1px solid rgba(26,23,20,0.1)',
                                paddingTop: '2.5rem'
                            }}>
                                {[
                                    { label: 'Built Projects', val: '03' },
                                    { label: 'Live Internship', val: '01' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div style={{
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: 800,
                                            fontSize: '2.8rem',
                                            color: 'var(--color-dark)',
                                            marginBottom: '0.2rem',
                                            letterSpacing: '-0.04em'
                                        }}>{stat.val}</div>
                                        <div style={{
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: 600,
                                            fontSize: '0.65rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.12em',
                                            color: 'var(--color-mid-gray)'
                                        }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Dynamic Image Sculpture (High Impact) */}
                    <div
                        ref={imageContainerRef}
                        style={{
                            position: 'relative',
                            height: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Main Image Layer */}
                        <div
                            className="sculpture-img"
                            style={{
                                width: '100%',
                                aspectRatio: '1',
                                background: 'var(--gradient-chrome)',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                position: 'absolute',
                                zIndex: 2,
                                boxShadow: '0 30px 80px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <span style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 900,
                                fontSize: '4rem',
                                color: 'rgba(255,255,255,0.2)',
                                textAlign: 'center',
                                lineHeight: 0.85
                            }}>CRAFT<br />PURE</span>
                        </div>

                        {/* Secondary Floating Layer */}
                        <div
                            className="sculpture-img"
                            style={{
                                width: '85%',
                                aspectRatio: '1',
                                border: '1px solid var(--color-warm-gray)',
                                background: 'var(--color-pearl)',
                                borderRadius: '24px',
                                position: 'absolute',
                                top: '10%',
                                right: '-10%',
                                zIndex: 1,
                                opacity: 0.5,
                            }}
                        />

                        {/* Text Accent Layer */}
                        <div
                            className="sculpture-img"
                            style={{
                                position: 'absolute',
                                left: '-15%',
                                bottom: '5%',
                                zIndex: 3,
                            }}
                        >
                            <p style={{
                                fontFamily: 'var(--font-serif)',
                                fontStyle: 'italic',
                                fontSize: '2.5rem',
                                color: 'var(--color-dark)',
                                textShadow: '0 5px 15px rgba(255,255,255,0.8)'
                            }}>
                                Beyond Code.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee */}
            <div style={{
                position: 'absolute',
                bottom: '4rem',
                width: '100%',
                borderTop: '1px solid rgba(26,23,20,0.05)',
                borderBottom: '1px solid rgba(26,23,20,0.05)',
                padding: '1.2rem 0',
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(12px)',
            }}>
                <div style={{
                    display: 'flex',
                    animation: 'marquee 30s linear infinite',
                    whiteSpace: 'nowrap',
                }}>
                    {[1, 2, 3, 4].map((i) => (
                        <span key={i} style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-warm-gray)',
                            paddingRight: '6rem',
                        }}>
                            {marqueeText}
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-25%); }
                }
            `}</style>
        </section>
    );
}
