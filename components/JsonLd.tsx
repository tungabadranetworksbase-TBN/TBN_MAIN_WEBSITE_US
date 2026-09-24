/**
 * Renders one Schema.org JSON-LD document.
 *
 * Server component, so the script tag is in the initial HTML where crawlers and
 * answer engines read it without executing JavaScript.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Content is generated from our own typed data, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
