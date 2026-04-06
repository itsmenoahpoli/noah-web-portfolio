import { z } from "zod";

/** Accepts comma-separated string or string[] from the dashboard. */
const tagsField = z.preprocess((val: unknown) => {
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === "string") {
    return val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}, z.array(z.string()));

const optionalImage = z
  .union([z.string(), z.literal(""), z.null()])
  .optional()
  .transform((v) => {
    if (v === undefined || v === null || v === "") return null;
    const t = v.trim();
    return t.length ? t : null;
  });

const optionalPublishedAt = z.preprocess((val: unknown) => {
  if (val === undefined || val === null || val === "") return undefined;
  const d = val instanceof Date ? val : new Date(String(val));
  return Number.isNaN(d.getTime()) ? undefined : d;
}, z.date().optional());

export const projectBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  image: z.string().trim().min(1, "Image is required"),
  technologies: z.string().trim().min(1, "Technologies are required"),
  githubUrl: z.string().trim().min(1, "GitHub URL is required"),
  liveUrl: z.string().trim().min(1, "Live URL is required"),
});

export const blogBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  description: z.string().trim().min(1, "Description is required"),
  content: z.string().trim().min(1, "Content is required"),
  author: z.string().trim().min(1, "Author is required"),
  tags: tagsField,
  image: optionalImage,
  publishedAt: optionalPublishedAt,
});

export const experienceBodySchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  position: z.string().trim().min(1, "Position is required"),
  location: z.string().trim().min(1, "Location is required"),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z
    .string()
    .optional()
    .transform((v) => {
      const t = v?.trim();
      return t ? t : null;
    }),
  description: z.string().trim().min(1, "Description is required"),
});
