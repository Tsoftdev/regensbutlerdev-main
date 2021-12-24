import {
  SHIPPINGTIME_RECEIVE_TIME,
  SHIPPINGTIME_SET_TIME,
} from "../constants/shippingTimeConstants";

export const shippingTimeReducer = (state = { shippingtime: "" }, action) => {
  switch (action.type) {
    case SHIPPINGTIME_SET_TIME:
      const time = action.payload;

      return {
        ...state,
        shippingtime: time,
      };

    case SHIPPINGTIME_RECEIVE_TIME:
      return { ...state, shippingtime: state.shippingtime };

    default:
      return state;
  }
};
