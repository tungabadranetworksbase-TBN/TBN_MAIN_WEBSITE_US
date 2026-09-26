/**
 * Course catalog - the twelve courses published on tungabadranetworks.in.
 *
 * Two rules held to throughout:
 *
 *  - Course names, focus areas and the certifications they map to come from
 *    the live site. Module topics are the organisation's own published
 *    syllabus, phase by phase, as taught - not the vendors' exam blueprints
 *    and not invented.
 *  - Fees are not stated here. They live in pricing.ts, converted from the
 *    published rupee price at a rate the site controls, and the detail page
 *    reads them from there. No fixed duration is published, so `duration`
 *    says where to get the real answer instead of guessing a number.
 *
 * Adding a course = appending one object. The listing page, detail page,
 * sitemap and Course JSON-LD all read from here.
 */

export type DeliveryFormat = "Classroom" | "Online (live)" | "Corporate (on-site)";
export type Level = "Foundation" | "Intermediate" | "Advanced";

export type Module = { title: string; topics: string[] };
export type Faq = { question: string; answer: string };

export type Course = {
  slug: string;
  title: string;
  category: CourseCategory;
  shortDescription: string;
  /** Opens by answering "what is this course?" directly. */
  overview: string[];
  audience: string[];
  outcomes: string[];
  skills: string[];
  curriculum: Module[];
  /** No fixed duration is published; this is what the page shows instead. */
  duration: string;
  deliveryFormats: DeliveryFormat[];
  level: Level;
  prerequisites: string[];
  projects: { title: string; summary: string }[];
  certification: {
    /** Third-party exam the course maps to. TBN is not an affiliate of these vendors. */
    preparesFor: string[];
    note: string;
  };
  careers: { role: string; note: string }[];
  faqs: Faq[];
  related: string[];
  featured?: boolean;
};

export type CourseCategory =
  | "Routing & Switching"
  | "Network Security"
  | "Wireless & Campus"
  | "Cloud"
  | "Automation"
  | "Systems"
  | "Projects";

export const courseCategories: { name: CourseCategory; blurb: string }[] = [
  { name: "Routing & Switching", blurb: "The core of every enterprise network: Cisco and Juniper." },
  { name: "Network Security", blurb: "Next-generation firewalls, VPNs and policy." },
  { name: "Wireless & Campus", blurb: "Campus fabric, wireless design and access." },
  { name: "Cloud", blurb: "Cloud networking fundamentals and certification." },
  { name: "Automation", blurb: "Python, APIs and configuration management for networks." },
  { name: "Systems", blurb: "The Linux underneath the network." },
  { name: "Projects", blurb: "Extended build work on real topologies." },
];

const CONSULT_NOTE = "Duration and fees are shared on the free consultation call, with the current syllabus and batch dates.";
const VENDOR_NOTE =
  "Tungabadra Networks is not an authorized training partner of this vendor and does not administer or issue the exam. Exams are booked and paid for directly with the vendor.";

