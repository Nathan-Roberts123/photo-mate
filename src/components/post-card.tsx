import Image from "next/image";
import { serverPost } from "@/lib/types";

const PostCard = ({ imageUrl, title, content }: serverPost) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative h-52 w-full">
        <Image
          className="rounded-t-lg w-full h-full object-cover"
          src={imageUrl!}
          alt="post image"
          priority={true}
          sizes="100%"
          fill
        />
      </div>

      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-5 overflow-y-hidden">
          {content}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
