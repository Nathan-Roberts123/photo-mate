import { postSchema } from "@/lib/types";
import prisma from "@/lib/db";
import { uploadFileToS3 } from "@/lib/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";
import { s3Client } from "@/lib/s3";
import { serverPost } from "@/lib/types";

export async function POST(request: Request) {
  try {
    let data: any = {};
    const formData = await request.formData();
    formData.forEach((value, key) => (data[key] = value));

    const { image, title, content } = postSchema.parse(data);

    const fileKey = await uploadFileToS3(image);

    const post = await prisma.post.create({
      data: {
        title: title,
        image: fileKey,
        content: content,
      },
    });

    return Response.json({ post }, { status: 200 });
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const posts: serverPost[] = await prisma.post.findMany();

    for (const post of posts) {
      const getObjectParams = {
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: post.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      post.imageUrl = url;
    }

    return Response.json({ data: posts }, { status: 200 });
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}
