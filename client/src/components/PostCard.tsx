import { IPost } from "@/types/post";

export default function PostCard({ post }: { post: IPost }) {
  return (
    <div className="mb-4 w-full rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">{post.user_id}</h2>
      <p className="text-gray-600">{post.content}</p>
    </div>
  );
}
