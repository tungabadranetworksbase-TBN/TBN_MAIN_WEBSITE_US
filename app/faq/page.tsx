import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/brand/PageHero";
import Faq from "@/components/brand/Faq";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, PageBody, Prose } from "@/components/Prose";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { allFaqs, faqGroups } from "@/lib/faqs";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "FAQ", href: "/faq" },
];

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: `${allFaqs.length} direct answers about Tungabadra Networks courses, internships, career paths, certifications, corporate training and how enrollment works.`,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/faq",
            name: "Frequently Asked Questions",
            description: `${allFaqs.length} answers about Tungabadra Networks programs, enrollment and services.`,
            type: "FAQPage",
          }),
          breadcrumbSchema(crumbs),
          faqSchema(allFaqs),
        )}
      />

      <PageHero
        titleTop="Frequently asked"
        titleBottom="questions"
        subtitle={`${allFaqs.length} direct answers about courses, internships, career paths, certifications and how enrollment works.`}
        statOneValue={String(allFaqs.length)}
        statOneLabel="Answers"
        statTwoValue={String(faqGroups.length)}
        statTwoLabel="Topics"
        ctaLabel="Talk to Us"
        ctaHref="/contact"
      />

      <PageBody>
        <Breadcrumbs items={crumbs} />

        {faqGroups.map((group) => (
          <section key={group.id} id={group.id} style={{ marginBottom: 44 }}>
            <Prose>
              <h2 style={{ marginTop: 0 }}>{group.title}</h2>
              <p>{group.blurb}</p>
              <dl>
                {group.faqs.map((f) => (
                  <div key={f.question} style={{ marginTop: "1.4em" }}>
                    <dt>
                      <strong>{f.question}</strong>
                    </dt>
                    <dd style={{ margin: "0.35em 0 0" }}>{f.answer}</dd>
                  </div>
                ))}
              </dl>
            </Prose>
          </section>
        ))}

        <Prose>
          <p>
            Course-specific questions are answered on each <Link href="/courses">course page</Link>,
            and track-specific questions on each <Link href="/internships">internship page</Link>.
            Anything else, <Link href="/contact">send us a message</Link>.
          </p>
        </Prose>
      </PageBody>

      <Faq />
    </>
  );
}
