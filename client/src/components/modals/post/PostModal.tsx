import { IPost, IComment } from "@/types/post";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";
import { fetcher } from "@/utils/fetch";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import PostLike from "@components/modals/post/PostLike";
import DeletePostModal from "@components/modals/post/DeletePost";
import DeleteCommentModal from "@components/modals/post/DeleteComment";
import Button from "@components/buttons/Button";
import TextInput from "@/components/inputs/TextInput";

type TPostModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  post: IPost;
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
};

export default function PostModal({
  open,
  setOpen,
  post,
  posts,
  setPosts,
}: TPostModalProps) {
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetcher(`/interactions/comments/${post._id}`);
      if (response) {
        setComments(response);
      }
    };

    if (open) {
      fetchComments();
    }
  }, [open, post._id]);

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

  const handleSubmitComment = async () => {
    const response = await fetcher(`/interactions/comment`, {
      method: "POST",
      body: JSON.stringify({ post_id: post._id, content: newComment }),
    });

    if (response) {
      response.user = {
        _id: user?.id,
        username: user?.username,
        profilePictureLink: user?.profilePictureLink,
      };

      const updatedPosts = posts.map((p) => {
        if (p._id === post._id) {
          return { ...p, commentsCount: p.commentsCount + 1 };
        }
        return p;
      });

      setPosts(updatedPosts);
      setComments([...comments, response]);
      setNewComment("");
    }
  };

  return (
    <>
      {showDeletePostModal && (
        <DeletePostModal
          open={showDeletePostModal}
          setOpen={setShowDeletePostModal}
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
      $
      {showDeleteCommentModal && (
        <DeleteCommentModal
          open={showDeleteCommentModal}
          setOpen={setShowDeleteCommentModal}
          comments={comments}
          setComments={setComments}
          comment={selectedComment as IComment}
          posts={posts}
          setPosts={setPosts}
        />
      )}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center">
            <DialogPanel
              transition
              className="relative flex w-full max-w-5xl transform flex-col space-y-6 overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-6 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {/* User par */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.user.profilePictureLink}
                    alt={post.user.username}
                    className="size-10 rounded-full object-cover"
                  />
                  <Link
                    to={`/profile/${post.user._id}`}
                    className="font-semibold"
                  >
                    {post.user.username}
                  </Link>
                </div>
                {user?.id === post.user._id && (
                  <Button
                    type="button"
                    className="text-red-500"
                    variant="none"
                    onClick={() => setShowDeletePostModal(true)}
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
              <div className="mt-4 flex justify-between px-4 text-gray-600">
                <div className="flex items-center space-x-3">
                  {post.userLiked ? (
                    <button
                      className="flex items-center justify-center"
                      onClick={handleUnlike}
                    >
                      <SolidHeart className="h-6 w-6 text-red-500" />
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center"
                      onClick={handleLike}
                    >
                      <OutlineHeart className="h-6 w-6" />
                    </button>
                  )}
                  <span
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => setShowLikesModal(true)}
                  >
                    {post.likesCount} likes
                  </span>
                </div>
                <span className="cursor-pointer hover:text-blue-500">
                  {post.commentsCount} comments
                </span>
              </div>
              {/* Comments */}
              <div className="mt-4 space-y-4">
                {/* New comment */}
                <div className="flex items-center justify-center space-x-3">
                  <TextInput
                    type="text"
                    label="Ajouter un commentaire"
                    placeholder="Super post !"
                    className="w-full"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button type="button" onClick={handleSubmitComment}>
                    Commenter
                  </Button>
                </div>
                <div className="flex max-h-80 flex-col space-y-5 overflow-y-scroll">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex flex-1 items-center space-x-3">
                        <img
                          src={comment.user.profilePictureLink}
                          alt={comment.user.username}
                          className="size-8 rounded-full object-cover"
                        />
                        <div>
                          <Link to={`/profile/${comment.user._id}`}>
                            {comment.user.username}
                          </Link>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                      {user?.id === comment.user._id && (
                        <Button
                          type="button"
                          className="text-red-500"
                          variant="none"
                          onClick={() => {
                            setShowDeleteCommentModal(true);
                            setSelectedComment(comment);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
