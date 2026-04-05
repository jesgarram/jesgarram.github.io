import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    image: image().optional(),
    tags: z.array(z.string()).optional(),
    talkUrl: z.string().url().optional(),
  }),
});

export const collections = { blog };
