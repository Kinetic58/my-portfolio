import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingParticles = () => {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);

    useEffect(() => {
        const generateParticles = () => {
            const colors = ['var(--cyber-blue)', 'var(--cyber-purple)', 'var(--cyber-pink)', 'var(--cyber-green)', 'var(--cyber-orange)'];
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            }));
            setParticles(newParticles);
        };

        generateParticles();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full opacity-60"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 100 - 50, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
};

const GeometricShapes = () => {
    const shapes = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        type: Math.random() > 0.5 ? 'circle' : 'square',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * 360,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className={`absolute border-2 border-primary/20 ${
                        shape.type === 'circle' ? 'rounded-full' : 'rounded-lg'
                    }`}
                    style={{
                        width: shape.size,
                        height: shape.size,
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        background: 'linear-gradient(45deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))',
                    }}
                    animate={{
                        rotate: [shape.rotation, shape.rotation + 360],
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const WaveAnimation = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
            <svg
                className="absolute w-full h-full"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--cyber-blue) / 0.1)" />
                        <stop offset="100%" stopColor="hsl(var(--cyber-purple) / 0.1)" />
                    </linearGradient>
                    <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--cyber-pink) / 0.1)" />
                        <stop offset="100%" stopColor="hsl(var(--cyber-green) / 0.1)" />
                    </linearGradient>
                </defs>

                <motion.path
                    d="M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z"
                    fill="url(#waveGradient1)"
                    animate={{
                        d: [
                            "M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z",
                            "M0,500 Q250,700 500,500 T1000,500 L1000,1000 L0,1000 Z",
                            "M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z",
                        ],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.path
                    d="M0,600 Q250,400 500,600 T1000,600 L1000,1000 L0,1000 Z"
                    fill="url(#waveGradient2)"
                    animate={{
                        d: [
                            "M0,600 Q250,400 500,600 T1000,600 L1000,1000 L0,1000 Z",
                            "M0,600 Q250,800 500,600 T1000,600 L1000,1000 L0,1000 Z",
                            "M0,600 Q250,400 500,600 T1000,600 L1000,1000 L0,1000 Z",
                        ],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </svg>
        </div>
    );
};

const GlowingOrbs = () => {
    const orbs = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 120 + 80,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
            {orbs.map((orb) => (
                <motion.div
                    key={orb.id}
                    className="absolute rounded-full opacity-20 blur-xl"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
                    }}
                    animate={{
                        x: [0, Math.random() * 200 - 100, 0],
                        y: [0, Math.random() * 200 - 100, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
};

const AnimatedGrid = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
            <svg className="w-full h-full opacity-20">
                <defs>
                    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                        <motion.path
                            d="M 100 0 L 0 0 0 100"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="0.5"
                            animate={{
                                opacity: [0.1, 0.5, 0.1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
};

export const AnimatedBackground = () => {
    return (
        <>
            <FloatingParticles />
            <GeometricShapes />
            <WaveAnimation />
            <GlowingOrbs />
            <AnimatedGrid />
        </>
    );
};