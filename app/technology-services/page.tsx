import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { AnswerBox, CtaBand, FaqList, Hero, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { ArrowRight, Chart, Cloud, Network, Refresh, Shield, Terminal } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Technology Services", href: "/technology-services" },
];

export const metadata: Metadata = buildMetadata({
  title: "Technology Services for US Organizations",
  description:
    "Network and cloud architecture review, infrastructure automation, security operations readiness and documentation services for US organizations.",
  path: "/technology-services",
});

const services = [
  {
    icon: Network,
    title: "Network design and review",
    body: "Assessment of an existing enterprise network or design work for a new site, delivered as a written report with a prioritized action list.",
    points: [
      "Topology, addressing and segmentation review",
      "Resilience and failure-domain analysis",
      "Configuration standard and drift assessment",
      "New site or refresh design with an addressing plan",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud architecture assessment",
    body: "Review of an AWS or Azure environment against reliability, security and cost criteria, with quantified findings rather than generic recommendations.",
    points: [
      "Identity and least-privilege review",
      "Network and exposure assessment",
      "Reliability and backup verification",
      "Cost analysis with prioritized reduction options",
    ],
  },
  {
    icon: Refresh,
    title: "Infrastructure automation",
    body: "Converting manual, repeated infrastructure work into reviewed, version-controlled automation your team can maintain after we leave.",
    points: [
      "Infrastructure as code adoption",
      "CI/CD pipeline design and hardening",
      "Network configuration automation",
      "Automated compliance and drift checks",
    ],
  },
  {
    icon: Shield,
    title: "Security operations readiness",
    body: "Defensive assessment of monitoring and response capability: what you can currently detect, what you cannot, and what to fix first.",
    points: [
      "Log source and detection coverage mapping",
      "Alert quality and false positive review",
      "Incident response process assessment",
      "Vulnerability management workflow review",
    ],
  },
  {
    icon: Terminal,
    title: "Documentation and runbooks",
    body: "The work that is always deferred: accurate diagrams, address plans, runbooks and onboarding material that match what is actually running.",
    points: [
      "Logical and physical network diagrams",
      "Operational runbooks and escalation paths",
      "Environment and dependency inventories",
      "Technical onboarding material",
    ],
  },
  {
    icon: Chart,
    title: "Data and reporting foundations",
    body: "Establishing reliable metric definitions, data quality checks and reporting that stakeholders can trust and use unaided.",
    points: [
      "Metric definition and reconciliation",
      "Data quality monitoring",
      "Dashboard design and rebuild",
      "Reporting handover and training",
    ],
  },
];

const faqs = [
  {
    question: "What technology services does Tungabadra Networks provide?",
    answer:
      "Network architecture and design, managed network services, NOC operations, network security, structured cabling and IT staffing. Engagements are delivered remotely or on-site, depending on the work.",
  },
  {
    question: "Who delivers the work?",
    answer:
      "The same engineers who teach the corresponding courses. That is deliberate: knowledge transfer is built into every engagement rather than sold separately.",
  },
  {
    question: "How are engagements scoped and priced?",
    answer:
      "Each engagement starts with a scoping call, followed by a written proposal with defined deliverables, timeline and a fixed price in US dollars. There is no cost for the scoping call or proposal.",
  },
  {
    question: "Do you offer offensive security testing or penetration testing?",
    answer:
      "No. Security work is defensive only, detection coverage, monitoring quality, incident response readiness and vulnerability management process. Penetration testing is not offered.",
  },
  {
    question: "What do we receive at the end of an engagement?",
    answer:
      "A written report with findings and a prioritized action list, any code or configuration produced during the engagement, updated documentation, and a walkthrough session with your team.",
  },
  {
    question: "Can services be combined with team training?",
    answer:
      "Yes, and it is a common combination: an assessment identifies gaps, and corporate training addresses the ones that are skill gaps rather than architecture gaps.",
  },
];

export default function TechnologyServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/technology-services",
            name: "Technology Services for US Organizations",
            description:
              "Network and cloud architecture review, infrastructure automation, security operations readiness and documentation services.",
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />
      <Hero
        eyebrow="For US employers"
        title="Technology services delivered by the engineers who teach"
        lede="Network and cloud architecture review, infrastructure automation, security operations readiness and the documentation work that never gets scheduled, with knowledge transfer built in."
        crumbs={crumbs}
        image="/images/texture-wide-3.png"
        actions={[
          { label: "Request a scoping call", href: "#request" },
          { label: "Corporate training", href: "/corporate-training", variant: "ghost-dark" },
        ]}
      />
      <section className="section section--tight" aria-labelledby="svc-intro">
        <div className="container">
          <h2 className="h2" id="svc-intro" style={{ marginBottom: 18 }}>
            What technology services does Tungabadra Networks provide?
          </h2>
          <AnswerBox>
            <strong>
              Tungabadra Networks provides six technology service lines to US organizations:
            </strong>{" "}
            network design and review, cloud architecture assessment, infrastructure automation,
            security operations readiness, documentation and runbook work, and data reporting
            foundations. Every engagement is delivered against a written scope with defined
            deliverables and a fixed US dollar price.
          </AnswerBox>
        </div>
      </section>
      <section className="section section--flush-top" aria-labelledby="svc-list">
        <div className="container">
          <SectionHead
            eyebrow="Service lines"
            title="What we take on"
            lede="Each engagement ends in a written report and a prioritized action list, not a slide deck."
            id="svc-list"
          />
          <div className="grid grid--3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.title} className="card">
                  <span className="icon-tile" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3 className="h5">{s.title}</h3> <p className="card__body">{s.body}</p>
                  <ul className="checklist" style={{ marginTop: 4 }}>
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section on-dark" aria-labelledby="svc-how">
        <div className="container">
          <SectionHead
            eyebrow="How engagements run"
            title="Scoped, fixed-price and documented"
            lede="No open-ended hourly billing and no findings you cannot act on."
            center
            id="svc-how"
          />
          <div className="grid grid--4">
            {[
              {
                n: "01",
                t: "Scoping call",
                b: "A conversation about the environment, the problem and what a good outcome looks like. No charge.",
              },
              {
                n: "02",
                t: "Written proposal",
                b: "Deliverables, timeline, access requirements and a fixed price in US dollars, before any commitment.",
              },
              {
                n: "03",
                t: "Delivery",
                b: "Assessment or build work, with a checkpoint partway through so nothing arrives as a surprise.",
              },
              {
                n: "04",
                t: "Handover",
                b: "Written report, all artifacts produced, and a walkthrough session so your team can carry it forward.",
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
      <section className="section section--tight" aria-labelledby="svc-scope">
        <div className="container">
          <div className="card card--muted" style={{ maxWidth: 820 }}>
            <h2 className="h5" id="svc-scope">
              What is deliberately out of scope
            </h2>
            <ul className="checklist">
              <li>Penetration testing and offensive security engagements</li>
              <li>Managed service or 24/7 operations contracts</li>
              <li>Hardware or software resale</li>
              <li>Staff augmentation on an open-ended hourly basis</li>
            </ul>
            <p className="card__body">
              If your need falls outside this list, say so on the contact form and we will tell you
              plainly whether we can help or point you elsewhere.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--tight" aria-labelledby="svc-faq">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Services questions" center id="svc-faq" />
          <div style={{ maxWidth: 860, marginInline: "auto" }}>
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>
      <section
        className="section"
        id="request"
        aria-labelledby="svc-request"
        style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}
      >
        <div className="container">
          <div
            className="grid grid--2"
            style={{ alignItems: "start", gap: "clamp(28px, 4vw, 52px)" }}
          >
            <div className="stack">
              <p className="eyebrow">Request a scoping call</p>
              <h2 className="h2" id="svc-request">
                Tell us what you are trying to fix
              </h2>
              <p className="lede">
                Describe the environment and the problem. You will get a written proposal with
                defined deliverables and a fixed price, or an honest answer that we are not the
                right fit.
              </p>
              <p className="lede">
                Looking to build the capability internally instead? See{" "}
                <Link
                  href="/corporate-training"
                  className="link-arrow"
                  style={{ display: "inline" }}
                >
                  corporate training <ArrowRight size={15} />
                </Link>
              </p>
            </div>
            <InquiryForm
              defaultInterest="services"
              heading="Technology services inquiry"
              defaultSubject="Technology services"
            />
          </div>
        </div>
      </section>
      <CtaBand
        title="Build the capability in-house instead?"
        lede="Corporate training brings the same engineers to your team as instructors rather than consultants."
        primary={{ label: "Corporate Training", href: "/corporate-training" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
