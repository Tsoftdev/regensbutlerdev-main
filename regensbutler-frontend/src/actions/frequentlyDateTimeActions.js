import axios from "axios";
import {
  FREQUENTLY_DATETIME_LIST_FAIL,
  FREQUENTLY_DATETIME_LIST_REQUEST,
  FREQUENTLY_DATETIME_LIST_SUCCESS
} from "../constants/frequentlyConstants";

export const getPerFrequentlyDateTime = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FREQUENTLY_DATETIME_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/frequenties/dateTime/${userInfo._id}`, config);
    dispatch({
      type: FREQUENTLY_DATETIME_LIST_SUCCESS,
      payload: data.dataTime,
    });

  } catch (error) {
    dispatch({
      type: FREQUENTLY_DATETIME_LIST_FAIL,
      payload: error
    });
  }
};

export const addPerFrequentlyDateTime = (datas) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/frequenties/dateTime`, datas, config);
    dispatch({
      type: FREQUENTLY_DATETIME_LIST_SUCCESS,
      payload: data.dataTime,
    });

  } catch (error) {
    dispatch({
      type: FREQUENTLY_DATETIME_LIST_FAIL,
      payload: error
    });
  }
}
