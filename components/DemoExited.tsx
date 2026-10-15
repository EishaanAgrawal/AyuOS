"use client";

import { useDemo } from "@/lib/demo";
import { Button } from "./Button";
import { Card } from "./Card";

/** Plain screen shown after exiting demo mode: dev-only, no real auth exists. */
export function DemoExited() {
  const { reenterDemo } = useDemo();

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <Card className="w-full text-center">
        <h1 className="text-xl font-semibold tracking-tight text-on-surface">
          Demo mode exited
        </h1>
        <p className="mt-3 text-sm leading-6 text-on-surface-variant">
          The demo preview is for development only. It runs on fictional data and is
          not connected to any backend — there is no real sign-in yet.
        </p>
        <Button className="mt-6" fullWidth onClick={reenterDemo}>
          Back to demo preview
        </Button>
      </Card>
    </div>
  );
}
