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

import { courses } from "./courses";
import type { Faq, Module } from "./courses";

export type InternshipCategory =
  | "Enterprise Networking"
  | "Data Center"
  | "Automation"
  | "Career Bundle";

export type Internship = {
  slug: string;
  /** The LMS slug, only where it differs from `slug`; see enrollHref in lib/site. */
  lmsSlug?: string;
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
      "It runs the full enterprise stack: CCNA Advanced with BGP fundamentals, CCNP Enterprise at ENCOR level, Cisco Meraki and HPE Aruba Networking wireless, Palo Alto NGFW, Linux, and AWS networking for hybrid connectivity.",
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
      "HPE Aruba Networking controllers and instant APs",
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
      { title: "HPE Aruba Networking Wireless (enterprise Wi-Fi)" },
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
    related: ["data-center-server-virtualization-internship", "data-center-automation-internship", "elite-career-path-bundle"],
  },

  {
    slug: "data-center-server-virtualization-internship",
    title: "Data Center Server and Virtualization Internship",
    track: "Server hardware, storage and VMware, from the rack up",
    category: "Data Center",
    featured: true,
    shortDescription:
      "The compute side of the data center: enterprise server hardware, RAID and SAN storage, out-of-band management, and VMware vSphere, on a CCNA Advanced networking base.",
    overview: [
      "The Data Center Server and Virtualization Internship covers what runs inside the rack rather than the fabric between racks: the servers themselves, the storage behind them, and the hypervisor layer on top.",
      "It opens with CCNA Advanced Training, because a server engineer who cannot read a routing table or trace a VLAN cannot debug half of what goes wrong. From there it moves through data center fundamentals, enterprise server hardware, RAID and shared storage, out-of-band management, and VMware vSphere, then Linux, AWS cloud fundamentals and the monitoring stack the estate is run from.",
      "The hardware is treated concretely: Dell PowerEdge, HPE ProLiant and Lenovo ThinkSystem, Intel Xeon and AMD EPYC, DIMM population and memory channels, NVMe and SAS, iDRAC and iLO. The storage phase is hands-on with array builds, simulated disk failure and rebuilds, and iSCSI.",
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
      "Dell PowerEdge, HPE ProLiant and Lenovo ThinkSystem",
      "Intel Xeon and AMD EPYC",
      "iDRAC, iLO, XClarity, IPMI and Redfish",
      "Hardware RAID, SAS, SATA and NVMe",
      "Fibre Channel, iSCSI, NFS and SMB",
      "VMware ESXi and vCenter Server",
      "Cisco routers and switches",
      "Linux (Red Hat and Debian families)",
      "AWS VPC, EC2 and IAM",
      "SNMP, Syslog, Zabbix, Prometheus and Grafana",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (routing and switching)" },
      { title: "Data Center Fundamentals and Physical Infrastructure" },
      { title: "Server Hardware Engineering" },
      { title: "RAID and Enterprise Storage" },
      { title: "Server Management and Firmware" },
      { title: "Enterprise Virtualization and VMware" },
      { title: "Linux for Networking" },
      { title: "AWS Cloud Practitioner (CLF-C02)" },
      { title: "Monitoring Tools (SNMP, Syslog, Zabbix, Prometheus, Grafana)" },
      { title: "Real-Time Project Version 2.0" },
    ],
    curriculum: [
      {
        title: "Phase 1: CCNA Advanced Training",
        topics: [
          "Networking foundations and packet analysis",
          "Cisco device access and IOS / IOS XE administration",
          "IP addressing, core services and routing fundamentals",
          "OSPF, EIGRP and BGP essentials",
          "Layer 3 switching and first-hop redundancy",
          "Network security, monitoring and observability",
        ],
      },
      {
        title: "Phase 2: Data Center Fundamentals and Physical Infrastructure",
        topics: [
          "Data center architecture and classifications",
          "Enterprise, hyperscale, colocation and edge data centers",
          "Tier I, II, III and IV concepts",
          "Server racks: 1U, 2U and 4U",
          "Rack installation and cable management",
          "Power distribution units, UPS and generators",
          "Cooling, hot aisle and cold aisle",
          "Redundancy and physical security",
        ],
      },
      {
        title: "Phase 3: Complete Server Hardware Engineering",
        topics: [
          "Dell PowerEdge, HPE ProLiant and Lenovo ThinkSystem",
          "Server motherboard architecture",
          "CPU sockets: Intel Xeon and AMD EPYC",
          "CPU cores, threads, cache and NUMA",
          "RAM slots, DIMM population and memory channels",
          "DDR4, DDR5, ECC, RDIMM and LRDIMM",
          "HDD, SSD, SAS, SATA and NVMe",
          "PCIe slots, expansion cards and NICs",
          "GPU cards and Fibre Channel HBA",
          "RAID controllers and storage backplanes",
          "Cooling fans, heatsinks and redundant PSUs",
          "BIOS, UEFI, TPM and Secure Boot",
          "iDRAC, iLO and XClarity",
        ],
      },
      {
        title: "Phase 4: RAID and Enterprise Storage",
        topics: [
          "RAID fundamentals and architecture",
          "RAID 0, 1, 5, 6 and 10",
          "RAID 50 and RAID 60",
          "Hot spare and disk rebuild",
          "Hardware RAID vs software RAID",
          "RAID controller cache policies",
          "DAS, NAS and SAN",
          "Fibre Channel and iSCSI",
          "NFS and SMB",
          "LUNs, WWN and SAN zoning",
          "Multipathing and MPIO",
          "Thin and thick provisioning",
          "Storage snapshots and replication",
          "IOPS, latency and throughput",
          "Labs: build arrays, simulate disk failure, rebuild, configure and mount iSCSI storage",
        ],
      },
      {
        title: "Phase 5: Server Management and Firmware",
        topics: [
          "iDRAC configuration",
          "HPE iLO configuration",
          "IPMI and Redfish",
          "Remote KVM and virtual console",
          "BIOS configuration",
          "Firmware and driver upgrades",
          "Server health and event logs",
          "PXE boot and remote OS installation",
        ],
      },
      {
        title: "Phase 6: Enterprise Virtualization and VMware",
        topics: [
          "Virtualization architecture",
          "Type 1 and Type 2 hypervisors",
          "VMware ESXi installation and host management",
          "vCenter Server deployment",
          "vSwitch, vDS and port groups",
          "VMkernel interfaces",
          "VLAN and virtual networking",
          "VM creation and resource allocation",
          "VMFS, NFS and iSCSI datastores",
          "VM snapshots, cloning and templates",
          "vMotion and Storage vMotion",
          "VMware HA and DRS",
          "Resource pools and clusters",
        ],
      },
      {
        // Topics follow the Linux for Network Engineers course, so the phase
        // cannot drift from what that course actually teaches.
        title: "Phase 7: Linux for Servers",
        topics: [
          "Linux architecture, distributions and the filesystem hierarchy",
          "CLI basics, Bash and file and directory permissions",
          "sudo, privilege and package management",
          "Processes, monitoring and reading logs",
          "ip, netstat, ss and tcpdump",
          "DNS and DHCP on Linux",
          "iptables and host firewalling",
          "Bash scripting and cron scheduling",
          "SSH configuration and key-based access",
          "Lab: securing a Linux server",
        ],
      },
      {
        // Topics follow the AWS Certified Cloud Practitioner course.
        title: "Phase 8: AWS Cloud",
        topics: [
          "Cloud vs data center, regions and availability zones",
          "The VPC as a virtual data center",
          "CIDR and subnet design, public vs private subnets",
          "Route tables, internet gateway and NAT gateway",
          "Security groups vs network ACLs",
          "IAM users, roles and policies",
          "EC2 instance types, auto scaling and load balancing",
          "S3, EBS and EFS storage",
          "CloudWatch and CloudTrail",
          "Hybrid connectivity: VPN and Direct Connect",
        ],
      },
      {
        title: "Phase 9: Monitoring Tools",
        topics: [
          "SNMP and Syslog",
          "Zabbix monitoring",
          "Prometheus and Grafana",
        ],
      },
    ],
    projects: [
      RTP,
      {
        title: "Rack build and power plan",
        summary:
          "Lay out a rack to a written requirement: unit allocation, cable management, PDU loading and the redundancy the tier level demands.",
      },
      {
        title: "RAID failure and rebuild",
        summary:
          "Build arrays across several RAID levels, fail a disk deliberately, rebuild from a hot spare and account for what the array did to performance meanwhile.",
      },
      {
        title: "vSphere cluster with shared storage",
        summary:
          "Stand up ESXi hosts under vCenter on iSCSI datastores, then prove vMotion, HA and DRS behave under a forced host failure.",
      },
    ],
    outcomes: [
      "Specify and build an enterprise server from motherboard to PSU",
      "Choose a RAID level for a workload and defend the trade-off",
      "Configure and present SAN and NAS storage, including zoning and multipathing",
      "Administer servers out of band through iDRAC, iLO, IPMI and Redfish",
      "Deploy and run a vSphere cluster with vCenter, HA and DRS",
      "Trace a fault across the network, hardware, storage and hypervisor layers",
    ],
    careerRoles: [
      "Data Center Technician (L1)",
      "Server Support Engineer (L2)",
      "Virtualization Engineer",
      "Storage Support Engineer",
      "Infrastructure Support Engineer",
      "VMware Administrator",
    ],
    mentorship:
      "Taught by engineers who run production data center estates, with a named trainer responsible for your labs and project reviews.",
    certificate:
      "A programme completion certificate is issued at the end, naming the courses covered.",
    faqs: [
      {
        question: "Why does a server track start with CCNA?",
        answer:
          "Because a large share of what looks like a server fault is a network fault. Phase 1 is CCNA Advanced Training so you can read a routing table, trace a VLAN and rule the network out before opening the server.",
      },
      {
        question: "Does this programme include automation?",
        answer:
          "No. This track is hardware, storage, virtualization, Linux, AWS fundamentals and monitoring. If you want Python, Ansible and CI/CD on top of data center material, take the AI Data Center and Automation Internship instead.",
      },
      {
        question: "Do I need virtualization experience?",
        answer:
          "No. VMware is taught from ESXi installation upward, through vCenter, datastores, vMotion, HA and DRS.",
      },
      {
        question: "Is the hardware work hands-on?",
        answer:
          "Yes. The storage phase builds arrays, fails disks deliberately and rebuilds them, and configures and mounts iSCSI storage. Server management is done out of band through iDRAC and iLO.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["data-center-automation-internship", "enterprise-networking-internship", "elite-career-path-bundle"],
  },

  {
    slug: "data-center-automation-internship",
    lmsSlug: "data-center-and-automation-internship",
    title: "AI Data Center and Automation Internship",
    track: "Advanced track: cloud, DevOps, network automation and AI-ready infrastructure",
    category: "Automation",
    featured: true,
    shortDescription:
      "The advanced track: spine-leaf and VXLAN, AWS hybrid cloud, then Python, Ansible, REST APIs and CI/CD on top, with real automation projects.",
    overview: [
      "The AI Data Center and Automation Internship prepares you for modern data center and cloud infrastructure roles, with the automation, DevOps and cloud networking skills US enterprise environments now expect as standard.",
      "It carries the networking sequence through CCNP with data center concepts, adds Palo Alto security, HPE Aruba Networking and AWS Cloud Practitioner, then builds the automation layer: Python and Netmiko, Ansible, REST APIs, Git and CI/CD pipelines across Jenkins, GitHub Actions and GitLab CI.",
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
      "Cisco, Juniper, Palo Alto and HPE Aruba Networking equipment",
      "AWS VPC and hybrid cloud",
    ],
    coursesIncluded: [
      { title: "CCNA Advanced (200-301, with BGP)" },
      { title: "CCNP Enterprise (advanced routing and data center concepts)" },
      { title: "JNCIA (Juniper, certification assistance)" },
      { title: "Palo Alto NGFW" },
      { title: "HPE Aruba Networking" },
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
        title: "AI Data Center Basics",
        topics: [
          "GPU server deployment",
          "GPU server networking",
          "Cooling for GPU racks",
        ],
      },
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
      "Understand GPU server deployment, networking and cooling",
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
        question: "How is this different from the Data Center Server and Virtualization Internship?",
        answer:
          "That track is the compute side: server hardware, RAID and storage, out-of-band management, VMware, Linux and AWS fundamentals, with monitoring taught as operations. This one is the network and automation side: spine-leaf and VXLAN, GPU data center basics, then Python, Ansible, REST APIs, Git, CI/CD pipelines, and observability built and instrumented rather than operated.",
      },
      { question: "How long do I keep access?", answer: ACCESS_NOTE },
      { question: "How do I apply?", answer: APPLY_NOTE },
    ],
    related: ["data-center-server-virtualization-internship", "enterprise-networking-internship", "elite-career-path-bundle"],
  },

  {
    slug: "elite-career-path-bundle",
    title: "Elite Career Path Bundle",
    track: "All three internships, taken as one sequence",
    category: "Career Bundle",
    shortDescription:
      "All three tracks together: enterprise networking, data center servers and virtualization, and the automation and cloud layer on top, at a single bundled price.",
    overview: [
      "The Elite Career Path Bundle is all three internships taken as one sequence rather than bought separately: Enterprise Networking, Data Center Server and Virtualization, and AI Data Center and Automation.",
      "Taken in order the tracks build rather than repeat. Enterprise networking establishes routing, switching, wireless and operations; the server track adds the hardware, storage and hypervisor layers; the automation track puts Python, Ansible, CI/CD and cloud on top of both.",
      "It is the widest route offered, and it is aimed at someone who wants to finish able to work in enterprise networking, data center infrastructure or automation, rather than having to pick one at the start.",
      "Every course in the catalog is assigned to bundle students, not only the ones the three tracks sequence.",
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
    // The three tracks, then every course in the catalog by name. Spread from
    // `courses` rather than retyped, so a course added, renamed or removed
    // there reaches this list without anyone remembering it exists - the way
    // the list fell behind the catalog in the first place.
    coursesIncluded: [
      { title: "Enterprise Networking Internship, in full" },
      { title: "Data Center Server and Virtualization Internship, in full" },
      { title: "AI Data Center and Automation Internship, in full" },
      ...courses.map((c) => ({ title: c.title })),
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
        title: "Track Two: Data Center Server and Virtualization",
        topics: [
          "Data center architecture and the physical layer",
          "Enterprise server hardware, RAID and SAN storage",
          "VMware vSphere: vCenter, vMotion, HA and DRS",
          "Out-of-band management with iDRAC, iLO and Redfish",
          "Faults traced across hardware, storage and hypervisor",
        ],
      },
      {
        title: "Track Three: AI Data Center and Automation",
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
      "data-center-server-virtualization-internship",
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
