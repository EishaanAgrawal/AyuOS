import type { InputHTMLAttributes } from "react";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id"> {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
}

/**
 * Text input: white surface, hairline outline, 44px min-height,
 * teal focus ring + ambient haze (DESIGN.md).
 */
export function TextInput({ id, label, hint, error, className = "", ...rest }: TextInputProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium tracking-[0.01em] text-on-surface"
        >
          {label}
        </label>
      ) : null}
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`h-11 w-full rounded border bg-surface-container-lowest px-4 text-base text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 ${
          error ? "border-error" : "border-hairline"
        }`}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-on-surface-variant">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
