import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

export function AnimatedCounter({ value, suffix = "", prefix = "", duration = 1.6 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased * 10) / 10);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatted = Number.isInteger(value) ? Math.round(display).toLocaleString() : display.toFixed(1);
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}