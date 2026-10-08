/**
 * Slack notifications, via an incoming webhook.
 *
 * Used by the contact, consultation and demo forms so a lead or a
 * consultation request is seen the same day, rather than whenever somebody next opens
 * Chatwoot.
 *
 * Configure `SLACK_WEBHOOK_URL` in .env.local, and in Vercel under Project
 * Settings -> Environment Variables. It is a secret: anyone holding it can
 * post to the channel. With it unset this is a no-op, so local development
 * and any environment without Slack keeps working.
 *
 * An incoming webhook posts to exactly one channel, fixed when the webhook is
 * created. Moving channels means generating a new URL, not editing this file.
 */

/** Slack truncates hard; keep a message readable rather than complete. */
const MAX_LINE = 400;

/**
 * Posts one notification. Resolves either way.
 *
 * Never throws and never reports failure to the caller. Slack is a
 * convenience and Chatwoot is the system of record, so a Slack outage must
 * not turn a working form into an error for the person who filled it in.
 * Failures are logged instead, the same way the contact route logs a refusal
 * from Chatwoot.
 *
 * @param summary One line, used as the notification text on a locked phone.
 * @param lines   Body lines. Empty and nullish entries are dropped, so a
 *                caller can pass optional fields without filtering first.
 */
export async function notifySlack(summary: string, lines: (string | null | undefined)[]) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;

  const body = lines
    .filter((l): l is string => Boolean(l && l.trim()))
    .map((l) => (l.length > MAX_LINE ? `${l.slice(0, MAX_LINE)}…` : l))
    .join("\n");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // `text` is what Slack shows in the notification list and on a phone;
        // `blocks` replaces it in the channel itself. Both are needed.
        text: summary,
        blocks: [
          { type: "section", text: { type: "mrkdwn", text: `*${summary}*` } },
          ...(body ? [{ type: "section", text: { type: "mrkdwn", text: body } }] : []),
        ],
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[slack] notify failed", { status: res.status, body: detail.slice(0, 200) });
    }
  } catch (err) {
    // Network error or timeout. Logged rather than surfaced, for the reason
    // in the doc comment above.
    console.error("[slack] notify unreachable", {
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    });
  }
}

/** Slack mrkdwn treats these three characters as markup. */
export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
