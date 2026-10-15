"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DEMO_SUBJECTS, DEMO_USER } from "./demo-data";
import type { DemoSubject, DemoUser } from "./demo-data";

interface DemoContextValue {
  /** All demo health subjects (the signed-in user + managed family members). */
  subjects: DemoSubject[];
  /** Currently active subject. */
  activeSubject: DemoSubject;
  activeSubjectId: string;
  setActiveSubjectId: (id: string) => void;
  /** Fictional demo user. */
  user: DemoUser;
  /** True after the user exits the demo banner; layouts render an explainer. */
  demoExited: boolean;
  exitDemo: () => void;
  reenterDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [activeSubjectId, setActiveSubjectId] = useState<string>(DEMO_SUBJECTS[0].id);
  const [demoExited, setDemoExited] = useState(false);

  const exitDemo = useCallback(() => setDemoExited(true), []);
  const reenterDemo = useCallback(() => setDemoExited(false), []);

  const value = useMemo<DemoContextValue>(() => {
    const activeSubject =
      DEMO_SUBJECTS.find((s) => s.id === activeSubjectId) ?? DEMO_SUBJECTS[0];
    return {
      subjects: DEMO_SUBJECTS,
      activeSubject,
      activeSubjectId,
      setActiveSubjectId,
      user: DEMO_USER,
      demoExited,
      exitDemo,
      reenterDemo,
    };
  }, [activeSubjectId, demoExited, exitDemo, reenterDemo]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within <DemoProvider>");
  return ctx;
}
