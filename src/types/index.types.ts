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

const processSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string()
})

export const ProcessPageSchema = BaseWPSchema.extend({
  acf: z.object({
    subtitle: z.string(),
  }).catchall(processSchema) // Valida todo lo que venga además de el subtitle con ese schema
})

export type NavigationState = { name: string; href: string }[]
