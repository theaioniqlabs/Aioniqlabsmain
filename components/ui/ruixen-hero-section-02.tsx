"use client";

import { motion } from "framer-motion";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/ui/PageContainer";

export default function HeroSection02() {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background to-muted/30">
      <DotPattern className={cn(
        "[mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]",
      )} />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/30 blur-[120px] rounded-full z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-secondary/20 blur-[160px] rounded-full z-0"
      />

      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 0.2, y: [0, -20, 0] }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-muted-foreground/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <PageContainer 
        mode="visual" 
        className="relative z-20 w-full flex items-center justify-center min-h-[70vh]"
        style={{
          boxSizing: 'content-box',
        }}
      >
        <div className="text-center max-w-[700px] space-y-6 py-24 relative z-20 w-full">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-foreground relative z-20"
          >
            A Human-first Intelligent Design Systems
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-muted-foreground max-w-xl mx-auto relative z-20"
          >
            Teams, systems, and ideas aligned to build what matters.
          </motion.p>
        </div>
      </PageContainer>
    </section>
  );
}
