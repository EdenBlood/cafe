import { z } from "astro:content";

const ContentRendered = z.object({
  rendered: z.string()
})

export const BaseWPSchema = z.object({
  id: z.number(),
  title: ContentRendered,
  content: ContentRendered,
  acf: z.object({
    subtitle: z.string()
  })
})

export type NavigationState = { name: string; href: string }[]
