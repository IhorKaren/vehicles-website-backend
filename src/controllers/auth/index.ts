import { ctrlWrapper } from "../../helpers";

import register from "./register";
import login from "./login";
import logout from "./logout";
import getCurrent from "./current";

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
