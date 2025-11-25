import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface OnboardingScreenProps {
  onStart: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStart }) => {
  // Generate random nodes for the constellation effect
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white flex flex-col items-center justify-between py-12 px-6">
      {/* Background Constellation Effect - Grayscale */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {nodes.map((node, i) => {
            const nextNode = nodes[i + 1] || nodes[0];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${nextNode.x}%`}
                y2={`${nextNode.y}%`}
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
              />
            );
          })}
        </svg>

        {/* Grayscale Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute rounded-full bg-gray-400"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
          />
        ))}
      </div>

      {/* Hamburger Menu */}
      <div className="absolute top-6 left-6 z-20">
        <button className="p-2 text-gray-600 hover:text-black transition-colors">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md mt-auto mb-auto text-center">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight text-black mb-4">
          Connect Cards
        </h1>
        <p className="text-lg text-gray-600 font-light">
          Spark meaningful conversations.
        </p>
      </div>

      {/* Actions */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md space-y-6 mb-8">
        <button
          onClick={onStart}
          className="w-full max-w-[280px] h-[56px] rounded-full bg-black text-white font-medium text-base hover:bg-gray-800 transition-colors active:scale-[0.98]"
        >
          Get Started
        </button>

        <button className="text-sm text-gray-500 hover:text-black transition-colors">
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
