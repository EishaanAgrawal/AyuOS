import type { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

/** Section heading with an optional right-side action (link / button). */
export function SectionTitle({ title, action, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <h2 className="text-[1.25rem] font-medium leading-7 tracking-[-0.01em] text-on-surface">
        {title}
      </h2>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
