import {
  IUserLogin,
  IUserRequest,
  IUserUpdate,
} from "../../../interfaces/users";

export const mockedUser: IUserRequest = {
  name: "Stitch",
  username: "stitch",
  email: "stitch@user.com",
  password: "1234",
  bio: "Stitch dev",
  profile_picture:
    "https://i.pinimg.com/originals/2f/e1/ba/2fe1ba81feb387b9653e72a1fee11104.png",
  techs: [],
};

export const mockedUserLogin: IUserLogin = {
  email: "stitch@user.com",
  password: "1234",
};

export const mockedUserLoginInvalid: IUserLogin = {
  email: "stitch@user.com.br",
  password: "1234",
};

export const mockedUserUpdate: IUserUpdate = {
  name: "Stitch 2",
};
