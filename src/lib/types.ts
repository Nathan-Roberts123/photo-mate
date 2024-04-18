import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const postSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file: File) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  title: z.string(),
  content: z.string(),
});

export type post = z.infer<typeof postSchema>;

export const mySchema = z.string();

export type serverPost = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  image: string;
  imageUrl?: string;
};
