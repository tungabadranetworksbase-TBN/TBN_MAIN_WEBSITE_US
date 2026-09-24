import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { AnswerBox, CtaBand, FaqList, Hero, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { ArrowRight, Book, Layers, Refresh, Users } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { courses } from "@/lib/courses";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Corporate Training", href: "/corporate-training" },
];

export const metadata: Metadata = buildMetadata({
  title: "Corporate Technology Training for US Teams",
  description:
    "Cohort technology training for US engineering, infrastructure and IT teams. Delivered live online or on-site, scoped to the stack your team already runs.",
  path: "/corporate-training",
});

const faqs = [
  {
    question: "What is Tungabadra Networks corporate training?",
    answer:
      "Corporate training is cohort instruction delivered to a single organization's team, scoped to that team's existing stack and skill baseline. It is delivered live online or on-site at your location, on a schedule agreed with you.",
  },
  {
    question: "What is the minimum team size?",
    answer:
      "Cohorts typically run from 6 to 20 participants. Smaller teams are usually better served by enrolling individuals in scheduled public courses.",
  },
  {
    question: "Can the curriculum use our own systems?",
    answer:
      "Where appropriate and permitted by your security policy, yes. Labs can be adapted to mirror your architecture and tooling so the training transfers directly. Otherwise equivalent sandbox environments are provided.",
  },
  {
    question: "How is delivery scheduled?",
    answer:
      "Common patterns are a half day per week over several weeks, or a concentrated block of consecutive days. Weekly delivery generally produces better retention because it leaves time to apply each topic between sessions.",
  },
  {
    question: "Do participants receive certificates?",
    answer:
      "Yes. Participants who complete the graded work receive a certificate of completion listing the modules covered and the skills applied.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Corporate engagements are quoted per cohort based on scope, duration and delivery mode, in US dollars. Send the details of your team and objectives and you will receive a written proposal.",
  },
];

const formats = [
  {
    icon: Users,
    title: "Team cohort training",
    body: "One team, one cohort, one curriculum. Everyone reaches the same topics in the same week, so the team can apply them to shared systems immediately.",
  },
  {
    icon: Layers,
    title: "Skills gap program",
    body: "A skills assessment first, then a curriculum targeting only what the team is actually missing, rather than paying for content they already know.",
  },
  {
    icon: Refresh,
    title: "Migration and adoption training",
    body: "Focused training tied to a specific change: a cloud migration, a Kubernetes adoption, a network refresh, or a shift to infrastructure as code.",
  },
  {
    icon: Book,
    title: "Onboarding curriculum",
    body: "A repeatable technical onboarding track for new hires, built once against your stack and documentation so it can be run every quarter.",
  },
];

const corporateCourses = courses.filter((c) =>
  c.deliveryFormats.includes("Corporate (on-site)"),
);

