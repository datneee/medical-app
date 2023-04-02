import { UserAuth } from "../../utils/constants/common";

const initState = {
  error: "",
  token: "",
  user: null,
  id: "",
  loading: false,
  success: false,
  message: "",
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case UserAuth.LOADING:
      return {
        ...state,
        loading: payload,
      };
    case UserAuth.SUCCESS:
      return {
        ...state,
        success: true,
      };
    case UserAuth.LOGIN:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };
    case UserAuth.REGISTER:
      return {
        ...state,
        message: payload,
      };
    case UserAuth.REGISTER:
      return {
        ...state,
        id: payload.id,
      };
    case UserAuth.LOG_OUT:
      return {
        error: "",
        token: "",
        user: "",
        id: "",
      };
    default:
      return state;
  }
};

export default reducer;
