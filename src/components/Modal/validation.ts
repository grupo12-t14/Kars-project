import * as yup from "yup";

export const createAnnouncementSchema = yup.object({
  model: yup.string(),
  brand: yup.string(),
  year: yup.string(),
  fuelType: yup.number(),
  mileage: yup.string(),
  color: yup
    .string()
    .test(
      "is-string",
      "Insira somente caracteres",
      (value) => typeof value === "string"
    ),
  fipePrice: yup.number(),
  sellPrice: yup.string(),
  description: yup.string(),
  isActive: yup.boolean().default(true),
  coverImage: yup.string(),
});
const returnAnnouncementSchema = createAnnouncementSchema.concat(
  yup.object({
    id: yup.string(),
  })
);

export const updatableAnnouncementSchema = createAnnouncementSchema.partial();
export type CreateAnnouncementData = yup.InferType<
  typeof createAnnouncementSchema
>;
export type UpdatableAnnouncementData = yup.InferType<
  typeof updatableAnnouncementSchema
>;
