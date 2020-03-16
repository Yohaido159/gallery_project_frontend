import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import loginReducer from "./login/login.reducer";
import signUpReducer from "./signup/signup.reducer";
import galleriesReducer from "./gallery-main/gallery-main.reducer";


export default combineReducers({
  user: userReducer,
  login: loginReducer,
  signup: signUpReducer,
  galleries: galleriesReducer,
});

 