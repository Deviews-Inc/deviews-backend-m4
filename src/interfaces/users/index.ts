export interface IUserResponse extends IUserRequest {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  bio: string;
  //comments: Comments[];
  email: string;
  //fireComments: FireComments[];
  //firePosts: FirePosts[];
  id: string;
  isActive: boolean;
  name: string;
  //posts: Posts[];
  profilePicture: string;
  //techs: Techs[];
  username: string;
}

export interface IUserDecoded {
  id: string;
  isAdm: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
  profilePicture?: string;
  id?: string;
  isActive?: boolean;
  userId: string
}

export interface IUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
  users_techs_id: string;
}
