"""
Fintra copy -> Tungabadra Networks copy.

Every string below is taken from the live site, www.tungabadranetworks.in
(crawled Aug 2026): the tagline, the course line-up, the service list, the
locations, the leadership names and the published figures. Nothing here is
invented.

Two notes on accuracy:

  * The organisation is India-based - Kurnool HQ with Hyderabad, Bangalore,
    Vizag and Vijayawada branches - so the earlier US-market framing is gone.
    Spelling stays US English, which is what the source site uses.
  * The figures (3,000+ trained, 950+ placed, 96%, 150%, Rs 26.5L) are the
    organisation's own published claims, reproduced as such. The site discloses
    no course fees publicly, so no price is shown anywhere.

Replacement is done on whole text nodes (`>text<`), never as a loose substring,
so attribute values and class names are never touched.
"""

# Headings Framer exploded into per-character or per-word spans. These cannot
# be swapped as text nodes - each word is its own node, so a single-word entry
# here would also hit unrelated headings. splittext.py rebuilds them whole.
SPLIT = {
    "Engineering the future of modern financial systems":
        "The network you build is the net worth you earn",
    "Fintra powers seamless global transactions with secure, enterprise-grade financial infrastructure. Built for modern businesses, we simplify cross-border payments, crypto-fiat operations, and compliance with unmatched reliability and precision.":
        "Tungabadra Networks is an industry-focused networking company that builds real, job-ready skills based on how networks actually work. The same engineers who teach our labs run live enterprise networks across South India, so what you learn is what the field is running.",
    "Powering high-performance financial systems":
        "Training built by engineers who run live networks",
    "$3.2B+ processed globally": "3,000+ engineers trained",
    "100+ Financial Integrations": "The platforms you will train on",
}

NAV = {
    "Home": "Home",
    "Security": "Courses",
    "About Us": "Internships",
    "Contact": "Contact",
    "Get started": "Book a Demo",
    "Get Started": "Book a Demo",
}

HERO = {
    # Fintra showed TrustPilot and Google review scores. Replaced with two of
    # the organisation's own published figures.
    "4.9": "3,000+",
    "TrustPilot": "Trained",
    "5.0": "950+",
    "Google Business": "Placed",
    "Engineering the future of": "The network you build",
    "modern financial systems": "is the net worth you earn",
    "Power smarter financial operations with intelligent systems built.":
        "Industry-focused networking training, real enterprise labs, and placement support.",
    "Contact Us": "Book a Demo",
}

