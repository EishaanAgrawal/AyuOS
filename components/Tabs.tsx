"use client";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel?: string;
}

/** Segmented control for switching views within a screen. */
export function Tabs({ tabs, value, onChange, ariaLabel = "Tabs" }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex rounded-full bg-surface-container p-1"
    >
      {tabs.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={selected}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex-1 rounded-full px-3 py-2 text-sm transition-colors ${
              selected
                ? "bg-surface-container-lowest font-semibold text-on-surface shadow-sm"
                : "font-medium text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
