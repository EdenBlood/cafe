import { z } from "astro:content";

const contentRenderedSchema = z.object({
  rendered: z.string()
})

const imageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

const featuredImagesSchema = z.object({
  thumbnail: imageSchema,
  medium: imageSchema,
  medium_large: imageSchema,
  large: imageSchema,
  full: imageSchema,
})

export const BaseWPSchema = z.object({
  id: z.number(),
  title: contentRenderedSchema,
  content: contentRenderedSchema,
  acf: z.object({
    subtitle: z.string()
  }),
  featured_images: featuredImagesSchema,
})

export type NavigationState = { name: string; href: string }[]
