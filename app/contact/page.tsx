import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { CtaBand, FaqList, PageHead, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import ContactFormWithQuery from "@/components/ContactFormWithQuery";
import { Clock, Mail, MapPin, Phone } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export const metadata: Metadata = buildMetadata({
  title: "Contact Tungabadra Networks",
  description:
    "Contact Tungabadra Networks about a course, internship application, corporate training or technology services. Inquiries answered within one business day.",
  path: "/contact",
});

const faqs = [
  {
    question: "How quickly does Tungabadra Networks respond?",
    answer: `Inquiries submitted through this page are answered within one business day, ${site.contact.hours}.`,
  },
  {
    question: "What should I include in a course inquiry?",
    answer:
      "Your current background, the role or skill you are aiming for, and your available hours per week. That is enough for us to recommend a specific course or path, or to tell you we are not the right fit.",
  },
  {
    question: "Can I speak to someone before enrolling?",
    answer:
      "Yes. Say so in your message and include your time zone, and we will arrange a call rather than replying by email.",
  },
  {
    question: "How do I apply for an internship?",
    answer:
      "Use the application form on the specific internship page so your application is routed to the right mentor. General questions can come through this page.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/contact",
            name: "Contact Tungabadra Networks",
            description:
              "Contact Tungabadra Networks about courses, internships, corporate training or technology services.",
            type: "ContactPage",
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />

      <PageHead
        eyebrow="Contact"
        title="Talk to Tungabadra Networks"
        lede="Tell us your background and what you are trying to do. We reply within one business day, including when the honest answer is that we are not the right fit."
        crumbs={crumbs}
      />

      <section className="section section--flush-top" aria-labelledby="contact-form">
        <div className="container" style={{ display: "grid", gap: "clamp(28px, 4vw, 52px)" }}>
          <div
            className="grid grid--2"
            style={{ alignItems: "start", gap: "clamp(28px, 4vw, 52px)" }}
          >
            <div className="stack">
              <h2 className="h3" id="contact-form">
                Reach us directly
              </h2>

              <div className="card">
                <h3 className="h5">Direct contact</h3>
                <ul className="stack" style={{ gap: 12, marginTop: 4, listStyle: "none" }}>
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="row" style={{ gap: 10 }}>
                      <Mail size={18} />
                      {site.contact.email}
                      <span className="card__meta">(courses, internships &amp; business)</span>
                    </a>
                  </li>
                  <li>
                    <a href={site.contact.phoneHref} className="row" style={{ gap: 10 }}>
                      <Phone size={18} />
                      {site.contact.phone}
                    </a>
                  </li>
                  <li className="row" style={{ gap: 10, color: "var(--ink-2)" }}>
                    <Clock size={18} />
                    {site.contact.hours}
                  </li>
                  <li className="row" style={{ gap: 10, color: "var(--ink-2)" }}>
                    <MapPin size={18} />
                    {[site.contact.address.city, site.contact.address.region, "United States"].filter(Boolean).join(
                      ", ",
                    )}
                  </li>
                </ul>
              </div>

              <div className="card card--muted">
                <h3 className="h5">Faster routes</h3>
                <ul className="checklist">
                  <li>
                    Applying to an internship? Use the form on the{" "}
                    <Link href="/internships">specific internship page</Link> so it reaches the
                    right mentor.
                  </li>
                  <li>
                    Training a team? The <Link href="/corporate-training">corporate training</Link>{" "}
                    form captures what we need for a proposal.
                  </li>
                  <li>
                    General questions are often already answered on the{" "}
                    <Link href="/faq">FAQ page</Link>.
                  </li>
                </ul>
              </div>
            </div>

            {/*
              The prefill reads the query string on the client, so this page
              stays static and fully server-rendered. The fallback is the same
              form with default values, so nothing shifts when it hydrates.
            */}
            <Suspense fallback={<InquiryForm />}>
              <ContactFormWithQuery />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="contact-faq">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Before you write" center id="contact-faq" />
          <div style={{ maxWidth: 860, marginInline: "auto" }}>
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Still browsing?"
        lede="Compare the full course catalog and internship tracks before you write, it makes the conversation shorter."
        primary={{ label: "Explore Courses", href: "/courses" }}
        secondary={{ label: "Find an Internship", href: "/internships" }}
      />
    </>
  );
}
