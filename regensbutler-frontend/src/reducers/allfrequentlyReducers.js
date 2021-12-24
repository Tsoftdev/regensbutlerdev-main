import {
  ALL_FREQUENTLY_GET_ITEMS,
  ALL_FREQUENTLY_ALL_ITEMS_REMOVE,
  ALL_FREQUENTLY_LIST_REQUEST,
  ALL_FREQUENTLY_LIST_FAIL,
  ALL_FREQUENTLY_LIST_SUCCESS,
  ALL_FREQUENTLY_LIST_RESET
} from "../constants/frequentlyConstants";

export const allfrequentlyReducer = (
  state = { allfrequentlyItems: [] },
  action
) => {
  switch (action.type) {
    case ALL_FREQUENTLY_LIST_REQUEST:
      return { loading: true, error: "", allfrequentlyItems: [] };
    case ALL_FREQUENTLY_LIST_SUCCESS:
      return {
        loading: false,
        allfrequentlyItems: action.payload
      };
    case ALL_FREQUENTLY_GET_ITEMS:
      return { ...state, allfrequentlyItems: [...state.allfrequentlyItems] };
    case ALL_FREQUENTLY_ALL_ITEMS_REMOVE:
      return { ...state, allfrequentlyItems: [] };
    case ALL_FREQUENTLY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ALL_FREQUENTLY_LIST_RESET:
      return {
        allfrequentlyItems: []
      };
    default:
      return state;
  }
};
