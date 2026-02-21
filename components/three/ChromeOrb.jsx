'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

function OrbMesh({ scrollProgress }) {
    const meshRef = useRef();
    const { viewport } = useThree();

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const t = clock.getElapsedTime();
        meshRef.current.rotation.x = t * 0.08;
        meshRef.current.rotation.y = t * 0.12;
        meshRef.current.rotation.z = t * 0.05;
        // Drift down & scale on scroll
        const scroll = scrollProgress?.current || 0;
        meshRef.current.position.y = -scroll * 1.5;
        meshRef.current.scale.setScalar(1 - scroll * 0.3);
    });

    return (
        <Sphere ref={meshRef} args={[1.8, 128, 128]}>
            <MeshDistortMaterial
                color="#d4cdc7"
                envMapIntensity={1.5}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={0.95}
                roughness={0.05}
                distort={0.18}
                speed={1.2}
            />
        </Sphere>
    );
}

export default function ChromeOrb({ scrollProgress }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 1,
            }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
            <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#c9d4db" />
            <spotLight position={[0, 8, 0]} intensity={0.8} color="#dbd4c9" />
            <Environment preset="city" />
            <OrbMesh scrollProgress={scrollProgress} />
        </Canvas>
    );
}
