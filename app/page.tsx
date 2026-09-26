import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Cpu,
  GraduationCap,
  Lifebuoy,
  Plus,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Hero18 from "@/components/originkit/hero-18";
import NextjsFlare from "@/components/ui/nextjs-flare";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/brand/Reveal";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, graph, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { homeFaqs } from "@/lib/faqs";
import { courses } from "@/lib/courses";
import s from "@/components/brand/home.module.css";

export const metadata: Metadata = buildMetadata({
  title: `${site.name}: Networking Training, Internships and Placements`,
  description:
    "Hands-on networking, cloud and automation training on real enterprise equipment. CCNA, CCNP, Palo Alto, Aruba, Juniper, AWS, Python, Ansible and CI/CD, with internship tracks from NOC to network automation engineer.",
  path: "/",
});

/** The catalog, as published on tungabadranetworks.in. */
const offer = [
  {
    icon: GraduationCap,
    title: "Networking courses",
    body: "Twelve courses from CCNA and CCNP through security, cloud, Linux, Python and network automation. Every module is taught on equipment, not slides.",
    meta: "12 courses",
    cls: "offerCell--lead",
  },
  {
    icon: Briefcase,
    title: "Internship tracks",
    body: "Three career paths: enterprise networking, data center operations, and data center with automation. Each ends in real-time project work.",
    meta: "3 tracks",
    cls: "offerCell--b",
  },
  {
    icon: Lifebuoy,
    title: "Project support",
    body: "Our engineers work alongside yours on a live project, from design review through rollout.",
    meta: "Engineer-led",
    cls: "offerCell--c",
  },
  {
    icon: Cpu,
    title: "Enterprise services",
    body: "Network architecture, implementation, managed services, a 24/7 NOC, security and firewall deployment, plus IT staffing. The same engineers who run these networks teach the labs.",
    meta: "Engineering division",
    cls: "offerCell--d",
  },
] as const;

const why = [
  {
    title: "Taught by engineers who run live networks",
    body: "Instructors manage production enterprise estates, and the CTO spent eight years as a Palo Alto TAC engineer. The syllabus tracks what those networks actually run.",
  },
  {
    title: "Physical equipment, 24/7 rack access",
    body: "Real Cisco, Palo Alto and Aruba hardware in enterprise labs. Online students get virtual rack access to the same environments.",
  },
  {
    title: "Packet-level from day one",
    body: "Wireshark analysis runs through the training rather than being bolted on at the end. You learn to read what the wire is doing.",
  },
  {
    title: "Automation taught as the job, not an add-on",
    body: "Python, Netmiko, Ansible, REST APIs and CI/CD pipelines run against real devices, and they start from first principles. Networking knowledge is the prerequisite, not software experience.",
  },
];

