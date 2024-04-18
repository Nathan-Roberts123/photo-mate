import { serverPost } from "@/lib/types";
import PostCard from "./post-card";
import { env } from "@/lib/env";

const getPosts = async () => {
  try {
    const res = await fetch(`${env.WEBAPP_URL}/api/posts`, {
      next: { revalidate: 3600 },
    });

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const PostsList = async () => {
  const { data } = await getPosts();

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data!.map((post: serverPost) => {
          return (
            <div key={post.id}>
              <PostCard {...post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostsList;
