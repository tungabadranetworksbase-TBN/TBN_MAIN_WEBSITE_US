"use client";

import Script from "next/script";

/**
 * Chatwoot live chat, pointed at the organisation's own instance.
 *
 * The snippet is the one Chatwoot generates for this inbox, unchanged. The
 * website token is not a secret - Chatwoot puts it in the page source of
 * every site that runs the widget, and it only identifies which inbox a
 * conversation lands in.
 *
 * Loaded through next/script in the root layout, so it is injected once
 * however the user navigates, and after the page is interactive rather than
 * competing with it.
 */
export default function Chatwoot() {
  return (
    <Script id="chatwoot" strategy="afterInteractive">
      {`
        (function (d, t) {
          var BASE_URL = "https://chat.tungabadranetworks.in";
          var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
          g.src = BASE_URL + "/packs/js/sdk.js";
          g.async = true;
          s.parentNode.insertBefore(g, s);
          g.onload = function () {
            window.chatwootSDK.run({
              websiteToken: "T83QomrAVgb2mZoggDKkPjzM",
              baseUrl: BASE_URL
            });
          };
        })(document, "script");
      `}
    </Script>
  );
}
