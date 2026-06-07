import { Leaf } from "lucide-react";
import { motion } from "motion/react";

export function NaqlaLogo({ className = "", size = "md", dark = false }: { className?: string; size?: "sm" | "md" | "lg"; dark?: boolean }) {
  const sizes = {
    sm: { text: "text-3xl", leaf: 14 },
    md: { text: "text-5xl", leaf: 20 },
    lg: { text: "text-7xl md:text-8xl", leaf: 32 },
  }[size];

  const color = dark ? "text-primary" : "text-primary-foreground";
  const leafColor = dark ? "text-accent" : "text-accent";

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <motion.span
        initial={{ rotate: -20, opacity: 0, scale: 0.5 }}
        animate={{ rotate: -15, opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        className={`absolute -top-2 -left-3 ${leafColor}`}
      >
        <Leaf size={sizes.leaf} className="fill-current" />
      </motion.span>
      <motion.span
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`font-script ${sizes.text} ${color} leading-none tracking-tight`}
      >
        Na<span className="italic">q</span>la
      </motion.span>
      <motion.span
        initial={{ rotate: 20, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 15, opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
        className={`absolute -bottom-1 -right-4 ${leafColor}`}
      >
        <Leaf size={sizes.leaf * 0.8} className="fill-current" />
      </motion.span>
    </div>
  );
}