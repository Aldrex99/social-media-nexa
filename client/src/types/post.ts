export interface IPost {
  _id: string;
  user_id: string;
  user: {
    username: string;
    profilePictureLink: string;
  };
  content: string;
  imageLink?: string;
  createdAt: Date;
  updatedAt: Date;
  likeNumber: number;
  commentNumber: number;
  shareNumber: number;
}
