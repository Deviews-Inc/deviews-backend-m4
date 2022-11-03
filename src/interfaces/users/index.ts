export interface IUserResponse extends IUserRequest {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
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
