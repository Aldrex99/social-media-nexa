import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetcher } from "@utils/fetch";
import { useUser } from "@/hooks/useUser";
import PostCard from "@components/PostCard";
import { IPost } from "@/types/post";

export default function PostList() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Social Nexa | Posts";
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetcher("/post");
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 w-full max-w-2xl">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
