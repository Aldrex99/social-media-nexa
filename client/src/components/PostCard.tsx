import { useState } from "react";
import { IPost } from "@/types/post";
import { fetcher } from "@/utils/fetch";
import {
  HeartIcon as OutlineHeart,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";
import PostLike from "@components/modals/post/PostLike";
import DeletePostModal from "@components/modals/post/DeletePost";
import Button from "@components/buttons/Button";

type TPostCardProps = {
  post: IPost;
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
};

export default function PostCard({ post, posts, setPosts }: TPostCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const { user } = useUser();

  const handleLike = async () => {
    const response = await fetcher(`/interactions/like`, {
      method: "POST",
      body: JSON.stringify({ post_id: post._id }),
    });

    if (response) {
      const updatedPosts = posts.map((p) => {
        if (p._id === post._id) {
          return { ...p, likesCount: p.likesCount + 1, userLiked: true };
        }
        return p;
      });
      setPosts(updatedPosts);
    }
  };

  const handleUnlike = async () => {
    const response = await fetcher(`/interactions/dislike`, {
      method: "DELETE",
      body: JSON.stringify({ post_id: post._id }),
    });

    if (response) {
      const updatedPosts = posts.map((p) => {
        if (p._id === post._id) {
          return { ...p, likesCount: p.likesCount - 1, userLiked: false };
        }
        return p;
      });
      setPosts(updatedPosts);
    }
  };

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
      {showLikesModal && (
        <PostLike
          open={showLikesModal}
          setOpen={setShowLikesModal}
          post={post}
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
            <Link to={`/profile/${post.user._id}`} className="font-semibold">
              {post.user.username}
            </Link>
          </div>
          {user?.id === post.user._id && (
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
          <span
            className="cursor-pointer hover:text-red-500"
            onClick={() => setShowLikesModal(true)}
          >
            {post.likesCount} likes
          </span>
          <span className="cursor-pointer hover:text-blue-500">
            {post.commentsCount} comments
          </span>
        </div>
        {/* Post actions */}
        <div className="mt-4 flex items-center justify-around space-x-4 text-gray-600">
          {post.userLiked ? (
            <button
              className="flex w-full items-center justify-center"
              onClick={handleUnlike}
            >
              <SolidHeart className="h-6 w-6 text-red-500" />
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-center"
              onClick={handleLike}
            >
              <OutlineHeart className="h-6 w-6" />
            </button>
          )}
          <button className="flex w-full items-center justify-center">
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  );
}
