import {
  FREQUENTLY_DATETIME_LIST_REQUEST,
  FREQUENTLY_DATETIME_LIST_FAIL,
  FREQUENTLY_DATETIME_LIST_SUCCESS,
} from "../constants/frequentlyConstants";

export const frequentlyDateTimeReducer = (
  state = { frequentlydatetimeItems: [] },
  action
) => {
  switch (action.type) {
    case FREQUENTLY_DATETIME_LIST_REQUEST:
      return { loading: true, error: "", frequentlydatetimeItems: [] };
    case FREQUENTLY_DATETIME_LIST_SUCCESS:
      return {
        frequentlydatetimeItems: action.payload
      };
    case FREQUENTLY_DATETIME_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
