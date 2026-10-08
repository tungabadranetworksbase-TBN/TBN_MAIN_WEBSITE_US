import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/ui";
import DemoRegistrationForm, { SessionTime } from "@/components/DemoRegistrationForm";
import { buildMetadata } from "@/lib/seo";
import { type Campaign, fetchIn, isForUs } from "@/lib/demo";
import styles from "../../detail.module.css";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

/** The campaign, or null when it is missing, closed, or not offered in the US. */
async function getCampaign(slug: string) {
  const res = await fetchIn<{ success?: boolean; data?: Campaign }>(
    `/api/campaigns/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } },
  );
  const c = res?.body?.success ? res.body.data : undefined;
  return c && isForUs(c) ? c : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCampaign(slug);
  return buildMetadata({
    title: c ? `Free demo: ${c.title}` : "Demo session not found",
    description: c ? `Register free for the live ${c.course_name} demo session with ${c.trainer_name}.` : "",
    path: `/demo/${slug}`,
    // Campaigns are short-lived; nothing here should outlive them in search.
    noIndex: true,
  });
}

export default async function DemoPage({ params }: Params) {
  const { slug } = await params;
  const campaign = await getCampaign(slug);
  if (!campaign) notFound();

  return (
    <>
      <Hero
        eyebrow={campaign.course_name}
        title={campaign.title}
        lede={campaign.description || `A free live ${campaign.course_name} session with ${campaign.trainer_name}.`}
        actions={[{ label: "Register free", href: "#register" }]}
      />

      <div className="container" style={{ paddingBlock: "clamp(40px, 6vw, 72px)" }}>
        <div className={styles.layout}>
          <div className={styles.main} id="register">
            <DemoRegistrationForm campaign={campaign} />
          </div>

          <aside className={styles.aside}>
            <div className={styles.asideCard}>
              <dl className={styles.specs}>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>When</dt>
                  <dd className={styles.specValue}>
                    <SessionTime at={campaign.demo_datetime} />
                  </dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Course</dt>
                  <dd className={styles.specValue}>{campaign.course_name}</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Trainer</dt>
                  <dd className={styles.specValue}>{campaign.trainer_name}</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Format</dt>
                  <dd className={styles.specValue}>Live online, Google Meet</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Cost</dt>
                  <dd className={styles.specValue}>Free</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
