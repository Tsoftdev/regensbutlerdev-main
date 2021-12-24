import axios from "axios";
import {
  DATE_LIST_REQUEST,
  DATE_LIST_SUCCESS,
  DATE_LIST_FAIL
} from "../constants/deliveryConstants";

export const addToDeliveryDateItem = (date) => async (dispatch, getState) => {
  try {
    // dispatch({ type: DATE_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/deliverySchedule/date`, date, config);
    dispatch({
      type: DATE_LIST_SUCCESS,
      payload: data,
    });
    localStorage.setItem("deliveryDateItems", JSON.stringify(getState().deliveryDate.deliveryDateItems));

  } catch (error) {
    dispatch({
      type: DATE_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }

};

export const getDeliveryDateItems = () => async (dispatch, getState) => {
  const data = JSON.parse(localStorage.getItem("deliveryDateItems"));

  if (data === null || data.length === 0) {
    // console.log('null')
    try {
      dispatch({ type: DATE_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/deliverySchedule/date`, config);
      dispatch({
        type: DATE_LIST_SUCCESS,
        payload: data,
      });

      localStorage.setItem("deliveryDateItems", JSON.stringify(getState().deliveryDate.deliveryDateItems));

    } catch (error) {
      dispatch({
        type: DATE_LIST_FAIL,
        payload: error
      });
    }
  }

  else {
    dispatch({
      type: DATE_LIST_SUCCESS,
      payload: data,
    });
  }
};

export const removeFromDeliveryDateItem = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.delete(`/api/deliverySchedule/date/${id}`, config);
  dispatch({
    type: DATE_LIST_SUCCESS,
    payload: data,
  });

  localStorage.setItem("deliveryDateItems", JSON.stringify(getState().deliveryDate.deliveryDateItems));
};
