import BaseModal from "@components/modals/BaseModal";
import { fetcher } from "@/utils/fetch";
import { ILike, IPost } from "@/types/post";
import { DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";

type TPostLikeProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  post: IPost;
};

export default function PostLike({ open, setOpen, post }: TPostLikeProps) {
  const [likes, setLikes] = useState<ILike[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetcher(`/interactions/likes/${post._id}`);

      if (response) {
        setLikes(response);
      }
    };

    if (open) {
      fetchLikes();
    }
  }, [open, post._id]);

  return (
    <BaseModal open={open} setOpen={setOpen}>
      <div className="relative flex max-h-96 min-h-96 flex-col space-y-6">
        <DialogTitle
          as="h3"
          className="text-center text-base font-semibold text-gray-900"
        >
          Likes
        </DialogTitle>
        <div className="flex flex-col space-y-6 overflow-y-auto">
          {likes.map((like) => (
            <div key={like._id} className="flex items-center space-x-4">
              <img
                src={like.user.profilePictureLink}
                alt={`${like.user.username}'s profile picture`}
                className="h-10 w-10 rounded-full object-cover"
              />
              <p>{like.user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}
