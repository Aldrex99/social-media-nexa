import { useEffect, useState } from "react";
import CreatePostModal from "@/components/modals/post/CreatePostModal";
import PostList from "@/components/PostList";
import Button from "@/components/buttons/Button";

export default function Post() {
  const [showCreateModal, setShowCreateModal] = useState(true);

  useEffect(() => {
    document.title = "Social Nexa | Post";
  }, []);

  return (
    <>
      {showCreateModal && (
        <CreatePostModal open={showCreateModal} setOpen={setShowCreateModal} />
      )}
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center p-2">
          <h1 className="flex-1 py-2 pl-2 text-2xl font-semibold text-blue-500">
            Posts de la communauté
          </h1>
          <Button type="button" onClick={() => setShowCreateModal(true)}>
            Nouveau post
          </Button>
        </div>
        <PostList />
      </div>
    </>
  );
}
