import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    WEBAPP_URL: z.string().url(),
    AWS_S3_REGIONL: z.string().optional(),
    AWS_S3_ACCESS_KEY_ID: z.string(),
    AWS_S3_SECRET_KEY_ID: z.string(),
    AWS_S3_BUCKET_NAME: z.string(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    WEBAPP_URL: process.env.WEBAPP_URL,
    AWS_S3_REGIONL: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    AWS_S3_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_KEY_ID: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY_ID,
    AWS_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
  },
});
