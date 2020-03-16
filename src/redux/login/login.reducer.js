const INITIAL_STATE = {
  email: "",
  password: "",
  phone: ""
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        email: action.email,
        password: action.password,
        phone: action.phone
      };

    default:
      return state;
  }
};

export default loginReducer;
