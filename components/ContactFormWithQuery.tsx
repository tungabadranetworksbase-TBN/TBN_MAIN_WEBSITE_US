"use client";

import { useSearchParams } from "next/navigation";
import InquiryForm from "./InquiryForm";

const INTERESTS = ["course", "internship", "corporate", "services", "other"] as const;
type Interest = (typeof INTERESTS)[number];

/**
 * Prefills the contact form from `?interest=` and `?subject=`.
 *
 * This exists as a separate client component so `app/contact/page.tsx` stays a
 * fully static, server-rendered page. Reading searchParams in the page itself
 * would make the whole route dynamic and leave an empty streamed hole in the
 * HTML - no heading and no structured data for crawlers.
 *
 * The subject arrives as readable text in the URL rather than a slug, so this
 * component never has to import the course or internship catalogs.
 */
export default function ContactFormWithQuery() {
  const params = useSearchParams();

  const raw = params.get("interest");
  const interest: Interest = INTERESTS.includes(raw as Interest) ? (raw as Interest) : "course";

  // Cap the length so a crafted URL cannot stuff the field.
  const subject = (params.get("subject") ?? "").slice(0, 120);

  return <InquiryForm defaultInterest={interest} defaultSubject={subject} />;
}
