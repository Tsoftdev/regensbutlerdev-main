import { SORTIMENT_REQUEST, SORTIMENT_SUCCESS, SORTIMENT_FAIL } from "../constants/sortimentonstants"

export const sortimentListReducer = (state = { sortimentType: "PRIO" }, action) => {
  switch (action.type) {
    case SORTIMENT_REQUEST:
      return { loading: true, sortimentType: "" };
    case SORTIMENT_SUCCESS:
      return {
        loading: false,
        sortimentType: action.payload,
      };
    case SORTIMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};