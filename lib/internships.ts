/**
 * Internship catalog.
 *
 * Three career-path programmes plus the bundle that carries all three. Each
 * one is a set of the individual courses in courses.ts sequenced into a
 * track, with real-time project work at the end.
 *
 * Fees live in pricing.ts, keyed by the slugs below. Unlike the courses,
 * these are published directly in US dollars rather than converted from a
 * rupee price.
 *
 * As with courses.ts: nothing is stated that the organisation does not
 * publish. No stipend figures, no cohort dates and no fixed week counts
 * appear here, and `careerRoles` names the roles these tracks target without
 * attaching salary figures to them - app/terms states that this site
 * publishes no salary or placement statistics.
 */

import type { Faq, Module } from "./courses";

export type InternshipCategory =
  | "Enterprise Networking"
  | "Data Center"
  | "Automation"
  | "Career Bundle";

export type Internship = {
  slug: string;
  title: string;
  /** The positioning line shown under the title. */
  track: string;
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
  /** The courses this track bundles. */
  coursesIncluded: { title: string; free?: boolean }[];
  /** Skill areas covered, as published for the track. */
  curriculum: Module[];
  projects: { title: string; summary: string }[];
  outcomes: string[];
  /** Roles this track targets. No salary figures - see the file note. */
  careerRoles: string[];
  mentorship: string;
  certificate: string;
  faqs: Faq[];
  related: string[];
  featured?: boolean;
};

export const internshipCategories: { name: InternshipCategory; blurb: string }[] = [
  {
    name: "Enterprise Networking",
    blurb: "The NOC to network engineer route, from fundamentals to production operations.",
  },
  {
    name: "Data Center",
    blurb: "Data center infrastructure and operations for L1 to L3 roles.",
  },
  {
    name: "Automation",
    blurb: "Data center and cloud infrastructure with automation and DevOps on top.",
  },
  {
    name: "Career Bundle",
    blurb: "All three tracks, taken as one sequence.",
  },
];

const DURATION_NOTE =
  "Length is agreed at the start of the programme and confirmed on the consultation call.";
const ACCESS_NOTE = "Programme access runs for one year from enrollment.";
const APPLY_NOTE =
  "Apply through the contact form or by calling us. Selection is based on a short technical conversation, not a written test.";
const RTP = {
  title: "Real-Time Project Version 2.0",
  summary:
    "TAC-level work against production-style enterprise, data center and service provider environments, rather than a lab exercise with a known answer.",
};

