import type { Metadata } from "next";
import EnrollFrame from "@/components/EnrollFrame";
import { buildMetadata } from "@/lib/seo";
import { lms } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Enroll",
  description: "Register for a Tungabadra Networks course or internship and pay securely online.",
  path: "/enroll",
  // A checkout step, not a landing page.
  noIndex: true,
});

/** LMS pages this site may show. Stripe returns here with one of them in `path`. */
const PATHS = [`/f/${lms.form}`, "/verify", "/course-list"];
/** The only query parameters passed through to the form. */
const FORWARD = ["course", "paid", "session_id", "cancelled", "abandoned"];

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function EnrollPage({ searchParams }: Props) {
  const params = await searchParams;
  const one = (k: string) => {
    const v = params[k];
    return typeof v === "string" ? v.slice(0, 200) : undefined;
  };

  const path = PATHS.includes(one("path") ?? "") ? one("path")! : PATHS[0];
  const query = new URLSearchParams({ embed: "1" });
  for (const k of FORWARD) {
    const v = one(k);
    if (v) query.set(k, v);
  }
  const src = `${lms.origin}${path}?${query}`;
  const fallback = `${lms.origin}/f/${lms.form}${one("course") ? `?course=${encodeURIComponent(one("course")!)}` : ""}`;

  return (
    <div className="container" style={{ paddingBlock: "clamp(32px, 5vw, 64px) clamp(48px, 6vw, 88px)" }}>
      <div style={{ maxWidth: 880, marginInline: "auto" }}>
        <p className="eyebrow">Enrollment</p>
        <h1 className="h1" style={{ marginTop: 10 }}>
          Enroll with Tungabadra Networks
        </h1>
        <p className="lede" style={{ marginTop: 12, marginBottom: "clamp(24px, 4vw, 40px)" }}>
          Complete your registration below. Payment is handled securely by Stripe; you return here once it is done.
        </p>
        <EnrollFrame src={src} fallback={fallback} />
      </div>
    </div>
  );
}
