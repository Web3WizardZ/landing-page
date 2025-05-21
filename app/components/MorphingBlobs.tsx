'use client'
import { motion, useCycle, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useMemo } from 'react'

export default function MorphingBlobs({ style }: { style: any }) {
  const [current, cycle] = useCycle(0, 1, 2)
  useEffect(() => {
    const id = setInterval(cycle, 8000)
    return () => clearInterval(id)
  }, [cycle])
  const translateX = useTransform(style.x, [-100, 100], [-20, 20])
  const translateY = useTransform(style.y, [-100, 100], [-10, 10])
  const rotate     = useTransform(style.x, [-100, 100], [-5, 5])
  const paths = useMemo(() => [
    'M421.5,304Q389,358,334.5,393.5Q280,429,225,397.5Q170,366,121,321Q72,276,88.5,210Q105,144,162,108Q219,72,278,84.5Q337,97,377.5,142Q418,187,421.5,304Z',
    'M419,307Q380,364,323,390Q266,416,214,390Q162,364,113,322Q64,280,88,209.5Q112,139,168,97.5Q224,56,277.5,89Q331,122,378,161Q425,200,419,307Z',
    'M420,301Q383,352,329,389Q275,426,216.5,401Q158,376,106.5,339Q55,302,80.5,226Q106,150,164.5,109Q223,68,281,98.5Q339,129,379.5,173Q420,217,420,301Z',
  ], [])
  return (
    <motion.svg
      viewBox="0 0 500 500"
      className="absolute w-[160%] h-[160%] -top-1/3 -left-1/3 opacity-20 pointer-events-none"
      style={{ translateX, translateY, rotate }}
      animate={{ translateX: [0,15,0,-15,0], translateY: [0,10,0,-10,0] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.path
        d={paths[current]}
        fill="url(#blobGradient)"
        animate={{ d: paths }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <defs>
        <linearGradient id="blobGradient" gradientTransform="rotate(45)">
          <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
          <stop offset="100%" stopColor="rgba(236,72,153,0.3)" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
