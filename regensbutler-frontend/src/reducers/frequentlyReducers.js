import {
  FREQUENTLY_ADD_ITEM,
  FREQUENTLY_GET_ITEMS,
  FREQUENTLY_REMOVE_ITEM,
  FREQUENTLY_REMOVE_ONE_ITEM,
  FREQUENTLY_ALL_ITEMS_REMOVE,
  FREQUENTLY_LIST_REQUEST,
  FREQUENTLY_LIST_FAIL,
  FREQUENTLY_LIST_SUCCESS,
  FREQUENTLY_LIST_RESET
} from "../constants/frequentlyConstants";

export const frequentlyReducer = (
  state = { frequentlyItems: [] },
  action
) => {
  switch (action.type) {
    case FREQUENTLY_LIST_REQUEST:
      return { loading: true, error: "", frequentlyItems: [] };
    case FREQUENTLY_ADD_ITEM:
      const item = action.payload;
      const existItem = state.frequentlyItems.find((x) => x.product_id === item.product_id);
      if (existItem) {
        return {
          ...state,
          frequentlyItems: state.frequentlyItems.map((x) =>
            x.product_id === existItem.product_id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          frequentlyItems: [...state.frequentlyItems, item],
        };
      }
    case FREQUENTLY_LIST_SUCCESS:
      return {
        loading: false,
        frequentlyItems: action.payload
      };
    case FREQUENTLY_GET_ITEMS:
      return { ...state, frequentlyItems: [...state.frequentlyItems] };
    case FREQUENTLY_ALL_ITEMS_REMOVE:
      return { ...state, frequentlyItems: [] };

    case FREQUENTLY_REMOVE_ITEM:
      const removeItem = action.payload;
      const removeExistItem = state.frequentlyItems.find((x) => x.product_id === removeItem.product_id);
      if (removeItem.count === 0) {
        return {
          ...state,
          frequentlyItems: state.frequentlyItems.filter((x) => x.product_id !== removeItem.product_id),
        };
      }
      return {
        ...state,
        frequentlyItems: state.frequentlyItems.map((x) =>
          x.product_id === removeExistItem.product_id ? removeItem : x
        ),
      };
    case FREQUENTLY_REMOVE_ONE_ITEM:
      const itemToRemove = action.payload;
      const existItemToRemove = state.frequentlyItems.find(
        (x) => x.product === itemToRemove
      );
      if (existItemToRemove) {
        if (existItemToRemove.qty === 1) {
          return {
            ...state,
            frequentlyItems: state.frequentlyItems.filter(
              (x) => x.product !== action.payload
            ),
          };
        } else {
          existItemToRemove.qty--;
        }
      }

      return {
        ...state,
        frequentlyItems: [...state.frequentlyItems],
      };
    case FREQUENTLY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case FREQUENTLY_LIST_RESET:
      return {
        frequentlyItems: []
      };
    default:
      return state;
  }
};
