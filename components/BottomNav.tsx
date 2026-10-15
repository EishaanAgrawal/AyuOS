"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function baseIcon(path: React.ReactNode) {
  return function Icon(props: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        {...props}
      >
        {path}
      </svg>
    );
  };
}

const HomeIcon = baseIcon(
  <>
    <path d="M4 11 12 4l8 7" />
    <path d="M6 9.5V20h12V9.5" />
    <path d="M10 20v-5h4v5" />
  </>
);

const RecordsIcon = baseIcon(
  <>
    <path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v4h4" />
    <path d="M8.5 12.5h7M8.5 16h7" />
  </>
);

const MedicinesIcon = baseIcon(
  <>
    <rect x="3" y="8.6" width="18" height="6.8" rx="3.4" transform="rotate(-30 12 12)" />
    <path d="M12 6.8v10.4" transform="rotate(-30 12 12)" />
  </>
);

const CareIcon = baseIcon(
  <path d="M12 20.5C7 16.5 3.5 13.3 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.8 4 2.1C12.9 5.8 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 3.7-3.5 6.9-8.5 10.9Z" />
);

const MoreIcon = baseIcon(
  <>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </>
);

interface Tab {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
}

const TABS: Tab[] = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/records", label: "Records", icon: RecordsIcon },
  { href: "/medicines", label: "Medicines", icon: MedicinesIcon },
  { href: "/care", label: "Care", icon: CareIcon },
  { href: "/more", label: "More", icon: MoreIcon },
];

/**
 * Primary tab bar, fixed to the bottom of the 430px mobile container
 * with safe-area padding. Active tab gets the teal pill treatment.
 */
export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] border-t border-outline-variant bg-surface-container-lowest pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid h-16 grid-cols-5">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                  active ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span
                  className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
                    active ? "bg-primary-container/25" : ""
                  }`}
                >
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
