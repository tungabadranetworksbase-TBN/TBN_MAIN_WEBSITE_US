import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { AnswerBox, CtaBand, FaqList, Hero, SectionHead } from "@/components/ui";
import { CertificationCard } from "@/components/cards";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { certificationCourses, certificationTracks, certificationVendors } from "@/lib/programs";
import { courses } from "@/lib/courses";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Certifications", href: "/certifications" },
];

export const metadata: Metadata = buildMetadata({
  title: "Certification Preparation Tracks",
  description: `${certificationTracks.length} certification prep tracks from Tungabadra Networks covering CompTIA, Cisco, AWS, Azure, Kubernetes and Terraform exam domains.`,
  path: "/certifications",
});

const faqs = [
  {
    question: "Does Tungabadra Networks issue these certifications?",
    answer:
      "No. These are third-party credentials issued by CompTIA, Cisco, Amazon Web Services, Microsoft, the Cloud Native Computing Foundation and HashiCorp. Tungabadra Networks courses cover the topic areas those exams assess; the exams themselves are registered, administered and issued by the vendors.",
  },
  {
    question: "Is Tungabadra Networks an authorized training partner?",
    answer:
      "No. Tungabadra Networks is not an authorized or accredited training partner of any certification vendor and does not claim affiliation with any of them.",
  },
  {
    question: "Which certification should I take first?",
    answer:
      "Take the one named most often in the job postings you are actually targeting. For people new to IT, CompTIA Network+ or Security+ are the usual starting points; for people already in an infrastructure role, Cisco CCNA or an associate-level cloud certification is generally more useful.",
  },
  {
    question: "Do I need to buy the exam separately?",
    answer:
      "Yes. Exam registration and fees are paid directly to the vendor and are not included in Tungabadra Networks course tuition.",
  },
  {
    question: "How long does exam preparation take?",
    answer:
      "The course covering each track runs 8 to 14 weeks at 7 to 9 hours per week. Most people schedule the exam two to four weeks after finishing the course, after dedicated revision.",
  },
  {
    question: "Does a certification alone get me hired?",
    answer:
      "A certification usually gets a resume past screening. Interviews test whether you can apply the knowledge, which is why every TBN course pairs exam-relevant content with graded lab work and projects.",
  },
];

export default function CertificationsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/certifications",
            name: "Certification Preparation Tracks",
            description: `Certification preparation tracks offered by Tungabadra Networks across ${certificationVendors.length} vendors.`,
            type: "CollectionPage",
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />
      <Hero
        eyebrow="Certifications"
        title="Exam preparation that doubles as job preparation"
        lede={`${certificationTracks.length} certification tracks mapped to the exam domains of widely requested credentials. Each track names the Tungabadra Networks course that covers it.`}
        crumbs={crumbs}
        image="/images/texture-4.png"
        actions={[
          { label: "Explore Courses", href: "/courses" },
          { label: "Ask which exam fits", href: "/contact", variant: "ghost-dark" },
        ]}
      />
      <section className="section section--tight" aria-labelledby="cert-intro">
        <div className="container">
          <h2 className="h2" id="cert-intro" style={{ marginBottom: 18 }}>
            How do Tungabadra Networks certification tracks work?
          </h2>
          <AnswerBox>
            <strong>
              A certification track is a Tungabadra Networks course whose curriculum covers the
              topic areas assessed by a third-party exam.
            </strong>{" "}
            You take the course, complete its graded projects, then register and pay for the exam
            directly with the vendor. Tungabadra Networks does not administer, issue or resell any
            of these exams, and is not an authorized training partner of any vendor listed below.
          </AnswerBox>
        </div>
      </section>
      {/* ------------------------------------------------ comparison table -- */}{" "}
      <section className="section section--flush-top" aria-labelledby="cert-table">
        <div className="container">
          <SectionHead
            eyebrow="At a glance"
            title="Every track, and the course that covers it"
            lede="Compare level and coverage before choosing which exam to prepare for."
            id="cert-table"
          />
          <div className="table-wrap">
            <table className="table">
              <caption className="visually-hidden">
                Certification exams, issuing vendor, level, the TBN course that covers the domains,
                and who each suits
              </caption>
              <thead>
                <tr>
                  <th scope="col">Exam</th>
                  <th scope="col">Vendor</th>
                  <th scope="col">Level</th>
                  <th scope="col">Covered by</th>
                  <th scope="col">Best suited to</th>
                </tr>
              </thead>
              <tbody>
                {certificationTracks.map((track) => (
                  <tr key={track.slug}>
                    <th scope="row">
                      <Link href={`#${track.slug}`}>{track.exam}</Link>
                    </th>
                    <td>{track.vendor}</td>
                    <td>{track.level}</td>
                    <td>
                      {certificationCourses(track).map((c, i, arr) => (
                        <span key={c.slug}>
                          <Link href={`/courses/${c.slug}`}>{c.title}</Link>
                          {i < arr.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td>{track.whoItSuits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* ----------------------------------------------------- track cards -- */}{" "}
      <section className="section section--tight" aria-labelledby="cert-cards">
        <div className="container">
          <SectionHead eyebrow="Tracks" title="Certification preparation tracks" id="cert-cards" />
          <div className="grid grid--3">
            {certificationTracks.map((track) => (
              <div
                key={track.slug}
                id={track.slug}
                style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}
              >
                <CertificationCard
                  exam={track.exam}
                  vendor={track.vendor}
                  summary={track.summary}
                  courses={certificationCourses(track).map((c) => ({
                    slug: c.slug,
                    title: c.title,
                  }))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ------------------------------------------------------- disclaimer -- */}{" "}
      <section className="section section--tight" aria-labelledby="cert-disclaimer">
        <div className="container">
          <div className="card card--muted" style={{ maxWidth: 820 }}>
            <h2 className="h5" id="cert-disclaimer">
              Vendor relationship disclosure
            </h2>
            <p className="card__body">
              CompTIA, Cisco, Amazon Web Services, Microsoft, the Cloud Native Computing Foundation
              and HashiCorp are the owners of the credentials referenced on this page. All
              trademarks belong to their respective owners.
            </p>
            <p className="card__body">
              Tungabadra Networks is not affiliated with, endorsed by, or an authorized training
              partner of any of these organizations. Course curricula are mapped to publicly
              published exam objectives. Exam registration, fees, administration and certification
              issuance are handled entirely by the vendor.
            </p>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="cert-faq">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Certification questions" center id="cert-faq" />
          <div style={{ maxWidth: 860, marginInline: "auto" }}>
            <FaqList faqs={faqs} />
          </div>
          <p className="lede" style={{ textAlign: "center", marginTop: 28, marginInline: "auto" }}>
            Browse{" "}
            <Link href="/courses" className="text-link">
              all {courses.length} courses
            </Link>
          </p>
        </div>
      </section>
      <CtaBand
        title="Not sure which exam is worth your time?"
        lede="Send us the job postings you are targeting. We will tell you which credential they actually ask for, and whether you need one at all."
        primary={{ label: "Talk to Us", href: "/contact" }}
        secondary={{ label: "See career paths", href: "/programs" }}
      />
    </>
  );
}
