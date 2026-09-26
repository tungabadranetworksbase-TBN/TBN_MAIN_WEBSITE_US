import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { PageHead } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import styles from "../detail.module.css";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Terms & Conditions", href: "/terms" },
];

/** EDIT ME: update whenever the terms change. */
const LAST_UPDATED = "2026-08-26";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "The terms governing use of the Tungabadra Networks website and enrollment in its courses, internships, corporate training and technology services.",
  path: "/terms",
});

const sections = [
  { id: "agreement", title: "Agreement to these terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "enrollment", title: "Enrollment and payment" },
  { id: "cancellation", title: "Cancellation and refunds" },
  { id: "conduct", title: "Participant conduct" },
  { id: "ip", title: "Intellectual property" },
  { id: "your-work", title: "Work you create" },
  { id: "certificates", title: "Certificates" },
  { id: "no-guarantee", title: "No employment or outcome guarantee" },
  { id: "third-party", title: "Third-party certifications and tools" },
  { id: "availability", title: "Availability and changes" },
  { id: "liability", title: "Disclaimers and limitation of liability" },
  { id: "law", title: "Governing law" },
  { id: "contact", title: "Contact" },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/terms",
            name: "Terms and Conditions",
            description:
              "Terms governing use of the Tungabadra Networks website and enrollment in its programs.",
          }),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHead
        eyebrow="Legal"
        title="Terms &amp; Conditions"
        lede={`The terms that govern use of this website and enrollment in Tungabadra Networks programs. Last updated ${new Date(`${LAST_UPDATED}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}.`}
        crumbs={crumbs}
      />

      <div className="container">
        <div className={styles.layout} style={{ paddingTop: 0 }}>
          <div className={styles.main} style={{ gap: 0 }}>
            {/* These terms still need a lawyer's eyes before launch - flagged to the
                reader rather than hidden, since that is the honest state of them. */}
            <div className="card card--muted" style={{ marginBottom: 32 }}>
              <h2 className="h5">Please note</h2>
              <p className="card__body">
                These terms are drafted from Tungabadra Networks&rsquo; standard practice and have
                not yet been reviewed by legal counsel. The written terms you receive at enrolment
                are the ones that govern your agreement with us.
              </p>
            </div>

            <div className="prose">
              <h2
                id="agreement"
                style={{ marginTop: 0, scrollMarginTop: "calc(var(--header-h) + 20px)" }}
              >
                Agreement to these terms
              </h2>
              <p>
                By using this website or enrolling in a {site.legalName} (&ldquo;TBN&rdquo;)
                program, you agree to these terms. If you do not agree, do not use the site or
                enroll. If you are agreeing on behalf of an organization, you confirm you are
                authorized to bind it.
              </p>

              <h2 id="eligibility" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Eligibility
              </h2>
              <ul>
                <li>Participants must be 18 years of age or older.</li>
                <li>
                  Internship participants must be located in the United States and authorized to
                  work or intern in the US.
                </li>
                <li>
                  You are responsible for meeting the stated prerequisites of any course you enroll
                  in.
                </li>
                <li>
                  You must provide accurate information when enrolling or applying, and keep it
                  current.
                </li>
              </ul>

              <h2 id="enrollment" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Enrollment and payment
              </h2>
              <ul>
                <li>All fees are quoted and charged in US dollars (USD).</li>
                <li>
                  Prices displayed on the website are indicative. The tuition confirmed in writing
                  at enrollment is the amount payable.
                </li>
                <li>
                  Your place in a cohort is confirmed when payment, or an agreed payment schedule,
                  is in place.
                </li>
                <li>
                  Corporate engagements are governed by the written proposal and any separate
                  agreement, which take precedence over these terms where they conflict.
                </li>
              </ul>

              <h2 id="cancellation" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Cancellation and refunds
              </h2>
              <p>
                Cancellation, refund and deferral terms are confirmed in writing at the time of
                enrolment, before any fee is paid. They cover the cancellation window before a batch
                starts, whether a partial refund applies once it has started, how a deferral to a
                later batch is handled, and what happens if Tungabadra Networks cancels a batch. Ask
                for these terms on the consultation call and keep the written copy you are given.
              </p>

              <h2 id="conduct" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Participant conduct
              </h2>
              <p>While participating in a TBN program you agree not to:</p>
              <ul>
                <li>Share account credentials or resell access to course materials.</li>
                <li>Submit work that is not your own without attribution.</li>
                <li>
                  Arrange, accept or act as a proxy in any interview, assessment or examination,
                  whether for a TBN program or for an employer.
                </li>
                <li>
                  Use lab environments, tools or techniques taught in a course against any system
                  you do not own or have written authorization to test.
                </li>
                <li>Harass, discriminate against or disrupt other participants or instructors.</li>
                <li>Record live sessions without prior written permission.</li>
              </ul>
              <p>
                We may suspend or remove a participant who breaches these rules. Security course
                material is taught for defensive purposes only.
              </p>

              <h2 id="ip" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Intellectual property
              </h2>
              <p>
                Course materials, lab guides, recordings and this website&rsquo;s content are owned
                by TBN or its licensors. You receive a personal, non-transferable license to use
                them for your own learning while enrolled and afterwards. You may not redistribute,
                republish or use them to deliver training to others without written permission.
              </p>

              <h2 id="your-work" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Work you create
              </h2>
              <p>
                You retain ownership of the projects and code you create during a course, and you
                are free to publish them in your own portfolio. You grant TBN permission to review
                your submitted work for grading and quality purposes. Where internship work
                contributes to a shared TBN repository, ownership of that contribution is set out in
                the internship agreement you sign before starting.
              </p>

              <h2 id="certificates" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Certificates
              </h2>
              <p>
                Certificates issued by TBN are certificates of completion. They record the modules
                completed and skills applied. They are not accredited academic qualifications and
                are not equivalent to a third-party certification. Certificates are issued once all
                graded work is complete and fees are settled.
              </p>

              <h2 id="no-guarantee" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                No employment or outcome guarantee
              </h2>
              <p>
                TBN does not guarantee employment, an interview, a salary level, or that you will
                pass any third-party certification exam. No placement rates, salary figures or
                outcome statistics are published on this site, and none should be inferred from any
                statement on it.
              </p>
              <p>
                Placement support is preparation only. TBN does not provide proxy interview
                support: we do not attend interviews on a participant&rsquo;s behalf, assist during
                a live interview, or represent a participant&rsquo;s identity, experience or work as
                anything other than what it is. Arranging or accepting proxy attendance is a breach
                of these terms and results in removal from the program and from placement support,
                without refund.
              </p>

              <h2 id="third-party" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Third-party certifications and tools
              </h2>
              <p>
                TBN is not affiliated with, endorsed by, or an authorized training partner of
                CompTIA, Cisco, Amazon Web Services, Microsoft, the Cloud Native Computing
                Foundation, HashiCorp, or any other certification vendor referenced on this site.
                Trademarks belong to their respective owners. Exam registration and fees are handled
                directly with the vendor. Cloud accounts and third-party tools used during a course
                are subject to those providers&rsquo; own terms, and you are responsible for charges
                you incur on your own accounts.
              </p>

              <h2 id="availability" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Availability and changes
              </h2>
              <p>
                We may update course content, schedules, instructors and this website. Where a
                change materially affects a program you are enrolled in, we will notify you. We may
                also update these terms; the date at the top of this page shows when they last
                changed.
              </p>

              <h2 id="liability" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Disclaimers and limitation of liability
              </h2>
              <p>
                The website and its content are provided &ldquo;as is&rdquo; without warranties of
                any kind, to the fullest extent permitted by law. To the fullest extent permitted by
                law, TBN&rsquo;s total liability arising from a program is limited to the amount you
                paid for that program, and TBN is not liable for indirect, incidental or
                consequential damages. Nothing in these terms limits liability that cannot be
                limited by law.
              </p>

              <h2 id="law" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Governing law
              </h2>
              <p>
                These terms are governed by the laws of the State of <strong>[EDIT ME: insert state]</strong>,
                United States, without regard to conflict of law rules.
              </p>

              <h2 id="contact" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Contact
              </h2>
              <p>
                Questions about these terms:{" "}
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. See also our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          <aside className={styles.aside} aria-label="Terms sections">
            <nav className={styles.toc} aria-label="On this page">
              <h2 className={styles.tocTitle}>On this page</h2>
              <ul className={styles.tocList}>
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </>
  );
}
