import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToolBadgeProps {
  name: string;
  sublabel?: ReactNode;
  className?: string;
}

export function ToolBadge({ name, sublabel, className }: ToolBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card/60 px-3 py-1.5 text-xs sm:text-[13px] font-medium text-text-secondary transition-colors hover:border-border-medium",
        className
      )}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-text-tertiary/60"
      />
      <span>{name}</span>
      {sublabel && (
        <span className="text-text-tertiary text-[11px] font-normal">
          · {sublabel}
        </span>
      )}
    </span>
  );
}
