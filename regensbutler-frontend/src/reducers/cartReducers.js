import {
  CART_ADD_ITEM,
  CART_GET_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_REMOVE_ONE_ITEM,
  CART_ALL_ITEMS_REMOVE
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_GET_ITEMS:
      return { ...state, cartItems: [...state.cartItems] };
    case CART_ALL_ITEMS_REMOVE:
      return { ...state, cartItems: [] };

    case CART_REMOVE_ITEM:
      const removeItem = action.payload;
      const removeExistItem = state.cartItems.find((x) => x.product === removeItem.product);
      if (removeItem.qty === 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.product !== action.payload.product),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.product === removeExistItem.product ? removeItem : x
        ),
      };
    case CART_REMOVE_ONE_ITEM:
      const itemToRemove = action.payload;
      const existItemToRemove = state.cartItems.find(
        (x) => x.product === itemToRemove
      );
      if (existItemToRemove) {
        if (existItemToRemove.qty === 1) {
          return {
            ...state,
            cartItems: state.cartItems.filter(
              (x) => x.product !== action.payload
            ),
          };
        } else {
          existItemToRemove.qty--;
        }
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
