const INITIAL_STATE = {
  email: "",
  password1: "",
  password2: ""
};

const signUpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SIGNUP":
      return {
        ...state,
        email: action.email,
        password1: action.password1,
        password2: action.password2
      };

    default:
      return state;
  }
};

export default signUpReducer;
