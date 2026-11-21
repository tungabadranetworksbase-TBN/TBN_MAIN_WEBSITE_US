import Image from "next/image";
import s from "./gallery.module.css";

/**
 * Programme posters for an internship track.
 *
 * The artwork is per track and lives here rather than on the Internship type,
 * following the HIGHLIGHTS pattern in InternshipPricing.tsx: only this
 * component renders it. A track with no entry renders nothing, so adding a
 * track never breaks a page.
 *
 * Widths and heights are the files' real pixel sizes, so the browser reserves
 * the right box and nothing shifts while they load. They are NOT cropped: the
 * posters carry their own text to the edges, and a fixed aspect ratio with
 * object-fit: cover would cut it off.
 */
type Poster = { src: string; w: number; h: number; alt: string };

const POSTERS: Record<string, Poster[]> = {
  "enterprise-networking-internship": [
    {
      src: "/images/internships/enterprise-networking-internship/poster-1.png",
      w: 1672,
      h: 941,
      alt: "Enterprise Networking Internship poster: learn, lab, implement, with routers, switches, firewall and wireless access points, and the CCNA, EVE-NG, GNS3, Packet Tracer, Wireshark and Linux toolset.",
    },
    {
      src: "/images/internships/enterprise-networking-internship/poster-2.png",
      w: 1672,
      h: 941,
      alt: "Enterprise Networking Internship poster listing the technologies covered: routing and switching, OSPF, BGP and EIGRP, firewalls and security, SD-WAN, data center networking and cloud networking.",
    },
  ],
  "data-center-server-virtualization-internship": [
    {
      src: "/images/internships/data-center-server-virtualization-internship/poster-1.jpg",
      w: 1536,
      h: 1024,
      alt: "Data Center Server and Virtualization Internship poster: a student working in a data center, with the themes explore data centers, work with virtualization, understand networks and build your future.",
    },
    {
      src: "/images/internships/data-center-server-virtualization-internship/poster-2.jpg",
      w: 1600,
      h: 900,
      alt: "Data Center Server and Virtualization Internship poster: build, configure, optimize, covering work with real servers, networking, virtualization, skills and career.",
    },
  ],
  "data-center-automation-internship": [
    {
      src: "/images/internships/data-center-automation-internship/poster-1.jpg",
      w: 1600,
      h: 900,
      alt: "Data Center and Automation Internship poster: automate, optimize, innovate, covering data center management, infrastructure automation and scripting.",
    },
    {
      src: "/images/internships/data-center-automation-internship/poster-2.jpg",
      w: 1536,
      h: 1024,
      alt: "Data Center and Automation Internship poster covering data center operations, automation with Ansible, cloud and virtualization, network configuration, security and monitoring, and Bash and Python scripting.",
    },
  ],
  "elite-career-path-bundle": [
    {
      src: "/images/internships/elite-career-path-bundle/poster-1.jpg",
      w: 1600,
      h: 900,
      alt: "Elite Career Path Bundle poster: a complete internship experience covering data center and virtualization, automation and scripting, networking and security, cloud infrastructure and career growth.",
    },
  ],
};

/**
 * Whether a track has a poster left over for the gallery.
 *
 * The first poster is rendered in the sidebar by InternshipLeadPoster, so the
 * gallery only has something to show from the second onwards. The Elite bundle
 * ships one poster, which is why this is `> 1` and not `> 0`: without it that
 * page renders a heading over nothing.
 */
export const hasPosters = (slug: string) => (POSTERS[slug]?.length ?? 0) > 1;

function Frame({ poster, sizes, eager }: { poster: Poster; sizes: string; eager?: boolean }) {
  return (
    <figure className={s.frame}>
      <Image
        src={poster.src}
        alt={poster.alt}
        width={poster.w}
        height={poster.h}
        className={s.image}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
      />
    </figure>
  );
}

/** The track's first poster, for the top of the detail page sidebar. */
export function InternshipLeadPoster({ slug }: { slug: string }) {
  const poster = POSTERS[slug]?.[0];
  if (!poster) return null;
  // At the top of the page, so it loads with the rest of the first screen
  // rather than after it. 340px is the sidebar width set in detail.module.css.
  return <Frame poster={poster} sizes="(min-width: 1024px) 340px, 100vw" eager />;
}

export default function InternshipGallery({ slug }: { slug: string }) {
  const posters = (POSTERS[slug] ?? []).slice(1);
  if (!posters.length) return null;

  return (
    <div className={s.gallery}>
      {posters.map((p) => (
        <Frame key={p.src} poster={p} sizes="(min-width: 1100px) 760px, 100vw" />
      ))}
    </div>
  );
}
