"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("varunpahuja2005@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 md:px-8 bg-[rgba(7,7,13,0.92)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-dim)] to-transparent" aria-hidden="true" />

      <div ref={ref} className="mx-auto max-w-[1100px]">
        <SectionHeading index="04" label="Contact" inView={isInView} />

        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl md:text-5xl font-bold leading-tight mb-6"
          >
            Let&apos;s build
            <br />
            <span className="text-[var(--accent-vermillion)]">something</span>{" "}
            together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-parchment)] leading-relaxed text-base md:text-lg mb-10"
          >
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of something meaningful.
          </motion.p>

          <div className="space-y-4">
            {/* Email — copy to clipboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={copyEmail}
                className="group w-full flex items-center gap-4 p-4 rounded-xl border border-[var(--border-dim)] bg-[var(--bg-lacquer)] shadow-[0_2px_12px_rgba(0,0,0,0.25)] hover:border-[var(--accent-vermillion)]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent-vermillion)]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[var(--accent-vermillion)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[var(--text-stone)] mb-0.5">Email</div>
                  <div className="text-sm text-[var(--text-washi)] font-[family-name:var(--font-geist-mono)] truncate">
                    varunpahuja2005@gmail.com
                  </div>
                </div>
                <div className="flex-shrink-0 text-[var(--text-stone)] group-hover:text-[var(--accent-vermillion)] transition-colors">
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </div>
              </button>
            </motion.div>

            {/* GitHub */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="https://github.com/varun-pahuja"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--border-dim)] bg-[var(--bg-lacquer)] shadow-[0_2px_12px_rgba(0,0,0,0.25)] hover:border-[var(--accent-vermillion)]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--text-washi)]/5 flex items-center justify-center">
                  <GithubIcon className="w-5 h-5 text-[var(--text-parchment)]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[var(--text-stone)] mb-0.5">GitHub</div>
                  <div className="text-sm text-[var(--text-washi)]">
                    varun-pahuja
                  </div>
                </div>
                <span className="text-[var(--text-stone)] group-hover:text-[var(--accent-vermillion)] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="https://www.linkedin.com/in/varun-pahuja475/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--border-dim)] bg-[var(--bg-lacquer)] shadow-[0_2px_12px_rgba(0,0,0,0.25)] hover:border-[var(--accent-vermillion)]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0077B5]/10 flex items-center justify-center">
                  <LinkedinIcon className="w-5 h-5 text-[#0077B5]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[var(--text-stone)] mb-0.5">LinkedIn</div>
                  <div className="text-sm text-[var(--text-washi)]">
                    varun-pahuja475
                  </div>
                </div>
                <span className="text-[var(--text-stone)] group-hover:text-[var(--accent-vermillion)] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
