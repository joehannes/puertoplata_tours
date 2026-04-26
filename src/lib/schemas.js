import { z } from 'zod';

export const tourSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  durationHours: z.number().max(6),
  price: z.object({ adult: z.number(), child: z.number() }),
  maxGroupSize: z.number(),
  images: z.array(z.string()).min(1),
  tags: z.array(z.string()),
  itinerary: z.array(z.string()).default([]),
  includes: z.array(z.string()).default([]),
  notes: z.array(z.string()).default([]),
  availability: z.boolean()
});

export const transferSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  capacity: z.number(),
  description: z.string(),
  durationMinutes: z.number().optional(),
  availability: z.boolean().default(true)
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
    currency: z.string().default('USD'),
    guideName: z.string().default('José'),
    guideYears: z.number().default(12),
    guideBio: z.string().default('Local licensed guide from Puerto Plata')
  })
});
