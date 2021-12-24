import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  categorieListReducer,
} from "./reducers/productReducers";
import {
  sortimentListReducer,
} from "./reducers/sortimentReducers";
import { cartReducer } from "./reducers/cartReducers";
import { frequentlyReducer } from "./reducers/frequentlyReducers";
import { allfrequentlyReducer } from "./reducers/allfrequentlyReducers";
import { frequentlyDateTimeReducer } from "./reducers/frequentlyDateTimeReducers";
import { deliveryDateReducer } from "./reducers/deliveryDateReducers";
import { deliveryScheduleReducer } from "./reducers/deliveryScheduleReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userPasswordForgottenReducer,
  userPasswordResetReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from "./reducers/orderReducers";

import { productListSettingsReducer } from "./reducers/settingsReducers";
import { plzListReducer } from "./reducers/plzReducers";
import { shippingTimeReducer } from "./reducers/shippingTimeReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  sortimentType: sortimentListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  frequently: frequentlyReducer,
  allfrequently: allfrequentlyReducer,
  frequentlydatetime: frequentlyDateTimeReducer,
  deliveryDate: deliveryDateReducer,
  deliverySchedule: deliveryScheduleReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userPasswordForgotten: userPasswordForgottenReducer,
  userPasswordReset: userPasswordResetReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  categorieList: categorieListReducer,
  plzList: plzListReducer,
  productListDownload: productListSettingsReducer,
  shippingTime: shippingTimeReducer,
});

const frequentlyItemsFromStorage = localStorage.getItem("frequentlyItems")
  ? JSON.parse(localStorage.getItem("frequentlyItems"))
  : [];

const allfrequentlyItemsFromStorage = localStorage.getItem("allfrequentlyItems")
  ? JSON.parse(localStorage.getItem("allfrequentlyItems"))
  : [];

const deliveryDateItemsFromStorage = localStorage.getItem("deliveryDateItems")
  ? JSON.parse(localStorage.getItem("deliveryDateItems"))
  : [];

const deliveryScheduleFromStorage = localStorage.getItem("deliverySchedule")
  ? JSON.parse(localStorage.getItem("deliverySchedule"))
  : [];

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const shippingTimeFromStorage = localStorage.getItem("shippingtime")
  ? JSON.parse(localStorage.getItem("shippingtime"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  frequently: {
    frequentlyItems: frequentlyItemsFromStorage,
  },
  allfrequently: {
    allfrequentlyItems: allfrequentlyItemsFromStorage
  },
  frequentlydatetime: {
    frequentlydatetimeItems: []
  },
  deliveryDate: {
    deliveryDateItems: deliveryDateItemsFromStorage
  },
  deliverySchedule: {
    deliverySchedule: deliveryScheduleFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
  shippingTime: { shippingtime: shippingTimeFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
