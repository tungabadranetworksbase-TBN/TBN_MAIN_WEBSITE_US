import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { AnswerBox, CtaBand, FaqList, Hero, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { Chart, Check, Layers, Network, Shield, Terminal } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Project Support", href: "/project-support" },
];

export const metadata: Metadata = buildMetadata({
  title: "Network Project Support for US Organizations",
  description:
    "Engineers who run production networks, working alongside your team on a live project: design review, implementation, automation and root cause analysis.",
  path: "/project-support",
});

const faqs = [
  {
    question: "What is project support at Tungabadra Networks?",
    answer:
      "Project support places our engineers alongside yours for the duration of a specific piece of work, rather than handing over a finished deliverable and leaving. The scope is a project with an end: a design review, a site rollout, an automation build or a recurring fault nobody has closed out.",
  },
  {
    question: "How is this different from technology services?",
    answer:
      "Technology services are scoped engagements with a defined deliverable, such as an architecture review or a security readiness assessment. Project support is people working with your team on your project, on your schedule, and it is the right shape when the work is already underway or the scope will move as you learn more.",
  },
  {
    question: "Do you take over the project?",
    answer:
      "No. Your team keeps ownership and makes the decisions. Our engineers add capacity and vendor depth where you need it, and everything they build is documented so it stays maintainable after they leave.",
  },
  {
    question: "Which vendors and platforms do you cover?",
    answer:
      "Cisco, Juniper, Palo Alto, Aruba and Arista on the network side, AWS on the cloud side, and Python, Ansible and CI/CD tooling for automation. These are the same platforms the engineering division runs in production and teaches in the labs.",
  },
  {
    question: "Can you work remotely?",
    answer:
      "Yes. Most project support is delivered remotely, with on-site attendance arranged where a cutover or a physical build needs someone in the room.",
  },
  {
    question: "How is it priced?",
    answer:
      "Engagements are quoted per project in US dollars, based on scope, duration and how much on-site time is needed. Send the project details and you will receive a written proposal before any commitment.",
  },
];

const areas = [
  {
    icon: Network,
    title: "Design review before you build",
    body: "A second pair of eyes on the topology, addressing, segmentation and failure domains while the design is still cheap to change, with the reasoning written down.",
  },
  {
    icon: Layers,
    title: "Implementation and rollout",
    body: "Staged builds, configuration standards, change windows and cutover support for a new site, a refresh or a migration, including the rollback plan.",
  },
  {
    icon: Terminal,
    title: "Automation build",
    body: "Turning a repetitive change into a tested, version-controlled tool: Python and Netmiko against your fleet, Ansible playbooks, and validation that runs before anything reaches a device.",
  },
  {
    icon: Shield,
    title: "Security and segmentation work",
    body: "Firewall policy review, rule base cleanup and segmentation design across Palo Alto and multi-vendor estates, with each change justified rather than assumed.",
  },
  {
    icon: Chart,
    title: "Monitoring and visibility",
    body: "Alert coverage that catches what matters and stays quiet otherwise, plus the dashboards and thresholds your operations team will actually use.",
  },
  {
    icon: Check,
    title: "Root cause on a recurring fault",
    body: "Packet-level investigation of the intermittent problem that keeps reopening, ending in a written root cause analysis and the change that closes it.",
  },
];

const process = [
  {
    n: "01",
    t: "Scoping call",
    b: "You describe the project, where it stands and what is blocking it. We say plainly whether we are the right fit.",
  },
  {
    n: "02",
    t: "Written proposal",
    b: "Scope, the engineers assigned, the working pattern, expected duration and a fixed price in US dollars.",
  },
  {
    n: "03",
    t: "Work alongside your team",
    b: "Our engineers join your calls and your change process. Your team keeps ownership and makes the decisions.",
  },
  {
    n: "04",
    t: "Documented handover",
    b: "Configurations, diagrams, runbooks and any tooling built, handed over so your team can maintain it without us.",
  },
];

