import { atom } from "recoil";

type User = {
  uid: string;
  email: string;
  username: string;
};

export const authState = atom({
  key: "authState",
  default: {
    uid: "",
    email: "",
    username: "",
  },
});
