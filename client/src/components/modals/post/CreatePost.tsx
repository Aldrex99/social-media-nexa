import { useState } from "react";
import { useUser } from "@hooks/useUser";
import { fetcher } from "@utils/fetch";
import { DialogTitle } from "@headlessui/react";
import {
  CheckIcon,
  XMarkIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import BaseModal from "@components/modals/BaseModal";
import TextInput from "@components/inputs/TextInput";
import Button from "@components/buttons/Button";
import { IPost } from "@/types/post";

type TCreatePostModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
};

export default function CreatePostModal({
  open,
  setOpen,
  posts,
  setPosts,
}: TCreatePostModalProps) {
  const [content, setContent] = useState("");
  const [showImageLinkInput, setShowImageLinkInput] = useState(false);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useUser();

  const handleDeleteImageLink = () => {
    setImageLink("");
    setShowImageLinkInput(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    if (!content) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      const newPost: IPost = await fetcher("/posts", {
        method: "POST",
        body: JSON.stringify({
          content,
          imageLink: imageLink ?? "",
        }),
      });

      newPost.user = {
        _id: user?.id ?? "",
        username: user?.username ?? "",
        profilePictureLink: user?.profilePictureLink ?? "",
      };

      const orderPostsByCreationDate = [newPost, ...posts];

      orderPostsByCreationDate.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
      });

      setPosts(orderPostsByCreationDate);

      setContent("");
      setImageLink(null);
      setOpen(false);
    } catch (error) {
      setError((error as Error).message ?? "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setImageLink(null);
    setOpen(false);
  };

  return (
    <BaseModal open={open} setOpen={setOpen}>
      <div>
        <div className="flex flex-col space-y-6">
          <DialogTitle
            as="h3"
            className="text-center text-base font-semibold text-gray-900"
          >
            Créer un post
          </DialogTitle>
          <div className="flex flex-col items-center space-y-4">
            <TextInput
              label="Contenu"
              type="text"
              placeholder="Contenu du post"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full"
            />
            {showImageLinkInput ? (
              <div className="flex w-full items-center space-x-2">
                <TextInput
                  label="Lien de l'image"
                  type="text"
                  placeholder="Lien de l'image"
                  value={imageLink ?? ""}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleDeleteImageLink}
                  className="px-0 py-0 text-red-500 hover:text-red-600"
                  variant="none"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                onClick={() => setShowImageLinkInput(true)}
                variant="primaryFlat"
                className="m-1 border-none px-0 py-0 hover:bg-transparent hover:text-blue-700"
              >
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                Ajouter une image
              </Button>
            )}
            {imageLink && (
              <img
                src={imageLink}
                alt="Post"
                className="h-80 w-80 rounded-md"
              />
            )}
          </div>
        </div>
        {error && (
          <div className="rounded-md bg-red-100 px-4 py-2 text-red-500">
            {error}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <Button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          variant="primary"
          className="w-full"
        >
          {loading ? (
            "Chargement..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              <CheckIcon className="h-5 w-5" />
              Poster
            </span>
          )}
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          variant="primaryFlat"
          className="w-full"
        >
          Annuler
        </Button>
      </div>
    </BaseModal>
  );
}
