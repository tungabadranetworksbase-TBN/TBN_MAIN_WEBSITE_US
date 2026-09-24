/**
 * Internship catalog.
 *
 * An internship here is what the organisation actually sells: a bundle of the
 * individual courses in courses.ts, plus project training, communication
 * skills and placement support, priced as one programme. `coursesIncluded`
 * names the bundle and `phases` is the programme outline the organisation
 * publishes for it.
 *
 * Fees live in pricing.ts, keyed by the slugs below, and are converted from
 * the published rupee price at a rate the site controls.
 *
 * As with courses.ts: nothing is stated that the organisation does not
 * publish. No stipend figures, no cohort dates and no fixed week counts
 * appear here. Salary bands are published against these programmes in India
 * but are deliberately not carried over - app/terms states that this site
 * publishes no salary or placement statistics, so `careerRoles` names the
 * roles without attaching a number to them.
 */

import type { Faq } from "./courses";

export type InternshipCategory =
  | "Foundation"
  | "Advanced Networking"
  | "Automation"
  | "Career Transition";

export type Internship = {
  slug: string;
  title: string;
  category: InternshipCategory;
  shortDescription: string;
  /** First paragraph answers "what is this internship?" directly. */
  overview: string[];
  /** No fixed length is published; this is what the page shows instead. */
  duration: string;
  commitment: string;
  format: "On-site" | "Remote" | "Hybrid";
  eligibility: string[];
  skillsRequired: string[];
  technologies: string[];
  /** The courses bundled into this programme. `free` marks an included extra. */
  coursesIncluded: { title: string; free?: boolean }[];
  /** The programme outline published for this track. */
  phases: { title: string; topics: string[] }[];
  projects: { title: string; summary: string }[];
  outcomes: string[];
  /** Roles this programme is aimed at. No salary figures - see the file note. */
  careerRoles: string[];
  mentorship: string;
  certificate: string;
  faqs: Faq[];
  related: string[];
  featured?: boolean;
};

export const internshipCategories: { name: InternshipCategory; blurb: string }[] = [
  { name: "Foundation", blurb: "A first route into networking, from fundamentals to a first role." },
  { name: "Advanced Networking", blurb: "Enterprise and service provider depth for working engineers." },
  { name: "Automation", blurb: "Networking plus Python, Git and the tooling that configures a fleet." },
  { name: "Career Transition", blurb: "A structured route into IT from a non-IT background." },
];

const DURATION_NOTE =
  "Length is agreed at the start of the programme and confirmed on the demo call.";
const ACCESS_NOTE = "Programme access runs for one year from enrollment.";
const APPLY_NOTE =
  "Apply through the contact form or by calling us. Selection is based on a short technical conversation, not a written test.";
const COMMS = { title: "Communication Skills & Personality Development", free: true };

