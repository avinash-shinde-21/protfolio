'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skills from '@/data/skills.json';

gsap.registerPlugin(ScrollTrigger);

const allSkills = skills.flatMap((g) => g.items);

export default function Skills() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const blobRef1 = useRef(null);
    const blobRef2 = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background color shift - subtle cream
            gsap.to(sectionRef.current, {
                backgroundColor: '#F2EDE6',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                }
            });

            // Blob floating animation
            gsap.to([blobRef1.current, blobRef2.current], {
                x: 'random(-100, 100)',
                y: 'random(-100, 100)',
                duration: 'random(10, 20)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: 2
            });

            // Parallax items within the flex flow
            const items = containerRef.current.querySelectorAll('.skill-item');
            items.forEach((item, i) => {
                const depth = 0.4 + (i % 3) * 0.4;
                gsap.fromTo(item,
                    { y: 60 * depth, opacity: 0 },
                    {
                        y: -60 * depth,
                        opacity: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        }
                    }
                );
            });
        }, sectionRef);

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            gsap.to(blobRef1.current, {
                x: (clientX - window.innerWidth / 2) * 0.05,
                y: (clientY - window.innerHeight / 2) * 0.05,
                duration: 2,
                ease: 'power2.out'
            });
            gsap.to(blobRef2.current, {
                x: (clientX - window.innerWidth / 2) * -0.05,
                y: (clientY - window.innerHeight / 2) * -0.05,
                duration: 2.5,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            style={{
                background: 'var(--color-pearl)',
                minHeight: '120vh',
                position: 'relative',
                overflow: 'hidden',
                padding: '10rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Liquid Background Blobs */}
            <div
                ref={blobRef1}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '50vw',
                    height: '50vw',
                    background: 'var(--gradient-chrome)',
                    filter: 'blur(140px)',
                    opacity: 0.15,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            <div
                ref={blobRef2}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    width: '45vw',
                    height: '45vw',
                    background: 'var(--gradient-chrome)',
                    filter: 'blur(120px)',
                    opacity: 0.12,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '8rem', padding: '0 2rem' }}>
                <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--color-mid-gray)',
                    marginBottom: '1rem'
                }}>02 / The Tech Stack</p>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(3rem, 9vw, 8rem)',
                    letterSpacing: '-0.06em',
                    lineHeight: 0.9,
                    color: 'var(--color-dark)',
                    textTransform: 'uppercase',
                }}>
                    The Art of<br />
                    <span className="chrome-text">Crafting.</span>
                </h2>
            </div>

            {/* Structured Flex Field with Solid Black Text */}
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    maxWidth: '1600px',
                    padding: '0 4rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2.5rem 4rem',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                {allSkills.map((skill, i) => (
                    <div
                        key={skill.name}
                        className="skill-item"
                        style={{
                            display: 'inline-block',
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: `clamp(1.8rem, ${3 + (i % 3)}vw, 6rem)`,
                                letterSpacing: '-0.04em',
                                color: '#000000', // Pure black for max visibility
                                whiteSpace: 'nowrap',
                                cursor: 'none',
                                transition: 'transform 0.5s var(--ease-out-expo), color 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4em',
                                padding: '1rem 0',
                            }}
                            data-cursor="pointer"
                            onMouseEnter={(e) => {
                                const inner = e.currentTarget;
                                inner.style.transform = 'scale(1.1) translateY(-5px)';
                                inner.classList.add('chrome-text');
                            }}
                            onMouseLeave={(e) => {
                                const inner = e.currentTarget;
                                inner.style.transform = 'scale(1) translateY(0px)';
                                inner.classList.remove('chrome-text');
                            }}
                        >
                            <span style={{
                                fontSize: '0.45em',
                                opacity: 0.5,
                                fontFamily: 'monospace',
                                border: '1px solid rgba(0,0,0,0.1)',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                color: '#000'
                            }}>{skill.icon}</span>
                            {skill.name}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '12rem',
                opacity: 0.25,
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'var(--text-l)',
                position: 'relative',
                zIndex: 1,
            }}>
                & refining the digital edge.
            </div>
        </section>
    );
}