export const courses: Course[] = [
  {
    slug: "ccna-advanced-training",
    title: "CCNA Advanced Training",
    category: "Routing & Switching",
    featured: true,
    shortDescription:
      "The entry point for most engineers: IP addressing, routing, switching, and structured troubleshooting on physical Cisco equipment.",
    overview: [
      "CCNA Advanced Training is the foundation course. It covers the addressing, switching, routing and security topics an engineer needs before touching a production network, and it is taught on real Cisco equipment rather than a simulator alone.",
      "Every concept is paired with a lab and then deliberately broken, so the skill you leave with is diagnosis rather than configuration recall. Wireshark packet analysis runs alongside from the first week.",
      "The syllabus follows the topic areas Cisco publishes for the CCNA exam, so the same preparation serves both your first networking role and your first certification attempt.",
    ],
    audience: [
      "Graduates entering IT with no networking background",
      "Desktop or help desk staff moving into network roles",
      "Non-IT professionals transitioning into networking",
      "Anyone preparing for the Cisco CCNA exam",
    ],
    outcomes: [
      "Plan and subnet an IPv4 and IPv6 addressing scheme without a calculator",
      "Configure and verify VLANs, trunking, spanning tree and EtherChannel",
      "Configure static routing, OSPF and inter-VLAN routing on Cisco devices",
      "Apply access control lists, port security and device hardening",
      "Read a packet capture and explain why traffic is not arriving",
      "Diagnose a fault with a repeatable layer-by-layer method",
    ],
    skills: [
      "IPv4 / IPv6 subnetting",
      "VLANs & trunking",
      "Spanning Tree",
      "OSPF",
      "Access control lists",
      "NAT & DHCP",
      "Wireless fundamentals",
      "Wireshark",
      "Cisco IOS CLI",
      "Structured troubleshooting",
    ],
    curriculum: [
      { title: "Networking Foundations & Packet Analysis", topics: ["OSI and TCP/IP models, PDUs and encapsulation", "LAN and WAN, broadcast and collision domains", "Ethernet, IPv4, TCP and UDP headers", "ARP, ICMP, ping, traceroute, DNS, DHCP", "Network topologies", "Wireshark packet analysis", "Lab setup: CML, EVE-NG, GNS3, Packet Tracer"] },
      { title: "Cisco Device Access & IOS/IOS XE Administration", topics: ["Console access and terminal settings", "Banners, exec-timeout and password recovery", "CLI modes, help and output filtering", "Hostname, interfaces, running vs startup config", "IOS vs IOS XE vs IOS XR", "Backup, archive and configure replace"] },
      { title: "IP Addressing & Core Services", topics: ["IPv4 subnetting, FLSM and summarization", "DHCP", "DNS", "NAT and PAT", "Labs: DORA capture and PAT"] },
      { title: "Routing Fundamentals", topics: ["Routing table and longest-prefix match", "Administrative distance and metrics", "Static routes by next-hop and exit-interface", "Default routing", "Floating static routes", "Routing labs"] },
      { title: "Advanced OSPF", topics: ["Cost, router-ID and packet types", "Adjacency formation and OSPF states", "DR/BDR election and network types", "LSA types 1 to 7 and the LSDB", "Stub, totally stubby and NSSA areas", "OSPF labs"] },
      { title: "EIGRP & Redistribution", topics: ["Neighbors, DUAL, successor and feasible successor", "OSPF to EIGRP redistribution lab"] },
      { title: "BGP Essentials", topics: ["AS numbers and path-vector behaviour", "eBGP and iBGP", "BGP messages and states", "Loop avoidance", "Weight, local preference, AS-path, origin, MED and next-hop", "Path selection and AS-path prepending", "BGP labs"] },
      { title: "Advanced & Layer 3 Switching", topics: ["MAC learning, VLANs, trunks and the native VLAN", "VTP", "STP and RSTP", "Inter-VLAN routing", "Layer 2 and Layer 3 EtherChannel", "PAgP and LACP", "CDP and LLDP", "Switching labs"] },
      { title: "First-Hop Redundancy", topics: ["Gateway single points of failure", "HSRP versions, virtual IP, priority and preempt", "VRRP", "Aligning the STP root with the active gateway", "Failover labs"] },
      { title: "Wireless Access Essentials", topics: ["RF, channels, SSID and BSSID, 802.11", "Autonomous, WLC-CAPWAP and cloud architectures", "AP groups and FlexConnect", "Cisco Meraki dashboard and MR access points", "SSID to VLAN mapping", "PoE budgeting"] },
      { title: "Cisco Hardware & Platforms", topics: ["Platform taxonomy", "IOS, IOS XE and IOS XR", "ASR 9010, ASR 920 and ASR 903", "ISR 4331, ASR 1001-X and ASR 1002-X", "Catalyst 2960, 9200 and 9300", "show version and show inventory", "Sessions on real hardware"] },
      { title: "Network Security", topics: ["Threat landscape and device hardening", "SSH, local users and privilege levels", "AAA", "Standard, extended and named ACLs", "Port security", "BPDU Guard, Root Guard and storm control", "Security labs"] },
      { title: "Monitoring & Observability", topics: ["Polling vs traps, baselining and SLA", "SNMP v2c and v3, OIDs and MIBs", "Syslog and NTP", "Device and interface health", "PRTG", "Zabbix", "Alerts and maintenance windows"] },
      { title: "IOS / IOS XE Upgrade & Maintenance", topics: ["PSIRT advisories and lifecycle", "Images, licensing, bundle vs install mode, MD5 and SHA", "Flash management", "Backup over TFTP, FTP, SCP and USB", "Boot variables and the method of procedure", "install add, activate, commit and rollback", "ROMMON recovery"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)", "Corporate (on-site)"],
    level: "Foundation",
    prerequisites: [
      "No prior networking experience required",
      "Comfortable operating a computer",
      "No coding background needed",
    ],
    projects: [
      { title: "Two-site branch build", summary: "Design and build a headquarters and branch topology with VLAN segmentation, OSPF between sites and an ACL policy separating guest traffic." },
      { title: "Fault injection lab", summary: "Diagnose seeded faults on a working topology and write a root-cause note for each." },
      { title: "Documentation pack", summary: "Produce the diagrams, address plan and runbook a real team expects at handover." },
    ],
    certification: { preparesFor: ["Cisco CCNA"], note: VENDOR_NOTE },
    careers: [
      { role: "Network Engineer (L1)", note: "Configuration changes and first-line support on campus networks." },
      { role: "NOC Engineer", note: "Monitoring, triage and escalation in a network operations centre." },
      { role: "Network Support Engineer", note: "Blended endpoint and network edge support." },
      { role: "Field Engineer", note: "On-site installation, commissioning and fault resolution." },
    ],
    faqs: [
      { question: "Do I need a networking background to start?", answer: "No. CCNA Advanced Training starts from the OSI model and binary maths, so no prior networking experience is assumed. Comfort operating a computer is enough." },
      { question: "Will I train on real equipment?", answer: "Yes. Labs run on physical Cisco routers and switches in the enterprise labs, with 24/7 rack access. Online students get virtual rack access to the same environments." },
      { question: "Does this prepare me for the CCNA exam?", answer: "The syllabus follows the topic areas Cisco publishes for CCNA. " + VENDOR_NOTE },
      { question: "How long does the course take?", answer: CONSULT_NOTE },
    ],
    related: ["ccnp-enterprise-service-provider", "linux-for-network-engineers", "real-time-networking-projects"],
  },

  {
    slug: "ccnp-enterprise-service-provider",
    title: "CCNP Enterprise & Service Provider",
    category: "Routing & Switching",
    featured: true,
    shortDescription:
      "The step past CCNA: MPLS, BGP, advanced OSPF, VPNs and the security that enterprise and service provider networks actually run on.",
    overview: [
      "CCNP Enterprise & Service Provider is the professional-level course. It covers the protocols that carry traffic between sites and between providers: BGP, MPLS, advanced OSPF and the VPN technologies that tie them together.",
      "Where CCNA teaches a single campus, this course works at the scale where design decisions have consequences. You build multi-area, multi-protocol topologies and then reason about convergence, path selection and failure domains.",
      "It follows the topic areas Cisco publishes for the ENCOR core exam, and it is the usual next step for engineers already working in a network role.",
    ],
    audience: [
      "Engineers who have completed CCNA or hold equivalent experience",
      "Working network engineers moving from support into design",
      "Engineers targeting service provider or large enterprise roles",
      "Anyone preparing for the Cisco ENCOR exam",
    ],
    outcomes: [
      "Configure and troubleshoot BGP, including path selection and route policy",
      "Build and verify MPLS L3VPN across a provider core",
      "Design multi-area OSPF and reason about convergence and summarisation",
      "Configure site-to-site VPNs and secure inter-site transport",
      "Apply enterprise security and infrastructure hardening at scale",
      "Diagnose faults in a multi-protocol topology under time pressure",
    ],
    skills: ["BGP", "MPLS L3VPN", "Advanced OSPF", "EIGRP", "Site-to-site VPN", "Route redistribution", "QoS", "Network design", "High availability", "Troubleshooting at scale"],
    curriculum: [
      { title: "Network Architecture", topics: ["Service provider architectures", "Core, distribution and access layers", "MPLS core", "DWDM overview", "Tier 2 and Tier 3 enterprise design", "Spine-leaf and the modern data centre", "Scalability, redundancy and performance"] },
      { title: "Routing & Switching", topics: ["OSPF configuration and troubleshooting", "Virtual links, sham links, point-to-point and passive interfaces", "IS-IS", "iBGP and eBGP", "Attributes, path selection, route reflectors and peer groups", "Prefix lists, route maps and communities", "Dual-ISP BGP", "BFD, NSR, graceful restart, EtherChannel and LAG"] },
      { title: "MPLS", topics: ["Control plane vs data plane", "LDP", "Label operations", "Layer 3 VPN, VRF and route targets", "MP-BGP", "Pseudowires, VPLS and targeted LDP"] },
      { title: "Advanced Routing & Real-World Scenarios", topics: ["BGP communities and traffic engineering", "Route dampening", "Fragmentation and path MTU discovery", "OSPF sham links"] },
      { title: "Switching", topics: ["Inter-VLAN routing", "Private VLANs", "Stacking", "Stacking vs vPC vs VSS, with live examples", "Layer 2 high availability and security"] },
      { title: "Overlay & Fabric", topics: ["Overlay vs underlay", "VXLAN, VTEPs and VNIs", "Flood-and-learn vs control plane", "BGP EVPN route types", "Anycast gateway", "L2VNI and L3VNI", "LISP: EID, RLOC, map server and map resolver", "Mobility and SD-Access", "Fabric labs"] },
      { title: "Network Security", topics: ["AAA, RADIUS and TACACS+", "VLAN, VRF and ACL segmentation", "IPv4 and IPv6 ACLs", "Port security, DHCP snooping and dynamic ARP inspection", "IPsec and NAT concepts"] },
      { title: "Real-Time Project & Interview Preparation", topics: ["Hardware and protocol troubleshooting", "Scenario-based problem solving", "Writing root cause analyses", "MPLS and BGP interview questions", "Enterprise and service provider case studies"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)", "Corporate (on-site)"],
    level: "Advanced",
    prerequisites: [
      "CCNA Advanced Training, or equivalent working knowledge",
      "Confident with routing, switching and the Cisco CLI",
      "Able to subnet and read a routing table without help",
    ],
    projects: [
      { title: "Service provider core", summary: "Build an MPLS core with multiple customer VRFs and verify isolation between them." },
      { title: "BGP policy lab", summary: "Implement a route policy that steers traffic across redundant upstreams, then prove it under link failure." },
      { title: "Convergence study", summary: "Measure and tune convergence across a multi-area design, documenting the trade-offs." },
    ],
    certification: { preparesFor: ["Cisco CCNP Enterprise (ENCOR)"], note: VENDOR_NOTE },
    careers: [
      { role: "Network Engineer (L2/L3)", note: "Owns design and escalated faults across a multi-site estate." },
      { role: "Service Provider Engineer", note: "Works on provider core, peering and customer VPNs." },
      { role: "Network Consultant", note: "Designs and reviews enterprise networks for clients." },
      { role: "Senior Network Engineer", note: "Leads builds, migrations and change windows." },
    ],
    faqs: [
      { question: "Can I take CCNP without CCNA?", answer: "Not usually. The course assumes you can subnet, read a routing table and drive the Cisco CLI without help. If you cannot, start with CCNA Advanced Training." },
      { question: "Does it cover service provider topics as well as enterprise?", answer: "Yes. MPLS L3VPN, BGP route policy and provider edge configuration are covered alongside the enterprise core." },
      { question: "How long does the course take?", answer: CONSULT_NOTE },
    ],
    related: ["ccna-advanced-training", "palo-alto-ngfw", "real-time-networking-projects"],
  },

  {
    slug: "palo-alto-ngfw",
    title: "Palo Alto NGFW",
    category: "Network Security",
    featured: true,
    shortDescription:
      "Next-generation firewall training taught by a former Palo Alto TAC engineer: policy, App-ID, VPN, NAT and real troubleshooting.",
    overview: [
      "Palo Alto NGFW covers the platform from first principles: interfaces and zones, security policy, App-ID and Content-ID, NAT, VPN and the management plane. It is taught on physical Palo Alto equipment.",
      "The course is led by an engineer who spent eight years in Palo Alto TAC, so the emphasis is on the failure modes support actually sees: policy that does not match, NAT that breaks return traffic, VPN phases that will not come up.",
      "Troubleshooting sessions use the same tools TAC uses, including session browser, packet capture and traffic logs.",
    ],
    audience: [
      "Network engineers adding a security specialisation",
      "Engineers supporting a Palo Alto estate",
      "CCNA holders moving toward security roles",
      "Anyone preparing for a Palo Alto associate-level exam",
    ],
    outcomes: [
      "Configure interfaces, zones, virtual routers and security policy",
      "Use App-ID and Content-ID to write policy on applications, not ports",
      "Configure source and destination NAT and predict return-path behaviour",
      "Build and troubleshoot IPsec site-to-site VPN through both phases",
      "Read traffic logs and the session browser to isolate a policy fault",
      "Take a packet capture on the firewall and interpret it",
    ],
    skills: ["Security policy", "App-ID", "Content-ID", "NAT", "IPsec VPN", "Zones and virtual routers", "Traffic log analysis", "Packet capture", "Panorama concepts", "Firewall troubleshooting"],
    curriculum: [
      { title: "Firewall Fundamentals", topics: ["Hardware types", "Interface types and zones", "Interface management profiles", "Life of a packet and session types", "Upgrades and configuration backup", "Basic traffic troubleshooting"] },
      { title: "SSL Decryption", topics: ["SSL/TLS and certificates", "Forward proxy", "Inbound inspection", "Forward-proxy lab"] },
      { title: "URL Category & Filtering", topics: ["Pre-defined URL categories", "Custom URL categories", "URL filtering policies", "URL filtering lab"] },
      { title: "IPSec VPN", topics: ["IPsec fundamentals", "Phase 1 and Phase 2", "Route-based vs policy-based", "Site-to-site lab"] },
      { title: "GlobalProtect", topics: ["Agent, portal and gateway", "Connection methods", "Remote-site VPN", "GlobalProtect lab"] },
      { title: "High Availability", topics: ["Active-Passive", "Active-Active", "High availability lab", "Failover scenarios"] },
      { title: "Panorama", topics: ["Managed devices", "Device groups and templates", "Panorama lab", "Logging, reporting and commit management"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)", "Corporate (on-site)"],
    level: "Intermediate",
    prerequisites: [
      "Working knowledge of TCP/IP, routing and NAT",
      "CCNA Advanced Training or equivalent experience",
      "Comfortable reading a packet capture",
    ],
    projects: [
      { title: "Policy build from a requirements sheet", summary: "Translate a written security requirement into a working, ordered policy set and prove each rule matches as intended." },
      { title: "VPN bring-up under fault", summary: "Establish a site-to-site tunnel against a misconfigured peer and diagnose each phase failure in turn." },
      { title: "TAC case simulation", summary: "Work a realistic support case end to end, from symptom to root cause to written resolution." },
    ],
    certification: { preparesFor: ["Palo Alto Networks PCNSA"], note: VENDOR_NOTE },
    careers: [
      { role: "Network Security Engineer", note: "Owns firewall policy and secure connectivity." },
      { role: "Firewall Administrator", note: "Day-to-day policy changes, reviews and audits." },
      { role: "Security Operations Engineer", note: "Investigates alerts against firewall and threat logs." },
      { role: "Implementation Engineer", note: "Deploys and migrates firewall estates for clients." },
    ],
    faqs: [
      { question: "Who teaches this course?", answer: "It is led by an engineer with eight years in Palo Alto TAC, which is why the troubleshooting content follows real support cases rather than textbook scenarios." },
      { question: "Is this hands-on or lecture based?", answer: "Hands-on. Labs run on physical Palo Alto equipment with 24/7 rack access, and the troubleshooting modules use live faults." },
      { question: "Do I need security experience?", answer: "No, but you do need solid TCP/IP, routing and NAT knowledge. CCNA Advanced Training covers that ground." },
    ],
    related: ["ccnp-enterprise-service-provider", "juniper-jncia", "aruba-certified-associate"],
  },

  {
    slug: "aruba-certified-associate",
    title: "Aruba Certified Associate (ACA)",
    category: "Wireless & Campus",
    shortDescription:
      "Campus switching and wireless on Aruba: WLAN design, controllers, access points and the security that runs across a campus fabric.",
    overview: [
      "The Aruba Certified Associate course covers campus networking on Aruba hardware: switching, wireless LAN design, controller and access point configuration, and campus security.",
      "Wireless is where most campus faults actually live, so a significant part of the course is spent on RF behaviour, coverage, roaming and the diagnostics that separate an RF problem from a wired one.",
      "It follows the topic areas Aruba publishes for the ACA credential.",
    ],
    audience: [
      "Network engineers supporting campus or wireless estates",
      "Engineers working in organisations running Aruba hardware",
      "CCNA holders adding a wireless and campus specialisation",
      "Anyone preparing for the Aruba ACA exam",
    ],
    outcomes: [
      "Configure Aruba switching for a campus access and aggregation layer",
      "Design WLAN coverage and plan channel and power settings",
      "Configure controllers, access points and SSID policy",
      "Apply role-based access and campus security controls",
      "Diagnose roaming, coverage and interference problems",
      "Separate an RF fault from a wired or authentication fault",
    ],
    skills: ["Aruba switching", "WLAN design", "Controllers and APs", "SSID and role policy", "RF fundamentals", "Roaming", "Campus security", "802.1X concepts", "Wireless troubleshooting", "Site survey basics"],
    curriculum: [
      { title: "Networking Fundamentals", topics: ["OSI and TCP/IP models", "IPv4 subnetting", "ARP, ICMP, DHCP and DNS", "Unicast, broadcast and multicast"] },
      { title: "Aruba Networking Fundamentals", topics: ["Aruba product portfolio", "CX 6200, 6300 and 6400", "Access points and Aruba Central", "Introduction to ClearPass"] },
      { title: "Layer 2 Switching", topics: ["MAC address table", "Access and trunk ports, 802.1Q", "LACP"] },
      { title: "Spanning Tree", topics: ["STP and RSTP", "Root election, port roles and states", "Loop prevention"] },
      { title: "Layer 3 Basics", topics: ["SVI inter-VLAN routing", "Static and default routes", "Introduction to OSPF"] },
      { title: "Wireless Fundamentals", topics: ["SSID and BSSID", "2.4 GHz and 5 GHz", "dBm and SNR", "AP modes, association and roaming"] },
      { title: "Aruba Central", topics: ["Zero-touch provisioning onboarding", "Dashboards", "GUI configuration and firmware", "Alerts and logs"] },
      { title: "Security Fundamentals", topics: ["Authentication and authorization", "WPA2 and WPA3", "Captive portal and AAA"] },
      { title: "Network Services", topics: ["DHCP server and relay", "DNS", "NTP and SNMP"] },
      { title: "Monitoring & Troubleshooting", topics: ["CLI and logs", "ping, traceroute and interface checks", "VLAN and STP issues"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)", "Corporate (on-site)"],
    level: "Intermediate",
    prerequisites: ["Working knowledge of switching and VLANs", "CCNA Advanced Training or equivalent", "No prior wireless experience required"],
    projects: [
      { title: "Campus WLAN design", summary: "Plan coverage, channels and power for a multi-floor site, then build and validate it." },
      { title: "Roaming investigation", summary: "Diagnose a sticky-client and roaming problem across a multi-AP deployment." },
      { title: "Guest access build", summary: "Deploy segmented guest access with role-based policy and verify isolation." },
    ],
    certification: { preparesFor: ["Aruba Certified Associate (ACA)"], note: VENDOR_NOTE },
    careers: [
      { role: "Wireless Network Engineer", note: "Designs and supports campus WLAN estates." },
      { role: "Campus Network Engineer", note: "Owns access and aggregation across sites." },
      { role: "Network Engineer (Aruba)", note: "Supports organisations standardised on Aruba." },
      { role: "Field Engineer", note: "AP installation, survey and commissioning." },
    ],
    faqs: [
      { question: "Do I need wireless experience?", answer: "No. RF fundamentals are taught from first principles. Switching and VLAN knowledge is the real prerequisite." },
      { question: "Is there physical Aruba equipment?", answer: "Yes. The labs include Aruba hardware alongside the Cisco and Palo Alto racks." },
    ],
    related: ["ccna-advanced-training", "palo-alto-ngfw", "juniper-jncia"],
  },

  {
    slug: "juniper-jncia",
    title: "Juniper JNCIA",
    category: "Routing & Switching",
    shortDescription:
      "Junos from the ground up: the CLI and configuration model, routing policy, firewall filters and how Junos differs from IOS in practice.",
    overview: [
      "Juniper JNCIA covers the Junos operating system: its configuration model, the candidate-and-commit workflow, routing fundamentals, routing policy and firewall filters.",
      "For engineers coming from Cisco, the course spends real time on where the two platforms diverge. The commit model, the policy framework and the way Junos treats interfaces catch people out, and those are the areas most worth drilling.",
      "It follows the topic areas Juniper publishes for the JNCIA-Junos credential.",
    ],
    audience: [
      "Engineers working in multi-vendor environments",
      "Cisco-trained engineers adding Juniper",
      "Engineers targeting service provider roles where Junos is common",
      "Anyone preparing for JNCIA-Junos",
    ],
    outcomes: [
      "Navigate the Junos CLI and the candidate configuration model confidently",
      "Configure interfaces, routing instances and static and dynamic routing",
      "Write and apply routing policy",
      "Build firewall filters and apply them correctly",
      "Use commit confirmed and rollback as a safety practice",
      "Translate a Cisco configuration intent into Junos",
    ],
    skills: ["Junos CLI", "Candidate config & commit", "Routing policy", "Firewall filters", "OSPF on Junos", "BGP basics", "Routing instances", "Rollback and commit confirmed", "Multi-vendor translation", "Junos troubleshooting"],
    curriculum: [
      { title: "Networking Fundamentals", topics: ["Collision and broadcast domains", "Routers vs switches", "Layer 2 and Layer 3 addressing", "IPv4 and IPv6, subnetting, supernetting and binary", "Longest match, CoS, connection-oriented vs connectionless"] },
      { title: "Junos OS Fundamentals", topics: ["Software architecture", "Control and forwarding planes", "Routing Engine and Packet Forwarding Engine", "Transit vs exception traffic"] },
      { title: "User Interfaces", topics: ["CLI modes, navigation, help and filtering", "Active vs candidate configuration", "Rollback, save and load"] },
      { title: "Configuration Basics", topics: ["Factory default", "Users, login classes and authentication", "Interfaces and configuration groups", "NTP, SNMP, syslog, archival and rescue configuration"] },
      { title: "Operational Monitoring & Maintenance", topics: ["show and monitor commands", "Interface statistics", "ping, traceroute, telnet and SSH", "Junos install and upgrade, power, root password recovery"] },
      { title: "Routing Fundamentals", topics: ["Forwarding behaviour", "Routing vs forwarding tables", "Route preference and routing instances", "Static and dynamic routing"] },
      { title: "Routing Policy & Firewall Filters", topics: ["Import and export policies", "Match criteria and actions", "Filter structure and terms", "Unicast RPF"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)", "Corporate (on-site)"],
    level: "Intermediate",
    prerequisites: ["Working knowledge of routing and switching", "CCNA Advanced Training or equivalent", "No prior Junos experience required"],
    projects: [
      { title: "Junos build from a Cisco spec", summary: "Take a working Cisco configuration and reproduce its intent on Junos, then prove equivalence." },
      { title: "Routing policy exercise", summary: "Implement a route filtering requirement using the Junos policy framework and verify each term." },
      { title: "Safe change drill", summary: "Apply a change with commit confirmed, observe a failure, and roll back cleanly." },
    ],
    certification: { preparesFor: ["Juniper JNCIA-Junos"], note: VENDOR_NOTE },
    careers: [
      { role: "Network Engineer (multi-vendor)", note: "Supports mixed Cisco and Juniper estates." },
      { role: "Service Provider Engineer", note: "Works on Junos-based provider infrastructure." },
      { role: "NOC Engineer", note: "Triages faults across multi-vendor networks." },
      { role: "Implementation Engineer", note: "Deploys and migrates Juniper platforms." },
    ],
    faqs: [
      { question: "Is this useful if my company runs Cisco?", answer: "Yes, in two ways: multi-vendor estates are common, and understanding a second configuration model makes you better at the first. The course explicitly contrasts the two." },
      { question: "Do I need Juniper experience?", answer: "No. The course starts from the CLI and the configuration model." },
    ],
    related: ["ccnp-enterprise-service-provider", "ccna-advanced-training", "python-for-network-automation"],
  },

  {
    slug: "cisco-devnet-network-automation",
    title: "Cisco DevNet / Network Automation",
    category: "Automation",
    featured: true,
    shortDescription:
      "The bridge from CLI to code: Python, Linux, REST APIs and the automation tooling that modern network roles increasingly assume.",
    overview: [
      "Cisco DevNet / Network Automation covers the software side of network engineering: Python fundamentals, Linux, REST APIs, data formats and the tooling used to configure and verify devices programmatically.",
      "It assumes no software background. Networking knowledge is the prerequisite; the programming is taught from first principles because that is the direction most engineers arrive from.",
      "It follows the topic areas Cisco publishes for the DevNet Associate (200-901) exam.",
    ],
    audience: [
      "Network engineers who have never written code",
      "Engineers whose roles are starting to expect automation",
      "CCNA or CCNP holders adding programmability",
      "Anyone preparing for Cisco DevNet Associate",
    ],
    outcomes: [
      "Write Python that reads, transforms and validates device data",
      "Work confidently in Linux from the command line",
      "Call REST APIs, handle authentication and parse JSON and XML",
      "Use version control for network configuration",
      "Understand model-driven programmability and NETCONF concepts",
      "Automate a repetitive verification task end to end",
    ],
    skills: ["Python", "Linux CLI", "REST APIs", "JSON & XML", "YAML", "Git", "NETCONF / YANG concepts", "Postman", "Data parsing", "Automation testing"],
    curriculum: [
      { title: "CCNA 200-301", topics: ["The full CCNA syllabus", "Fundamentals, routing and switching, security", "Wireshark", "Real hardware: ASR, Juniper MX and Catalyst"] },
      { title: "Python for Network Automation", topics: ["Syntax and data types", "Lists, tuples, sets and dictionaries", "Control flow", "Functions, args and kwargs, lambda", "Object-oriented programming", "Exceptions", "Netmiko, Paramiko, NAPALM and Ansible", "YAML and JSON", "SSH automation, output parsing and multi-device runs", "Regular expressions", "Git basics"] },
      { title: "Linux for Network Automation", topics: ["Essentials: filesystem, permissions and bash", "CLI operations: sudo, packages, processes, grep, awk, sed and logs", "Networking: ip, netstat, ss, tcpdump, iptables, DNS and DHCP", "Scripting: bash, cron, SSH keys, log parsing, shell with Python"] },
      { title: "Real-World Automation Projects", topics: ["Inventory scripts", "Multi-device deployment with Netmiko", "NAPALM state verification", "Ansible playbooks", "Git CI/CD", "Interview preparation"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)", "Corporate (on-site)"],
    level: "Intermediate",
    prerequisites: ["Working networking knowledge (CCNA level)", "No programming experience required", "Comfortable with the command line, or willing to learn it here"],
    projects: [
      { title: "Device inventory collector", summary: "Pull inventory and version data from a fleet over an API and produce a validated report." },
      { title: "Configuration checker", summary: "Write a script that checks devices against a written standard and reports exceptions." },
      { title: "Version-controlled config", summary: "Put a device configuration under Git with a review workflow and a rollback path." },
    ],
    certification: { preparesFor: ["Cisco DevNet Associate (200-901)"], note: VENDOR_NOTE },
    careers: [
      { role: "Network Automation Engineer", note: "Builds the tooling that configures and verifies fleets." },
      { role: "NetDevOps Engineer", note: "Applies software delivery practice to network infrastructure." },
      { role: "Network Engineer (automation-capable)", note: "The increasingly standard expectation in senior network roles." },
      { role: "Infrastructure Engineer", note: "Automates across network, server and cloud." },
    ],
    faqs: [
      { question: "Do I need a coding background?", answer: "No. Python is taught from first principles. Networking knowledge is the prerequisite, not software experience." },
      { question: "Is this the same as Python for Network Automation?", answer: "They overlap but differ in emphasis. DevNet is broader and exam-aligned, covering APIs, Linux and programmability concepts. Python for Network Automation goes deeper on the libraries used to drive devices day to day." },
    ],
    related: ["python-for-network-automation", "linux-for-network-engineers", "real-time-automation-projects"],
  },

  {
    slug: "python-for-network-automation",
    title: "Python for Network Automation",
    category: "Automation",
    shortDescription:
      "The libraries that drive real fleets: Netmiko, NAPALM, Ansible and REST APIs, with the safety practices that stop automation causing outages.",
    overview: [
      "Python for Network Automation is the applied automation course. It covers the libraries engineers actually use against production devices: Netmiko for SSH, NAPALM for vendor abstraction, Ansible for declarative configuration, and REST APIs for modern platforms.",
      "Safety is the throughline. Every technique is paired with the practice that makes it safe to run against real equipment: dry runs, pre- and post-change validation, idempotency and rollback.",
      "The output is tooling you could run against a fleet, not scripts that only work in a lab.",
    ],
    audience: [
      "Network engineers automating repetitive work",
      "Engineers who have completed DevNet or equivalent Python basics",
      "NOC staff automating recurring checks",
      "Engineers modernising a manual change process",
    ],
    outcomes: [
      "Collect and parse device state across a fleet programmatically",
      "Generate device configuration from templates and a source of truth",
      "Push changes safely with dry runs and pre and post checks",
      "Use Ansible for declarative, idempotent network configuration",
      "Write automated tests that catch regressions before users do",
      "Build tooling a colleague can run without you",
    ],
    skills: ["Netmiko", "NAPALM", "Ansible", "Jinja2 templating", "REST APIs", "YAML data models", "Error handling", "Idempotency", "Automated validation", "Change safety"],
    curriculum: [
      { title: "Core Python & Getting Started", topics: ["Python in networking", "Install and first program", "Syntax and keywords", "Operators"] },
      { title: "Variables & Data Types", topics: ["Variables", "Data types", "Type casting", "Strings and booleans"] },
      { title: "Data Structures", topics: ["Lists", "Tuples", "Sets", "Dictionaries"] },
      { title: "Control Statements", topics: ["if, elif and else", "for loops", "while loops", "continue, break and pass"] },
      { title: "Functions", topics: ["Defining functions", "Built-in functions", "Positional and keyword arguments", "Lambda and recursion"] },
      { title: "Object-Oriented Programming", topics: ["Classes and objects", "Constructors", "Inheritance", "Abstraction, encapsulation, overloading and overriding"] },
      { title: "Exception Handling", topics: ["try, except and finally", "Custom exceptions", "Raising exceptions"] },
      { title: "Network Automation with Python", topics: ["Paramiko SSH", "Netmiko across vendors", "NETCONF, YANG and REST", "Automation lab"] },
      { title: "Advanced Automation & Projects", topics: ["Ansible", "Configuration management at scale", "Monitoring and analytics", "Lab: building custom tools"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)", "Corporate (on-site)"],
    level: "Advanced",
    prerequisites: ["Working knowledge of routing and switching", "Basic Python, or Cisco DevNet / Network Automation first", "Comfortable on the Linux command line"],
    projects: [
      { title: "Fleet compliance audit", summary: "Collect configuration from every device in the lab fleet, check it against a written standard, and produce an exception report." },
      { title: "Templated site rollout", summary: "Generate and deploy a full branch configuration from a data file, with validation before and after." },
      { title: "Automated test suite", summary: "Write tests that verify reachability, adjacencies and policy, and run them after every change." },
    ],
    certification: { preparesFor: [], note: "No third-party exam. The course is applied rather than exam-aligned." },
    careers: [
      { role: "Network Automation Engineer", note: "Owns the automation that configures and validates the estate." },
      { role: "NetDevOps Engineer", note: "Brings CI and testing practice to network change." },
      { role: "Senior Network Engineer", note: "Leads modernisation of network operations." },
      { role: "Tools Engineer", note: "Builds internal tooling for infrastructure teams." },
    ],
    faqs: [
      { question: "How much Python do I need first?", answer: "Enough to write a function, loop over a list and handle an exception. Cisco DevNet / Network Automation covers more than enough, and week one includes a refresher." },
      { question: "Will this work on my employer's equipment?", answer: "The techniques apply to anything reachable over SSH or an API, which covers most Cisco, Juniper and Arista platforms. Labs run on the training fleet so you never test on production." },
      { question: "Ansible or Python: which should I use?", answer: "Both, for different jobs. The course covers when declarative Ansible is right and when you need the control of a script." },
    ],
    related: ["cisco-devnet-network-automation", "real-time-automation-projects", "linux-for-network-engineers"],
  },

  {
    slug: "linux-for-network-engineers",
    title: "Linux for Network Engineers",
    category: "Systems",
    shortDescription:
      "The operating system underneath the network: shell, networking stack, services, permissions and the diagnostics every infrastructure role assumes.",
    overview: [
      "Linux for Network Engineers covers the systems knowledge that network, security, cloud and automation roles all quietly assume. It is taught from the command line, not a GUI.",
      "The emphasis is on the parts a network engineer actually reaches for: the networking stack, name resolution, routing on a host, services and logs, and the diagnostic commands that answer 'why can this box not reach that one'.",
      "It is a prerequisite in practice for the automation and cloud courses, and it is where most engineers close their biggest knowledge gap.",
    ],
    audience: [
      "Network engineers with little Linux exposure",
      "Engineers preparing for automation or cloud courses",
      "Support staff moving into infrastructure roles",
      "Anyone who has to diagnose a Linux host on a network",
    ],
    outcomes: [
      "Navigate and manage a Linux filesystem confidently from the shell",
      "Configure interfaces, routes and name resolution on a host",
      "Manage users, permissions and sudo policy correctly",
      "Manage services and boot behaviour with systemd",
      "Read logs and diagnose a failing service methodically",
      "Write shell scripts that automate routine work safely",
    ],
    skills: ["Bash", "File permissions", "systemd", "ip / ss / dig", "Name resolution", "SSH and keys", "firewalld / iptables", "Log analysis", "Cron and timers", "Shell scripting"],
    curriculum: [
      { title: "Linux Essentials", topics: ["Architecture and distributions", "CLI basics and the filesystem hierarchy", "File and directory permissions", "Bash basics", "Lab: navigating Linux"] },
      { title: "Command-Line Operations", topics: ["sudo and privilege", "Package management", "Processes and monitoring", "grep, awk and sed", "Reading and rotating logs"] },
      { title: "Linux Networking", topics: ["ip, netstat and ss", "tcpdump", "iptables", "DNS and DHCP on Linux", "ping and traceroute from the host", "Lab: network troubleshooting"] },
      { title: "Scripting, Server Management & Security", topics: ["Bash scripting", "cron scheduling", "SSH configuration and key-based access", "Log parsing", "Driving Python from the shell", "Lab: securing a Linux server"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)", "Corporate (on-site)"],
    level: "Foundation",
    prerequisites: ["Basic computer literacy", "No prior Linux experience required"],
    projects: [
      { title: "Host build and harden", summary: "Install, configure and harden a Linux host to a supplied baseline, then document it." },
      { title: "Service recovery drill", summary: "Diagnose and restore a deliberately broken service using logs and systemd, with a written root-cause note." },
      { title: "Provisioning script", summary: "Write an idempotent shell script that provisions a host to your baseline and can be re-run safely." },
    ],
    certification: { preparesFor: [], note: "No third-party exam. The course is a practical prerequisite for the automation and cloud tracks." },
    careers: [
      { role: "Network Engineer", note: "Diagnoses host-side problems without escalating." },
      { role: "Infrastructure Engineer", note: "Runs the servers alongside the network." },
      { role: "NOC Engineer", note: "Triages across both network and host layers." },
      { role: "Automation Engineer", note: "Linux is where the automation runs." },
    ],
    faqs: [
      { question: "Which distribution is used?", answer: "Labs use both a Red Hat family and a Debian family distribution, because enterprises run both and the package and service differences matter in practice." },
      { question: "Do I need my own server?", answer: "No. Labs run in virtual machines, with lab access available around the clock." },
    ],
    related: ["python-for-network-automation", "cisco-devnet-network-automation", "aws-cloud-practitioner"],
  },

  {
    slug: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    category: "Cloud",
    shortDescription:
      "Cloud fundamentals with a networking lens: VPC, subnets, routing, security groups and how a cloud network differs from a campus one.",
    overview: [
      "The AWS Certified Cloud Practitioner course covers cloud fundamentals, with the networking sections taught in more depth than the exam strictly requires because that is where a network engineer adds value.",
      "You work through VPC design, subnets, route tables, internet and NAT gateways, security groups and network ACLs, and then contrast each with its on-premises equivalent.",
      "It follows the topic areas AWS publishes for the CLF-C02 exam.",
    ],
    audience: [
      "Network engineers whose estate is extending into cloud",
      "Engineers preparing for AWS CLF-C02",
      "Infrastructure staff needing cloud fundamentals",
      "Anyone moving from on-premises networking to hybrid",
    ],
    outcomes: [
      "Explain the shared responsibility model and core AWS services",
      "Design a VPC with public and private subnets and correct routing",
      "Distinguish security groups from network ACLs and use each correctly",
      "Understand connectivity options between on-premises and cloud",
      "Reason about cloud cost as an architectural constraint",
      "Map an on-premises network design onto cloud primitives",
    ],
    skills: ["Amazon VPC", "Subnets and routing", "Security groups", "Network ACLs", "Internet & NAT gateways", "IAM basics", "Shared responsibility model", "Hybrid connectivity", "Cloud cost basics", "AWS core services"],
    curriculum: [
      { title: "Cloud Basics for Networking Professionals", topics: ["From an on-premises data centre to AWS", "Cloud vs data centre", "Regions, availability zones and latency", "High availability and fault tolerance"] },
      { title: "AWS Networking Fundamentals", topics: ["The VPC as a virtual data centre", "CIDR and subnet design", "Public vs private subnets", "Route tables", "Internet gateway vs NAT gateway", "Elastic IP", "How it maps to CCNA concepts"] },
      { title: "Cloud Security", topics: ["Security groups vs NACLs", "Stateful vs stateless", "IAM users, roles and policies", "Network security vs identity security", "Enterprise scenarios"] },
      { title: "Compute (EC2)", topics: ["Instance types", "Secure access", "Auto scaling and load balancing", "Load balancer traffic flow"] },
      { title: "Storage & Data Flow", topics: ["S3, EBS and EFS", "Data flow", "Public vs private access"] },
      { title: "Databases", topics: ["RDS and DynamoDB", "Private subnets", "High availability and backup"] },
      { title: "Monitoring & Operations", topics: ["CloudWatch", "CloudTrail", "SLA, uptime and fault isolation"] },
      { title: "Pricing & Billing", topics: ["Pay-as-you-go", "Data transfer charges", "Cost optimization", "How poor network design raises cost"] },
      { title: "AWS in Networking Careers", topics: ["Cloud in networking roles", "Hybrid cloud", "VPN and Direct Connect", "The path from CCNA or JNCIA to AWS Practitioner, Solutions Architect and Cloud Network Engineer"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)", "Corporate (on-site)"],
    level: "Foundation",
    prerequisites: ["Basic networking knowledge is helpful but not required", "An AWS account (free tier is sufficient)"],
    projects: [
      { title: "VPC build", summary: "Design and deploy a VPC with public and private subnets, correct routing and a NAT path, then verify isolation." },
      { title: "On-premises to cloud mapping", summary: "Take a campus network design and express its equivalent in VPC primitives, documenting what does not translate." },
    ],
    certification: { preparesFor: ["AWS Certified Cloud Practitioner (CLF-C02)"], note: VENDOR_NOTE },
    careers: [
      { role: "Cloud Network Engineer", note: "Owns connectivity between cloud and on-premises." },
      { role: "Infrastructure Engineer", note: "Runs hybrid estates." },
      { role: "Network Engineer (hybrid)", note: "Extends the campus network into cloud." },
      { role: "Cloud Support Engineer", note: "Diagnoses customer cloud networking issues." },
    ],
    faqs: [
      { question: "Does the AWS free tier cover the labs?", answer: "Most of them. Any lab that uses paid resources states the estimated cost and includes teardown steps." },
      { question: "Is this enough to work in cloud?", answer: "It is the foundation. For a cloud-focused role, follow it with Linux for Network Engineers and the automation track." },
    ],
    related: ["linux-for-network-engineers", "cisco-devnet-network-automation", "python-for-network-automation"],
  },

  {
    slug: "real-time-networking-projects",
    title: "Real-Time Networking Projects",
    category: "Projects",
    shortDescription:
      "Extended build work on enterprise and data centre topologies, with faults injected on a schedule you do not see.",
    overview: [
      "Real-Time Networking Projects is the applied course. Rather than module-sized labs, you work on full enterprise and data centre topologies over an extended period, building, migrating and repairing them.",
      "Faults are injected on a schedule you do not control, so you practise diagnosis under the same uncertainty a NOC engineer works with rather than knowing in advance which feature is being tested.",
      "It is the course that most changes how an interview goes, because it gives you specific incidents to talk about.",
    ],
    audience: [
      "Engineers who have completed CCNA and want applied depth",
      "Candidates preparing for technical interviews",
      "Engineers moving from theory into operations",
      "Anyone who can configure but has not yet had to fix",
    ],
    outcomes: [
      "Build a full enterprise topology from a requirements brief",
      "Execute a planned migration with a rollback path",
      "Diagnose injected faults methodically under time pressure",
      "Write a root cause note that identifies cause, not symptom",
      "Produce documentation another engineer can operate from",
      "Discuss specific incidents credibly in an interview",
    ],
    skills: ["Enterprise topology design", "Data centre fundamentals", "Migration planning", "Change windows", "Root cause analysis", "Incident documentation", "Rollback planning", "Wireshark", "Multi-protocol troubleshooting", "Handover"],
    curriculum: [
      { title: "Network Architectures", topics: ["Enterprise small, medium and large", "Service provider core, distribution and access", "Data centre three-tier vs leaf-spine", "High availability", "North-south vs east-west traffic"] },
      { title: "Devices & Vendors", topics: ["Cisco ASR, ISR and Catalyst", "Juniper MX, SRX and QFX", "Arista", "Aruba", "Line cards, RSP, IOM and fabric", "SFP types"] },
      { title: "Hardware Troubleshooting", topics: ["SFP Tx/Rx and DOM", "Fiber bending, splicing and cleaning", "CRC errors", "Link flapping", "Health checks", "The RMA process"] },
      { title: "Routing & Protocol Troubleshooting", topics: ["Static and default routes", "IP SLA", "OSPF LSA types 1 to 5, neighbors and virtual links", "BGP path selection, route reflectors and advertisement issues"] },
      { title: "Reachability Troubleshooting", topics: ["End-to-end reachability", "Isolating Layer 2 from Layer 3", "ARP, MAC and routing tables", "VLAN and trunk issues", "Server reachability"] },
      { title: "DNS & Application", topics: ["Resolution flow", "Forward and reverse lookups", "DNS failures", "Application slowness"] },
      { title: "Advanced Tools", topics: ["traceroute", "MTR", "Wireshark", "TCP handshake, retransmissions and windowing"] },
      { title: "Switching & Security Issues", topics: ["Port security", "err-disable", "STP and MST", "Broadcast storms"] },
      { title: "Monitoring & Ticketing", topics: ["SolarWinds, Nagios, Zabbix and Cisco Prime", "ServiceNow and Remedy", "SNMP v2c vs v3", "Alerts and escalation"] },
      { title: "Production Environment", topics: ["HLD and LLD, diagrams and tool access", "Change management", "P1 and P2 incidents", "SLA and the escalation matrix"] },
      { title: "Advanced Concepts", topics: ["MPLS LDP and RSVP, L3VPN debugging", "VRRP and HSRP", "NAT", "IPsec Phase 1 and Phase 2"] },
      { title: "TAC-Level Operations", topics: ["Bug identification", "Vendor TAC cases", "Core dumps", "Log collection"] },
      { title: "Maintenance", topics: ["IOS upgrades", "Pre and post checks", "Change activities", "Rollback"] },
      { title: "Documentation", topics: ["Method of procedure", "Standard operating procedure", "Technical documentation", "Incident reporting"] },
      { title: "Incident Handling", topics: ["P1 and P2 incidents", "War room", "Root cause analysis", "Preventive measures"] },
      { title: "Network Automation", topics: ["Introduction to automation", "Python basics", "REST APIs", "Basic configuration automation"] },
      { title: "Knowledge Transfer for New Entrants", topics: ["What knowledge transfer is", "Questions to ask", "Reading network diagrams", "Note taking", "Common mistakes to avoid", "Becoming independent"] },
      { title: "Career Growth", topics: ["The path to principal network engineer", "Skills beyond TAC", "Interview preparation", "Resume"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)"],
    level: "Advanced",
    prerequisites: ["CCNA Advanced Training, or equivalent working experience", "Confident configuring routing and switching unaided"],
    projects: [
      { title: "Full enterprise build", summary: "Design, build, verify and document a multi-site enterprise network from a written brief." },
      { title: "Scheduled change window", summary: "Plan and execute a migration with pre and post validation and a tested rollback." },
      { title: "Incident log", summary: "Respond to injected faults across the course and produce a root cause note for each." },
    ],
    certification: { preparesFor: [], note: "No third-party exam. The output is a documented body of build and incident work." },
    careers: [
      { role: "Network Engineer (L2)", note: "Trusted with builds and escalated faults." },
      { role: "NOC Engineer", note: "Works incidents as the primary responder." },
      { role: "Implementation Engineer", note: "Delivers builds and migrations for clients." },
      { role: "Data Centre Engineer", note: "Supports data centre network infrastructure." },
    ],
    faqs: [
      { question: "How is this different from the CCNA labs?", answer: "Scale and uncertainty. CCNA labs test one feature at a time and you know which. Here the topology is complete, the faults arrive unannounced, and you have to find them." },
      { question: "Do I need to have finished CCNA?", answer: "You need to be able to configure routing and switching unaided. CCNA Advanced Training gets you there." },
    ],
    related: ["ccnp-enterprise-service-provider", "ccna-advanced-training", "real-time-automation-projects"],
  },

  {
    slug: "real-time-automation-projects",
    title: "Real-Time Network Automation Projects",
    category: "Projects",
    shortDescription:
      "Extended automation build work: multi-device tooling under version control, with CI running the validation on every change.",
    overview: [
      "Real-Time Network Automation Projects is the applied automation course. You build tooling that operates across a device fleet, keep it under version control, and put its validation into a CI pipeline so every change is tested before it lands.",
      "The work is deliberately close to how an infrastructure team actually operates: a shared repository, review on every change, and automated checks that fail loudly.",
      "It follows Python for Network Automation and is the last course in the automation track.",
    ],
    audience: [
      "Engineers who have completed Python for Network Automation",
      "Engineers building internal tooling for a network team",
      "NetDevOps and platform-leaning network engineers",
      "Anyone modernising a manual change process at work",
    ],
    outcomes: [
      "Build automation that operates safely across a whole fleet",
      "Keep network configuration and tooling under version control",
      "Run validation automatically through a CI pipeline",
      "Review and be reviewed on infrastructure changes",
      "Design tooling other engineers can adopt and maintain",
      "Measure and report the manual effort the automation removed",
    ],
    skills: ["Git workflow", "CI/CD", "Multi-device automation", "Ansible roles", "Automated validation", "Code review", "Source of truth design", "Idempotency", "Logging and alerting", "Documentation"],
    curriculum: [
      { title: "Version Control & CI/CD", topics: ["Git install and workflow", "Local and remote repositories", "Branching and merging", "GitHub", "Ignoring files", "CI/CD concepts", "GitHub Actions", "Automated validation and deployment"] },
      { title: "Configuration Automation", topics: ["BGP configuration deployment", "YAML-driven multi-device push", "Netmiko and Paramiko", "Ansible", "IOS upgrade automation", "Validation and rollback"] },
      { title: "Monitoring & Health Checks", topics: ["BGP neighbor-down detection and push", "OSPF and BGP monitoring from a YAML inventory", "Interface monitoring", "Output parsing and health reports", "Alerting"] },
      { title: "Backup & API Automation", topics: ["Router, switch and firewall backups", "REST APIs", "JSON and XML", "GET, POST, PUT and DELETE", "Controller integration"] },
      { title: "Troubleshooting & RCA", topics: ["Diagnosing script failures", "Exception handling and logging", "Error recovery", "Root cause analysis reports", "Audit logs"] },
      { title: "Real-Time Enterprise Scenarios", topics: ["Zero-touch provisioning", "Compliance checks", "Health monitoring", "Incident detection and auto-remediation", "Enterprise and service provider workflows", "End-to-end projects"] },
    ],
    duration: CONSULT_NOTE,
    deliveryFormats: ["Classroom", "Online (live)"],
    level: "Advanced",
    prerequisites: ["Python for Network Automation, or equivalent experience", "Comfortable with Git and the Linux command line"],
    projects: [
      { title: "Fleet automation tool", summary: "Build tooling that applies and verifies a change across the whole lab fleet, with reporting and failure handling." },
      { title: "CI validation pipeline", summary: "Put the automated checks into CI so every change is validated before it can land." },
      { title: "Drift detection", summary: "Detect and report configuration drift against the source of truth, then reconcile it." },
    ],
    certification: { preparesFor: [], note: "No third-party exam. The output is a reviewed automation repository." },
    careers: [
      { role: "Network Automation Engineer", note: "Owns the tooling the network team runs on." },
      { role: "NetDevOps Engineer", note: "Runs the pipeline that validates network change." },
      { role: "Platform Engineer", note: "Builds internal tooling for infrastructure teams." },
      { role: "Senior Network Engineer", note: "Leads the shift from manual to automated operations." },
    ],
    faqs: [
      { question: "Do I need to have finished Python for Network Automation?", answer: "Effectively yes. This course assumes you can already drive devices with Netmiko or Ansible and want to operationalise it." },
      { question: "Is CI covered from scratch?", answer: "Yes. Pipeline design is taught in the course; no prior CI experience is assumed." },
    ],
    related: ["python-for-network-automation", "cisco-devnet-network-automation", "real-time-networking-projects"],
  },

  {
    slug: "cloud-lab-access",
    title: "Cloud Lab Access",
    category: "Projects",
    shortDescription:
      "Six months of access to the enterprise lab environment, for practice, certification preparation or keeping skills current between roles.",
    overview: [
      "Cloud Lab Access is standalone access to the lab environment rather than a taught course. It is intended for engineers who already know what they want to practise: certification preparation, interview preparation, or keeping hands-on skills current.",
      "The environment is the same one used across the taught courses, so the topologies and equipment match what the training runs on.",
      "It is often taken alongside or after a course, when the taught content is finished but the practice is not.",
    ],
    audience: [
      "Alumni continuing to practise after a course",
      "Engineers preparing for a certification attempt",
      "Candidates preparing for practical interviews",
      "Working engineers keeping skills current",
    ],
    outcomes: [
      "Practise on enterprise-grade topologies on your own schedule",
      "Rehearse certification lab scenarios repeatedly",
      "Rebuild configurations from scratch until they are automatic",
      "Keep hands-on skills current between roles",
    ],
    skills: ["Self-directed practice", "Certification lab preparation", "Topology rebuilds", "Configuration drills"],
    curriculum: [
      { title: "What you can practice", topics: ["Enterprise OSPF, BGP and MPLS topologies", "Cisco ASR and Juniper MX labs", "Palo Alto NGFW policy and VPN", "Data centre spine-leaf", "Service provider Layer 3 and Layer 2 VPN", "Python and Ansible automation"] },
      { title: "Access", topics: ["Six months from activation, with no daily limits", "Around-the-clock browser access from any device, nothing to install", "A dedicated, isolated lab environment", "Topologies arrive pre-wired and can be modified or reset at any time"] },
    ],
    duration: "Six months of access. Pricing is shared on the consultation call.",
    deliveryFormats: ["Online (live)"],
    level: "Intermediate",
    prerequisites: ["Suited to engineers who already know what they want to practise", "Not a substitute for a taught course if you are starting out"],
    projects: [
      { title: "Self-directed practice", summary: "Structure your own repetition against the topologies, at whatever pace suits your exam or interview date." },
    ],
    certification: { preparesFor: [], note: "Access only. No instruction or certificate is attached." },
    careers: [
      { role: "Any hands-on network role", note: "Practice access is useful at every level, from first certification to senior refresh." },
    ],
    faqs: [
      { question: "Is this a course?", answer: "No. It is environment access without instruction. If you are starting out, take a taught course instead." },
      { question: "How long does access last?", answer: "Six months." },
    ],
    related: ["real-time-networking-projects", "ccna-advanced-training", "ccnp-enterprise-service-provider"],
  },
];

/* ------------------------------- accessors -------------------------------- */

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getRelatedCourses(course: Course): Course[] {
  return course.related.map(getCourse).filter((c): c is Course => Boolean(c));
}

export function featuredCourses(limit = 4): Course[] {
  const featured = courses.filter((c) => c.featured);
  return (featured.length ? featured : courses).slice(0, limit);
}

export function coursesByCategory(): { category: CourseCategory; blurb: string; items: Course[] }[] {
  return courseCategories
    .map((c) => ({ ...c, category: c.name, items: courses.filter((x) => x.category === c.name) }))
    .filter((g) => g.items.length > 0);
}

export function totalModules(course: Course): number {
  return course.curriculum.length;
}
