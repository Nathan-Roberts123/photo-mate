import { serverPost } from "@/lib/types";
import PostCard from "./post-card";
import { env } from "@/lib/env";

const getPosts = async () => {
  try {
    const res = await fetch(`${env.WEBAPP_URL}/api/posts`, {
      next: { revalidate: 0 },
    });

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const PostsList = async () => {
  const { data }: { data: serverPost[] } = await getPosts();

  return (
    <>
      {!!data.length ? (
        <div className="flex justify-center">
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((post: serverPost) => {
              return (
                <div className="flex justify-center w-full" key={post.id}>
                  <PostCard {...post} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex h-full justify-center items-center">
          <span>Now Posts Available</span>
        </div>
      )}
    </>
  );
};

export default PostsList;
