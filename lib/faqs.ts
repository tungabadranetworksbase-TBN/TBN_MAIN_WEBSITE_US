/**
 * Site-wide FAQ content, grouped by topic.
 *
 * Single source so the homepage subset and the full /faq page never drift apart
 * or contradict each other. Course- and internship-specific questions live on
 * their own records in `courses.ts` / `internships.ts`.
 */

import type { Faq } from "./courses";
import { courses } from "./courses";
import { internships } from "./internships";
import { certificationTracks, programs } from "./programs";
import { site } from "./site";

export type FaqGroup = { id: string; title: string; blurb: string; faqs: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "organization",
    title: "About Tungabadra Networks",
    blurb: "What the organization is, where it operates and how it started.",
    faqs: [
      { question: "What is Tungabadra Networks?", answer: site.definition },
      {
        question: "Do I need a coding background?",
        answer:
          "No. The courses are networking-first and hands-on from day one. Python for Network Automation and Cisco DevNet introduce scripting from the beginning, so no prior coding experience is assumed.",
      },
      {
        question: "Do you train on AI infrastructure and GPUs?",
        answer:
          "Yes, from the infrastructure side, which is where network engineers work on it. That means GPU cluster fabrics, RDMA and lossless Ethernet, non-blocking spine-leaf design for east-west traffic, and the power, cooling and storage density a GPU rack demands. It is taught as data center engineering rather than as model training, because running the stack an AI workload sits on is the job these roles actually hire for.",
      },
      {
        question: "Do you teach network automation?",
        answer:
          "Yes, and it runs against real devices rather than sample output. Python, Netmiko, Paramiko and Ansible are taught from first principles, alongside REST APIs, JSON and YAML, Git, and CI/CD pipelines in Jenkins, GitHub Actions and GitLab CI. The Data Center and Automation internship is the dedicated track for it, and Python for Network Automation and Cisco DevNet are available as standalone courses.",
      },
      {
        question: "What equipment will I train on?",
        answer:
          "Physical Cisco, Palo Alto and Aruba equipment in real enterprise labs, with 24/7 rack access. Wireshark packet-level analysis runs throughout the training rather than being treated as an add-on.",
      },
      {
        question: "Do you help with placement?",
        answer:
          "Yes. Placement support continues until you secure a role, and the organization reports 950+ students placed with 40+ hiring partners including Infosys, Accenture, TCS, Capgemini and HPE.",
      },
      {
        question: "How is the training delivered?",
        answer:
          "Training is delivered live online with virtual access to the physical lab racks, and on-site for corporate cohorts. Lab access runs 24/7, so you practise on your own schedule.",
      },
      {
        question: "Who teaches the courses?",
        answer:
          "Practising engineers. The instructors also run live production enterprise networks, and the CTO is a former Palo Alto TAC engineer, so the material tracks what the field is actually running.",
      },
    ],
  },
  {
    id: "courses",
    title: "Courses",
    blurb: "The course line-up, prerequisites and how training is delivered.",
    faqs: [
      {
        question: "What courses does Tungabadra Networks offer?",
        answer:
          "Twelve courses: CCNA Advanced, CCNP Enterprise & Service Provider, Palo Alto NGFW, AWS Certified Cloud Practitioner, Aruba Certified Associate, Juniper JNCIA, Cisco DevNet / Network Automation, Linux for Networking Engineers, Python for Network Automation, Real-Time Networking Projects, Real-Time Network Automation Projects, and Cloud Lab Access.",
      },
      {
        question: "Which course should I start with?",
        answer:
          "CCNA Advanced is the entry point for most engineers, routing, switching, hardware labs and troubleshooting. From there the usual path is CCNP, then a security or automation specialization.",
      },
      {
        question: "How much do the courses cost?",
        answer:
          "Fees are not published online. They are shared on the free consultation call, along with the current syllabus and batch dates. A 50% discount on CCNA is offered to fee reimbursement candidates.",
      },
      {
        question: "Is there online delivery?",
        answer:
          "Yes. Training runs live online with virtual access to the physical lab racks, and on-site for corporate cohorts. Lab access is available 24/7 either way.",
      },
    ],
  },
  {
    id: "internships",
    title: "Internships and placements",
    blurb: "Programs, eligibility and what placement support covers.",
    faqs: [
      {
        question: "What do the internships involve?",
        answer:
          "Each internship bundles several courses into one career track, with real-time project work and lab sessions. Enterprise Networking is the usual entry point, covering the NOC to network engineer path; Data Center Networking covers infrastructure, virtualization and operations; and Data Center and Automation adds Python, Ansible, CI/CD and cloud on top. The Elite Career Path Bundle carries all three.",
      },
      {
        question: "Which companies hire your students?",
        answer:
          "The organization lists 40+ hiring partners including Infosys, Accenture, TCS, Capgemini, HPE, Vedang Cellular Services, OLA Tech Solutions and Concentrix.",
      },
      {
        question: "Do you provide proxy interview support?",
        answer:
          "No. Tungabadra Networks does not attend interviews on a candidate's behalf, provide live assistance during an interview, or misrepresent anyone's identity, experience or work. Placement support is preparation only: mock interviews, portfolio and resume review, and introductions to hiring partners. Candidates attend their own interviews and answer for their own work. Anyone found arranging or accepting proxy attendance is removed from the program and from placement support.",
      },
      {
        question: "What results does Tungabadra Networks report?",
        answer:
          "The organization publishes these figures: 3,000+ engineers trained, 950+ students placed, a 96% career success rate, a 150% average salary hike and a highest package of Rs 26.5L.",
      },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise services",
    blurb: "The engineering division that runs alongside the training.",
    faqs: [
      {
        question: "What services does the engineering division provide?",
        answer:
          "Network architecture, network implementation, managed network services, 24/7 NOC, network security, firewall deployment, network monitoring and SLA support, plus IT staffing and payroll for Cisco, Juniper and Aruba engineers.",
      },
      {
        question: "Why does a training company run production networks?",
        answer:
          "Because it keeps the training current. The same engineers who manage live production enterprise estates teach the labs, so course content reflects what those networks actually run.",
      },
    ],
  },
];

/** Flattened list, used for FAQPage structured data on /faq. */
export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);

/** The homepage subset - the questions people most often ask first. */
export const homeFaqQuestions = [
  "What is Tungabadra Networks?",
  "Do I need a coding background?",
  "Do you train on AI infrastructure and GPUs?",
  "Do you teach network automation?",
  "What equipment will I train on?",
  "Do you help with placement?",
  "How is the training delivered?",
  "What courses does Tungabadra Networks offer?",
];

export const homeFaqs: Faq[] = homeFaqQuestions
  .map((q) => allFaqs.find((f) => f.question === q))
  .filter((f): f is Faq => Boolean(f));
