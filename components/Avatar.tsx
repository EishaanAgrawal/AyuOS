interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Circular person avatar with initials (fully rounded pill geometry). */
export function Avatar({ name, size = "md", className = "" }: AvatarProps) {
  return (
    <div
      aria-label={name}
      role="img"
      className={`flex shrink-0 items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary-container ${SIZES[size]} ${className}`}
    >
      {initials(name)}
    </div>
  );
}
