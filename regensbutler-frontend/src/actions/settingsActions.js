import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_UPDATE_REQUEST,
  PRODUCTS_UPDATE_SUCCESS,
  PRODUCTS_UPDATE_FAIL,
} from "../constants/settingsConstants";

import axios from "axios";

export const uploadProducts = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCTS_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios
      .post(`/api/settings/upload`, file, config)
      .catch((error) => {
        console.log(error);
      });
    dispatch({
      type: PRODUCTS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/settings/download`, config);
    if (data) {
      console.log(data);
      dispatch({
        type: PRODUCTS_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
