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
  { name: "Privacy Policy", href: "/privacy-policy" },
]; /** EDIT ME: update whenever the policy text changes. */
const LAST_UPDATED = "2026-08-26";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Tungabadra Networks collects, uses, shares and protects your personal information, and the privacy choices available to you.",
  path: "/privacy-policy",
});

const sections = [
  { id: "scope", title: "Scope of this policy" },
  { id: "collect", title: "Information we collect" },
  { id: "use", title: "How we use information" },
  { id: "legal-basis", title: "Why we are allowed to use it" },
  { id: "sharing", title: "When we share information" },
  { id: "cookies", title: "Cookies and analytics" },
  { id: "retention", title: "How long we keep information" },
  { id: "rights", title: "Your privacy rights" },
  { id: "security", title: "How we protect information" },
  { id: "children", title: "Children's privacy" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "How to contact us" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/privacy-policy",
            name: "Privacy Policy",
            description:
              "How Tungabadra Networks collects, uses, shares and protects personal information.",
          }),
          breadcrumbSchema(crumbs),
        )}
      />
      <PageHead
        eyebrow="Legal"
        title="Privacy Policy"
        lede={`How Tungabadra Networks collects, uses and protects personal information, and the choices you have. Last updated ${new Date(`${LAST_UPDATED}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}.`}
        crumbs={crumbs}
      />
      <div className="container">
        <div className={styles.layout} style={{ paddingTop: 0 }}>
          <div className={styles.main} style={{ gap: 0 }}>
            {/* EDIT ME: template text. Have counsel review before launch. */}{" "}
            <div className="card card--muted" style={{ marginBottom: 32 }}>
              <h2 className="h5">Before launch</h2>
              <p className="card__body">
                This policy is a working template written for a US-facing training organization. It
                must be reviewed by qualified counsel and updated to match the systems, vendors and
                data flows Tungabadra Networks actually uses before the site goes live.
              </p>
            </div>
            <div className="prose">
              <h2
                id="scope"
                style={{ marginTop: 0, scrollMarginTop: "calc(var(--header-h) + 20px)" }}
              >
                Scope of this policy
              </h2>
              <p>
                This policy applies to personal information that {site.legalName}{" "}
                (&ldquo;TBN&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects through this
                website, through inquiry and application forms, and in the course of delivering
                courses, internships, corporate training and technology services. It does not apply
                to third-party websites we link to, including certification vendors, which have
                their own policies.
              </p>
              <h2 id="collect" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Information we collect
              </h2>
              <h3>Information you give us</h3>
              <ul>
                <li>
                  <strong>Contact details</strong>: name, email address, and phone number if you
                  choose to provide one.
                </li>
                <li>
                  <strong>Inquiry content</strong>: the program you are interested in and anything
                  you write in the message field.
                </li>
                <li>
                  <strong>Application information</strong>: background, experience and availability
                  submitted with an internship or course application.
                </li>
                <li>
                  <strong>Coursework</strong>: work you submit for grading, and the feedback given
                  on it.
                </li>
                <li>
                  <strong>Billing information</strong>: handled by our payment processor; we do not
                  store full card numbers.
                </li>
              </ul>
              <h3>Information collected automatically</h3>
              <ul>
                <li>
                  Standard server log data such as IP address, browser type and pages requested.
                </li>
                <li>
                  Basic usage analytics, if analytics is enabled, see the cookies section below.
                </li>
              </ul>
              <h3>Information we do not collect</h3>
              <p>
                We do not ask for Social Security numbers, government identification numbers,
                precise geolocation, or sensitive categories of personal information such as health
                or biometric data. Please do not include such information in a message to us.
              </p>
              <h2 id="use" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                How we use information
              </h2>
              <ul>
                <li>To respond to your inquiry or application.</li>
                <li>
                  To deliver a course, internship, training engagement or service you enrolled in.
                </li>
                <li>
                  To review and provide feedback on submitted work, and to issue certificates.
                </li>
                <li>To send administrative messages about a program you are enrolled in.</li>
                <li>To send optional updates, only if you have asked to receive them.</li>
                <li>To operate, secure and improve this website.</li>
                <li>To meet legal, tax and accounting obligations.</li>
              </ul>
              <p>
                We do not sell personal information, and we do not share it with third parties for
                their own marketing purposes.
              </p>
              <h2 id="legal-basis" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Why we are allowed to use it
              </h2>
              <p>
                We process personal information to perform a contract with you (delivering a program
                you enrolled in), because you consented (an inquiry you submitted or an optional
                mailing list), because we have a legitimate interest (operating and securing the
                site), or because we are legally required to.
              </p>
              <h2 id="sharing" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                When we share information
              </h2>
              <p>We share personal information only in these situations:</p>
              <ul>
                <li>
                  <strong>Service providers</strong> acting on our instructions, for example email
                  delivery, payment processing, hosting and learning platform vendors.
                </li>
                <li>
                  <strong>With your direction</strong>: for example when you ask us to share your
                  profile with an employer through the careers page.
                </li>
                <li>
                  <strong>Legal requirements</strong>: when required by law, subpoena, or to
                  protect the rights and safety of people or property.
                </li>
                <li>
                  <strong>Business transfer</strong>: if the organization is merged or acquired,
                  subject to this policy continuing to apply.
                </li>
              </ul>
              <h2 id="cookies" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Cookies and analytics
              </h2>
              <p>
                This website uses only the cookies necessary to operate. It does not use advertising
                cookies or cross-site tracking. If analytics is added, this section will name the
                provider, state what is collected, and describe how to opt out, and a cookie notice
                will be presented where required.
              </p>
              <h2 id="retention" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                How long we keep information
              </h2>
              <ul>
                <li>
                  <strong>Inquiries that do not lead to enrollment</strong>: retained for up to 24
                  months, then deleted.
                </li>
                <li>
                  <strong>Enrollment and coursework records</strong>: retained while you are
                  enrolled and for a period afterwards so certificates can be verified.
                </li>
                <li>
                  <strong>Financial records</strong>: retained for the period required by US tax
                  and accounting rules.
                </li>
                <li>
                  <strong>Mailing list</strong>: until you unsubscribe.
                </li>
              </ul>
              <h2 id="rights" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Your privacy rights
              </h2>
              <p>
                Depending on where you live, you may have the right to request access to the
                personal information we hold about you, correction of inaccurate information,
                deletion of your information, a portable copy, or to opt out of certain processing.
                Residents of states with comprehensive privacy laws, including California,
                Colorado, Connecticut, Virginia, Utah and others, have these rights under
                applicable state law.
              </p>
              <p>
                To exercise any of these rights, email{" "}
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. We will respond
                within the time required by applicable law. We will not discriminate against you for
                exercising a privacy right.
              </p>
              <h2 id="security" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                How we protect information
              </h2>
              <p>
                We use encryption in transit, access controls limiting who can see personal
                information, and vendor review before adopting a service that will process it. No
                system is perfectly secure, so we also limit what we collect in the first place.
              </p>
              <h2 id="children" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Children&rsquo;s privacy
              </h2>
              <p>
                Our programs are intended for people aged 18 and over. We do not knowingly collect
                personal information from children under 13. If you believe a child has provided us
                with personal information, contact us and we will delete it.
              </p>
              <h2 id="changes" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                Changes to this policy
              </h2>
              <p>
                If this policy changes materially, we will update the date at the top of this page
                and, where appropriate, notify enrolled learners by email.
              </p>
              <h2 id="contact" style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}>
                How to contact us
              </h2>
              <p>
                Privacy questions and requests:{" "}
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. General inquiries
                can go through the <Link href="/contact">contact page</Link>. See also our{" "}
                <Link href="/terms">Terms &amp; Conditions</Link>.
              </p>
            </div>
          </div>
          <aside className={styles.aside} aria-label="Policy sections">
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
