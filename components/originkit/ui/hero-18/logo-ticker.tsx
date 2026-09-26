// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

/**
 * Scrolling marquee under the hero.
 *
 * As delivered this listed nine invented companies (Logiqo, Nexora, Brandly …)
 * under a "trusted by" heading, and pointed at a `logos/` directory the CLI
 * never wrote - eighteen broken images claiming clients that do not exist.
 *
 * It now names the platforms taught across the course list, which is a
 * verifiable statement about the courses rather than a claim about customers
 * or partners. Set as text so it needs no asset per item and stays legible at
 * any size.
 */
const technologies = [
  "Cisco CCNA",
  "CCNP ENCOR",
  "Palo Alto NGFW",
  "Aruba ACA",
  "Juniper JNCIA",
  "Cisco Meraki",
  "VMware ESXi",
  "AWS Cloud",
  "Linux",
  "Python",
  "Netmiko",
  "Ansible",
  "Git & CI/CD",
  "Prometheus",
  "Grafana",
  "Zabbix",
  "Wireshark",
];

export default function LogoTicker({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden h18-logo-fade ${className}`}
      role="group"
      aria-label="Platforms covered across Tungabadra Networks courses"
    >
      <div className="flex h-full w-max items-center gap-[44px] h18-logo-track md:gap-[64px]">
        {/* duplicated so the marquee can loop seamlessly */}
        {[...technologies, ...technologies].map((name, i) => (
          <span
            key={`${name}-${i}`}
            aria-hidden={i >= technologies.length}
            className="shrink-0 whitespace-nowrap text-[15px] font-medium tracking-[-0.2px] text-white/55 md:text-[17px]"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
