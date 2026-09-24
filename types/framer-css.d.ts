import "react";

/**
 * Fintra's markup carries two kinds of inline style that @types/react does not
 * model. Both are legitimate CSS, so they are declared rather than cast away:
 *
 *  - `corner-shape`, which Framer emits next to every border-radius
 *  - the `--token-*` / `--framer-*` custom properties that carry the design
 *    tokens and typography presets the stylesheet reads
 *
 * The index signature is deliberately narrowed to `--*` so ordinary typos in
 * style objects are still caught.
 */
declare module "react" {
  interface CSSProperties {
    cornerShape?: string;
    [customProperty: `--${string}`]: string | number | undefined;
  }
}
