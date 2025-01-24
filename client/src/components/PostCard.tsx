import { useState } from "react";
import { IPost } from "@/types/post";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";
import DeletePostModal from "./modals/post/DeletePost";
import Button from "./buttons/Button";

type TPostCardProps = {
  post: IPost;
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
};

export default function PostCard({ post, posts, setPosts }: TPostCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useUser();

  return (
    <>
      {showDeleteModal && (
        <DeletePostModal
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          posts={posts}
          setPosts={setPosts}
          selectedPost={post}
        />
      )}
      <div className="mb-4 w-full rounded-lg bg-white p-4 shadow-md">
        {/* User par */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.user.profilePictureLink}
              alt={post.user.username}
              className="size-10 rounded-full object-cover"
            />
            <Link to={`/profile/${post.user_id}`} className="font-semibold">
              {post.user.username}
            </Link>
          </div>
          {user?.id === post.user_id && (
            <Button
              type="button"
              className="text-red-500"
              variant="none"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          )}
        </div>
        {/* Post content */}
        <div className="mt-4">
          <p>{post.content}</p>
        </div>
        {/* Post image */}
        {post.imageLink && (
          <div className="mt-4 flex justify-center">
            <img
              src={post.imageLink}
              alt={post.content}
              className="size-full rounded-lg"
            />
          </div>
        )}
        {/* Post actions count */}
        <div className="mt-4 flex justify-between text-gray-600">
          <span>{post.likeNumber} likes</span>
          <div>
            <span className="ml-4">{post.commentNumber} comments</span>
            <span className="ml-4">{post.shareNumber} shares</span>
          </div>
        </div>
        {/* Post actions */}
        <div className="mt-4 flex items-center justify-around space-x-4 text-gray-600">
          <button className="flex w-full items-center justify-center">
            <HeartIcon className="h-6 w-6" />
          </button>
          <button className="flex w-full items-center justify-center">
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          </button>
          <button className="flex w-full items-center justify-center">
            <ShareIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  );
}
