import axios from "axios"
import {
    PLZ_LIST_REQUEST,
    PLZ_LIST_SUCCESS,
    PLZ_LIST_FAIL,
  } from "../constants/plzConstants";

  export const getPlzItems = () => async (dispatch ) => {
    try {
        dispatch({ type: PLZ_LIST_REQUEST });
        const { data } = await axios.get(
          `/api/liefergebiete`
        );
        dispatch({
          type: PLZ_LIST_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: PLZ_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
  };