import { z } from "zod";

export const createAnnouncementSchema = z.object({
  model: z.string(),
  brand: z.string(),
  year: z.string(),
  fuelType: z.number(),
  mileage: z.string(),
  color: z.string(),
  fipePrice: z.number(),
  sellPrice: z.string(),
  description: z.string(),
  coverImage: z.string(),
});

export type CreateAnnouncementData = z.infer<typeof createAnnouncementSchema>;