export default function CorporateTrainingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/corporate-training",
            name: "Corporate Technology Training for US Teams",
            description:
              "Cohort technology training for US engineering, infrastructure and IT teams, delivered live online or on-site.",
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />
      <Hero
        eyebrow="For US employers"
        title="Corporate training scoped to the stack your team already runs"
        lede="Cohort training for engineering, infrastructure and IT teams. Delivered live online or on-site at your premises, built around your architecture rather than a generic syllabus."
        crumbs={crumbs}
        image="/images/card-bg-large.png"
        actions={[
          { label: "Request a proposal", href: "#request" },
          { label: "See course catalog", href: "/courses", variant: "ghost-dark" },
        ]}
      />
      <section className="section section--tight" aria-labelledby="corp-intro">
        <div className="container">
          <h2 className="h2" id="corp-intro" style={{ marginBottom: 18 }}>
            What is corporate training at Tungabadra Networks?
          </h2>
          <AnswerBox>
            <strong>
              Corporate training is cohort instruction delivered to one organization&rsquo;s team,
              scoped to that team&rsquo;s existing stack and current skill level.
            </strong>{" "}
            It draws on the same {courses.length}-course catalog used for public enrollment, adapted
            so labs and projects mirror the systems your engineers actually work on. Delivery is
            live online, or on-site at your premises.
          </AnswerBox>
        </div>
      </section>
      <section className="section section--flush-top" aria-labelledby="corp-formats">
        <div className="container">
          <SectionHead
            eyebrow="Engagement types"
            title="Four ways teams use TBN training"
            lede="Each starts from what the team needs to be able to do, not from a fixed syllabus."
            id="corp-formats"
          />
          <div className="grid grid--4">
            {formats.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.title} className="card">
                  <span className="icon-tile" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3 className="h5">{f.title}</h3> <p className="card__body">{f.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* ------------------------------------------------------- process --- */}{" "}
      <section className="section on-dark" aria-labelledby="corp-process">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="From first call to delivered cohort"
            lede="A short, predictable process with a written proposal before any commitment."
            center
            id="corp-process"
          />
          <div className="grid grid--4">
            {[
              {
                n: "01",
                t: "Scoping call",
                b: "We discuss the team, their current level, the systems they run and what they need to be able to do afterwards.",
              },
              {
                n: "02",
                t: "Written proposal",
                b: "You receive a curriculum outline, schedule options, delivery mode and a fixed price in US dollars.",
              },
              {
                n: "03",
                t: "Delivery",
                b: "Live sessions plus lab work, on the agreed schedule, with the same graded review used in public courses.",
              },
              {
                n: "04",
                t: "Handover",
                b: "Completion certificates, lab materials your team keeps, and a short report on where gaps remain.",
              },
            ].map((s) => (
              <article key={s.n} className="card">
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: "var(--accent)",
                  }}
                  aria-hidden="true"
                >
                  {s.n}
                </p>
                <h3 className="h5">{s.t}</h3> <p className="card__body">{s.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* --------------------------------------------------- what's included */}{" "}
      <section className="section" aria-labelledby="corp-included">
        <div className="container">
          <div
            className="grid grid--2"
            style={{ alignItems: "start", gap: "clamp(28px, 4vw, 52px)" }}
          >
            <div className="stack">
              <p className="eyebrow">What is included</p>
              <h2 className="h2" id="corp-included">
                Every corporate engagement includes
              </h2>
              <ul className="checklist">
                <li>
                  A pre-delivery skills assessment so the curriculum starts at the right level
                </li>
                <li>Curriculum adapted to your stack, tooling and terminology</li>
                <li>Live instruction from an engineer who works in the subject area</li>
                <li>Lab environments provisioned and torn down for you</li>
                <li>Graded projects with written feedback, not just attendance tracking</li>
                <li>Lab materials and documentation your team keeps afterwards</li>
                <li>Certificates of completion listing modules and skills covered</li>
                <li>A closing report identifying remaining gaps and suggested next steps</li>
              </ul>
            </div>
            <div className="card card--muted">
              <h3 className="h5">Subject areas available</h3>
              <p className="card__body">
                Every course below can be delivered to a private cohort, live online or on-site at
                your premises:
              </p>
              <ul className="checklist">
                {corporateCourses.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/courses/${c.slug}`}>{c.title}</Link>
                  </li>
                ))}
              </ul>
              <Link href="/courses" className="link-arrow" style={{ marginTop: 4 }}>
                View the full catalog <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--tight" aria-labelledby="corp-faq">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Corporate training questions" center id="corp-faq" />
          <div style={{ maxWidth: 860, marginInline: "auto" }}>
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>
      {/* -------------------------------------------------------- request --- */}{" "}
      <section
        className="section"
        id="request"
        aria-labelledby="corp-request"
        style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}
      >
        <div className="container">
          <div
            className="grid grid--2"
            style={{ alignItems: "start", gap: "clamp(28px, 4vw, 52px)" }}
          >
            <div className="stack">
              <p className="eyebrow">Request a proposal</p>
              <h2 className="h2" id="corp-request">
                Tell us about your team
              </h2>
              <p className="lede">
                Include the team size, their current level, the systems they work on and what they
                need to be able to do afterwards. You will receive a written proposal with
                curriculum, schedule options and a fixed US dollar price.
              </p>
              <ul className="checklist">
                <li>No cost and no obligation for the scoping call or proposal</li>
                <li>Response within one business day</li>
                <li>We will say if a public course would serve you better</li>
              </ul>
            </div>
            <InquiryForm
              defaultInterest="corporate"
              heading="Corporate training inquiry"
              defaultSubject="Corporate training"
            />
          </div>
        </div>
      </section>
      <CtaBand
        title="Also need engineering support?"
        lede="Technology services covers the work that sits alongside training: network and cloud architecture review, automation and documentation."
        primary={{ label: "Technology Services", href: "/technology-services" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
