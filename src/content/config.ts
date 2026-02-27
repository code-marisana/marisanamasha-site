import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    status: z.enum(["planned", "active", "completed"]),
    featured: z.boolean().default(false),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    role: z.string().optional(),
    institution: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url()
        })
      )
      .default([])
  })
});

const authorSchema = z.object({
  given: z.string(),
  family: z.string(),
  affiliations: z.array(z.number().int().min(1)).default([])
});

const publicationType = z.enum([
  "journal-article",
  "conference-paper",
  "conference-poster",
  "book-chapter",
  "law-review-article",
  "case-comment",
  "policy-brief"
]);

const urlOrPath = z
  .string()
  .refine((value) => value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/"), {
    message: "Value must be an absolute URL or an internal path starting with /"
  });

const publications = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    authors: z.array(authorSchema).min(1),
    journal: z.string(),
    year: z.number().int().min(1900).max(2100),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    doi: z.string().optional(),
    abstract: z.string(),
    keywords: z.array(z.string()).default([]),
    type: publicationType,
    fields: z.array(z.enum(["engineering", "science", "legal"])).min(1),
    url: urlOrPath.optional(),
    eventName: z.string().optional(),
    location: z.string().optional(),
    affiliations: z.array(z.string()).default([])
  }).strict()
});

export const collections = {
  blog,
  projects,
  publications
};
