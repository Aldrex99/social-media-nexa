export interface IPost {
  _id: string;
  user_id: string;
  content: string;
  imageLink?: string;
  created_at: Date;
  updated_at: Date;
  likeNumber: number;
  commentNumber: number;
  shareNumber: number;
}