BODY = {
    # ---- About band -------------------------------------------------------
    "About Us": "About Us",
    "Global Infrastructure": "Built on Real Networks",
    "Enabling borderless finance with secure, scalable systems trusted by enterprises worldwide.":
        "A training institute paired with an engineering division that designs, deploys and secures production networks across South India.",
    "Our Mission": "Our Mission",
    "To redefine global finance by building secure, transparent, and scalable infrastructure that empowers businesses.":
        "Bridge the gap between theoretical knowledge and practical networking skills, shaping the future of IT infrastructure.",
    "Stronger Together": "Labs, Not Slides",
    "Built on collaboration, Fintra brings together expertise across teams to create reliable, scalable financial infrastructure for global operations.":
        "Physical Cisco and Palo Alto equipment, real enterprise labs with 24/7 access, and packet-level analysis in Wireshark from day one.",

    # ---- Features ---------------------------------------------------------
    "Features": "What we offer",
    "Powering high-performance financial systems": "Training built by engineers who run live networks",
    "Smarter financial operations": "Networking courses",
    "Real-time insights": "Internship programs",
    "Scalable Infrastructure": "Placement support",
    "Easy Integration": "Enterprise services",

    # ---- Workflow ---------------------------------------------------------
    "Workflow": "How it works",
    "Streamlined Financial Operations": "From first demo to first offer",
    "Smart Routing": "Book a free demo",
    "Optimize payment paths for speed and cost": "See the labs and the syllabus before you commit",
    "Real-Time Processing": "Train on real equipment",
    "Execute transactions with instant visibility": "Physical racks and 24/7 lab access, not simulations",
    "Auto Reconciliation": "Get placed",
    "Simplify financial tracking and reporting": "Support continues until you are working",

    # ---- Metrics (the organisation's own published figures) ---------------
    "Metrics": "Results",
    "Performance insights across your financial operations": "What our alumni have achieved",
    "Transaction volume": "Engineers trained",
    "Total processed transactions": "Since 2015, across five branches",
    "Revenue growth": "Students placed",
    "Increase in financial performance over": "With 40+ hiring partners",
    "Processing efficiency": "Average salary hike",
    "Improvement in processing speed": "Reported by placed alumni",
    "5 Oct": "2015",
    "10 Oct": "2018",
    "15 Oct": "2020",
    "20 Oct": "2023",
    "25 Oct": "2026",

    # ---- Security band -> why Tungabadra ----------------------------------
    "Security": "Why us",
    "Security You Can Trust": "Why Engineers Choose Tungabadra",
    "Fraud Detection": "TAC-level training",
    "Monitor and prevent suspicious activity with intelligent risk detection systems":
        "Taught by a former Palo Alto TAC engineer, with Wireshark packet analysis throughout",
    "Global Compliance": "Real enterprise labs",
    "Stay compliant with international standards including PCI DSS and SOC frameworks":
        "Physical Cisco, Palo Alto and Aruba equipment with 24/7 rack access",
    "End-to-End Encryption": "100% practical",
    "Protect sensitive data with advanced encryption across every transaction layer":
        "Hands-on troubleshooting from day one - no coding background required",
    "Secure Infrastructure": "Placement until placed",
    "Built on reliable systems ensuring uptime, data protection, and operational resilience":
        "Support continues until you secure a role, with 40+ hiring partners",
    "Performance Efficiency": "Engineers who teach",
    "Consistently optimised workflows delivering faster results":
        "Instructors manage live enterprise estates across South India",
    "10K+ Active Users": "20K+ YouTube community",
    "Trusted by thousands of users worldwide who rely on our platform":
        "Free packet-level walkthroughs and lab demos at @tb_networks",

    # ---- Teams band -> who it is for --------------------------------------
    "Teams": "Who it is for",
    "Empowering Teams Behind Global Transactions": "Built for Engineers Entering the Network Field",
    "Unify workflows across teams": "Graduates, career changers and working IT staff",

    # ---- Comparison -------------------------------------------------------
    "Comparison": "Compare",
    "Built beyond what traditional systems offer": "Built beyond what a classroom offers",
    "Advanced automation across financial operations": "Physical racks and 24/7 lab access",
    "Expanded integrations and system connectivity": "Instructors who run live enterprise networks",
    "Deeper analytics and performance insights": "Placement support that continues until you are hired",
    "Expanded integrations and system.": "Instructors who run live networks.",
    "We are the best": "Tungabadra Networks",
    "We are best": "Tungabadra",
    "Fintra": "Tungabadra Networks",

    # ---- Integrations -> the platforms trained on -------------------------
    "One unified system across all your financial tools":
        "One curriculum across the vendors enterprise networks actually run",
    "Connect banks, wallets, and gateways": "Cisco routing, switching and troubleshooting",
    "Sync data in real time": "Palo Alto, Aruba and Juniper security",
    "Automate cross-platform workflows": "Python, Netmiko, NAPALM and Ansible",
    "Scale integrations securely": "AWS cloud and Linux for network engineers",
    "Stripe": "Cisco",
    "Plaid": "Palo Alto",
    "QuickBooks": "Juniper",
    "Salesforce": "Aruba",
    "Slack": "AWS",
    "3.2x faster processing": "12 courses across 5 branches",
    "99.9% uptime": "Labs open 24/7",

    # ---- Second comparison ------------------------------------------------
    "A Better Financial Infrastructure": "A Better Way to Learn Networking",
    "Other Companies": "Typical institutes",

    # ---- Courses (the site publishes no fees) -----------------------------
    "Pricing": "Courses",
    "Simple pricing for modern teams": "Twelve courses, one career path",
    "Flexible plans that grow with your operations and system complexity":
        "Start with CCNA and go as far as automation and cloud. Fees are shared on the demo call.",
    "Monthly": "Core track",
    "Anually": "Advanced track",
    "Starter Plan": "CCNA Advanced",
    "Ideal for teams getting started with financial automation":
        "Routing, switching, hardware labs and troubleshooting - the entry point for most engineers",
    "Basic workflow automation across systems": "Physical rack and 24/7 lab access",
    "Real-time financial data tracking": "Wireshark packet-level analysis",
    "Standard integrations with core tools": "Placement support until you are hired",
    "Growth plan": "CCNP & Security",
    "Perfect for scaling teams managing complex financial workflows":
        "MPLS, BGP, OSPF and VPNs, plus Palo Alto NGFW, Aruba ACA and Juniper JNCIA",
    "/month": "",

    # ---- FAQ --------------------------------------------------------------
    "FAQs": "FAQs",
    "1. What is Fintra and how does it work?": "1. What is Tungabadra Networks?",
    "Fintra is a global financial infrastructure platform that enables businesses to process, manage, and scale transactions across fiat and crypto systems seamlessly.":
        "Tungabadra Networks is an industry-focused networking company founded in 2015 in Kurnool. It runs networking courses, internships and placement support alongside an engineering division that designs, deploys and secures production networks.",
    "2. Does Fintra support both crypto and fiat transactions?": "2. Do I need a coding background?",
    "3. How secure is the Fintra platform?": "3. What equipment will I train on?",
    "4. Can Fintra handle high-volume transactions?": "4. Do you help with placement?",
    "5. Is Fintra compliant with global regulations?": "5. Where are your branches?",

    # ---- generic ----------------------------------------------------------
    "Get Started": "Book a Demo",
    "Get started": "Book a Demo",
    "Contact Us": "Book a Demo",
}

FOOTER = {
    # The footer carries its own heading and strapline. They live here rather
    # than in BODY because substitution is region-scoped - the footer never
    # sees the BODY map.
    "Powering high-performance financial systems": "Start where the network starts",
    "Expanded integrations and system.": "Book a free demo and see the labs.",

    "Product": "Learn",
    "Resources": "Company",
    "Home": "Home",
    "Security": "Courses",
    "About Us": "Internships",
    "Contact": "Contact",
    "Help Centre": "Placements",
    "T&Cs": "Terms",
    "Privacy policy": "Privacy Policy",
    "Terms of Service": "Sitemap",
    "Copyright © 2026 Fintra": "© 2026 Tungabadra Networks",
    "Fintra": "Tungabadra Networks",
    "Get started": "Book a Demo",
    "Get Started": "Book a Demo",
}

# The counters render "0" without Framer's runtime, so each is replaced by a
# static figure. These are the organisation's own published numbers.
COUNTERS = ["3000", "950", "96", "150", "26"]

# Fintra internal links -> Tungabadra routes
LINKS = {
    "index.html": "/",
    "contact.html": "/contact",
    "privacy-policy.html": "/privacy-policy",
    "./index.html": "/",
    "./contact.html": "/contact",
    "./privacy-policy.html": "/privacy-policy",
}
