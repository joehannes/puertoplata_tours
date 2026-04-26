import { z } from 'zod';

export const tourSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  durationHours: z.number().max(6),
  price: z.object({ adult: z.number(), child: z.number() }),
  maxGroupSize: z.number(),
  images: z.array(z.string()),
  tags: z.array(z.string()),
  availability: z.boolean()
});

export const transferSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  capacity: z.number(),
  description: z.string()
});

export const appDataSchema = z.object({
  tours: z.array(tourSchema),
  customOptions: z.object({
    basePricePerHour: z.number(),
    maxHours: z.number(),
    options: z.array(z.object({ id: z.string(), label: z.string() }))
  }),
  transfers: z.array(transferSchema),
  settings: z.object({
    paypalEmail: z.string().optional(),
    whatsappNumber: z.string(),
    currency: z.string().default('USD')
  })
});
