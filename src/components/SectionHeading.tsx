"use client";

import { motion } from "framer-motion";

/* Shared section label: "01 — About" etc.
   On entry the number does a 1-2 flicker glitch (CSS keyframes),
   then the label settles. Pure decoration → aria-hidden.
*/
export default function SectionHeading({
  index,
  label,
  inView,
}: {
  index?: string;
  label: string;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 md:mb-16"
      aria-hidden="true"
    >
      <span className="inline-flex items-baseline gap-2 text-xs tracking-[0.3em] uppercase text-[var(--text-stone)] font-medium">
        {index && (
          <span className="glitch-num relative font-mono" data-text={index}>
            {index}
          </span>
        )}
        <motion.span className="inline-block">— {label}</motion.span>
      </span>
    </motion.div>
  );
}