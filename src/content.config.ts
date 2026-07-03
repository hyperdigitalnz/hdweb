// Content collections. Markdown posts live in src/content/insights/; the schema
// below validates every post's frontmatter at build time, so a typo'd date or a
// missing description fails the build instead of shipping.
//
// To publish a post: add src/content/insights/<slug>.md with the frontmatter
// fields below. The filename (minus .md) is the URL: /insights/<slug>. Set
// draft: true to keep a post out of the built site while you work on it.

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const insights = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/insights" }),
  schema: z.object({
    title: z.string().max(70, "Keep titles under 70 chars so they don't truncate in Google"),
    description: z.string().max(160, "Meta description: keep under 160 chars"),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Hyper Digital"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Optional hero image path under public/, e.g. "/img/insights/my-post.jpg".
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
  }),
});

export const collections = { insights };
