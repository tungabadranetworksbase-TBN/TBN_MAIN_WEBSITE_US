"use client";

import Script from "next/script";

/**
 * Loads the Cal.com embed once, for the whole site.
 *
 * Booking used to open a new tab. With this loaded, any element carrying
 * `data-cal-link` opens the booking flow in a modal over the page instead,
 * and Cal calls preventDefault on the click itself.
 *
 * The buttons keep their real `href`, so this is an enhancement rather than a
 * dependency: if the script fails, or JavaScript is off, or someone clicks
 * before it has loaded, the link still goes to the booking page. That is also
 * why the anchors are not buttons - a crawler should still see the link.
 *
 * Loaded through next/script in the root layout, which guarantees it is only
 * injected once however the user navigates.
 */
export default function CalEmbed() {
  return (
    <Script id="cal-embed" strategy="afterInteractive">
      {`
        (function (C, A, L) {
          let p = function (a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () { p(api, arguments); };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === "string") {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else {
                p(cal, ar);
              }
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");

        Cal("init", { origin: "https://cal.com" });
        Cal("ui", {
          theme: "dark",
          cssVarsPerTheme: { dark: { "cal-brand": "#fcc000" } },
          hideEventTypeDetails: false,
          layout: "month_view"
        });

        // Cal's own click handler opens the modal but never calls
        // preventDefault - which is why their docs use a <button>. These are
        // real anchors, so without this the browser follows the href at the
        // same time and the modal is never seen. If the modal has not
        // appeared shortly after the click, the href is used after all, so a
        // failed embed still books.
        document.addEventListener("click", function (e) {
          var a = e.target && e.target.closest ? e.target.closest("a[data-cal-link]") : null;
          if (!a || !window.Cal) return;
          e.preventDefault();
          var href = a.getAttribute("href");
          if (!href) return;
          setTimeout(function () {
            if (!document.querySelector("cal-modal-box")) window.location.href = href;
          }, 2500);
        });
      `}
    </Script>
  );
}