const services = [
  "Network architecture",
  "Implementation",
  "Infrastructure automation",
  "Cloud & hybrid connectivity",
  "Managed services",
  "24/7 NOC",
  "Network security",
  "Firewall deployment",
  "Monitoring & SLA",
  "IT staffing",
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/",
            name: `${site.name}: Networking Training, Internships and Placements`,
            description: site.description,
          }),
          faqSchema(homeFaqs),
        )}
      />

      <Hero18 />

      {/* 1. figures - the organisation's own published numbers */}
      <section className="shell" aria-label="Results to date">
        <Reveal>
          <dl className={s.figures}>
            {site.figures.map((f) => (
              <div key={f.label} className={s.figure}>
                {/* dt before dd is required; column-reverse puts the number on top */}
                <dt className={s.figureLabel}>{f.label}</dt>
                <dd className={s.figureValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* 2. what we do - asymmetric bento, 4 items in 4 cells */}
      <section className="section shell" aria-labelledby="offer-h">
        <Reveal>
          <div className={s.offerHead}>
            <div className={s.offerHeadText}>
              <h2 className="d2" id="offer-h">
                Training, internships and the networks behind them
              </h2>
              <p className="lede">
                A training institute paired with an engineering division that designs, deploys and
                secures production enterprise networks.
              </p>
            </div>

            {/* Where the brand mark was. Decorative: the heading already names
                the company and the logo is in the nav, so it is hidden from the
                accessibility tree rather than described. */}
            <div className={s.offerMark} aria-hidden="true">
              <NextjsFlare />
              <Image
                src="/images/tbn-logo-full.png"
                alt=""
                width={1024}
                height={1024}
                sizes="300px"
                className={s.offerMarkLogo}
              />
            </div>
          </div>
        </Reveal>

        <div className={s.offer}>
          {offer.map((o, i) => {
            const Icon = o.icon;
            return (
              <Reveal key={o.title} delay={i * 70} className={`${s.offerCell} ${s[o.cls]}`}>
                <Icon size={26} weight="duotone" className={s.offerIcon} />
                <h3 className="d3">{o.title}</h3>
                <p className={s.offerBody}>{o.body}</p>
                <p className={`mono ${s.offerMeta}`}>{o.meta}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 3. the catalog, as a dense index */}
      <section className="section section--tight shell" aria-labelledby="courses-h">
        <div className={s.courseHead}>
          <div>
            <h2 className="d2" id="courses-h">
              The catalog
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Fees are shared on the consultation call, with the current syllabus and batch dates.
            </p>
          </div>
          <Link href="/courses" className="link-gold">
            All courses <ArrowRight size={15} weight="bold" />
          </Link>
        </div>

        <div className={s.courseGrid}>
          {courses.map((c, i) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className={s.course}>
              <span className={s.courseCode}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.courseName}>{c.title}</span>
              <span className={s.courseTag}>{c.category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. why - sticky heading beside a scrolling list */}
      <section className="section shell" aria-labelledby="why-h">
        <div className={s.why}>
          <div className={s.whySticky}>
            <h2 className="d2" id="why-h">
              Why engineers choose Tungabadra
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              Founded in 2024 in Kurnool. Training delivered live online and on-site, on real
              enterprise hardware.
            </p>
            <Link href="/about" className="link-gold" style={{ marginTop: 22 }}>
              About the company <ArrowRight size={15} weight="bold" />
            </Link>
          </div>

          <div className={s.whyList}>
            {why.map((w, i) => (
              <Reveal key={w.title} delay={i * 60} className={s.whyItem}>
                <span className={s.whyNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="d4">{w.title}</h3>
                <p className={s.whyBody}>{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. enterprise band */}
      <section className={`section ${s.band}`} aria-labelledby="ent-h">
        <div className={`shell ${s.bandInner}`}>
          <Reveal>
            <ShieldCheck size={30} weight="duotone" style={{ color: "var(--gold)" }} />
            <h2 className="d2" id="ent-h" style={{ marginTop: 16 }}>
              We also run the networks
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              The engineering division designs, deploys and secures production networks for
              enterprises. It is why the training stays current.
            </p>
            <Link href="/technology-services" className="btn btn--ghost" style={{ marginTop: 24 }}>
              Enterprise services
              <ArrowRight size={15} weight="bold" />
            </Link>
          </Reveal>

          <Reveal delay={90}>
            <ul className={s.services}>
              {services.map((x) => (
                <li key={x} className={s.service}>
                  <Plus size={12} weight="bold" className={s.serviceDot} />
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 6. faq */}
      <section className="section shell" aria-labelledby="faq-h">
        <h2 className="d2" id="faq-h" style={{ marginBottom: "clamp(26px, 3vw, 40px)" }}>
          Questions we get asked
        </h2>
        <div className={s.faq}>
          {homeFaqs.map((f) => (
            <details key={f.question} className={s.faqItem}>
              <summary className={s.faqSummary}>
                <h3 style={{ font: "inherit", margin: 0 }}>{f.question}</h3>
                <Plus size={17} weight="bold" className={s.faqIcon} />
              </summary>
              <div className={s.faqAnswer}>{f.answer}</div>
            </details>
          ))}
        </div>
      </section>

      {/* 7. closing */}
      <section className="section section--tight shell">
        <Reveal className={s.cta}>
          <div className={s.ctaInner}>
            <h2 className="d2">Start with a free consultation</h2>
            <p className="lede" style={{ marginInline: "auto" }}>
              See the labs, the syllabus and the equipment before you commit to anything.
            </p>
            <div className={s.ctaActions}>
              <Link
                href={site.contact.consultation}
                data-cal-link={site.contact.consultationPath}
                data-cal-config='{"layout":"month_view"}'
                className="btn btn--gold"
              >
                Book a Consultation
                <ArrowRight size={15} weight="bold" />
              </Link>
              <a href={site.contact.phoneHref} className="btn btn--ghost mono">
                {site.contact.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
