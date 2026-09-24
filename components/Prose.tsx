import type { ReactNode } from "react";

/**
 * Long-form page furniture for the About, FAQ and Internships pages.
 *
 * These used to carry `tbn-*` class names from a stylesheet that no longer
 * exists, which left the pages rendering edge-to-edge and unstyled. They now
 * use the brand vocabulary in interior.css, and re-export the two pieces
 * ui.tsx already owns rather than keeping a second copy of each.
 */

export { AnswerBox, Breadcrumbs } from "./ui";

export function PageBody({ children }: { children: ReactNode }) {
  return (
    <section className="section">
      <div className="container">{children}</div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose">{children}</div>;
}

/** Label/value pairs, set as a definition list so the pairing is machine-readable. */
export function SpecList({
  items,
  columns = 2,
}: {
  items: { label: string; value: string }[];
  columns?: 2 | 3;
}) {
  return (
    <dl className={`specs ${columns === 3 ? "specs--3" : ""}`}>
      {items.map((s) => (
        <div key={s.label} className="spec">
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DataTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="table-wrap">
      <table className="table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
