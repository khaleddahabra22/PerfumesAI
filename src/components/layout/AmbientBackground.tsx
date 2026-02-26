'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
            {/* Subtle Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Top Right Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] bg-white opacity-10 mix-blend-screen"
            />

            {/* Bottom Left Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.05, 0.1, 0.05],
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] bg-white opacity-[0.05] mix-blend-screen"
            />

            {/* Center Subtle Highlight */}
            <motion.div
                animate={{
                    opacity: [0.02, 0.05, 0.02],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] rounded-[100%] blur-[100px] bg-white opacity-[0.02] mix-blend-screen"
            />
        </div>
    );
}
