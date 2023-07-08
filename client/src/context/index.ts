import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: {
    isLoggedIn: false,
    email: "",
    firstName: "",
    lastName: "",
  },
});

export { userState };