export default function ProjectSupportPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/project-support",
            name: "Network Project Support for US Organizations",
            description:
              "Engineers who run production networks, working alongside your team on a live project, from design review through rollout.",
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />

      <Hero
        eyebrow="For US organizations"
        title="Our engineers on your project, until it lands"
        lede="Design review, implementation, automation and root cause analysis, delivered by the engineers who run production networks and teach the labs. Your team keeps ownership."
        crumbs={crumbs}
        image="/images/card-bg-large.png"
        actions={[
          { label: "Describe your project", href: "#request" },
          { label: "Technology Services", href: "/technology-services", variant: "ghost-dark" },
        ]}
      />

      <section className="section section--tight" aria-labelledby="ps-intro">
        <div className="container">
          <h2 className="h2" id="ps-intro" style={{ marginBottom: 18 }}>
            What is project support?
          </h2>
          <AnswerBox>
            <strong>
              Project support places Tungabadra Networks engineers alongside your team for the
              length of one specific project, rather than delivering a document and leaving.
            </strong>{" "}
            It suits work that is already underway, work whose scope will move as you learn more,
            and work where your team has the context but not the capacity. The same engineers who
            run production enterprise networks do this work, so the depth is current rather than
            remembered.
          </AnswerBox>
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="ps-areas">
        <div className="container">
          <SectionHead
            eyebrow="Where it helps"
            title="Six places a project stalls"
            lede="Each of these is a project with an end, not an open-ended retainer."
            id="ps-areas"
          />
          <div className="grid grid--3">
            {areas.map((a) => {
              const Icon = a.icon;
              return (
                <article key={a.title} className="card">
                  <span className="icon-tile" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3 className="h5">{a.title}</h3>
                  <p className="card__body">{a.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section on-dark" aria-labelledby="ps-process">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="From first call to documented handover"
            lede="A written proposal before any commitment, and a handover your team can maintain."
            center
            id="ps-process"
          />
          <div className="grid grid--4">
            {process.map((s) => (
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
                <h3 className="h5">{s.t}</h3>
                <p className="card__body">{s.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ps-included">
        <div className="container">
          <div
            className="grid grid--2"
            style={{ alignItems: "start", gap: "clamp(28px, 4vw, 52px)" }}
          >
            <div className="stack">
              <p className="eyebrow">What you get</p>
              <h2 className="h2" id="ps-included">
                What leaves with you at the end
              </h2>
              <ul className="checklist">
                <li>Named engineers, not a rotating pool</li>
                <li>Working inside your change process rather than around it</li>
                <li>Configurations and topology diagrams kept current as the work goes</li>
                <li>Runbooks for anything your team will operate afterwards</li>
                <li>Any tooling built, in your version control, with its history intact</li>
                <li>A written close-out covering what was done and what remains</li>
              </ul>
            </div>
            <div className="card card--muted">
              <h3 className="h5">What this is not</h3>
              <p className="card__body">
                Project support is deliberately bounded, and it is worth being clear about the
                shape so the proposal matches what you need:
              </p>
              <ul className="checklist">
                <li>Not an open-ended retainer</li>
                <li>Not managed services or a staffed NOC</li>
                <li>Not a handover of ownership to us</li>
              </ul>
              <p className="card__body" style={{ marginTop: 4 }}>
                If ongoing operations are what you are after, technology services covers managed
                network services and NOC support instead.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="ps-faq">
        <div className="container">
          <SectionHead eyebrow="Questions" title="Project support FAQ" id="ps-faq" />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section
        className="section"
        id="request"
        aria-labelledby="ps-request"
        style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}
      >
        <div className="container">
          <div
            className="grid grid--2"
            style={{ alignItems: "start", gap: "clamp(28px, 4vw, 52px)" }}
          >
            <div className="stack">
              <p className="eyebrow">Describe your project</p>
              <h2 className="h2" id="ps-request">
                Tell us what is blocking it
              </h2>
              <p className="lede">
                Include what the project is, where it currently stands, the platforms involved and
                what done looks like. You will receive a written proposal with scope, working
                pattern and a fixed US dollar price.
              </p>
              <ul className="checklist">
                <li>No cost and no obligation for the scoping call or proposal</li>
                <li>Response within one business day</li>
                <li>We will say if the work does not need us</li>
              </ul>
            </div>
            <InquiryForm
              defaultInterest="services"
              heading="Project support inquiry"
              defaultSubject="Project support"
            />
          </div>
        </div>
      </section>

      <CtaBand
        title="Need the team trained as well?"
        lede="Corporate training runs the same engineers as instructors, scoped to the stack your team already works on."
        primary={{ label: "Corporate Training", href: "/corporate-training" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
