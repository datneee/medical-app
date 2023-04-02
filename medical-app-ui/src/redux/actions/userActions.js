import { UserAuth, paths } from "../../utils/constants/common";
import AuthServices from "../../utils/httpsRequests/AuthServices";

const authLoginAction = (payload) => {
  return {
    type: UserAuth.LOGIN,
    payload: payload,
  };
};
const authSignUpAction = (payload) => {
  return {
    type: UserAuth.REGISTER,
    payload: payload,
  };
};
const authResetPassword = (payload) => {
  return {
    type: UserAuth.FORGOT_PASSWORD,
    payload: payload,
  };
};
const loadAction = (payload) => {
  return {
    payload: payload,
    type: UserAuth.LOADING,
  };
};
const successAction = () => {
  return {
    type: UserAuth.SUCCESS,
  };
};
export const login =
  ({ username, password }, navigate) =>
  async (dispatch) => {
    dispatch(successAction(false));

    dispatch(loadAction(true));
    await AuthServices.signIn(username, password)
      .then((res) => {
        if (!res) {
          dispatch(loadAction(false));
          dispatch(successAction(true));
        }
        dispatch(authLoginAction(res));
        setTimeout(() => {
          navigate("/");
          dispatch(successAction(false));
        }, 2000);
      })
      .catch((rej) => {
        console.log(rej);
      });
  };
export const registration = (body, navigate) => async (dispatch) => {
  dispatch(loadAction(true));
  dispatch(successAction(false));

  await AuthServices.signUp(body).then((res) => {
    if (res) {
      dispatch(successAction(true));
    }
    dispatch(loadAction(false));
    dispatch(authSignUpAction(res));
    dispatch(successAction(false));
  });
};
export const authLogoutAction = () => {
  return {
    type: UserAuth.LOG_OUT,
  };
};
export const resetPassword = (email, navigate) => async (dispatch) => {
  dispatch(loadAction(true));
  dispatch(successAction(false));

  await AuthServices.resetPassword(email).then((res) => {
    if (res) {
      dispatch(successAction(true));
    }
    dispatch(loadAction(false));
    dispatch(authResetPassword(res));
    dispatch(successAction(false));
  });
};
