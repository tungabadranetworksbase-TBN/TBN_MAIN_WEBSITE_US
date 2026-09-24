"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { primaryNav, site } from "@/lib/site";
import styles from "./Nav.module.css";

/**
 * Site navigation.
 *
 * One line at desktop, 68px tall. Dropdowns open on hover AND focus-within so
 * they are reachable by keyboard without any JS; only the mobile drawer and the
 * scrolled state need state.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const current = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={`shell ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${site.name} home`}>
          <Image
            src="/images/tbn-mark.png"
            alt=""
            width={147}
            height={120}
            className={styles.mark}
            priority
          />
          <span className={styles.wordmark}>
            Tungabadra <span className={styles.wordmarkLight}>Networks</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {primaryNav.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={current(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {item.children && <CaretDown size={13} weight="bold" className={styles.caret} />}
                </Link>

                {item.children && (
                  <div className={styles.panel}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className={styles.panelLink}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={site.contact.phoneHref} className={`mono ${styles.phone}`}>
            {site.contact.phone}
          </a>
          <Link href="/contact" className="btn btn--gold">
            Book a Demo
          </Link>
        </div>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open && (
        <div className={styles.drawer} id="mobile-nav">
          <div className="shell">
            <nav className={styles.drawerInner} aria-label="Mobile">
              {primaryNav.map((item) => (
                <div key={item.href} className={styles.drawerGroup}>
                  <Link
                    href={item.href}
                    className={styles.drawerLink}
                    aria-current={current(item.href) ? "page" : undefined}
                  >
                    {item.label}
                    {item.description && <small>{item.description}</small>}
                  </Link>
                  {item.children && (
                    <div className={styles.drawerSub}>
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className="chip">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className={styles.drawerActions}>
                <Link href="/contact" className="btn btn--gold">
                  Book a Demo
                </Link>
                <a href={site.contact.phoneHref} className={`btn btn--ghost mono`}>
                  {site.contact.phone}
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
