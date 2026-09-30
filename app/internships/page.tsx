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

/**
 * Tracks and the bundle are counted apart. `internships.length` is 4, but one
 * of those is the Elite Career Path Bundle, which is the other three sold
 * together rather than a fourth track - so calling them all tracks overstates
 * the catalogue.
 */
const BUNDLES = internships.filter((i) => i.category === "Career Bundle");
const TRACKS = internships.filter((i) => i.category !== "Career Bundle");

export const metadata: Metadata = buildMetadata({
  title: "Technology Internships in the US",
  description: `${TRACKS.length} mentored internship tracks in enterprise networking, data center operations and automation, plus the Elite Career Path Bundle, alongside the Tungabadra Networks engineering team.`,
  path: "/internships",
});

const faqs = [
  {
    question: "Are Tungabadra Networks internships available in the US?",
    answer: `Yes. All ${TRACKS.length} tracks, and the Elite Career Path Bundle that carries all three, are mentored programmes run for students in the United States, delivered online with lab access.`,
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
            description: `All ${TRACKS.length} internship tracks offered by Tungabadra Networks, plus the Elite Career Path Bundle.`,
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
        titleBottom="for students in the United States"
        subtitle="A named mentor, reviewed work every week, and a completion certificate listing what you actually delivered."
        statOneValue={`${TRACKS.length}+1`}
        statOneLabel="Tracks + bundle"
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
            Tungabadra Networks runs {TRACKS.length} mentored technology internship tracks, plus
            the Elite Career Path Bundle that carries all {TRACKS.length} together, for
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
