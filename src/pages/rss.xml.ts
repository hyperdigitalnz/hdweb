// RSS feed for /insights. Hand-rolled (no @astrojs/rss dependency) because the
// feed is a flat list of markdown posts: title, link, description, pubDate.
// Prerendered at build time like the rest of the site.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../consts";

const SITE_URL = "https://hyperdigital.nz";

// Minimal XML escaping. Post titles/descriptions are our own copy, but an
// unescaped ampersand still breaks the feed for every reader.
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const GET: APIRoute = async () => {
  const posts = (await getCollection("insights", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const items = posts
    .map(
      (post) => `    <item>
      <title>${esc(post.data.title)}</title>
      <link>${SITE_URL}/insights/${post.id}/</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${post.id}/</guid>
      <description>${esc(post.data.description)}</description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} Insights</title>
    <link>${SITE_URL}/insights/</link>
    <description>Straight-talking marketing advice for NZ tradies: Google Ads, websites, SEO and automation.</description>
    <language>en-nz</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
