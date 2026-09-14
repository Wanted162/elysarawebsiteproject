import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PointerEvent, useRef } from "react";

export function InteractiveOrb() {
  const container = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-14, 14]), { stiffness: 180, damping: 20 });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [14, -14]), { stiffness: 180, damping: 20 });

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!container.current) return;
    const bounds = container.current.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width * 2 - 1);
    pointerY.set((event.clientY - bounds.top) / bounds.height * 2 - 1);
  };

  const reset = () => { pointerX.set(0); pointerY.set(0); };

  return <div ref={container} onPointerMove={handleMove} onPointerLeave={reset} className="absolute left-1/2 top-1/2 z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 [perspective:900px] sm:h-72 sm:w-72" aria-label="Interactive botanical illustration" role="img">
    <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} className="absolute inset-3 rounded-full border border-secondary/20 [transform:translateZ(-26px)]" />
      <div className="absolute inset-5 rounded-full bg-[#f6f0df]/75 shadow-[inset_-18px_-18px_36px_rgba(82,110,88,.12),8px_14px_34px_rgba(82,110,88,.12)] [transform:translateZ(0)]" />
      <svg className="absolute inset-0 h-full w-full [transform:translateZ(24px)]" viewBox="0 0 260 260" fill="none"><path d="M130 233C132 177 135 120 126 42" stroke="#526e58" strokeWidth="2"/><path d="M130 156C98 137 76 114 58 86M133 127C165 108 186 86 204 55" stroke="#526e58" strokeWidth="2"/><circle cx="126" cy="42" r="20" fill="#b8664d" fillOpacity=".68"/><circle cx="58" cy="86" r="16" fill="#d3977d" fillOpacity=".72"/><circle cx="204" cy="55" r="18" fill="#c47e68" fillOpacity=".68"/></svg>
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_25px_8px_rgba(196,154,83,.25)] [transform:translateZ(32px)]" />
    </motion.div>
  </div>;
}
