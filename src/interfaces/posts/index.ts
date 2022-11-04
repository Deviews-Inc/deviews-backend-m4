export interface IPostRequest {
  content: string;
  image?: string;
}

export interface IPostUpdate extends IPostRequest {
  id: string;
  comments: string[];
  createdAt: Date;
}
