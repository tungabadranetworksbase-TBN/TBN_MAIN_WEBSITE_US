import Link from "next/link";

/**
 * TBN wordmark.
 *
 * No brand assets shipped with the extract, so the mark is drawn here: two
 * strokes converging into one, for the Tunga and Bhadra rivers that give the
 * organization its name. Uses the template's accent green and `currentColor`
 * so it works on both the light and dark Fintra sections.
 *
 * EDIT ME: replace the <svg> below with the official TBN mark when available.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label="Tungabadra Networks, home">
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.08" />
        <path
          d="M8 7c0 6.5 3.2 9.5 8 11.5M24 7c0 6.5-3.2 9.5-8 11.5M16 18.5V25"
          stroke="#0a9550"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="25" r="1.9" fill="#0a9550" />
      </svg>
      <span>
        <strong>Tungabadra</strong> Networks
      </span>
    </Link>
  );
}
