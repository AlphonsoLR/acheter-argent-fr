import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actualites' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    sourceUrl: z.string().optional(),
  }),
});

export const collections = { actualites };
