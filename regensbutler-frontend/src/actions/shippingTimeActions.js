import {
  SHIPPINGTIME_RECEIVE_TIME,
  SHIPPINGTIME_SET_TIME,
} from "../constants/shippingTimeConstants";

export const addToShippingTimeCookie = (data) => (dispatch) => {
  dispatch({
    type: SHIPPINGTIME_SET_TIME,
    payload: data,
  });

  localStorage.setItem("shippingtime", JSON.stringify(data));
};

export const getShippingTime = () => (dispatch, getState) => {
  const data = localStorage.getItem("shippingtime");

  if (data) {
    dispatch({
      type: SHIPPINGTIME_RECEIVE_TIME,
      payload: data,
    });
  } else {
    return;
  }
};
