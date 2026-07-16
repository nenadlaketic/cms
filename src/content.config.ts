import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    naslov: z.string(),
    datum: z.coerce.date(),
    opis: z.string(),
    kategorija: z.enum(['Saveti', 'Estetika', 'Ortodoncija', 'Implantologija']),
    vreme: z.string(),
    slika: z.string().optional(),
  }),
});

const usluge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/usluge' }),
  schema: z.object({
    naziv: z.string(),
    broj: z.string(),
    opis: z.string(),
    stavke: z.array(z.string()),
  }),
});

const cenovnik = defineCollection({
  loader: file('./src/content/cenovnik/cene.json'),
  schema: z.array(z.object({
    naziv: z.string(),
    redosled: z.number(),
    stavke: z.array(z.object({
      naziv: z.string(),
      cena: z.string(),
      opis: z.string().optional().default(''),
    })),
  })),
});

export const collections = { blog, usluge, cenovnik };
