import axios from "axios";
import {
  ALL_FREQUENTLY_LIST_REQUEST,
  ALL_FREQUENTLY_LIST_FAIL,
  ALL_FREQUENTLY_LIST_SUCCESS,
} from "../constants/frequentlyConstants";


export const getFrequentlyItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_FREQUENTLY_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/frequenties`, config);
    dispatch({
      type: ALL_FREQUENTLY_LIST_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem("allfrequentlyItems", JSON.stringify(getState().allfrequently.allfrequentlyItems));

  } catch (error) {
    dispatch({
      type: ALL_FREQUENTLY_LIST_FAIL,
      payload: error
    });
  }
};
