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
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e1b4b] text-white flex flex-col items-center justify-between py-12 px-6">

      {/* Background Constellation Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {/* Connecting Lines (Simplified for performance/visuals) */}
        <svg className="absolute inset-0 w-full h-full">
          {nodes.map((node, i) => {
            // Connect each node to the next one to form a simple chain/network
            const nextNode = nodes[i + 1] || nodes[0];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${nextNode.x}%`}
                y2={`${nextNode.y}%`}
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
              />
            );
          })}
        </svg>

        {/* Glowing Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute rounded-full bg-blue-400 blur-[1px]"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
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
        <button className="p-2 text-white/80 hover:text-white transition-colors">
          <Menu size={24} />
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md mt-16 space-y-2 text-center">
        <motion.h1
          className="text-4xl font-light tracking-tight text-white md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Connect Cards.
        </motion.h1>
        <motion.p
          className="text-lg font-light text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Spark meaningful conversations.
        </motion.p>
      </div>

      {/* Actions */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md space-y-8 mb-8">
        <motion.button
          onClick={onStart}
          className="w-full max-w-[280px] h-[60px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 text-white font-medium text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow active:scale-95"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          Get Started
        </motion.button>

        <motion.button
          className="text-sm text-gray-400 hover:text-white transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Already have an account? Sign in
        </motion.button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
