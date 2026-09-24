import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { footerNav, site } from "@/lib/site";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

/**
 * Site footer.
 *
 * Carries the one piece of information a training company's footer genuinely
 * needs and most omit: how the training actually reaches you.
 * That is real, published data, so it earns the space.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand} aria-label={`${site.name} home`}>
              <Image src="/images/tbn-mark.png" alt="" width={147} height={120} className={styles.mark} />
              <span className={styles.wordmark}>
                Tungabadra <span className={styles.wordmarkLight}>Networks</span>
              </span>
            </Link>

            <p className={styles.tagline}>{site.tagline}.</p>

            <a href={`mailto:${site.contact.email}`} className={`mono ${styles.email}`}>
              {site.contact.email}
            </a>

            <div className={styles.social}>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on YouTube`}>
                <YoutubeLogo size={19} />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on Instagram`}>
                <InstagramLogo size={19} />
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on LinkedIn`}>
                <LinkedinLogo size={19} />
              </a>
            </div>
          </div>

          <div className={styles.cols}>
            {footerNav.map((col) => (
              <div key={col.title}>
                <h2 className={styles.colTitle}>{col.title}</h2>
                <ul className={styles.colList}>
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* The branch strip became a delivery strip: same band, but it states
            how training is delivered rather than listing offices. */}
        <div className={styles.branches}>
          <h2 className={styles.colTitle}>How training runs</h2>
          <ul className={styles.branchList}>
            {[
              { k: "Live online", m: "Instructor-led, scheduled sessions", d: "Join from anywhere" },
              { k: "On-site", m: "Delivered at your premises", d: "For corporate cohorts" },
              { k: "Lab access", m: "Physical Cisco and Palo Alto racks", d: "Available 24/7" },
              { k: "Placement support", m: "Resume, lab exams, mock interviews", d: "Until you are hired" },
            ].map((b) => (
              <li key={b.k} className={styles.branch}>
                <span className={styles.branchCity}>{b.k}</span>
                <span className={styles.branchManager}>{b.m}</span>
                <span className={`mono ${styles.branchPhone}`}>{b.d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {year} {site.legalName}
          </p>
          <a href={site.contact.portal} target="_blank" rel="noopener noreferrer" className="link-gold">
            Student portal
            <ArrowUpRight size={15} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
