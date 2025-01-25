export interface IPost {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePictureLink: string;
  };
  content: string;
  imageLink?: string;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  commentsCount: number;
  userLiked: boolean;
  userCommented: boolean;
}

export interface ILike {
  _id: string;
  user: {
    _id: string;
    username?: string;
    profilePictureLink?: string;
  };
  post_id: string;
  createdAt: Date;
  updatedAt: Date;
}
