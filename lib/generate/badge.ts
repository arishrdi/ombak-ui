import { site } from "@/lib/site";

/** Marks the badge so it is never added twice and is easy to find in the code. */
const MARK = "data-ombak-badge";

/**
 * The "Made with Ombak" pill added to pages generated on the free plan.
 * Inline styles with `all: initial` keep the generated page's CSS from restyling it.
 */
const BADGE = `<a ${MARK} href="${site.url}/generate?ref=badge" target="_blank" rel="noopener" style="all:initial;position:fixed;right:12px;bottom:12px;z-index:2147483647;display:inline-flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;background:rgba(9,13,19,.86);color:#f2f6f8;font:500 12px/1 system-ui,-apple-system,'Segoe UI',sans-serif;letter-spacing:.01em;box-shadow:0 0 0 1px rgba(255,255,255,.12),0 8px 24px rgba(0,0,0,.28);cursor:pointer;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)"><span style="all:initial;display:inline-block;width:7px;height:7px;border-radius:999px;background:#3ee6c1;box-shadow:0 0 8px #3ee6c1"></span>Made with Ombak</a>`;

export function addBadge(html: string) {
  if (!html || html.includes(MARK)) return html;
  const i = html.toLowerCase().lastIndexOf("</body>");
  return i >= 0 ? `${html.slice(0, i)}${BADGE}\n${html.slice(i)}` : `${html}\n${BADGE}`;
}
