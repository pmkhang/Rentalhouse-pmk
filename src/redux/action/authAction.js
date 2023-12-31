import { registerSuccess, loginSuccess, registerFail, loginFail, logout } from '../Slice/AuthSlice';
import { apiRegister, apiLogin } from '../../services/auth';

export const registerUser = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    if (response?.data.error === 0) {
      dispatch(registerSuccess(response.data));
    } else {
      dispatch(registerFail(response.data));
    }
  } catch (error) {
    dispatch(registerFail({ data: null, error: 2 }));
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.error === 0) {
      dispatch(loginSuccess(response.data));
    } else {
      dispatch(loginFail(response.data));
    }
  } catch (error) {
    dispatch(loginFail({ data: null, error: 2 }));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
