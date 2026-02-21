'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import experience from '@/data/experience.json';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Draw the accent line
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 2,
                    ease: 'power3.inOut',
                    transformOrigin: 'top center',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'bottom 80%',
                        scrub: 0.5,
                    },
                }
            );

            // Each experience item
            itemsRef.current.forEach((el, i) => {
                if (!el) return;
                const company = el.querySelector('.exp-company');
                const details = el.querySelector('.exp-details');
                gsap.fromTo(company,
                    { x: -60, opacity: 0 },
                    {
                        x: 0, opacity: 1,
                        duration: 1, ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                );
                gsap.fromTo(details,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.8, ease: 'power3.out',
                        delay: 0.2,
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            style={{
                background: 'var(--color-pearl)',
                padding: 'var(--space-2xl) 0',
                minHeight: '120vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background text watermark */}
            <div aria-hidden style={{
                position: 'absolute',
                top: '50%',
                right: '-2rem',
                transform: 'translateY(-50%) rotate(90deg)',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(4rem, 10vw, 10rem)',
                color: 'rgba(26,23,20,0.04)',
                letterSpacing: '-0.04em',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                pointerEvents: 'none',
            }}>
                EXPERIENCE
            </div>

            <div style={{ padding: '0 3rem', maxWidth: '1100px', margin: '0 auto' }}>
                <p style={{
                    fontFamily: 'var(--font-display)', fontWeight: 500,
                    fontSize: 'var(--text-xs)', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'var(--color-warm-gray)',
                    marginBottom: '3rem',
                }}>
                    04 / Experience
                </p>

                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'var(--text-2xl)',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.95,
                    color: 'var(--color-dark)',
                    marginBottom: '5rem',
                }}>
                    Where I've<br />
                    <span style={{ color: 'var(--color-warm-gray)' }}>Made Impact.</span>
                </h2>

                {/* Timeline */}
                <div style={{ position: 'relative', display: 'flex', gap: '4rem' }}>
                    {/* Vertical accent line */}
                    <div style={{
                        position: 'relative',
                        width: '1px',
                        flexShrink: 0,
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '1px',
                            height: '100%',
                            background: 'var(--color-sand)',
                        }} />
                        <div
                            ref={lineRef}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '1px',
                                height: '100%',
                                background: 'var(--color-dark)',
                                transformOrigin: 'top',
                            }}
                        />
                    </div>

                    {/* Entries */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', flex: 1 }}>
                        {experience.map((exp, i) => (
                            <div
                                key={i}
                                ref={(el) => (itemsRef.current[i] = el)}
                                style={{ position: 'relative' }}
                            >
                                {/* Dot on timeline */}
                                <div style={{
                                    position: 'absolute',
                                    left: 'calc(-4rem - 4px)',
                                    top: '0.8rem',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: 'var(--color-dark)',
                                    border: '2px solid var(--color-pearl)',
                                    boxShadow: '0 0 0 1px var(--color-dark)',
                                }} />

                                <div className="exp-company" style={{ overflow: 'hidden' }}>
                                    <h3 style={{
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 800,
                                        fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                                        letterSpacing: '-0.04em',
                                        lineHeight: 0.9,
                                        color: 'var(--color-dark)',
                                        marginBottom: '0.75rem',
                                    }}>
                                        {exp.company}
                                    </h3>
                                </div>

                                <div className="exp-details">
                                    <div style={{
                                        display: 'flex',
                                        gap: '1.5rem',
                                        alignItems: 'center',
                                        marginBottom: '0.8rem',
                                        flexWrap: 'wrap',
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-serif)',
                                            fontStyle: 'italic',
                                            fontSize: 'var(--text-m)',
                                            color: 'var(--color-mid-gray)',
                                        }}>
                                            {exp.role}
                                        </span>
                                        <span style={{
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: 500,
                                            fontSize: 'var(--text-xs)',
                                            letterSpacing: '0.08em',
                                            color: 'var(--color-warm-gray)',
                                            background: 'var(--color-cream)',
                                            padding: '0.2rem 0.75rem',
                                            borderRadius: '100px',
                                        }}>
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p style={{
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 300,
                                        fontSize: 'var(--text-s)',
                                        lineHeight: 1.7,
                                        color: 'var(--color-mid-gray)',
                                        maxWidth: '580px',
                                    }}>
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
