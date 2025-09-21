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
  featured_images: featuredImagesSchema,
  slug: z.string(),
  acf: z.object({
    subtitle: z.string()
  }),
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

// Post - Blog schemas
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
})

const categoriesSchema = z.array(categorySchema)
export const CategoriesSlugSchema = z.array(categorySchema.pick({slug:true}))

export const PostSchema = BaseWPSchema.pick({
  id: true,
  title: true,
  content: true,
  featured_images: true,
  slug:true,
}).extend({
  date: z.string(),
  // updated_date:
  category_details: categoriesSchema
})

export const PostsSchema = z.array(PostSchema)

export type PostData = z.infer<typeof PostSchema>
export type Category = z.infer<typeof categorySchema>
// Types
export type NavigationState = { name: string; href: string }[]
