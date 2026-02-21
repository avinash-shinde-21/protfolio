'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import projects from '@/data/projects.json';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }) {
    return (
        <div
            style={{
                minWidth: 'clamp(320px, 70vw, 700px)',
                height: '75vh',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
                background: project.color,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '4rem 3rem 4rem',
                cursor: 'none',
            }}
            data-cursor="pointer"
        >
            {/* Chrome shimmer */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%, rgba(255,255,255,0.05) 100%)',
                pointerEvents: 'none',
            }} />

            {/* Index */}
            <span style={{
                position: 'absolute',
                top: '2.5rem',
                right: '2.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                lineHeight: 1,
                color: 'rgba(26,23,20,0.07)',
                letterSpacing: '-0.04em',
                userSelect: 'none',
            }}>
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Year + Tags top-left */}
            <div style={{
                position: 'absolute',
                top: '2.5rem',
                left: '2.5rem',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
            }}>
                <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: project.accent,
                    background: `${project.accent}18`,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    border: `1px solid ${project.accent}30`,
                }}>
                    {project.year}
                </span>
                {project.tags.map((t) => (
                    <span key={t} style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--color-mid-gray)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '100px',
                        border: '1px solid rgba(138,130,120,0.25)',
                    }}>
                        {t}
                    </span>
                ))}
            </div>

            {/* Content bottom */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    color: 'var(--color-dark)',
                    marginBottom: '1rem',
                }}>
                    {project.title}
                </h3>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: 'var(--text-m)',
                    color: project.accent,
                    marginBottom: '0.5rem',
                }}>
                    {project.tagline}
                </p>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: 'var(--text-s)',
                    color: 'var(--color-mid-gray)',
                    maxWidth: '480px',
                    lineHeight: 1.6,
                }}>
                    {project.description}
                </p>
            </div>

            {/* Arrow link */}
            <a
                href={project.link}
                data-cursor="pointer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-dark)',
                    borderBottom: '1px solid var(--color-dark)',
                    paddingBottom: '2px',
                }}
            >
                View Project <span>→</span>
            </a>
        </div>
    );
}

// Mobile swipeable carousel
function MobileCarousel() {
    const [active, setActive] = useState(0);
    return (
        <div style={{ padding: '3rem 1.5rem' }}>
            <div style={{ overflow: 'hidden' }}>
                <motion.div
                    style={{ display: 'flex', gap: '1.5rem' }}
                    drag="x"
                    dragConstraints={{ left: -(projects.length - 1) * 300, right: 0 }}
                    onDragEnd={(e, { offset }) => {
                        if (offset.x < -50 && active < projects.length - 1) setActive((p) => p + 1);
                        if (offset.x > 50 && active > 0) setActive((p) => p - 1);
                    }}
                >
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.id}
                            animate={{ scale: i === active ? 1 : 0.9, opacity: i === active ? 1 : 0.6 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                minWidth: '80vw',
                                height: '60vh',
                                borderRadius: '12px',
                                background: p.color,
                                flexShrink: 0,
                                padding: '3rem 2rem 3rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{
                                position: 'absolute', top: '1.5rem', left: '1.5rem',
                                display: 'flex', gap: '0.4rem', flexWrap: 'wrap', maxWidth: 'calc(100% - 3rem)'
                            }}>
                                <span style={{
                                    fontFamily: 'var(--font-display)', fontWeight: 600,
                                    fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                                    color: p.accent, background: `${p.accent}18`,
                                    padding: '0.2rem 0.6rem', borderRadius: '100px',
                                    border: `1px solid ${p.accent}30`,
                                }}>{p.year}</span>
                                {p.tags.map((t) => (
                                    <span key={t} style={{
                                        fontFamily: 'var(--font-display)', fontSize: '0.55rem',
                                        fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                                        color: 'rgba(26,23,20,0.5)', padding: '0.2rem 0.5rem',
                                        borderRadius: '100px', border: '1px solid rgba(138,130,120,0.2)',
                                    }}>{t}</span>
                                ))}
                            </div>
                            <h3 style={{
                                fontFamily: 'var(--font-display)', fontWeight: 800,
                                fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', letterSpacing: '-0.04em',
                                lineHeight: 1, color: 'var(--color-dark)', marginBottom: '0.75rem',
                            }}>{p.title}</h3>
                            <p style={{
                                fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                                color: p.accent, marginBottom: '0.4rem',
                            }}>{p.tagline}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                {projects.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)} style={{
                        width: i === active ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '100px',
                        background: i === active ? 'var(--color-dark)' : 'var(--color-sand)',
                        border: 'none', cursor: 'pointer',
                        transition: 'width 0.3s, background 0.2s',
                        padding: 0,
                    }} />
                ))}
            </div>
        </div>
    );
}

export default function Projects() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (isMobile) return;
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            const totalWidth = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: `+=${totalWidth + window.innerWidth * 0.5}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });
        }, containerRef);
        return () => ctx.revert();
    }, [isMobile]);

    return (
        <section id="projects" ref={containerRef} style={{ background: 'var(--color-pearl)', position: 'relative' }}>
            {isMobile ? (
                <>
                    <div style={{ padding: '4rem 1.5rem 0' }}>
                        <p style={{
                            fontFamily: 'var(--font-display)', fontWeight: 500,
                            fontSize: 'var(--text-xs)', letterSpacing: '0.2em',
                            textTransform: 'uppercase', color: 'var(--color-warm-gray)',
                            marginBottom: '1.5rem',
                        }}>03 / Work</p>
                        <h2 style={{
                            fontFamily: 'var(--font-display)', fontWeight: 800,
                            fontSize: 'var(--text-2xl)', letterSpacing: '-0.04em',
                            lineHeight: 0.95, color: 'var(--color-dark)',
                        }}>
                            Selected<br />
                            <span style={{ color: 'var(--color-warm-gray)' }}>Projects.</span>
                        </h2>
                    </div>
                    <MobileCarousel />
                </>
            ) : (
                <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        padding: '0 5rem',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-display)', fontWeight: 500,
                            fontSize: 'var(--text-xs)', letterSpacing: '0.2em',
                            textTransform: 'uppercase', color: 'var(--color-warm-gray)',
                            marginBottom: '1.5rem',
                        }}>03 / Work</p>
                        <h2 style={{
                            fontFamily: 'var(--font-display)', fontWeight: 800,
                            fontSize: 'var(--text-2xl)', letterSpacing: '-0.04em',
                            lineHeight: 0.95, color: 'var(--color-dark)',
                            marginBottom: '2rem',
                        }}>
                            Selected<br />
                            <span style={{ color: 'var(--color-warm-gray)' }}>Projects.</span>
                        </h2>
                        <p style={{
                            fontFamily: 'var(--font-body)', fontWeight: 300,
                            fontSize: 'var(--text-s)', color: 'var(--color-mid-gray)',
                            lineHeight: 1.7, maxWidth: '260px',
                        }}>
                            A selection of recent work spanning interactive experiences, platforms, and design systems.
                        </p>
                    </div>

                    {/* Horizontal track */}
                    <div
                        ref={trackRef}
                        className="h-scroll-track"
                        style={{
                            display: 'flex',
                            gap: '4rem',
                            paddingLeft: '65vw', // Even more offset to show title clearly at start
                            paddingRight: '15vw',
                            alignItems: 'center',
                            willChange: 'transform',
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        {projects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
