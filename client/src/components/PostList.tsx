import PostCard from "@components/PostCard";
import { IPost } from "@/types/post";

type TPostListProps = {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
};

export default function PostList({ posts, setPosts }: TPostListProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 w-full max-w-3xl">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            posts={posts}
            setPosts={setPosts}
          />
        ))}
      </div>
    </div>
  );
}
