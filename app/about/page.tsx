import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/brand/PageHero";
import Faq from "@/components/brand/Faq";
import JsonLd from "@/components/JsonLd";
import { AnswerBox, Breadcrumbs, DataTable, PageBody, Prose, SpecList } from "@/components/Prose";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { courses } from "@/lib/courses";
import { internships } from "@/lib/internships";
import { certificationTracks, programs } from "@/lib/programs";
import { faqGroups } from "@/lib/faqs";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export const metadata: Metadata = buildMetadata({
  title: "About Tungabadra Networks",
  description:
    "Tungabadra Networks is a US technology training organization offering courses, internships, certification prep, corporate training and technology services.",
  path: "/about",
});

const faqs = faqGroups.find((g) => g.id === "organization")!.faqs;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/about",
            name: "About Tungabadra Networks",
            description: site.definition,
            type: "AboutPage",
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />

      <PageHero
        titleTop="Networking training and"
        titleBottom="enterprise network services"
        subtitle={site.definition}
        statOneValue={String(courses.length)}
        statOneLabel="Courses"
        statTwoValue={String(internships.length)}
        statTwoLabel="Internships"
        ctaLabel="Talk to Us"
        ctaHref="/contact"
      />

      <PageBody>
        <Breadcrumbs items={crumbs} />

        <Prose>
          <h2 style={{ marginTop: 0 }}>What is Tungabadra Networks?</h2>
        </Prose>

        <AnswerBox>
          <strong>
            Tungabadra Networks is a technology training and professional development organization
            serving organizations across the United States.
          </strong>{" "}
          It offers instructor-led technology courses, structured internship programs, certification
          preparation, multi-course career paths, corporate training for teams and technology
          services for employers.
        </AnswerBox>

        <div style={{ marginTop: 32 }}>
          <SpecList items={[...site.facts]} columns={3} />
        </div>

        <Prose>
          <p style={{ marginTop: 32 }}>
            The organization takes its name from the confluence of the Tunga and Bhadra rivers, two
            streams that become one. It is a fair description of the work: technical instruction and
            applied practice only become a career when they meet.
          </p>
          <h2>What Tungabadra Networks does</h2>
        </Prose>

        <div style={{ marginTop: 20 }}>
          <DataTable
            caption="Tungabadra Networks activities, what each covers, and who it serves"
            head={["Activity", "What it covers", "Who it serves"]}
            rows={[
              [
                <Link key="c" href="/courses">
                  Technology courses
                </Link>,
                `${courses.length} project-based courses across networking, cloud, cybersecurity, software development, data, DevOps and Linux`,
                "Students, career changers, working professionals",
              ],
              [
                <Link key="i" href="/internships">
                  Internship programs
                </Link>,
                `${internships.length} mentored tracks, 8 to 12 weeks, with reviewed work and a completion certificate`,
                "Learners across the US seeking applied experience",
              ],
              [
                <Link key="p" href="/programs">
                  Career paths
                </Link>,
                `${programs.length} multi-course programs that sequence skills and end in an internship placement`,
                "People targeting a role rather than a single skill",
              ],
              [
                <Link key="x" href="/certifications">
                  Certification preparation
                </Link>,
                `${certificationTracks.length} tracks mapped to widely requested third-party exam domains`,
                "Professionals whose target roles name a credential",
              ],
              [
                <Link key="t" href="/corporate-training">
                  Corporate training
                </Link>,
                "Cohort training scoped to the stack a team already runs, delivered live online or on-site",
                "US employers upskilling engineering and IT teams",
              ],
              [
                <Link key="s" href="/technology-services">
                  Technology services
                </Link>,
                "Network and cloud architecture review, automation and documentation work",
                "US employers needing specialist infrastructure support",
              ],
            ]}
          />
        </div>

        <Prose>
          <h2>What we deliberately do not claim</h2>
          <p>
            The figures on this site (engineers trained, placements, salary hike and partner
            count) are Tungabadra Networks&rsquo; own published figures, reproduced as claims we make
            about ourselves rather than independently audited results. We publish no awards,
            accreditations, rankings or reviews, and no course fees or fixed durations, because
            those are set per batch and confirmed on the consultation call.
          </p>
          <p>
            Tungabadra Networks is not an authorized training partner of any certification vendor,
            and does not guarantee employment.
          </p>
          <p>
            We do not provide proxy interview support of any kind. We do not attend interviews on a
            candidate&rsquo;s behalf, assist during a live interview, or misrepresent anyone&rsquo;s
            identity, experience or work. Placement support is preparation: mock interviews,
            portfolio and resume review, and introductions to hiring partners. Candidates attend
            their own interviews and answer for their own work, because a role obtained any other
            way does not survive the first month of it.
          </p>
        </Prose>
      </PageBody>
      <Faq />
    </>
  );
}
