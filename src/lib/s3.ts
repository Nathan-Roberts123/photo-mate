import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";
import { S3Client, S3ClientConfigType } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { promisify } from "util";

const s3ClientConfig: S3ClientConfigType = {
  region: env.AWS_S3_REGIONL,
  credentials: {
    accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_S3_SECRET_KEY_ID,
  },
};

export const s3Client = new S3Client(s3ClientConfig);

export async function uploadFileToS3(file: File) {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const randomBytes = promisify(crypto.randomBytes);
  const rawBytes = await randomBytes(16);
  const fileKey = rawBytes.toString("hex");

  // const imageExtension = file.type.replace("image/", "");
  // const imageName = `${rawBytes.toString("hex")}.${imageExtension}`;

  const params = {
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileKey;
}
