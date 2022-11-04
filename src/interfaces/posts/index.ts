export interface IPostRequest {
  content: string;
}

export interface IPostUpdate extends IPostRequest {
  id: string;
  comments: string[];
  createdAt: Date;
}
