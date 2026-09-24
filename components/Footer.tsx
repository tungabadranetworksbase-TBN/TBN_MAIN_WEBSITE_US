import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Mail, MapPin, Phone } from "./Icons";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

export default function Footer() {
  const { address } = site.contact;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Tungabadra Networks, home">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#fff" opacity="0.1" />
                <path
                  d="M8 7c0 6.5 3.2 9.5 8 11.5M24 7c0 6.5-3.2 9.5-8 11.5M16 18.5V25"
                  stroke="#00bc5e"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="25" r="1.9" fill="#00bc5e" />
              </svg>
              <span>
                <strong>Tungabadra</strong> Networks
              </span>
            </Link>

            <p className={styles.blurb}>{site.definition}</p>

            <address className={styles.contact} style={{ fontStyle: "normal" }}>
              <a href={`mailto:${site.contact.email}`}>
                <Mail size={17} />
                {site.contact.email}
              </a>
              <a href={site.contact.phoneHref}>
                <Phone size={17} />
                {site.contact.phone}
              </a>
              <p>
                <MapPin size={17} />
                {[address.city, address.region, "United States"].filter(Boolean).join(", ")}
              </p>
            </address>
          </div>

          <div className={styles.columns}>
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

        {/*
          EDIT ME: this notice exists because the contact details, pricing and
          cohort dates in this build are placeholders. Delete it once verified
          organization details are in `lib/site.ts`.
        */}
        <p className={styles.note}>
          <strong>Pre-launch build.</strong> Contact details, tuition figures and cohort dates on
          this site are editable placeholders pending confirmation. No awards, accreditations,
          partnerships, rankings or outcome statistics are claimed anywhere on this site.
        </p>

        <div className={styles.bottom}>
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>

          <div className={styles.social}>
            <a
              href={site.social.linkedin}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Tungabadra Networks on LinkedIn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4V9Z" />
              </svg>
            </a>
            <a
              href={site.social.instagram}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Tungabadra Networks on Instagram"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.94-11.4a1.58 1.58 0 1 1-1.57-1.58 1.58 1.58 0 0 1 1.57 1.58Z" />
              </svg>
            </a>
            <a
              href={site.social.youtube}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Tungabadra Networks on YouTube"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
