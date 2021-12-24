import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_PW_FORGOTTEN_REQUEST,
  USER_PW_FORGOTTEN_SUCCESS,
  USER_PW_FORGOTTEN_FAIL,
  USER_PW_RESET_FAIL,
  USER_PW_RESET_REQUEST,
  USER_PW_RESET_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import {
  DELIVERY_TIME_RESET,
  DELIVERY_DATE_RESET
} from '../constants/deliveryConstants';
import { FREQUENTLY_LIST_REQUEST } from '../constants/frequentlyConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "api/users/login",
      {
        email,
        password,
      },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: DELIVERY_DATE_RESET });
  dispatch({ type: DELIVERY_TIME_RESET });
  dispatch({ type: FREQUENTLY_LIST_REQUEST });
};

export const resendMail = (data) => (dispatch) => {
  dispatch({
    type: USER_REGISTER_SUCCESS,
    payload: data,
  });

};

export const register = (
  vorname,
  nachname,
  birthday,
  adresse,
  adresszusatz,
  stockwerk,
  apartment,
  wohnort,
  plz,
  telefon,
  email,
  password,
  secret
) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/users",
      {
        vorname,
        nachname,
        birthday,
        adresse,
        adresszusatz,
        stockwerk,
        apartment,
        wohnort,
        plz,
        telefon,
        email,
        password,
        secret
      },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: { secret: secret, email: email, _id: data._id } });
    // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const passwordForgotten = (email) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PW_FORGOTTEN_REQUEST });

    const { data } = await axios.post(`/api/users/forgot-pw`, { email });

    dispatch({
      type: USER_PW_FORGOTTEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PW_FORGOTTEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const passwordReset = (pw, pwAgain, email, token) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_PW_RESET_REQUEST,
    });
    const { data } = await axios.post(`/api/users/reset-password`, {
      pw,
      pwAgain,
      email,
      token,
    });
    dispatch({
      type: USER_PW_RESET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PW_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
