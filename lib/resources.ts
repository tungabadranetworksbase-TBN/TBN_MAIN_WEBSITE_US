/**
 * Resources: articles, guides and explainers at /resources/[slug].
 *
 * Content is stored as typed blocks rather than MDX so the site needs no extra
 * dependency and every article renders through the same accessible components.
 * Reading time is computed from the content, never hardcoded.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type ResourceCategory =
  | "Career Guide"
  | "Technology Guide"
  | "Course Guide"
  | "Internship Guide"
  | "Tutorial";

export type Resource = {
  slug: string;
  title: string;
  category: ResourceCategory;
  /** Meta description and listing summary. Answers the title's question. */
  description: string;
  /** The direct answer, rendered above the fold for answer engines. */
  keyTakeaway: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  body: Block[];
  related: string[];
  /** Internal links surfaced at the end of the article. */
  ctaCourses?: string[];
  ctaInternships?: string[];
  featured?: boolean;
};

export const resources: Resource[] = [
  {
    slug: "how-to-start-a-career-in-network-engineering",
    title: "How to Start a Career in Network Engineering in the US",
    category: "Career Guide",
    featured: true,
    description:
      "A step-by-step route into US network engineering roles: the skills employers screen for, which certification to take first, and how to get experience before you have a job.",
    keyTakeaway:
      "Most US entry-level network roles are reached in three steps: learn IP fundamentals and configuration hands-on, earn one entry-level certification such as Network+ or CCNA, and build demonstrable experience through labs, documentation and an internship or NOC role.",
    author: "Tungabadra Networks",
    publishedAt: "2026-01-14",
    updatedAt: "2026-08-12",
    body: [
      {
        type: "p",
        text: "Network engineering remains one of the few technology careers with a clear, testable entry path. Employers can verify what you know by asking you to subnet an address block or explain why a VLAN is not passing traffic, which means the barrier is competence rather than credentials alone.",
      },
      { type: "h2", text: "What does a network engineer actually do?" },
      {
        type: "p",
        text: "A network engineer designs, configures, monitors and repairs the systems that move data inside and between organizations. In practice the job splits into three kinds of work: planned changes, unplanned failures, and documentation. Early-career roles are weighted toward the second and third.",
      },
      { type: "h2", text: "Step 1: Learn the fundamentals hands-on" },
      {
        type: "p",
        text: "Reading about routing is not the same as configuring it. Every hiring conversation eventually reaches a practical question, and the difference between candidates is almost always lab time.",
      },
      {
        type: "ul",
        items: [
          "IPv4 and IPv6 addressing, including subnetting without a calculator",
          "Switching: VLANs, trunking, spanning tree behavior",
          "Routing: static routes, OSPF, and how the routing table is consulted",
          "Network services: DHCP, DNS, NAT",
          "A structured troubleshooting method you can describe out loud",
        ],
      },
      {
        type: "p",
        text: "Free network simulators let you build multi-device topologies on a laptop. Physical equipment is not required to become employable.",
      },
      { type: "h2", text: "Step 2: Take one certification, not four" },
      {
        type: "p",
        text: "Entry-level candidates commonly over-invest in certifications. One credential gets you past resume screening; the second rarely adds much until you have work experience to pair it with.",
      },
      {
        type: "table",
        head: ["Certification", "Best for", "Typical timing"],
        rows: [
          ["CompTIA Network+", "Vendor-neutral first credential", "After 8-12 weeks of study"],
          ["Cisco CCNA", "Roles on Cisco equipment; deeper and more respected", "After 12-16 weeks of study"],
          ["CompTIA Security+", "Adding a security angle to a network role", "After Network+ or CCNA"],
        ],
      },
      {
        type: "p",
        text: "If your target job postings name Cisco equipment, go straight to CCNA. Otherwise Network+ is the lower-risk starting point.",
      },
      { type: "h2", text: "Step 3: Build experience before you are hired" },
      {
        type: "p",
        text: "This is the step most people skip, and it is the one that decides interviews. Experience does not have to mean employment.",
      },
      {
        type: "ol",
        items: [
          "Build a multi-site lab topology and document it as if handing it to a colleague",
          "Break it deliberately, then write a root-cause note for each fault",
          "Automate one repetitive check with a script",
          "Complete a structured internship or a NOC rotation where changes are reviewed",
        ],
      },
      {
        type: "quote",
        text: "In an interview, one well-documented lab you can explain in detail is worth more than five certifications you cannot apply.",
      },
      { type: "h2", text: "Which roles should you apply for first?" },
      {
        type: "ul",
        items: [
          "Network Technician, hands-on operations and support",
          "NOC Analyst, monitoring and first-line triage, often shift-based",
          "IT Support Specialist (Infrastructure), blended endpoint and network edge work",
          "Junior Network Engineer, supervised configuration and small builds",
        ],
      },
      {
        type: "p",
        text: "NOC roles are frequently the fastest entry point because they hire for aptitude and shift availability, and they expose you to more failure modes in six months than most lab work does in two years.",
      },
      { type: "h2", text: "How long does the whole path take?" },
      {
        type: "p",
        text: "For someone studying part-time alongside a job, a realistic timeline is six to nine months from starting fundamentals to being interview-ready: three months on fundamentals, one to two months on certification preparation, and two to three months building documented experience.",
      },
    ],
    related: ["network-plus-vs-ccna", "what-to-expect-in-a-tech-internship"],
    ctaCourses: ["ccna-advanced-training", "python-for-network-automation"],
    ctaInternships: ["network-fresher-internship"],
  },

  {
    slug: "network-plus-vs-ccna",
    title: "Network+ vs CCNA: Which Certification Should You Take First?",
    category: "Career Guide",
    featured: true,
    description:
      "A direct comparison of CompTIA Network+ and Cisco CCNA, scope, difficulty, cost, and which one US employers ask for, so you only study for one.",
    keyTakeaway:
      "Take CompTIA Network+ first if you are new to IT and want a vendor-neutral credential you can pass in 8-12 weeks. Go straight to Cisco CCNA if your target job postings name Cisco equipment or you already have networking experience, it is harder, deeper, and more often named in US job descriptions for network roles.",
    author: "Tungabadra Networks",
    publishedAt: "2026-02-03",
    updatedAt: "2026-07-28",
    body: [
      {
        type: "p",
        text: "Both credentials cover enterprise networking fundamentals and both appear in US job postings. They are not equivalent, and taking both in sequence is usually a waste of several months.",
      },
      { type: "h2", text: "Direct comparison" },
      {
        type: "table",
        head: ["", "CompTIA Network+", "Cisco CCNA"],
        rows: [
          ["Scope", "Vendor-neutral concepts", "Concepts plus Cisco configuration"],
          ["Depth", "Broad, moderate depth", "Narrower, substantially deeper"],
          ["Configuration required", "Minimal", "Extensive"],
          ["Typical study time", "8-12 weeks part-time", "12-16 weeks part-time"],
          ["Renewal", "Every 3 years", "Every 3 years"],
          ["Best first credential for", "Career changers new to IT", "People already in IT or targeting Cisco shops"],
        ],
      },
      { type: "h2", text: "Choose Network+ if..." },
      {
        type: "ul",
        items: [
          "You are new to IT entirely and want a lower-risk first exam",
          "Your target roles are help desk, support or generalist IT with a networking component",
          "The job postings you are reading do not name a specific vendor",
          "You want a credential that transfers across equipment vendors",
        ],
      },
      { type: "h2", text: "Choose CCNA if..." },
      {
        type: "ul",
        items: [
          "The postings you want name Cisco, or the employer is a Cisco shop",
          "You already understand IP addressing and want depth rather than breadth",
          "You are targeting a network engineer title rather than a support title",
          "You are willing to spend meaningful time in configuration labs",
        ],
      },
      { type: "h2", text: "Does taking both help?" },
      {
        type: "p",
        text: "Rarely, and almost never back to back. Network+ and CCNA overlap substantially in concepts. If you pass CCNA, Network+ adds little. If you pass Network+ and want more, the better next step is usually job experience or a security credential such as Security+, not the other networking exam.",
      },
      { type: "h2", text: "What neither certification proves" },
      {
        type: "p",
        text: "Neither exam demonstrates that you can work a change window, write a usable runbook, or stay methodical while a site is down. Those are what the interview probes, and they come from lab practice, documentation habits and supervised experience.",
      },
      {
        type: "p",
        text: "Whichever you choose, budget time for building and breaking a real topology alongside exam study. The exam gets you the interview; the lab gets you through it.",
      },
    ],
    related: ["how-to-start-a-career-in-network-engineering", "aws-or-azure-which-cloud-to-learn-first"],
    ctaCourses: ["ccna-advanced-training"],
  },

  {
    slug: "aws-or-azure-which-cloud-to-learn-first",
    title: "AWS or Azure: Which Cloud Platform Should You Learn First?",
    category: "Technology Guide",
    featured: true,
    description:
      "How to choose between AWS and Azure based on your background and the US roles you are targeting, and why the second platform takes far less time than the first.",
    keyTakeaway:
      "Choose based on your background and target employers, not market share. If you come from Windows and Microsoft 365 administration, learn Azure first. If you come from Linux, development or startups, learn AWS first. The core concepts transfer, so the second platform typically takes a third of the time of the first.",
    author: "Tungabadra Networks",
    publishedAt: "2026-03-11",
    updatedAt: "2026-08-05",
    body: [
      {
        type: "p",
        text: "This question is usually asked as if one platform is better. For a learner it is really a question about which one shortens the distance between where you are now and the job you want.",
      },
      { type: "h2", text: "Start from your background" },
      {
        type: "table",
        head: ["Your background", "Start with", "Why"],
        rows: [
          ["Windows Server, Active Directory, Microsoft 365", "Azure", "Entra ID, hybrid identity and licensing concepts carry over directly"],
          ["Linux administration", "AWS", "EC2, IAM and VPC map closely to concepts you already hold"],
          ["Software development", "AWS", "Broadest serverless and developer tooling; most common in startups"],
          ["Networking", "Either", "VPC and Azure Virtual Network are conceptually near-identical"],
          ["No IT background", "AWS", "Larger volume of free learning material and community answers"],
        ],
      },
      { type: "h2", text: "Then check the job postings you actually want" },
      {
        type: "p",
        text: "Search the exact job titles you are targeting in your metro area and count how often each platform is named. Regional and industry concentration matters more than global market share, US healthcare, government and large enterprise skew toward Azure, while startups and digital-native companies skew toward AWS.",
      },
      { type: "h2", text: "What transfers between the two" },
      {
        type: "p",
        text: "Almost all of the conceptual work transfers. What changes is naming, console layout and the specific limits of each service.",
      },
      {
        type: "ul",
        items: [
          "Identity and least-privilege design (IAM / Entra ID and RBAC)",
          "Virtual networking, subnets, routing and firewall rules",
          "Compute sizing, scaling and availability zone placement",
          "Storage tiering and lifecycle policy",
          "Infrastructure as code discipline",
          "Cost management and tagging strategy",
        ],
      },
      { type: "h2", text: "How long does the second platform take?" },
      {
        type: "p",
        text: "For someone competent on one platform, reaching working proficiency on the second commonly takes a third of the original effort, because only the service names and the sharp edges are new.",
      },
      { type: "h2", text: "A practical recommendation" },
      {
        type: "ol",
        items: [
          "Pick one platform using the table above and commit to it for at least three months",
          "Build one complete multi-tier environment, defined in code",
          "Earn the associate-level certification for that platform if postings ask for it",
          "Only then add the second platform, and only if postings you want name it",
        ],
      },
    ],
    related: ["network-plus-vs-ccna", "how-to-prepare-for-a-technical-internship-interview"],
    ctaCourses: ["aws-cloud-practitioner"],
    ctaInternships: ["network-automation-internship"],
  },

  {
    slug: "what-to-expect-in-a-tech-internship",
    title: "What to Expect in a Technology Internship",
    category: "Internship Guide",
    description:
      "A realistic week-by-week picture of a mentored technology internship: the work you will do, how you will be reviewed, and what separates interns who get offers.",
    keyTakeaway:
      "A well-run technology internship is mostly small, scoped, reviewed work: reproducing bugs, making supervised changes and writing documentation. Interns who succeed ask clarifying questions early, communicate blockers within a day, and treat review feedback as information rather than criticism.",
    author: "Tungabadra Networks",
    publishedAt: "2026-04-02",
    updatedAt: "2026-08-19",
    body: [
      {
        type: "p",
        text: "Interns often arrive expecting to build something impressive from scratch. Almost no internship works that way, and the ones that do generally teach less.",
      },
      { type: "h2", text: "What the work actually looks like" },
      {
        type: "ul",
        items: [
          "Small, clearly scoped tasks that someone has already thought about",
          "Reading far more existing code, configuration or documentation than you write",
          "Reproducing a reported problem before attempting to fix it",
          "Submitting work for review and revising it, often more than once",
          "Writing down what you changed so the next person is not confused",
        ],
      },
      { type: "h2", text: "A typical arc" },
      {
        type: "table",
        head: ["Weeks", "Focus", "What good looks like"],
        rows: [
          ["1-2", "Environment setup and orientation", "You can run the system locally and explain what it does"],
          ["3-5", "First supervised tasks", "You finish small tickets and ask questions before guessing"],
          ["6-9", "Independent scoped work", "You are trusted with a feature or investigation end to end"],
          ["10-12", "Ownership and handover", "You document your work so someone else can maintain it"],
        ],
      },
      { type: "h2", text: "How you will be evaluated" },
      {
        type: "p",
        text: "Technical output matters less than most interns expect. Mentors are largely assessing whether you would be safe and pleasant to work with as a junior hire.",
      },
      {
        type: "ol",
        items: [
          "Do you communicate a blocker within a day, or disappear for a week?",
          "Do you ask a clarifying question before building the wrong thing?",
          "Do you respond to review feedback without defensiveness?",
          "Do you leave the system better documented than you found it?",
          "Do you finish what you start, including the unglamorous last ten percent?",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Staying silent when stuck, because asking feels like admitting weakness",
          "Rewriting existing code because you would have done it differently",
          "Optimizing for volume of commits rather than completed, reviewed work",
          "Skipping documentation because the task felt finished without it",
          "Treating review comments as a verdict on you rather than on the change",
        ],
      },
      { type: "h2", text: "How to get the most out of it" },
      {
        type: "p",
        text: "Keep a running log of what you did each week, in plain language. It makes your weekly update trivial to write, it makes your completion report accurate, and it becomes the source of your interview answers for the next two years.",
      },
    ],
    related: ["how-to-prepare-for-a-technical-internship-interview", "how-to-start-a-career-in-network-engineering"],
    ctaInternships: ["network-automation-internship", "advanced-core-internship"],
  },

  {
    slug: "how-to-prepare-for-a-technical-internship-interview",
    title: "How to Prepare for a Technical Internship Interview",
    category: "Career Guide",
    description:
      "What technology internship interviews actually assess, how to prepare for each part, and how to answer when you do not know something.",
    keyTakeaway:
      "Technology internship interviews assess three things: whether you can reason out loud through an unfamiliar problem, whether your claimed skills are real, and whether you communicate clearly. Prepare by rehearsing your projects in detail, practicing thinking aloud, and preparing an honest way to say you do not know.",
    author: "Tungabadra Networks",
    publishedAt: "2026-05-08",
    updatedAt: "2026-08-19",
    body: [
      {
        type: "p",
        text: "Internship interviews are not scaled-down senior interviews. Interviewers know you have little experience, so they are testing your reasoning process and your honesty rather than your recall.",
      },
      { type: "h2", text: "The three things being assessed" },
      {
        type: "ol",
        items: [
          "Reasoning: can you work through an unfamiliar problem out loud without freezing?",
          "Verification: is the skill on your resume actually yours?",
          "Communication: can you explain something technical to someone who was not there?",
        ],
      },
      { type: "h2", text: "Prepare your projects properly" },
      {
        type: "p",
        text: "Every project on your resume should have a three-minute version and a fifteen-minute version. Expect to be asked why you made a specific decision, and what you would do differently.",
      },
      {
        type: "ul",
        items: [
          "What problem the project solved and who for",
          "One decision you made and the alternative you rejected",
          "One thing that went wrong and how you diagnosed it",
          "What you would change if you rebuilt it now",
        ],
      },
      { type: "h2", text: "Practice thinking out loud" },
      {
        type: "p",
        text: "Silence is the most common failure in a technical interview. The interviewer cannot assess reasoning they cannot hear. Narrate your assumptions, state what you would check first, and say when you are guessing.",
      },
      { type: "h2", text: "How to say you do not know" },
      {
        type: "p",
        text: "Not knowing is expected. Bluffing is disqualifying, because it tells the interviewer you might bluff during an incident too.",
      },
      {
        type: "quote",
        text: "I have not worked with that. Based on what I know about how the surrounding pieces behave, I would expect it to work roughly like this, and the first thing I would check is whether that assumption holds.",
      },
      { type: "h2", text: "Questions worth asking them" },
      {
        type: "ul",
        items: [
          "What does a typical week look like for an intern on this team?",
          "How is my work reviewed, and how often?",
          "What does a successful internship look like at week twelve?",
          "What is the most common reason interns struggle here?",
        ],
      },
      { type: "h2", text: "The week before" },
      {
        type: "ol",
        items: [
          "Reread your own project code or configuration, you have forgotten more than you think",
          "Do one timed practice problem out loud, recorded, and watch it back",
          "Write your three-minute project summaries down and say them to another person",
          "Test your camera, microphone and internet connection on the actual platform",
        ],
      },
    ],
    related: ["what-to-expect-in-a-tech-internship", "how-to-start-a-career-in-network-engineering"],
    ctaInternships: ["network-automation-internship", "network-fresher-internship"],
  },

  {
    slug: "choosing-between-live-online-and-self-paced-training",
    title: "Live Online vs Self-Paced Training: Which Format Fits You?",
    category: "Course Guide",
    description:
      "An honest comparison of live online, self-paced and hybrid technology training, including completion realities and how to choose for your schedule.",
    keyTakeaway:
      "Choose live online if you need scheduled accountability, want to ask questions in the moment, or have failed to finish self-paced material before. Choose self-paced if your schedule is genuinely unpredictable and you have already finished a self-directed course. Hybrid suits most working professionals.",
    author: "Tungabadra Networks",
    publishedAt: "2026-06-17",
    updatedAt: "2026-08-19",
    body: [
      {
        type: "p",
        text: "Format is the most under-considered decision in choosing a course, and the most common reason people pay for training they never finish.",
      },
      { type: "h2", text: "Comparison" },
      {
        type: "table",
        head: ["", "Live online", "Self-paced", "Hybrid"],
        rows: [
          ["Schedule", "Fixed sessions", "Entirely yours", "Fixed sessions plus flexible lab time"],
          ["Question turnaround", "Immediate", "Asynchronous", "Immediate during sessions"],
          ["Accountability", "High", "Low, entirely self-supplied", "Moderate to high"],
          ["Best for", "Structure and momentum", "Unpredictable schedules", "Working professionals"],
          ["Main risk", "Missing a session", "Quietly stopping in week three", "Underusing lab time"],
        ],
      },
      { type: "h2", text: "The honest question to ask yourself" },
      {
        type: "p",
        text: "Have you ever finished a self-directed technical course, all of it, including the exercises? If not, self-paced is unlikely to be the format that changes that, however disciplined you intend to be.",
      },
      { type: "h2", text: "When self-paced genuinely wins" },
      {
        type: "ul",
        items: [
          "Rotating shift work or on-call schedules that make fixed sessions impossible",
          "You already know part of the material and want to skip ahead",
          "You have a hard external deadline supplying the accountability",
          "You are using it as a reference alongside a job you already hold",
        ],
      },
      { type: "h2", text: "Making live online work" },
      {
        type: "ol",
        items: [
          "Put every session in your calendar as busy time before the course starts",
          "Tell one person your schedule so someone notices if you disappear",
          "Do the lab within 48 hours of the session while the context is fresh",
          "Ask your question during the session rather than saving it, so will everyone else",
        ],
      },
      { type: "h2", text: "What about corporate teams?" },
      {
        type: "p",
        text: "For teams, on-site or scheduled live delivery is almost always the right choice. Shared timing means the team hits the same concepts in the same week and can apply them to a shared codebase or environment immediately.",
      },
    ],
    related: ["how-to-start-a-career-in-network-engineering", "aws-or-azure-which-cloud-to-learn-first"],
    ctaCourses: ["linux-for-network-engineers", "python-for-network-automation"],
  },

  {
    slug: "linux-commands-every-it-professional-should-know",
    title: "The Linux Commands Every IT Professional Should Know",
    category: "Tutorial",
    description:
      "A practical reference of the Linux commands that matter for diagnosis and administration, grouped by the question each one answers.",
    keyTakeaway:
      "Roughly twenty Linux commands cover most day-to-day administration and troubleshooting. Learn them grouped by the question they answer, what is running, what is using resources, what changed, what is in the logs, rather than as an alphabetical list.",
    author: "Tungabadra Networks",
    publishedAt: "2026-07-09",
    updatedAt: "2026-08-19",
    body: [
      {
        type: "p",
        text: "Command lists are easy to find and hard to retain. What makes commands stick is attaching each one to a question you will actually ask while something is broken.",
      },
      { type: "h2", text: "What is running, and what is it doing?" },
      {
        type: "table",
        head: ["Command", "Answers"],
        rows: [
          ["ps aux", "What processes exist right now"],
          ["top / htop", "What is consuming CPU and memory, live"],
          ["systemctl status <unit>", "Is this service running, and why did it stop"],
          ["journalctl -u <unit> -n 100", "What did this service say before it failed"],
        ],
      },
      { type: "h2", text: "What is using resources?" },
      {
        type: "table",
        head: ["Command", "Answers"],
        rows: [
          ["df -h", "Which filesystem is full"],
          ["du -sh *", "What inside this directory is large"],
          ["free -h", "How much memory is actually available"],
          ["iostat / vmstat", "Is the bottleneck disk or CPU"],
        ],
      },
      { type: "h2", text: "What is happening on the network?" },
      {
        type: "table",
        head: ["Command", "Answers"],
        rows: [
          ["ip a / ip r", "What addresses and routes does this host have"],
          ["ss -tulpn", "What is listening, and which process owns it"],
          ["dig <name>", "What does DNS actually return"],
          ["curl -v <url>", "What happens on the wire for this request"],
        ],
      },
      { type: "h2", text: "What is in the files, and what changed?" },
      {
        type: "table",
        head: ["Command", "Answers"],
        rows: [
          ["grep -rn <pattern> <path>", "Where does this string appear"],
          ["find <path> -mtime -1", "What changed in the last day"],
          ["tail -f <file>", "What is being written right now"],
          ["diff -u a b", "What is different between these two files"],
        ],
      },
      { type: "h2", text: "How to actually retain them" },
      {
        type: "ol",
        items: [
          "Learn the four groups above as questions, not as a list",
          "When you use a command successfully during a real problem, write the line down",
          "Read the man page for one command a week rather than memorizing flags",
          "Replace any sequence you type more than three times with a small script",
        ],
      },
      {
        type: "p",
        text: "Fluency comes from diagnosis, not from flashcards. Break something in a virtual machine on purpose and fix it, that single habit does more than any reference list.",
      },
    ],
    related: ["aws-or-azure-which-cloud-to-learn-first", "choosing-between-live-online-and-self-paced-training"],
    ctaCourses: ["linux-for-network-engineers", "real-time-automation-projects"],
  },
];

/* ------------------------------- accessors -------------------------------- */

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getRelatedResources(resource: Resource): Resource[] {
  return resource.related.map(getResource).filter((r): r is Resource => Boolean(r));
}

export function featuredResources(limit = 3): Resource[] {
  const featured = resources.filter((r) => r.featured);
  return (featured.length ? featured : resources).slice(0, limit);
}

/** Words per minute used for the reading-time estimate. */
const WPM = 220;

export function readingMinutes(resource: Resource): number {
  const words = resource.body.reduce((n, b) => {
    switch (b.type) {
      case "ul":
      case "ol":
        return n + b.items.join(" ").split(/\s+/).length;
      case "table":
        return n + [...b.head, ...b.rows.flat()].join(" ").split(/\s+/).length;
      default:
        return n + b.text.split(/\s+/).length;
    }
  }, resource.keyTakeaway.split(/\s+/).length);
  return Math.max(1, Math.round(words / WPM));
}

export const resourceCategories = Array.from(new Set(resources.map((r) => r.category)));

/** Formats an ISO date for display and <time datetime="..."> attributes. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
