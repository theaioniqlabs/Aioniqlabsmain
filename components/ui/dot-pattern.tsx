import React from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
}

export default function DotPattern({
  className,
  width = 16,
  height = 16,
  x = 1,
  y = 1,
  cx = 1,
  cy = 1,
  cr = 1,
}: DotPatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80",
        className
      )}
    >
      <defs>
        <pattern
          id="dot-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#dot-pattern)" />
    </svg>
  );
}
