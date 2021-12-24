import {
  TIME_ADD_ITEM,
  TIME_GET_ITEMS,
  TIME_REMOVE_ITEM,
  TIME_REMOVE_ONE_ITEM,
  TIME_ALL_ITEMS_REMOVE,
  DELIVERYSCHEDULE_LIST_SUCCESS,
  DELIVERYSCHEDULE_LIST_FAIL,
  DELIVERYSCHEDULE_LIST_REQUEST,
  DELIVERY_TIME_RESET
} from "../constants/deliveryConstants";

export const deliveryScheduleReducer = (
  state = { deliveryScheduleItems: [] },
  action
) => {
  switch (action.type) {
    case DELIVERYSCHEDULE_LIST_REQUEST:
      return { loading: true, error: "", deliveryScheduleItems: [] };
    case TIME_ADD_ITEM:
      const item = action.payload;
      const existItem = state.deliveryScheduleItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          deliveryScheduleItems: state.deliveryScheduleItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          deliveryScheduleItems: [...state.deliveryScheduleItems, item],
        };
      }
    case DELIVERYSCHEDULE_LIST_SUCCESS:
      return {
        loading: false,
        deliveryScheduleItems: action.payload
      };
    case TIME_GET_ITEMS:
      return { ...state, deliveryScheduleItems: [...state.deliveryScheduleItems] };
    case TIME_ALL_ITEMS_REMOVE:
      return { ...state, deliveryScheduleItems: [] };

    case TIME_REMOVE_ITEM:
      const removeItem = action.payload;
      const removeExistItem = state.deliveryScheduleItems.find((x) => x.product === removeItem.product);
      if (removeItem.qty === 0) {
        return {
          ...state,
          deliveryScheduleItems: state.deliveryScheduleItems.filter((x) => x.product !== action.payload.product),
        };
      }
      return {
        ...state,
        deliveryScheduleItems: state.deliveryScheduleItems.map((x) =>
          x.product === removeExistItem.product ? removeItem : x
        ),
      };
    case TIME_REMOVE_ONE_ITEM:
      const itemToRemove = action.payload;
      const existItemToRemove = state.deliveryScheduleItems.find(
        (x) => x.product === itemToRemove
      );
      if (existItemToRemove) {
        if (existItemToRemove.qty === 1) {
          return {
            ...state,
            deliveryScheduleItems: state.deliveryScheduleItems.filter(
              (x) => x.product !== action.payload
            ),
          };
        } else {
          existItemToRemove.qty--;
        }
      }

      return {
        ...state,
        deliveryScheduleItems: [...state.deliveryScheduleItems],
      };
    case DELIVERYSCHEDULE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case DELIVERY_TIME_RESET:
      return {
        deliveryScheduleItems: []
      };
    default:
      return state;
  }
};
