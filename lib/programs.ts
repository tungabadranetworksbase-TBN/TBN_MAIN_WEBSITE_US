/**
 * Career paths (multi-course sequences) and certification preparation tracks.
 *
 * Paths bundle courses from `courses.ts` by slug, so a path can never drift out
 * of sync with the catalog - `brokenProgramRefs` at the bottom fails the build
 * loudly if a slug stops existing.
 *
 * No fees, no fixed durations, no pass rates and no salary figures are stored
 * here. The site publishes none of them, so neither does this file.
 */

import { courses, getCourse, type Course, type Level } from "./courses";

export type Program = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  overview: string[];
  /** Course slugs, in the order they should be taken. */
  courseSlugs: string[];
  level: Level;
  audience: string[];
  outcomes: string[];
  includes: string[];
  /** Roles this path is aimed at. */
  targetRoles: string[];
};

const PLACEMENT_INCLUDE =
  "The four-stage placement track: resume building, lab exams, mock interviews and introductions to partner companies";
const LAB_INCLUDE = "Access to the enterprise labs, available around the clock";

export const programs: Program[] = [
  {
    slug: "network-engineer-career-path",
    title: "Network Engineer Career Path",
    category: "Core networking",
    shortDescription:
      "The main route: fundamentals, then enterprise and service provider scale, then extended project work on live topologies.",
    overview: [
      "The Network Engineer Career Path is the sequence most engineers take. It starts at IP addressing and ends with extended build and incident work on full enterprise topologies.",
      "The order matters. CCNA establishes the fundamentals; CCNP takes them to the scale where design decisions have consequences; the projects course then removes the safety net by injecting faults on a schedule you do not see.",
      "It ends in applied work rather than a certificate alone, which is what gives you specific incidents to discuss at interview.",
    ],
    courseSlugs: [
      "ccna-advanced-training",
      "ccnp-enterprise-service-provider",
      "real-time-networking-projects",
    ],
    level: "Advanced",
    audience: [
      "Graduates entering IT with no networking background",
      "Support staff moving into network engineering",
      "Working engineers formalising self-taught knowledge",
    ],
    outcomes: [
      "Design, build and document a multi-site enterprise network",
      "Configure and troubleshoot BGP, MPLS and multi-area OSPF",
      "Run a planned change window with pre-checks and a tested rollback",
      "Diagnose faults under time pressure using a repeatable method",
      "Discuss real incidents credibly in a technical interview",
    ],
    includes: [
      "Three courses taken in sequence",
      LAB_INCLUDE,
      "Training on physical Cisco equipment, not simulators alone",
      PLACEMENT_INCLUDE,
    ],
    targetRoles: [
      "Network Engineer",
      "Senior Network Engineer",
      "Service Provider Engineer",
      "Network Consultant",
    ],
  },

  {
    slug: "network-security-career-path",
    title: "Network Security Career Path",
    category: "Security",
    shortDescription:
      "Networking fundamentals first, then next-generation firewalls taught by an engineer who spent eight years in Palo Alto TAC.",
    overview: [
      "The Network Security Career Path builds security on top of networking rather than instead of it, because firewall problems are usually routing, NAT or return-path problems wearing a different hat.",
      "CCNA establishes the fundamentals. The Palo Alto NGFW course then covers policy, App-ID, NAT and VPN, with troubleshooting drawn from real support cases.",
      "It suits engineers who want a specialisation that is in demand without abandoning the network knowledge underneath it.",
    ],
    courseSlugs: ["ccna-advanced-training", "palo-alto-ngfw"],
    level: "Intermediate",
    audience: [
      "Network engineers adding a security specialisation",
      "Engineers supporting a firewall estate",
      "Candidates targeting security operations roles",
    ],
    outcomes: [
      "Configure and order a security policy that does what it claims",
      "Write policy on applications rather than ports",
      "Diagnose NAT and return-path faults from first principles",
      "Bring up and troubleshoot a site-to-site VPN through both phases",
      "Read traffic logs and captures the way a support engineer does",
    ],
    includes: [
      "Two courses taken in sequence",
      LAB_INCLUDE,
      "Physical Palo Alto equipment in the labs",
      PLACEMENT_INCLUDE,
    ],
    targetRoles: [
      "Network Security Engineer",
      "Firewall Administrator",
      "Security Operations Engineer",
      "Implementation Engineer",
    ],
  },

  {
    slug: "network-automation-career-path",
    title: "Network Automation Career Path",
    category: "Automation",
    shortDescription:
      "From CLI to code: Linux, then programmability, then the libraries that drive real fleets, ending in a reviewed automation repository.",
    overview: [
      "The Network Automation Career Path is for engineers whose roles are starting to expect code. It assumes no software background and builds in the order the skills actually depend on each other.",
      "Linux comes first because that is where the automation runs and where most engineers have the largest gap. DevNet then covers Python, APIs and programmability concepts. Python for Network Automation goes deeper on the libraries used against production devices, and the projects course puts the result under version control with CI.",
      "The output is a repository you can show, not a certificate you can claim.",
    ],
    courseSlugs: [
      "linux-for-network-engineers",
      "cisco-devnet-network-automation",
      "python-for-network-automation",
      "real-time-automation-projects",
    ],
    level: "Advanced",
    audience: [
      "Network engineers who have never written code",
      "Engineers automating a manual change process at work",
      "Candidates targeting NetDevOps and platform roles",
    ],
    outcomes: [
      "Work confidently in Linux from the command line",
      "Write Python that collects, validates and reports on device state",
      "Push configuration safely with dry runs and pre and post checks",
      "Keep network configuration under version control with review",
      "Run automated validation through a CI pipeline",
    ],
    includes: [
      "Four courses taken in sequence",
      LAB_INCLUDE,
      "A reviewed automation repository as the final output",
      PLACEMENT_INCLUDE,
    ],
    targetRoles: [
      "Network Automation Engineer",
      "NetDevOps Engineer",
      "Platform Engineer",
      "Senior Network Engineer",
    ],
  },

  {
    slug: "multi-vendor-network-path",
    title: "Multi-Vendor Network Path",
    category: "Core networking",
    shortDescription:
      "Cisco, Juniper and Aruba in one sequence, for engineers working in estates that were never standardised on a single vendor.",
    overview: [
      "The Multi-Vendor Network Path covers three platforms, because real estates are rarely single-vendor and the differences between them are where mistakes happen.",
      "After CCNA establishes the fundamentals, JNCIA covers the Junos configuration model, the commit workflow and policy framework that catch Cisco-trained engineers out, and the Aruba course covers campus switching and wireless.",
      "Understanding a second and third configuration model makes you better at the first, because it separates the protocol from the vendor's expression of it.",
    ],
    courseSlugs: ["ccna-advanced-training", "juniper-jncia", "aruba-certified-associate"],
    level: "Intermediate",
    audience: [
      "Engineers working in mixed-vendor environments",
      "Candidates targeting service provider roles where Junos is common",
      "Engineers supporting campus and wireless estates",
    ],
    outcomes: [
      "Work confidently across Cisco, Junos and Aruba platforms",
      "Translate a configuration intent between vendors",
      "Use commit confirmed and rollback as standard safety practice",
      "Design and troubleshoot campus wireless coverage",
      "Separate an RF fault from a wired or authentication fault",
    ],
    includes: [
      "Three courses taken in sequence",
      LAB_INCLUDE,
      "Cisco, Juniper and Aruba hardware in the labs",
      PLACEMENT_INCLUDE,
    ],
    targetRoles: [
      "Network Engineer (multi-vendor)",
      "Campus Network Engineer",
      "Wireless Network Engineer",
      "Service Provider Engineer",
    ],
  },

  {
    slug: "hybrid-cloud-infrastructure-path",
    title: "Hybrid Cloud Infrastructure Path",
    category: "Cloud",
    shortDescription:
      "For engineers whose estate is extending into cloud: networking fundamentals, Linux, and cloud networking taught with a network engineer's lens.",
    overview: [
      "The Hybrid Cloud Infrastructure Path is for network engineers whose responsibilities now cross into cloud, which for most organisations means running both at once rather than migrating cleanly.",
      "CCNA and Linux establish the ground. The AWS course then covers cloud fundamentals with the VPC, routing and security group sections taught in more depth than the exam requires, because that is where a network engineer adds value.",
      "The emphasis throughout is on mapping between the two worlds: what translates from campus to cloud, and what does not.",
    ],
    courseSlugs: [
      "ccna-advanced-training",
      "linux-for-network-engineers",
      "aws-cloud-practitioner",
    ],
    level: "Intermediate",
    audience: [
      "Network engineers whose estate is extending into cloud",
      "Infrastructure staff running hybrid environments",
      "Engineers preparing for AWS CLF-C02",
    ],
    outcomes: [
      "Design a VPC with correct subnetting, routing and egress",
      "Use security groups and network ACLs for their actual purposes",
      "Manage and diagnose Linux hosts on a network",
      "Reason about hybrid connectivity between on-premises and cloud",
      "Map an on-premises design onto cloud primitives, and identify what does not translate",
    ],
    includes: [
      "Three courses taken in sequence",
      LAB_INCLUDE,
      "Cloud labs sized to stay within the AWS free tier where possible",
      PLACEMENT_INCLUDE,
    ],
    targetRoles: [
      "Cloud Network Engineer",
      "Infrastructure Engineer",
      "Network Engineer (hybrid)",
      "Cloud Support Engineer",
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function programCourses(program: Program): Course[] {
  return program.courseSlugs.map(getCourse).filter((c): c is Course => Boolean(c));
}

/* --------------------------- certification tracks -------------------------- */

export type CertificationTrack = {
  slug: string;
  /** The third-party credential this track prepares for. */
  exam: string;
  vendor: string;
  summary: string;
  /** Course slugs that cover the exam domains. */
  courseSlugs: string[];
  level: Level;
  whoItSuits: string;
};

/**
 * Exam preparation tracks. Every entry states which course covers the domains.
 * Tungabadra Networks is not an authorized training partner of any of these
 * vendors and does not administer or issue their exams - that disclaimer is
 * rendered on the certifications page and must stay there.
 */
export const certificationTracks: CertificationTrack[] = [
  {
    slug: "cisco-ccna",
    exam: "Cisco CCNA",
    vendor: "Cisco",
    summary:
      "Addressing, switching, routing, IP services, security fundamentals and automation basics. The most widely recognised entry credential in networking.",
    courseSlugs: ["ccna-advanced-training"],
    level: "Foundation",
    whoItSuits:
      "Anyone entering networking, including candidates with no IT background. It is the first certification most engineers attempt.",
  },
  {
    slug: "cisco-ccnp-encor",
    exam: "Cisco CCNP Enterprise (ENCOR)",
    vendor: "Cisco",
    summary:
      "Advanced routing, BGP, MPLS, VPN, infrastructure security and network assurance at enterprise and service provider scale.",
    courseSlugs: ["ccnp-enterprise-service-provider"],
    level: "Advanced",
    whoItSuits:
      "Working engineers with CCNA-level knowledge who are moving from support into design and escalation.",
  },
  {
    slug: "palo-alto-pcnsa",
    exam: "Palo Alto Networks PCNSA",
    vendor: "Palo Alto Networks",
    summary:
      "Next-generation firewall administration: zones, security policy, App-ID, Content-ID, NAT and VPN.",
    courseSlugs: ["palo-alto-ngfw"],
    level: "Intermediate",
    whoItSuits:
      "Network engineers adding a security specialisation, and engineers already supporting a Palo Alto estate.",
  },
  {
    slug: "juniper-jncia-junos",
    exam: "Juniper JNCIA-Junos",
    vendor: "Juniper Networks",
    summary:
      "Junos fundamentals: the configuration model, commit workflow, routing policy and firewall filters.",
    courseSlugs: ["juniper-jncia"],
    level: "Intermediate",
    whoItSuits:
      "Engineers in multi-vendor environments, and anyone targeting service provider roles where Junos is common.",
  },
  {
    slug: "aruba-certified-associate",
    exam: "Aruba Certified Associate (ACA)",
    vendor: "HPE Aruba Networking",
    summary:
      "Campus switching, WLAN design, controller and access point configuration, and campus security.",
    courseSlugs: ["aruba-certified-associate"],
    level: "Intermediate",
    whoItSuits:
      "Engineers supporting campus or wireless estates, particularly in organisations standardised on Aruba.",
  },
  {
    slug: "cisco-devnet-associate",
    exam: "Cisco DevNet Associate (200-901)",
    vendor: "Cisco",
    summary:
      "Software development and design for network engineers: Python, APIs, data formats, version control and programmability.",
    courseSlugs: ["cisco-devnet-network-automation"],
    level: "Intermediate",
    whoItSuits:
      "Network engineers with no software background whose roles are beginning to expect automation.",
  },
  {
    slug: "aws-cloud-practitioner",
    exam: "AWS Certified Cloud Practitioner (CLF-C02)",
    vendor: "Amazon Web Services",
    summary:
      "Cloud concepts, core services, security and the shared responsibility model, with VPC networking covered in additional depth.",
    courseSlugs: ["aws-cloud-practitioner"],
    level: "Foundation",
    whoItSuits:
      "Network and infrastructure staff whose estate is extending into cloud, and anyone needing a first cloud credential.",
  },
];

export function certificationCourses(track: CertificationTrack): Course[] {
  return track.courseSlugs.map(getCourse).filter((c): c is Course => Boolean(c));
}

export const certificationVendors = Array.from(new Set(certificationTracks.map((t) => t.vendor)));

/** Sanity guard: every referenced course slug must exist. */
export const brokenProgramRefs = [
  ...programs.flatMap((p) => p.courseSlugs),
  ...certificationTracks.flatMap((t) => t.courseSlugs),
].filter((slug) => !courses.some((c) => c.slug === slug));