export const internships: Internship[] = [
  {
    slug: "enterprise-networking-internship",
    title: "Enterprise Networking Internship",
    track: "NOC to Network Engineer career path, L1 to L3 roles",
    category: "Enterprise Networking",
    featured: true,
    shortDescription:
      "The enterprise route: routing and switching through CCNP level, wireless, firewall, hybrid cloud and the monitoring and ticketing work an operations role actually runs on.",
    overview: [
      "The Enterprise Networking Internship is built to make you employable in enterprise networking roles, from NOC engineer through to network engineer, with the foundation to move into cloud, security and automation later.",
      "It runs the full enterprise stack: CCNA Advanced with BGP fundamentals, CCNP Enterprise at ENCOR level, Cisco Meraki and Aruba wireless, Palo Alto NGFW, Linux, and AWS networking for hybrid connectivity.",
      "What separates it from a certification course is the operations half. Monitoring, ticketing, incident severity, SLA workflow, root cause analysis and change management are taught as the job, because that is what an L1 or L2 role is made of.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions alongside lab access throughout the programme.",
    format: "Hybrid",
    eligibility: [
      "Open to freshers and to engineers already working a support role",
      "No professional networking background required",
      "Graduates from any discipline, including non-computing degrees",
    ],
    skillsRequired: [
      "No prior networking knowledge assumed",
      "Basic computer literacy",
      "Willingness to work through labs rather than watch them",
    ],
    technologies: [
      "Cisco routers and switches",
      "Cisco Meraki cloud wireless",
      "Aruba controllers and instant APs",
      "Juniper Junos",
      "Palo Alto NGFW",
      "AWS VPC and hybrid connectivity",
      "Zabbix, SNMP and syslog",
      "GLPI, ServiceNow and JIRA",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (200-301, with BGP fundamentals)" },
      { title: "CCNP Enterprise (ENCOR level)" },
      { title: "Cisco Meraki Wireless (cloud managed networking)" },
      { title: "Aruba Wireless Networking (enterprise Wi-Fi)" },
      { title: "JNCIA (Juniper, certification assistance)" },
      { title: "Palo Alto NGFW (next-generation firewall)" },
      { title: "Linux for Networking Engineers" },
      { title: "AWS Cloud for Networking (VPC and hybrid connectivity)" },
      { title: "Monitoring and Ticketing Tools" },
      { title: "Real-Time Project Version 2.0" },
    ],
    curriculum: [
      {
        title: "Networking Fundamentals",
        topics: [
          "OSI and TCP/IP models, applied to real troubleshooting",
          "IPv4 addressing, subnetting and VLSM",
          "TCP, UDP, DNS, DHCP, SSH and Telnet",
          "LAN and WAN fundamentals",
        ],
      },
      {
        title: "Enterprise Routing and Switching",
        topics: [
          "Static and default routing",
          "OSPF, single and multi-area",
          "BGP fundamentals for the enterprise use case",
          "VLANs and inter-VLAN routing with SVIs",
          "STP, RSTP and PortFast",
          "EtherChannel with LACP and PAgP",
          "Loop prevention: BPDU Guard and BPDU Filter",
          "Trunking and native VLAN",
          "LLDP and CDP neighbour discovery",
        ],
      },
      {
        title: "WAN and Enterprise Connectivity",
        topics: [
          "MPLS basics at awareness level",
          "Site-to-site connectivity",
          "IPsec VPN, site-to-site and remote access",
          "NAT: static, dynamic and PAT",
        ],
      },
      {
        title: "Wireless Networking",
        topics: [
          "Aruba wireless deployment, controller and instant AP",
          "Cisco Meraki cloud wireless",
          "SSID design and VLAN mapping",
          "Guest Wi-Fi design",
          "RF fundamentals",
        ],
      },
      {
        title: "Network Security",
        topics: [
          "Palo Alto NGFW fundamentals",
          "Security zones and policies",
          "App-ID and URL filtering",
          "IPsec VPN",
          "Enterprise firewall troubleshooting",
        ],
      },
      {
        title: "Hybrid Cloud Networking",
        topics: [
          "AWS VPC architecture",
          "Public and private subnets",
          "Route tables, internet gateway and NAT gateway",
          "Security groups against network ACLs",
          "On-premises to AWS VPN connectivity",
        ],
      },
      {
        title: "Monitoring, Operations and ITSM",
        topics: [
          "SNMP and syslog monitoring",
          "Zabbix monitoring setup",
          "Alerting and dashboards",
          "Ticketing with GLPI, ServiceNow and JIRA",
          "Incident severity: P1, P2 and P3 handling",
          "SLA-based troubleshooting workflow",
        ],
      },
      {
        title: "Troubleshooting and Enterprise Operations",
        topics: [
          "Layer 2 and Layer 3 troubleshooting methodology",
          "Root cause analysis",
          "IOS upgrade procedures as run in production",
          "Writing methods of procedure and standard operating procedures",
          "Change management workflow",
          "Production issue handling scenarios",
        ],
      },
      {
        title: "SD-WAN and Modern Networking",
        topics: [
          "SD-WAN architecture basics",
          "Enterprise WAN modernization",
          "Cloud-managed networking overview",
        ],
      },
    ],
    projects: [
      RTP,
      {
        title: "Enterprise campus build",
        summary:
          "Design and configure a multi-VLAN campus with routing, wireless and firewall policy, then document the addressing and the reasoning.",
      },
      {
        title: "Incident and RCA log",
        summary:
          "Work production-style incidents end to end, writing the root cause analysis and the change that closes each one.",
      },
    ],
    outcomes: [
      "Configure and troubleshoot enterprise routing, switching and wireless",
      "Run firewall policy and hybrid cloud connectivity",
      "Work an incident from alert to root cause under an SLA",
      "Write the MOP, SOP and RCA documentation an operations team expects",
      "Move from a NOC seat toward a network engineer role",
    ],
    careerRoles: [
      "NOC Engineer (L1)",
      "Network Support Engineer (L2)",
      "Network Engineer (L3)",
      "Enterprise Network Administrator",
    ],
    mentorship:
      "Taught by engineers running production enterprise networks, with a named trainer responsible for your labs and project reviews.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "Do I need a networking background?",
        answer:
          "No. The programme starts from fundamentals and is built for freshers as well as for people already working a support role who want to move up.",
      },
      {
        question: "Which certifications does it prepare me for?",
        answer:
          "CCNA 200-301 and CCNP Enterprise at ENCOR level, with Juniper JNCIA certification assistance included. The programme is not affiliated with any certification vendor.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["data-center-networking-internship", "data-center-automation-internship", "elite-career-path-bundle"],
  },

  {
    slug: "data-center-networking-internship",
    title: "Data Center Networking Internship",
    track: "Enterprise infrastructure, L1 to L3 operations",
    category: "Data Center",
    featured: true,
    shortDescription:
      "Data center infrastructure and operations without the automation track: switching, routing, VMware virtualization, monitoring and the ticketing workflow that runs a floor.",
    overview: [
      "The Data Center Networking Internship builds the foundational and operational skills a data center role needs, for L1 through L3 positions in enterprise and service provider environments.",
      "It covers the physical and logical layers together. Rack and stack, power and cooling and server connectivity sit alongside VLAN design, spanning tree, routing for the data center, and VMware ESXi virtualization, because a data center engineer is expected to reason across all of them.",
      "Operations runs through the whole programme: SNMP and syslog monitoring, Zabbix, incident management, SLA handling and the ticketing systems the work is actually tracked in.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions alongside lab access throughout the programme.",
    format: "Hybrid",
    eligibility: [
      "Open to freshers and to engineers moving into data center work",
      "No professional data center experience required",
      "Graduates from any discipline, including non-computing degrees",
    ],
    skillsRequired: [
      "No prior networking knowledge assumed",
      "Basic computer literacy",
      "Comfortable working methodically through hardware and software layers",
    ],
    technologies: [
      "Cisco routers and switches",
      "Juniper Junos",
      "VMware ESXi",
      "Linux",
      "Zabbix, SNMP and syslog",
      "GLPI and ServiceNow",
      "AWS VPC",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (routing and switching)" },
      { title: "CCNP Enterprise (data center foundation)" },
      { title: "JNCIA (Juniper, certification assistance)" },
      { title: "VMware ESXi and Virtualization" },
      { title: "Linux for Networking" },
      { title: "Monitoring Tools (Zabbix, SNMP, syslog)" },
      { title: "Ticketing Tools (GLPI and ServiceNow)" },
      { title: "AWS Cloud Basics for Networking" },
      { title: "Real-Time Project Version 2.0" },
    ],
    curriculum: [
      {
        title: "Data Center Fundamentals",
        topics: [
          "Data center architecture: core, aggregation and access",
          "Rack and stack",
          "Power, cooling and infrastructure basics",
          "Server connectivity fundamentals",
        ],
      },
      {
        title: "Switching and Layer 2 Technologies",
        topics: [
          "VLAN design and segmentation",
          "Trunking and inter-VLAN routing",
          "STP, RSTP and MSTP",
          "EtherChannel with LACP and PAgP",
          "MAC address learning and switching behaviour",
        ],
      },
      {
        title: "Routing in the Data Center",
        topics: [
          "Static and default routing",
          "OSPF fundamentals for the data center",
          "BGP basics for data center connectivity",
          "Route filtering",
        ],
      },
      {
        title: "Virtualization and the Compute Layer",
        topics: [
          "VMware ESXi installation and management",
          "Creating and managing virtual machines",
          "vSwitch configuration",
          "Virtual networking concepts",
        ],
      },
      {
        title: "Monitoring and Operations",
        topics: [
          "SNMP monitoring",
          "Syslog analysis",
          "Zabbix monitoring setup",
          "Alert handling and first-line troubleshooting",
        ],
      },
      {
        title: "IT Operations and Ticketing",
        topics: [
          "Incident management workflow",
          "Ticket handling: P1, P2 and P3",
          "Understanding SLAs",
          "GLPI and ServiceNow",
        ],
      },
      {
        title: "AWS Cloud, Basic Networking",
        topics: [
          "VPC fundamentals",
          "Public and private subnets",
          "Route tables",
          "Internet gateway basics",
          "Introduction to hybrid connectivity",
        ],
      },
      {
        title: "Troubleshooting",
        topics: [
          "Layer 1 to Layer 3 troubleshooting",
          "Interface issues",
          "VLAN and routing issues",
          "Connectivity debugging with ping and traceroute",
        ],
      },
    ],
    projects: [
      RTP,
      {
        title: "Enterprise data center build",
        summary:
          "Stand up a simulated data center with VLAN segmentation and routing deployed end to end.",
      },
      {
        title: "VMware infrastructure lab",
        summary:
          "Build virtual infrastructure on ESXi, configure vSwitches and connect it to the physical topology.",
      },
      {
        title: "Monitoring deployment",
        summary:
          "Set up Zabbix against the estate, with alerting thresholds that catch what matters and stay quiet otherwise.",
      },
    ],
    outcomes: [
      "Reason across the physical, virtual and network layers of a data center",
      "Design VLAN segmentation and deploy routing for a data center fabric",
      "Install and manage VMware ESXi and its virtual networking",
      "Run monitoring and handle incidents against an SLA",
      "Debug Layer 1 to Layer 3 faults methodically",
    ],
    careerRoles: [
      "Data Center Technician (L1)",
      "Data Center Support Engineer (L2)",
      "NOC Engineer",
      "Network Support Engineer",
      "Infrastructure Support Engineer",
      "Junior Network Engineer",
    ],
    mentorship:
      "Taught by engineers who run production data center estates, with a named trainer responsible for your labs and project reviews.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "Does this programme include automation?",
        answer:
          "No. This is the operations track, deliberately without the automation layer. If you want Python, Ansible and CI/CD on top of the data center material, take the Data Center and Automation Internship instead.",
      },
      {
        question: "Do I need virtualization experience?",
        answer:
          "No. VMware ESXi is taught from installation upward, including virtual machine creation and vSwitch configuration.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["data-center-automation-internship", "enterprise-networking-internship", "elite-career-path-bundle"],
  },

  {
    slug: "data-center-automation-internship",
    title: "Data Center and Automation Internship",
    track: "Advanced track: cloud, DevOps, network automation and AI-ready infrastructure",
    category: "Automation",
    featured: true,
    shortDescription:
      "The advanced track: spine-leaf and VXLAN, AWS hybrid cloud, then Python, Ansible, REST APIs and CI/CD on top, with real automation projects.",
    overview: [
      "The Data Center and Automation Internship prepares you for modern data center and cloud infrastructure roles, with the automation, DevOps and cloud networking skills US enterprise environments now expect as standard.",
      "It carries the networking sequence through CCNP with data center concepts, adds Palo Alto security, Aruba and AWS Cloud Practitioner, then builds the automation layer: Python and Netmiko, Ansible, REST APIs, Git and CI/CD pipelines across Jenkins, GitHub Actions and GitLab CI.",
      "Observability is treated as a first-class skill rather than an afterthought, with Prometheus, Grafana and Zabbix, and the programme closes on real automation projects rather than demonstrations.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions alongside lab access throughout the programme.",
    format: "Hybrid",
    eligibility: [
      "Engineers targeting data center, cloud or automation roles",
      "Suited to those who want the operations and automation layers together",
      "No prior programming experience required",
    ],
    skillsRequired: [
      "No prior coding knowledge assumed",
      "Comfortable on a command line",
      "Prepared to debug your own scripts",
    ],
    technologies: [
      "Python, Netmiko and Paramiko",
      "Ansible",
      "REST APIs, JSON and YAML",
      "Git, GitHub and GitHub Actions",
      "Jenkins and GitLab CI",
      "Prometheus, Grafana and Zabbix",
      "Cisco, Juniper, Palo Alto and Aruba equipment",
      "AWS VPC and hybrid cloud",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (200-301, with BGP)" },
      { title: "CCNP Enterprise (advanced routing and data center concepts)" },
      { title: "JNCIA (Juniper, certification assistance)" },
      { title: "Palo Alto NGFW" },
      { title: "Aruba Networking" },
      { title: "AWS Cloud Practitioner (CLF-C02)" },
      { title: "Linux for Networking" },
      { title: "Python for Network Automation" },
      { title: "Ansible Automation" },
      { title: "REST APIs for Networking" },
      { title: "Git and GitHub" },
      { title: "CI/CD Tools (Jenkins, GitHub Actions, GitLab CI)" },
      { title: "Data Formats (JSON and YAML)" },
      { title: "Netmiko and Paramiko" },
      { title: "Monitoring Tools (Prometheus, Grafana, Zabbix)" },
      { title: "Real-Time Automation Project Version 2.0" },
    ],
    curriculum: [
      {
        title: "Advanced Data Center Networking",
        topics: [
          "Spine-leaf architecture",
          "VXLAN at introductory level",
          "EVPN, conceptual understanding",
          "High availability design",
          "Multi-site connectivity",
        ],
      },
      {
        title: "Cloud Networking",
        topics: [
          "Advanced AWS VPC design",
          "Hybrid cloud architecture",
          "Site-to-site VPN connectivity",
          "AWS networking troubleshooting",
        ],
      },
      {
        title: "Network Automation",
        topics: [
          "Python for networking use cases",
          "Netmiko automation scripts",
          "REST API integration",
          "Device configuration automation",
          "Backup and restore automation",
        ],
      },
      {
        title: "DevOps for Networking",
        topics: [
          "Git version control",
          "CI/CD pipeline basics",
          "Jenkins, GitHub Actions and GitLab CI",
          "Handling JSON and YAML configuration",
        ],
      },
      {
        title: "Observability and Monitoring",
        topics: [
          "Prometheus basics",
          "Grafana dashboards",
          "Advanced Zabbix monitoring",
          "Alerting and incident correlation",
        ],
      },
      {
        title: "Infrastructure Troubleshooting",
        topics: [
          "Production issue handling",
          "Root cause analysis",
          "Change validation",
          "Automating pre-change and post-change checks",
        ],
      },
    ],
    projects: [
      {
        title: "Real-Time Automation Project Version 2.0",
        summary:
          "Bulk network configuration automation built and run against a production-style estate rather than a fixed lab.",
      },
      {
        title: "Automated backup and audit tooling",
        summary:
          "An automated backup system plus network audit tools that report what is out of standard across the fleet.",
      },
      {
        title: "Health checks and cloud integration",
        summary:
          "Health check scripts and cloud with on-premises integration labs, wired into a pipeline that validates before it deploys.",
      },
    ],
    outcomes: [
      "Design and troubleshoot spine-leaf data center fabrics",
      "Build hybrid cloud connectivity on AWS and debug it",
      "Write Python that configures, backs up and audits a fleet",
      "Drive network change through a CI/CD pipeline",
      "Run observability with Prometheus, Grafana and Zabbix",
    ],
    careerRoles: [
      "Data Center Network Engineer",
      "Network Automation Engineer",
      "Cloud Network Engineer",
      "SRE Engineer (entry level)",
      "DevOps Network Engineer",
      "Infrastructure Automation Engineer",
      "AI Infrastructure Support Engineer",
    ],
    mentorship:
      "Taught by engineers who automate production estates, with code review on every project you submit.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "Do I need to be able to code already?",
        answer:
          "No. Python is taught from first principles inside the programme, alongside Netmiko, Ansible and the REST API work that uses it.",
      },
      {
        question: "How is this different from the Data Center Networking Internship?",
        answer:
          "It carries the same data center foundation and then adds the automation and DevOps layer: Python, Ansible, REST APIs, Git, CI/CD pipelines and Prometheus and Grafana observability. Take the other track if you want operations without automation.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["data-center-networking-internship", "enterprise-networking-internship", "elite-career-path-bundle"],
  },

  {
    slug: "elite-career-path-bundle",
    title: "Elite Career Path Bundle",
    track: "All three internships, taken as one sequence",
    category: "Career Bundle",
    shortDescription:
      "All three tracks together: enterprise networking, data center operations, and the automation and cloud layer on top, at a single bundled price.",
    overview: [
      "The Elite Career Path Bundle is all three internships taken as one sequence rather than bought separately: Enterprise Networking, Data Center Networking, and Data Center and Automation.",
      "Taken in order the tracks build rather than repeat. Enterprise networking establishes routing, switching, wireless and operations; the data center track adds infrastructure, virtualization and the compute layer; the automation track puts Python, Ansible, CI/CD and cloud on top of both.",
      "It is the widest route offered, and it is aimed at someone who wants to finish able to work in enterprise networking, data center infrastructure or automation, rather than having to pick one at the start.",
    ],
    duration: DURATION_NOTE,
    commitment: "Structured sessions across all three tracks, with lab access throughout.",
    format: "Hybrid",
    eligibility: [
      "Open to freshers and to working engineers",
      "No professional networking background required",
      "Suited to those who want the widest route rather than one specialism",
    ],
    skillsRequired: [
      "No prior networking or coding knowledge assumed",
      "Basic computer literacy",
      "Prepared to commit to a long sequence in order",
    ],
    technologies: [
      "Cisco, Juniper, Palo Alto, Aruba and Meraki",
      "VMware ESXi",
      "AWS VPC and hybrid cloud",
      "Python, Netmiko, Paramiko and Ansible",
      "Git, GitHub Actions, Jenkins and GitLab CI",
      "Prometheus, Grafana and Zabbix",
      "GLPI, ServiceNow and JIRA",
    ],
    coursesIncluded: [
      { title: "Enterprise Networking Internship, in full" },
      { title: "Data Center Networking Internship, in full" },
      { title: "Data Center and Automation Internship, in full" },
    ],
    curriculum: [
      {
        title: "Track One: Enterprise Networking",
        topics: [
          "Networking fundamentals and enterprise routing and switching",
          "WAN connectivity, wireless and network security",
          "Hybrid cloud networking on AWS",
          "Monitoring, ITSM and enterprise operations",
          "SD-WAN and modern networking",
        ],
      },
      {
        title: "Track Two: Data Center Networking",
        topics: [
          "Data center architecture and the physical layer",
          "Layer 2 technologies and routing for the data center",
          "VMware ESXi virtualization and the compute layer",
          "Monitoring, operations and ticketing",
          "Layer 1 to Layer 3 troubleshooting",
        ],
      },
      {
        title: "Track Three: Data Center and Automation",
        topics: [
          "Spine-leaf, VXLAN and EVPN",
          "Advanced AWS and hybrid cloud design",
          "Python, Netmiko and REST API automation",
          "DevOps for networking: Git and CI/CD",
          "Observability with Prometheus and Grafana",
        ],
      },
    ],
    projects: [
      RTP,
      {
        title: "Real-Time Automation Project Version 2.0",
        summary:
          "The automation capstone: bulk configuration, automated backup, health checks and network audit tooling.",
      },
      {
        title: "Cross-track portfolio",
        summary:
          "Work from all three tracks kept as one documented portfolio, which is what an interviewer actually opens.",
      },
    ],
    outcomes: [
      "Work across enterprise networking, data center infrastructure and automation",
      "Choose a specialism at the end of the programme rather than the start",
      "Hold a portfolio spanning operations, virtualization and automation",
      "Meet the requirements of the widest set of roles the tracks target",
    ],
    careerRoles: [
      "Network Engineer",
      "Data Center Network Engineer",
      "Network Automation Engineer",
      "Cloud Network Engineer",
      "DevOps Network Engineer",
      "Infrastructure Automation Engineer",
    ],
    mentorship:
      "A named trainer follows you across all three tracks, with code review on the automation work.",
    certificate:
      "A completion certificate is issued for each track, naming the courses covered.",
    faqs: [
      {
        question: "Do I have to take the tracks in order?",
        answer:
          "It is strongly recommended. Each track assumes the one before it, and taken in order they build rather than repeat.",
      },
      {
        question: "Can I buy the tracks separately instead?",
        answer:
          "Yes. Each of the three is sold on its own. The bundle exists because taking all three together costs less than buying them one at a time.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: [
      "enterprise-networking-internship",
      "data-center-networking-internship",
      "data-center-automation-internship",
    ],
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
