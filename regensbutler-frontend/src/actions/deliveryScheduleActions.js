import axios from "axios";
import {
  DELIVERYSCHEDULE_LIST_REQUEST,
  DELIVERYSCHEDULE_LIST_SUCCESS,
  DELIVERYSCHEDULE_LIST_FAIL
} from "../constants/deliveryConstants";

export const addTodeliveryScheduleItem = (sendData) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/deliverySchedule`, sendData, config);
    dispatch({
      type: DELIVERYSCHEDULE_LIST_SUCCESS,
      payload: data,
    });
    localStorage.setItem("deliveryScheduleItems", JSON.stringify(getState().deliverySchedule.deliveryScheduleItems));

  } catch (error) {
    dispatch({
      type: DELIVERYSCHEDULE_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }

};

export const getdeliveryScheduleItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DELIVERYSCHEDULE_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/deliverySchedule`, config);
    dispatch({
      type: DELIVERYSCHEDULE_LIST_SUCCESS,
      payload: data,
    });

    localStorage.setItem("deliveryScheduleItems", JSON.stringify(getState().deliverySchedule.deliveryScheduleItems));

  } catch (error) {
    dispatch({
      type: DELIVERYSCHEDULE_LIST_FAIL,
      payload: error
    });
  }
};

export const removeFromdeliveryScheduleItem = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.delete(`/api/deliverySchedule/${id}`, config);
  dispatch({
    type: DELIVERYSCHEDULE_LIST_SUCCESS,
    payload: data,
  });

  localStorage.setItem("deliveryScheduleItems", JSON.stringify(getState().deliverySchedule.deliveryScheduleItems));
};