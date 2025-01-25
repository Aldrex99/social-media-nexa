import { useState } from "react";
import { fetcher } from "@utils/fetch";
import { DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BaseModal from "@components/modals/BaseModal";
import Button from "@components/buttons/Button";
import { IPost, IComment } from "@/types/post";

type TDeleteCommentModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  comment: IComment;
  comments: IComment[];
  setComments: (comments: IComment[]) => void;
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
};

export default function DeleteCommentModal({
  open,
  setOpen,
  comment,
  comments,
  setComments,
  posts,
  setPosts,
}: TDeleteCommentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await fetcher(`/interactions/comment`, {
        method: "DELETE",
        body: JSON.stringify({ comment_id: comment._id }),
      });

      const updatedComments = comments.filter((c) => c._id !== comment._id);
      setComments(updatedComments);

      const updatedPosts = posts.map((p) => {
        if (p._id === comment.post_id) {
          return { ...p, commentsCount: p.commentsCount - 1 };
        }
        return p;
      });
      setPosts(updatedPosts);

      setOpen(false);
    } catch (error) {
      setError((error as Error).message ?? "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <BaseModal open={open} setOpen={setOpen}>
      <div className="flex flex-col space-y-6">
        <DialogTitle
          as="h3"
          className="text-center text-base font-semibold text-gray-900"
        >
          Êtes-vous sûr de vouloir supprimer ce commentaire ?
        </DialogTitle>
        {error && (
          <div className="rounded-md bg-red-100 px-4 py-2 text-red-500">
            {error}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-3">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-md border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          variant="none"
        >
          {loading ? (
            "Chargement..."
          ) : (
            <span className="flex items-center justify-center">
              <XMarkIcon className="mr-2 h-5 w-5" />
              Supprimer
            </span>
          )}
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          className="w-full rounded-md"
          variant="primaryFlat"
        >
          Annuler
        </Button>
      </div>
    </BaseModal>
  );
}
