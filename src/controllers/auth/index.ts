import { ctrlWrapper } from "../../helpers";

import register from "./register";
import login from "./login";
import logout from "./logout";
import getCurrent from "./current";
import resendSMTP from "./resendSMTP";
import confirmSMTP from "./confirmSMTP";

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  resendSMTP: ctrlWrapper(resendSMTP),
  confirmSMTP: ctrlWrapper(confirmSMTP),
};
