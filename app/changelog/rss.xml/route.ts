import { releases } from "@/content/changelog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = releases
    .map((r, i) => {
      // same-day releases get descending minutes so readers keep their order
      const pub = new Date(Date.parse(`${r.date}T12:00:00Z`) - i * 60_000).toUTCString();
      const link = `${site.url}/changelog#${r.id}`;
      const body = `<p>${esc(r.summary)}</p><ul>${r.changes.map((c) => `<li><strong>${c.type}</strong>: ${esc(c.text)}</li>`).join("")}</ul>`;
      return `    <item>
      <title>${esc(r.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">ombak-${r.id}</guid>
      <pubDate>${pub}</pubDate>
      <description><![CDATA[${body}]]></description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ombak UI changelog</title>
    <link>${site.url}/changelog</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
    <atom:link href="${site.url}/changelog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
