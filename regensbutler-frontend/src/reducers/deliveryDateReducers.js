import {
  DATE_ADD_ITEM,
  DATE_GET_ITEMS,
  DATE_REMOVE_ITEM,
  DATE_REMOVE_ONE_ITEM,
  DATE_ALL_ITEMS_REMOVE,
  DATE_LIST_REQUEST,
  DATE_LIST_FAIL,
  DATE_LIST_SUCCESS,
  DELIVERY_DATE_RESET
} from "../constants/deliveryConstants";

export const deliveryDateReducer = (
  state = { deliveryDateItems: [] },
  action
) => {
  switch (action.type) {
    case DATE_LIST_REQUEST:
      return { loading: true, error: "", deliveryDateItems: [] };
    case DATE_ADD_ITEM:
      const item = action.payload;
      const existItem = state.deliveryDateItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          deliveryDateItems: state.deliveryDateItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          deliveryDateItems: [...state.deliveryDateItems, item],
        };
      }
    case DATE_LIST_SUCCESS:
      return {
        loading: false,
        deliveryDateItems: action.payload
      };
    case DATE_GET_ITEMS:
      return { ...state, deliveryDateItems: [...state.deliveryDateItems] };
    case DATE_ALL_ITEMS_REMOVE:
      return { ...state, deliveryDateItems: [] };

    case DATE_REMOVE_ITEM:
      const removeItem = action.payload;
      const removeExistItem = state.deliveryDateItems.find((x) => x.product === removeItem.product);
      if (removeItem.qty === 0) {
        return {
          ...state,
          deliveryDateItems: state.deliveryDateItems.filter((x) => x.product !== action.payload.product),
        };
      }
      return {
        ...state,
        deliveryDateItems: state.deliveryDateItems.map((x) =>
          x.product === removeExistItem.product ? removeItem : x
        ),
      };
    case DATE_REMOVE_ONE_ITEM:
      const itemToRemove = action.payload;
      const existItemToRemove = state.deliveryDateItems.find(
        (x) => x.product === itemToRemove
      );
      if (existItemToRemove) {
        if (existItemToRemove.qty === 1) {
          return {
            ...state,
            deliveryDateItems: state.deliveryDateItems.filter(
              (x) => x.product !== action.payload
            ),
          };
        } else {
          existItemToRemove.qty--;
        }
      }

      return {
        ...state,
        deliveryDateItems: [...state.deliveryDateItems],
      };
    case DATE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case DELIVERY_DATE_RESET:
      return {
        deliveryDateItems: []
      };
    default:
      return state;
  }
};
