import { useEffect, useState } from "react";
import CreatePostModal from "@/components/modals/post/CreatePost";
import PostList from "@/components/PostList";
import Button from "@/components/buttons/Button";
import { IPost } from "@/types/post";
import { fetcher } from "@/utils/fetch";

export default function Post() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    document.title = "Social Nexa | Posts";
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetcher("/posts", {
          method: "GET",
        });
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {showCreateModal && (
        <CreatePostModal
          open={showCreateModal}
          setOpen={setShowCreateModal}
          posts={posts}
          setPosts={setPosts}
        />
      )}
      <div className="flex flex-col">
        <div className="flex items-center p-2">
          <h1 className="flex-1 py-2 pl-2 text-2xl font-semibold text-blue-500">
            Posts de la communauté
          </h1>
          <Button type="button" onClick={() => setShowCreateModal(true)}>
            Nouveau post
          </Button>
        </div>
        <PostList posts={posts} setPosts={setPosts} />
      </div>
    </>
  );
}
