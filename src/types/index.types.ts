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

// Gallery schemas

const galleryImage = z.object({
  large: imageSchema,
  full: imageSchema,
})

const galleryImagesSchema = z.array(galleryImage);

export const GalleryPageSchema = BaseWPSchema.extend({
  gallery: galleryImagesSchema,
})

export type Gallery = z.infer<typeof galleryImage>;

// Process schemas
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

// Menu schemas
const MenuItemSchema = BaseWPSchema.pick({
  title: true,
  featured_images: true
}).extend({
  acf: z.object({
    description: z.string(),
    price: z.coerce.number() // coerce intenta convertir un string a un number y si no puede, retorna un error;
  })
})

export const MenuItemsSchema = z.array(MenuItemSchema);


// Contacto Schema

const markerSchema = z.object({
  label: z.string(),
  lat: z.number(),
  lng: z.number(),
})

const locationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  zoom: z.number(),
  markers: z.array(markerSchema)
})

export const ContactPageSchema = BaseWPSchema.extend({
  acf: z.object({
    subtitle: z.string()
  }).catchall(locationSchema)
});

// Types

export type PostData = z.infer<typeof PostSchema>
export type Category = z.infer<typeof categorySchema>
export type NavigationState = { name: string; href: string }[]

export type FeaturedImages= z.infer<typeof featuredImagesSchema>;
export type Location = z.infer<typeof locationSchema>;
