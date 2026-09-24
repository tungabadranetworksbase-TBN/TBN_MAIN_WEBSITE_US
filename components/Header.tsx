"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ChevronDown, Close, Menu } from "./Icons";
import { primaryNav } from "@/lib/site";
import styles from "./Header.module.css";

/**
 * Site header. Client component only because of the mobile menu and the
 * scrolled border state; the desktop dropdowns are pure CSS (:hover /
 * :focus-within) so they work without JavaScript and stay keyboard reachable.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu, and background scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className="container">
        <div className={styles.bar}>
          <Logo className={styles.logo} />

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              {primaryNav.map((item) => (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={15} className={styles.chevron} />}
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
            <Link href="/contact" className="btn btn--ghost btn--sm">
              Talk to Us
            </Link>
            <Link href="/courses" className="btn btn--primary btn--sm">
              Explore Courses
            </Link>
          </div>

          <button
            type="button"
            className={styles.toggle}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <Close /> : <Menu />}
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className={styles.mobile} id="mobile-menu">
          <div className="container">
            <nav className={styles.mobileInner} aria-label="Mobile">
              {primaryNav.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.mobileLink}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                  >
                    {item.label}
                    {item.description && <small>{item.description}</small>}
                  </Link>
                  {item.children && (
                    <div className={styles.mobileSub}>
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className={styles.mobileActions}>
                <Link href="/courses" className="btn btn--primary btn--block">
                  Explore Courses
                </Link>
                <Link href="/contact" className="btn btn--ghost btn--block">
                  Talk to Us
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
