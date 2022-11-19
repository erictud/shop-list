import { atom } from "recoil";

const initialState: string = "lidl";

export const listState = atom({
  key: "lisState",
  default: initialState,
});
