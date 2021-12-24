import axios from "axios"
import {
  SORTIMENT_REQUEST,
  SORTIMENT_SUCCESS,
  SORTIMENT_FAIL,
} from "../constants/sortimentonstants";

export const getsortimentItems = () => async (dispatch) => {
  try {
    dispatch({ type: SORTIMENT_REQUEST });
    const { data } = await axios.get(
      `/api/liefergebiete`
    );
    dispatch({
      type: SORTIMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SORTIMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};