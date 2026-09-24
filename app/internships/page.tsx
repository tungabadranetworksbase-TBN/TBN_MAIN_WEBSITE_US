import type { Metadata } from "next";
import PageHero from "@/components/brand/PageHero";
import CardSection from "@/components/brand/CardSection";
import { InternshipCard } from "@/components/cards";
import Faq from "@/components/brand/Faq";
import JsonLd from "@/components/JsonLd";
import { AnswerBox, PageBody, Prose } from "@/components/Prose";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { internships } from "@/lib/internships";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Internships", href: "/internships" },
];

export const metadata: Metadata = buildMetadata({
  title: "Technology Internships in the US",
  description: `${internships.length} mentored internship tracks in network operations, implementation, security, automation and career transition, alongside the Tungabadra Networks engineering team.`,
  path: "/internships",
});

const faqs = [
  {
    question: "Are Tungabadra Networks internships available in the US?",
    answer: `Yes. All ${internships.length} tracks are mentored placements alongside the engineering team, run on-site, hybrid or remote depending on the track.`,
  },
  {
    question: "How do I apply for an internship?",
    answer:
      "Open the page for the track you want and submit the application form. Applications are reviewed on a rolling basis, followed by a short technical exercise and a conversation with that track's mentor.",
  },
  {
    question: "How long are the internships?",
    answer:
      "Length is agreed at the start of each internship rather than fixed in advance, so it can fit alongside coursework or part-time employment. Confirm the schedule on your intro call.",
  },
];

export default function InternshipsPage() {

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/internships",
            name: "Technology Internships in the US",
            description: `All ${internships.length} internship tracks offered by Tungabadra Networks.`,
            type: "CollectionPage",
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
          {
            "@type": "ItemList",
            name: "Tungabadra Networks internships",
            numberOfItems: internships.length,
            itemListElement: internships.map((i, n) => ({
              "@type": "ListItem",
              position: n + 1,
              name: i.title,
              url: `/internships/${i.slug}`,
            })),
          },
        )}
      />

      <PageHero
        titleTop="Mentored internships"
        titleBottom="located in the US"
        subtitle="A named mentor, reviewed work every week, and a completion certificate listing what you actually delivered."
        statOneValue={String(internships.length)}
        statOneLabel="Tracks"
        statTwoValue="1:1"
        statTwoLabel="Mentored"
        ctaLabel="Apply Now"
        ctaHref="/contact?interest=internship"
      />

      <PageBody>
        <Prose>
          <h2 style={{ marginTop: 0 }}>What are Tungabadra Networks internships?</h2>
        </Prose>
        <AnswerBox>
          <strong>
            Tungabadra Networks runs {internships.length} mentored technology internship tracks for
            participants working alongside our engineering team.
          </strong>{" "}
          You work on scoped, reviewed tasks with an assigned mentor and finish with a completion
          certificate that lists what you delivered. Length is agreed at the start of the
          internship, so it can fit alongside coursework or a job.
        </AnswerBox>
      </PageBody>

      <CardSection eyebrow="Open tracks" title="Choose the work you want to do" id="tracks">
        {internships.map((internship) => (
          <InternshipCard key={internship.slug} internship={internship} />
        ))}
      </CardSection>

      <Faq />
    </>
  );
}
