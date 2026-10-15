import type { ReactNode } from "react";
import { Badge } from "./Badge";

interface StubScreenProps {
  title: string;
  /** e.g. a route param, shown in mono for routing verification */
  detail?: string;
  description?: string;
  children?: ReactNode;
}

/**
 * Consistent scaffold placeholder for every route stub.
 * The demo banner is rendered by the layout, not here.
 */
export function StubScreen({ title, detail, description, children }: StubScreenProps) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <Badge tone="neutral">Demo screen — coming soon</Badge>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-on-surface">{title}</h1>
      {detail ? (
        <p className="tnum mt-2 font-mono text-sm text-on-surface-variant">{detail}</p>
      ) : null}
      <p className="mt-3 max-w-[280px] text-sm leading-6 text-on-surface-variant">
        {description ??
          "This screen is a scaffold placeholder. The screen team will build the real UI here; there is no backend yet, so nothing here is functional."}
      </p>
      {children}
    </div>
  );
}