export const internships: Internship[] = [
  {
    slug: "network-fresher-internship",
    title: "Network Fresher Internship",
    category: "Foundation",
    featured: true,
    shortDescription:
      "The entry programme: CCNA, JNCIA, Aruba, Linux and cloud fundamentals bundled together, taught on real equipment and aimed at a first networking role.",
    overview: [
      "The Network Fresher Internship is the starting point for someone entering networking with no professional background in it. It bundles CCNA Advanced, JNCIA, Aruba, Linux for Networking and the AWS Cloud Practitioner course into one programme, so the sequence is decided for you rather than assembled course by course.",
      "The work is practical throughout. Every topic is paired with a lab on real Cisco, Juniper and Aruba equipment, and the packet-level habit (capture it, read it, explain it) is built in from the first weeks rather than bolted on at the end.",
      "Communication skills and personality development are included at no extra cost, because the gap that stops most capable freshers at interview is not protocol knowledge.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions alongside lab access throughout the programme.",
    format: "Hybrid",
    eligibility: [
      "Open to freshers, no professional networking background required",
      "Graduates entering IT, including from non-computing degrees",
      "Comfortable reading and writing clear English",
    ],
    skillsRequired: [
      "No prior networking knowledge assumed",
      "Basic computer literacy",
      "Willingness to work through labs rather than watch them",
    ],
    technologies: [
      "Cisco routers and switches",
      "Juniper vLabs and Junos CLI",
      "Aruba CX switches, APs and Aruba Central",
      "Wireshark",
      "Cisco CML, EVE-NG, GNS3 and Packet Tracer",
      "PRTG and Zabbix",
      "Linux terminal and SSH",
      "AWS Console, VPC, EC2, IAM and CloudWatch",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (200-301)" },
      { title: "JNCIA (JN0-105)" },
      { title: "Aruba Certified Associate" },
      { title: "Linux for Networking" },
      { title: "AWS Certified Cloud Practitioner (CLF-C02)" },
      COMMS,
    ],
    phases: [
      {
        title: "Networking Fundamentals",
        topics: [
          "OSI and TCP/IP models",
          "IPv4 addressing and subnetting",
          "Routing and switching basics",
          "Simulator work",
          "Wireshark packet analysis",
          "CCNA core topics",
        ],
      },
      {
        title: "Practical Implementation",
        topics: [
          "Labs on real equipment",
          "Cisco device configuration",
          "Linux for network engineers",
          "AWS fundamentals",
          "Structured troubleshooting",
          "Communication skills",
        ],
      },
      {
        title: "Career Preparation",
        topics: [
          "Interview practice",
          "Case studies",
          "Industry best practices",
          "Resume preparation",
          "Certification guidance",
          "Placement mentoring",
        ],
      },
    ],
    projects: [
      {
        title: "Multi-vendor lab build",
        summary:
          "Build and verify a working topology across Cisco, Juniper and Aruba equipment, then document how it is addressed and why.",
      },
      {
        title: "Fault diagnosis log",
        summary:
          "Work a set of deliberately broken labs and record, for each, the evidence gathered and the cause identified.",
      },
      {
        title: "Cloud networking exercise",
        summary:
          "Build a VPC with public and private subnets and explain how it maps to the on-premises design you already configured.",
      },
    ],
    outcomes: [
      "Configure and verify routing and switching on real equipment",
      "Read a packet capture and explain what the network is doing",
      "Administer a Linux host well enough to work on one daily",
      "Explain cloud networking fundamentals in an interview",
      "Present yourself and your work credibly to an employer",
    ],
    careerRoles: ["Network Support Engineer", "Junior Network Engineer", "NOC Technician"],
    mentorship:
      "Sessions are taught by engineers who run production networks, with a named trainer responsible for your labs and reviews.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "Do I need a networking background?",
        answer:
          "No. The programme starts from fundamentals and is built for freshers, including those from non-computing degrees.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["advanced-fresher-internship", "it-core-internship", "devnet-associate-internship"],
  },

  {
    slug: "advanced-fresher-internship",
    title: "Advanced Fresher Internship",
    category: "Automation",
    shortDescription:
      "Everything in the fresher programme plus Python, Git and hands-on Netmiko automation, the bridge between traditional networking and DevOps.",
    overview: [
      "The Advanced Fresher Internship takes the same networking foundation as the fresher track and adds the programming side: Python, Git and GitHub, a working IDE, and automation projects built with Netmiko against real devices.",
      "It exists because the job market has split. A network engineer who can also script is doing a different job from one who cannot, and this programme is aimed at entering the market on the automation side of that line rather than moving across to it later.",
      "The automation work is project-based. You finish having written scripts that configure and verify real equipment, not having watched someone else write them.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions alongside lab access throughout the programme.",
    format: "Hybrid",
    eligibility: [
      "Open to freshers, no professional networking background required",
      "Suited to graduates who want networking and automation together",
      "No prior programming experience assumed",
    ],
    skillsRequired: [
      "No prior networking or coding knowledge assumed",
      "Comfortable working through problems methodically",
      "Willing to debug your own scripts",
    ],
    technologies: [
      "Cisco routers and switches",
      "Juniper vLabs and Junos CLI",
      "Aruba CX switches and Aruba Central",
      "Python 3",
      "Netmiko and Paramiko",
      "Git and GitHub",
      "Visual Studio Code",
      "Linux, Wireshark and AWS",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (200-301)" },
      { title: "JNCIA (JN0-105)" },
      { title: "Aruba Certified Associate" },
      { title: "Linux for Networking" },
      { title: "AWS Certified Cloud Practitioner (CLF-C02)" },
      { title: "Python & Git, with Visual Studio" },
      { title: "Network Automation Projects using the Netmiko library" },
      COMMS,
    ],
    phases: [
      {
        title: "Advanced Routing Concepts",
        topics: [
          "Advanced BGP and OSPF",
          "EIGRP",
          "Route redistribution",
          "Policy-based routing",
          "Multicast",
          "VPN fundamentals",
        ],
      },
      {
        title: "Security & High Availability",
        topics: [
          "Firewalls and ACLs",
          "VRF and segmentation",
          "HSRP and first-hop redundancy",
          "DDoS protection",
          "Network audits",
        ],
      },
      {
        title: "Professional Development",
        topics: [
          "Network design",
          "Change management",
          "Monitoring",
          "Introduction to automation",
          "Certification paths",
          "Career growth",
        ],
      },
    ],
    projects: [
      {
        title: "Multi-device configuration push",
        summary:
          "Write a Netmiko script that applies a configuration change across a set of devices and verifies the result on each.",
      },
      {
        title: "Inventory and audit script",
        summary:
          "Collect version and interface state from a fleet and produce a report that flags what is out of standard.",
      },
      {
        title: "Version-controlled toolkit",
        summary:
          "Keep your scripts in Git with branches and meaningful history, the way a team would expect to receive them.",
      },
    ],
    outcomes: [
      "Configure and verify enterprise routing and switching",
      "Write Python that configures and validates real devices",
      "Use Git and GitHub the way a working team does",
      "Automate a repetitive change instead of repeating it by hand",
      "Move into a role that expects both networking and scripting",
    ],
    careerRoles: ["Network Engineer", "Network Automation Engineer", "Senior Support Engineer"],
    mentorship:
      "Taught by engineers who automate production estates, with code review on the scripts you write.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "Do I need to know Python first?",
        answer:
          "No. Python is taught from first principles inside the programme. Networking knowledge is the prerequisite, not software experience.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["network-fresher-internship", "devnet-associate-internship", "network-automation-internship"],
  },

  {
    slug: "it-core-internship",
    title: "IT Core Internship (Non-IT to IT)",
    category: "Career Transition",
    featured: true,
    shortDescription:
      "For people moving into IT from another field: starts at IT fundamentals and runs through networking, security, cloud and real project work.",
    overview: [
      "The IT Core Internship is built for people arriving from outside IT, civil, mechanical, commerce, arts, and it starts where that requires, at what a computer and a network actually are, rather than assuming a technical grounding that is not there.",
      "From that base it runs the full networking sequence: CCNA Advanced, JNCIA, Aruba, Palo Alto NGFW security, Linux, AWS fundamentals and real-time project training. The progression is deliberate, and nothing is skipped on the assumption that you picked it up elsewhere.",
      "Networking rewards logic, structure and patience rather than mathematics or coding, which is why a transition into it from a non-technical degree is realistic in a way that some other routes into IT are not.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions alongside lab access throughout the programme.",
    format: "Hybrid",
    eligibility: [
      "Open to graduates from any discipline, including non-IT",
      "No prior IT or networking experience required",
      "Suited to career changers rather than practising engineers",
    ],
    skillsRequired: [
      "No prior IT knowledge assumed",
      "Basic computer literacy",
      "Prepared to work through a long sequence in order",
    ],
    technologies: [
      "Cisco routers and switches",
      "Juniper and Aruba equipment",
      "Palo Alto PA-VM, Panorama and GlobalProtect",
      "Wireshark and MTR",
      "SolarWinds, Nagios and Zabbix",
      "ServiceNow and Remedy",
      "Linux terminal and SSH",
      "AWS Console, VPC and IAM",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (200-301)" },
      { title: "JNCIA (JN0-105)" },
      { title: "Aruba Certified Associate" },
      { title: "Palo Alto NGFW" },
      { title: "Linux for Networking" },
      { title: "AWS Certified Cloud Practitioner (CLF-C02)" },
      { title: "Real-Time Networking Project Training" },
      COMMS,
    ],
    phases: [
      {
        title: "IT Fundamentals",
        topics: [
          "Computer hardware",
          "Operating systems",
          "Networking for beginners",
          "How the internet works",
          "Introduction to cloud",
          "IT support fundamentals",
        ],
      },
      {
        title: "Networking Essentials",
        topics: [
          "Networking concepts",
          "CCNA fundamentals",
          "Routing and switching",
          "Structured troubleshooting",
          "Introduction to Linux",
          "Hands-on labs",
        ],
      },
      {
        title: "Career Development",
        topics: [
          "Advanced topics",
          "Certification preparation",
          "Professional skills",
          "Interview practice",
          "Placement assistance",
        ],
      },
    ],
    projects: [
      {
        title: "Foundation build",
        summary:
          "Build a small network end to end, from addressing plan to working configuration, and document every decision.",
      },
      {
        title: "Secured site design",
        summary:
          "Add firewall policy and segmentation to a working topology and justify each rule you introduce.",
      },
      {
        title: "Real-time project training",
        summary:
          "Work production-style incidents and changes against the environments the delivery teams use.",
      },
    ],
    outcomes: [
      "Explain how a network carries traffic, from cable to application",
      "Configure and verify routing, switching and firewall policy",
      "Diagnose a fault with a repeatable, layered method",
      "Hold a technical conversation without an IT degree behind you",
      "Enter IT in a role that pays for the skills, not the background",
    ],
    careerRoles: ["Network Support Engineer", "Junior Network Engineer", "NOC Technician"],
    mentorship:
      "A named trainer follows your progress through the sequence, with extra time built in for the fundamentals phase.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "I have no IT background at all. Is that a problem?",
        answer:
          "No. The programme is designed for exactly that and starts from zero. Networking needs logic and structured thinking rather than advanced mathematics or coding.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["non-it-to-it-transition", "network-fresher-internship", "advanced-core-internship"],
  },

  {
    slug: "advanced-core-internship",
    title: "Advanced Core Internship",
    category: "Advanced Networking",
    featured: true,
    shortDescription:
      "For working engineers: CCNP enterprise and service provider depth, multi-vendor security, and real-time project training on production-style topologies.",
    overview: [
      "The Advanced Core Internship is the programme for someone already working in networking who wants the depth that separates a support engineer from a design or senior operations role.",
      "It carries CCNP across enterprise and service provider, MPLS, BGP at scale, IS-IS, L3 and L2 VPN, VXLAN and EVPN, alongside Palo Alto security, Aruba, Juniper and Linux, and finishes on real-time project training against production-style topologies.",
      "The emphasis throughout is on what happens when a design meets a fault: root cause analysis, change discipline and the documentation that lets someone else pick the work up.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions alongside lab access throughout the programme.",
    format: "Hybrid",
    eligibility: [
      "Working engineers with CCNA-level ability or better",
      "Able to configure and verify routing and switching unaided",
      "Suited to those targeting senior or architecture roles",
    ],
    skillsRequired: [
      "Routing and switching fundamentals",
      "Comfortable on a vendor CLI",
      "Some exposure to production networks",
    ],
    technologies: [
      "Cisco ASR, ISR and Catalyst",
      "Juniper MX, SRX and QFX",
      "Arista and Aruba",
      "Palo Alto PA-VM and Panorama",
      "GNS3 and EVE-NG",
      "Wireshark and MTR",
      "SolarWinds, Zabbix and ServiceNow",
      "AWS",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (200-301)" },
      { title: "CCNP (Multi-Track)" },
      { title: "JNCIA (JN0-105)" },
      { title: "Aruba Certified Associate" },
      { title: "Palo Alto NGFW" },
      { title: "Linux for Networking" },
      { title: "AWS Certified Cloud Practitioner (CLF-C02)" },
      { title: "Real-Time Networking Project Training" },
      COMMS,
    ],
    phases: [
      {
        title: "Advanced Infrastructure",
        topics: [
          "Enterprise network design",
          "Data centre networking",
          "Software-defined networking",
          "Cloud networking",
          "Virtualization",
        ],
      },
      {
        title: "Security & Operations",
        topics: [
          "Security frameworks",
          "Monitoring and analytics",
          "Incident response",
          "Compliance",
          "Disaster recovery and business continuity",
        ],
      },
      {
        title: "Strategic Implementation",
        topics: [
          "Transformation projects",
          "5G and AI in networking",
          "Cross-platform integration",
          "Technical leadership",
          "Documentation standards",
        ],
      },
    ],
    projects: [
      {
        title: "Service provider core build",
        summary:
          "Build an MPLS core with L3VPN and verify end-to-end reachability across customer VRFs.",
      },
      {
        title: "Root cause analysis pack",
        summary:
          "Take a production-style incident from symptom to written RCA, with the evidence that supports the conclusion.",
      },
      {
        title: "Multi-vendor security review",
        summary:
          "Review a firewall rule base and segmentation design, and propose changes with the reasoning for each.",
      },
    ],
    outcomes: [
      "Design and troubleshoot enterprise and service provider networks",
      "Work MPLS, BGP, IS-IS and EVPN at production scale",
      "Apply multi-vendor security policy with a defensible rationale",
      "Write root cause analyses and change documentation others can act on",
      "Move into senior engineering or architecture work",
    ],
    careerRoles: ["Enterprise Network Architect", "Senior Network Engineer", "Solutions Architect"],
    mentorship:
      "Taught by engineers running production enterprise and service provider estates, with design review on your project work.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "Is this suitable for a fresher?",
        answer:
          "No. It assumes you can already configure and verify routing and switching unaided. Freshers should start with the Network Fresher or IT Core programme.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["network-automation-internship", "it-core-internship", "advanced-fresher-internship"],
  },

  {
    slug: "network-automation-internship",
    title: "Network Automation Internship",
    category: "Automation",
    shortDescription:
      "The most complete programme: CCNP-level networking plus Python, Ansible, REST APIs and CI/CD, with real enterprise automation projects.",
    overview: [
      "The Network Automation Internship is the widest programme offered. It carries the full networking sequence through CCNP, adds Palo Alto security and AWS, and then builds the automation layer on top: Python, Netmiko, Ansible, REST APIs, JSON and YAML, Git and CI/CD pipelines.",
      "It is aimed at NetDevOps work, the roles where the deliverable is a tool or a pipeline rather than a configuration, and where a change is reviewed, tested and deployed the way software is.",
      "The programme finishes on real enterprise automation projects: zero-touch provisioning, compliance checking, health monitoring and auto-remediation, each built end to end rather than demonstrated.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions alongside lab access throughout the programme.",
    format: "Hybrid",
    eligibility: [
      "Engineers targeting automation or NetDevOps roles",
      "CCNA-level networking ability is expected",
      "No prior programming experience required",
    ],
    skillsRequired: [
      "Routing and switching fundamentals",
      "Comfortable on a Linux shell",
      "Prepared to debug your own code",
    ],
    technologies: [
      "Python, Netmiko, Paramiko and NAPALM",
      "Ansible and Jinja2",
      "REST APIs, JSON, XML and YAML",
      "Git, GitHub and GitHub Actions",
      "Jenkins and GitLab CI",
      "Cisco, Juniper, Palo Alto and Aruba equipment",
      "SolarWinds, Zabbix and ServiceNow",
      "AWS",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (200-301)" },
      { title: "CCNP (Multi-Track)" },
      { title: "JNCIA (JN0-105)" },
      { title: "Aruba Certified Associate" },
      { title: "Palo Alto NGFW" },
      { title: "Linux for Networking" },
      { title: "AWS Certified Cloud Practitioner (CLF-C02)" },
      { title: "Python for Network Automation" },
      { title: "Ansible, REST APIs, Git, CI/CD and data formats" },
      { title: "Network Automation Real-Time Projects" },
      { title: "Real-Time Networking Project Training" },
      { title: "Advanced DevOps for Networking" },
      COMMS,
    ],
    phases: [
      {
        title: "Programming for Networks",
        topics: [
          "Python for network engineers",
          "APIs and REST",
          "JSON, XML and YAML",
          "Git and version control",
          "Coding exercises against real devices",
        ],
      },
      {
        title: "Automation Tools & Platforms",
        topics: [
          "Ansible",
          "NETCONF and RESTCONF",
          "Cisco DNA Center APIs",
          "Meraki APIs",
          "Infrastructure as code",
        ],
      },
      {
        title: "Advanced Automation Projects",
        topics: [
          "End-to-end automation projects",
          "CI/CD pipelines",
          "Monitoring automation",
          "Configuration management at scale",
          "Production deployment",
        ],
      },
    ],
    projects: [
      {
        title: "Fleet audit and remediation tool",
        summary:
          "Detect configuration drift across a fleet and push a corrected, validated configuration where it is found.",
      },
      {
        title: "Validation in CI",
        summary:
          "Put configuration changes through a pipeline that tests them before they reach a device.",
      },
      {
        title: "Monitoring and auto-remediation",
        summary:
          "Detect a BGP neighbour going down, act on it automatically and report what was changed and why.",
      },
    ],
    outcomes: [
      "Write Python that configures and validates a fleet of devices",
      "Build Ansible playbooks and infrastructure as code for a network",
      "Drive changes through a CI/CD pipeline instead of by hand",
      "Consume REST APIs from controllers and platforms",
      "Work as the automation engineer on a network team",
    ],
    careerRoles: ["Network Automation Engineer", "DevOps Network Engineer", "Solutions Architect"],
    mentorship:
      "Taught by engineers who automate production estates, with code review on every project you submit.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "Do I need to be able to code already?",
        answer:
          "No. Python is taught from first principles inside the programme. Networking knowledge is the prerequisite, not software experience.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["devnet-associate-internship", "advanced-core-internship", "advanced-fresher-internship"],
  },

  {
    slug: "devnet-associate-internship",
    title: "Cisco DevNet Associate Internship",
    category: "Automation",
    shortDescription:
      "Focused on Cisco DevNet Associate (200-901): Python scripting, Git workflows and Netmiko automation against real devices.",
    overview: [
      "The Cisco DevNet Associate Internship is the narrower automation route: CCNA networking, Linux, Python and Git, and Netmiko automation projects, aimed squarely at the DevNet Associate 200-901 exam and the roles it opens.",
      "It suits two people in particular, a fresher who already knows some Python and wants the networking to go with it, and a working engineer who enjoys the coding side and wants a credential for it.",
      "The automation work runs against real devices rather than simulated output, and everything you write is kept in Git with the history a team would expect to inherit.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions alongside lab access throughout the programme.",
    format: "Hybrid",
    eligibility: [
      "Freshers with some Python, or with CCNA-level networking",
      "Working engineers who want a programmability credential",
      "Suited to those targeting the 200-901 exam",
    ],
    skillsRequired: [
      "Either basic Python or basic networking, the programme fills the other",
      "Comfortable on a command line",
      "Prepared to debug your own code",
    ],
    technologies: [
      "Python 3",
      "Netmiko, NAPALM, Ansible and Paramiko",
      "Git and GitHub",
      "Postman",
      "Visual Studio Code",
      "Linux (Ubuntu and CentOS)",
      "Cisco routers and switches",
      "Wireshark",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (200-301)" },
      { title: "Linux for Networking" },
      { title: "Python & Git, with Visual Studio" },
      { title: "Network Automation Projects using the Netmiko library" },
      { title: "Real-Time Networking Project Training" },
      COMMS,
    ],
    phases: [
      {
        title: "Programming & APIs",
        topics: [
          "Python fundamentals",
          "REST and JSON",
          "Postman",
          "Git and version control",
          "Setting up a development environment",
        ],
      },
      {
        title: "Cisco Platforms",
        topics: [
          "Meraki Dashboard API",
          "Cisco DNA Center",
          "NETCONF and YANG",
          "Device programmability",
          "Cisco labs",
        ],
      },
      {
        title: "Professional Growth",
        topics: [
          "Advanced automation projects",
          "CI/CD",
          "Security considerations",
          "Certification path",
          "Career planning",
        ],
      },
    ],
    projects: [
      {
        title: "Device automation toolkit",
        summary:
          "Build a set of Netmiko scripts that configure, verify and report on real Cisco equipment.",
      },
      {
        title: "API integration",
        summary:
          "Drive a controller through its REST API and handle the responses properly, including the failures.",
      },
      {
        title: "Collaborative repository",
        summary:
          "Run your work through branches, pull requests and CI checks the way a team would.",
      },
    ],
    outcomes: [
      "Sit the Cisco DevNet Associate 200-901 exam prepared",
      "Write Python that automates real network devices",
      "Use Git and GitHub collaboratively, not just as storage",
      "Consume and troubleshoot REST APIs",
      "Move into a network developer or DevOps-adjacent role",
    ],
    careerRoles: ["Network Automation Engineer", "DevOps Engineer", "Network Developer"],
    mentorship:
      "Taught by engineers working in automation, with code review on the scripts and repositories you produce.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "Does this prepare me for the 200-901 exam?",
        answer:
          "Yes. The programme is built around the Cisco DevNet Associate 200-901 blueprint, alongside the project work that makes the material stick.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["network-automation-internship", "advanced-fresher-internship", "network-fresher-internship"],
  },

  {
    slug: "non-it-to-it-transition",
    title: "Non-IT to IT Transition Program",
    category: "Career Transition",
    shortDescription:
      "The bridge route for people from civil, mechanical, commerce or arts backgrounds, networking needs logic and configuration, not coding.",
    overview: [
      "The Non-IT to IT Transition Program is the bridge for someone whose degree pointed somewhere else entirely. It answers the question that stops most people before they start: whether a career in IT is realistic without a computing background.",
      "For networking, it is. The work is logic, architecture and configuration rather than mathematics or software development, which is why people arrive here from civil, mechanical, commerce and arts degrees and leave working as engineers.",
      "The programme runs from technology foundations through the networking core, CCNA, Palo Alto NGFW, router and switch configuration, hands-on labs, and finishes on the professional transition: resume, interviews, soft skills and placement support.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions with dedicated mentorship through the transition.",
    format: "Hybrid",
    eligibility: [
      "Graduates from any non-IT discipline",
      "No prior IT experience required",
      "No coding or advanced mathematics required",
    ],
    skillsRequired: [
      "No prior IT knowledge assumed",
      "Basic computer literacy",
      "Methodical, patient approach to problems",
    ],
    technologies: [
      "Cisco routers and switches",
      "Palo Alto NGFW",
      "Wireshark",
      "Packet Tracer and EVE-NG",
      "Linux terminal",
    ],
    coursesIncluded: [
      { title: "Technology foundations" },
      { title: "CCNA Advanced (200-301)" },
      { title: "Palo Alto NGFW" },
      COMMS,
    ],
    phases: [
      {
        title: "Technology Foundation",
        topics: [
          "How computers and networks work",
          "Operating systems",
          "The internet",
          "Where IT roles sit in an organisation",
        ],
      },
      {
        title: "Networking Core",
        topics: [
          "CCNA fundamentals",
          "Router and switch configuration",
          "Palo Alto NGFW",
          "Hands-on labs",
        ],
      },
      {
        title: "Professional Transition",
        topics: [
          "Resume preparation",
          "Interview practice",
          "Soft skills",
          "Placement support",
        ],
      },
    ],
    projects: [
      {
        title: "Foundation build",
        summary:
          "Configure a small working network from scratch and explain each decision in plain language.",
      },
      {
        title: "Lab exam",
        summary:
          "Complete a timed practical exercise under the conditions a technical interview would set.",
      },
      {
        title: "Interview preparation",
        summary:
          "Rehearse the technical and non-technical conversation until you can hold both.",
      },
    ],
    outcomes: [
      "Explain how a network works without a computing background",
      "Configure and verify Cisco routers and switches",
      "Apply basic firewall policy",
      "Answer a technical interview question credibly",
      "Enter IT on the strength of demonstrable skill",
    ],
    careerRoles: ["Junior Network Administrator", "Technical Support Engineer", "NOC Analyst"],
    mentorship:
      "Dedicated mentorship runs through the programme, with extra time on the foundation phase for those starting from zero.",
    certificate:
      "A programme completion certificate is issued at the end, naming the work undertaken.",
    faqs: [
      {
        question: "Do I need prior IT experience?",
        answer:
          "No. The programme starts from zero and is built for people with no IT background.",
      },
      {
        question: "Do I need to learn to code?",
        answer:
          "No. Networking is logic, architecture and configuration. Coding is optional and only matters if you later move toward automation.",
      },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["it-core-internship", "network-fresher-internship", "advanced-fresher-internship"],
  },
];

export function getInternship(slug: string): Internship | undefined {
  return internships.find((i) => i.slug === slug);
}

export function getRelatedInternships(internship: Internship): Internship[] {
  return internship.related.map(getInternship).filter((i): i is Internship => Boolean(i));
}

export function featuredInternships(limit = 3): Internship[] {
  const featured = internships.filter((i) => i.featured);
  return (featured.length ? featured : internships).slice(0, limit);
}

export function internshipsByCategory(): {
  category: InternshipCategory;
  blurb: string;
  items: Internship[];
}[] {
  return internshipCategories
    .map((c) => ({ ...c, category: c.name, items: internships.filter((x) => x.category === c.name) }))
    .filter((g) => g.items.length > 0);
}
