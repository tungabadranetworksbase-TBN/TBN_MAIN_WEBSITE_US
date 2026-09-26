/**
 * Organisation facts, navigation and contact details.
 *
 * Sourced from the live site, www.tungabadranetworks.in (crawled Aug 2026).
 * Everything here is published by the organisation itself - the tagline, the
 * leadership names and the figures. Contact details are US placeholders. The
 * placement statistics are reproduced as the organisation's own claims.
 *
 * The site publishes no course fees, so none are stated anywhere.
 */

/** Cal.com booking, as a path. Used both as a URL and as an embed target. */
const CAL_PATH = "tungabadranetworks/welcome-to-tungabadranetworks-usa-consultation-call";

export const site = {
  name: "Tungabadra Networks",
  shortName: "Tungabadra",
  legalName: "Tungabadra Networks",
  url: "https://www.tungabadranetworks.in",
  locale: "en-US",
  country: "IN",

  /**
   * Where and when the organisation started. The site sells into the US, but
   * the company itself is Indian - both facts are true at once, and search
   * and answer engines want the founding one stated plainly.
   */
  founded: {
    year: "2024",
    city: "Kurnool",
    region: "Andhra Pradesh",
    country: "India",
  },

  /** The organisation's own tagline. */
  tagline: "The network you build is the net worth you earn",

  /** One-sentence entity definition, for search and answer engines. */
  definition:
    "Tungabadra Networks is an industry-focused networking company founded in 2024 in Kurnool, Andhra Pradesh, India. It provides hands-on networking training, internships and placement support alongside an engineering division that designs, deploys and secures production enterprise networks.",

  description:
    "Industry-focused networking training with real enterprise labs, physical Cisco and Palo Alto equipment, and placement support. Courses in CCNA, CCNP, Palo Alto, Aruba, Juniper, AWS, Linux and network automation.",

  contact: {
    email: "ussupport@tungabadranetworks.com",
    admissions: "ussupport@tungabadranetworks.com",
    corporate: "ussupport@tungabadranetworks.com",
    phone: "+1 (940) 377-0034",
    /**
     * Where every Book a Consultation button goes. Scheduling happens on
     * Cal.com rather than on this site, so the button hands off directly
     * instead of routing through the contact form first.
     */
    consultation: `https://cal.com/${CAL_PATH}`,
    /**
     * The same booking as a Cal.com embed path. Elements carrying this in
     * `data-cal-link` open the booking flow in a modal over the page instead
     * of navigating away.
     */
    consultationPath: CAL_PATH,
    phoneHref: "tel:+19403770034",
    hours: "Monday to Friday, 9:00 AM to 6:00 PM ET",
    /**
     * Public WhatsApp group invite. A contact channel rather than a social
     * profile, so it stays out of `social` - that object feeds the schema's
     * sameAs, which is for profiles that represent the organisation.
     */
    whatsapp:
      "https://chat.whatsapp.com/CYrZanCp3jj1xV1W2UMYCz?s=sh&p=i&mlu=4&ilr=4",
    portal: "https://sms.tungabadranetworks.in/student/login",
    /**
     * Where enrollment and payment happen. The site itself takes no payment -
     * every Enroll button hands off here, and the portal is the system of
     * record for what a student has bought.
     */
    enroll: "https://sms.tungabadranetworks.in/#courses",
    address: {
      // EDIT ME: US office address.
      street: "",
      city: "",
      region: "",
      postalCode: "",
      country: "US",
    },
  },

  /** Named on the About page. */
  leadership: [
    { name: "E. Ramesh Goud", role: "Founder & CEO", note: "15+ years managing enterprise networks" },
    { name: "B. Karthik Kumar Goud", role: "CTO & Founder", note: "8+ years as a Palo Alto TAC engineer" },
    { name: "Vamsi Kumar", role: "CFO & COO", note: "Financial operations and strategic growth" },
  ],

  social: {
    youtube: "https://www.youtube.com/@tb_networks",
    instagram: "https://www.instagram.com/tungabadra_networks",
    linkedin: "https://www.linkedin.com/company/tungabadra-networks",
  },

  /** Figures as published by the organisation. */
  /**
   * The live site publishes two conflicting sets of placement figures: the home
   * page says 950+ placed / 150% hike / Rs 26.5L / 40+ partners, the placements
   * page says 890+ / 100% / Rs 25.2L / 50+. We use the placements-page set,
   * because its breakdown reconciles exactly (433 freshers + 248 experienced +
   * 209 non-IT = 890) and a figure with a breakdown behind it is the more
   * defensible claim. CONFIRM WHICH SET IS CURRENT and correct this in one place.
   */
  figures: [
    { label: "Engineers trained", value: "3,000+" },
    { label: "Graduates placed", value: "890+" },
    { label: "Average salary increase", value: "100%" },
    { label: "Hiring partners", value: "50+" },
    { label: "Courses", value: "12" },
    { label: "Teaching since", value: "2024" },
  ],

  /** The 890 placements, broken down. Sums exactly; safe to render together. */
  placementBreakdown: [
    { label: "Freshers", value: "433" },
    { label: "Experienced", value: "248" },
    { label: "From non-IT backgrounds", value: "209" },
  ],

  /** Verifiable, non-promotional facts. Safe for AI answer extraction. */
  facts: [
    { label: "Founded", value: "2024" },
    { label: "Founded in", value: "Kurnool, Andhra Pradesh, India" },
    { label: "Organization type", value: "Networking training and enterprise network services" },
    { label: "Delivery", value: "Live online, on-site, and 24/7 lab access" },
    { label: "Language of instruction", value: "English" },
    { label: "Audience", value: "Graduates, career changers and working IT professionals" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

/** Mirrors the live site's navigation. */
export const primaryNav: NavItem[] = [
  {
    label: "Courses",
    href: "/courses",
    description: "CCNA to CCNP, security, cloud and network automation.",
  },
  {
    label: "Internships",
    href: "/internships",
    description: "Live project work, lab sessions and placement support.",
  },
  {
    label: "Enterprise",
    href: "/technology-services",
    description: "Network architecture, managed services, NOC and IT staffing.",
    children: [
      { label: "Technology Services", href: "/technology-services" },
      { label: "Project Support", href: "/project-support" },
      { label: "Corporate Training", href: "/corporate-training" },
    ],
  },
  {
    label: "About",
    href: "/about",
    description: "Founded in 2024 in Kurnool. Hands-on networking training and enterprise network services.",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/resources" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Learn",
    links: [
      { label: "All Courses", href: "/courses" },
      { label: "Internships", href: "/internships" },
      { label: "Career Programs", href: "/programs" },
      { label: "Certifications", href: "/certifications" },
    ],
  },
  {
    title: "Enterprise",
    links: [
      { label: "Technology Services", href: "/technology-services" },
      { label: "Project Support", href: "/project-support" },
      { label: "Corporate Training", href: "/corporate-training" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/resources" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];
