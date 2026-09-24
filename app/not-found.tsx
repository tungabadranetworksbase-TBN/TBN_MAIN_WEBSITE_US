import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "@/components/Icons";
import { courses } from "@/lib/courses";
import { internships } from "@/lib/internships";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ maxWidth: 640, marginInline: "auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginInline: "auto" }}>
            404
          </p>
          <h1 className="h2" style={{ marginTop: 18 }}>
            We could not find that page
          </h1>
          <p className="lede" style={{ marginTop: 14, marginInline: "auto" }}>
            The link may be out of date, or the page may have moved. These are the places people
            usually want.
          </p>

          <div className="row" style={{ justifyContent: "center", marginTop: 28 }}>
            <Link href="/courses" className="btn btn--primary">
              Browse {courses.length} courses
              <ArrowRight size={17} />
            </Link>
            <Link href="/internships" className="btn btn--ghost">
              {internships.length} internships
            </Link>
          </div>

          <p className="lede" style={{ marginTop: 24, marginInline: "auto" }}>
            Or see the full{" "}
            <Link href="/sitemap" className="text-link">
              sitemap
            </Link>
            , the{" "}
            <Link href="/faq" className="text-link">
              FAQ
            </Link>
            , or{" "}
            <Link href="/contact" className="text-link">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
