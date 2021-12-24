import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_GET_ITEMS,
  CART_REMOVE_ONE_ITEM,
  CART_ALL_ITEMS_REMOVE
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  console.log("------------ddddddddddddddd------------", id);
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      category: data.voll_sortiment ? 'voll' : 'express',
      produktname: data.produktname,
      bildname: data.bildname,
      vk: data.vk,
      pfand: data.pfand,
      lagerbestand: data.lagerbestand,
      qty,
      pictureurl: data.pictureurl,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const getCartItems = () => (dispatch, getState) => {
  const data = localStorage.getItem("cartItems");
  if (data) {
    dispatch({
      type: CART_GET_ITEMS,
      payload: data,
    });
  } else {
    return;
  }
};

export const removeAllCartItems = () => (dispatch, getState) => {
  dispatch({
    type: CART_ALL_ITEMS_REMOVE,
    payload: [],
  });
};

export const removeFromCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      product: data.id,
      category: data.voll_sortiment ? 'voll' : 'express',
      produktname: data.produktname,
      bildname: data.bildname,
      vk: data.vk,
      pfand: data.pfand,
      lagerbestand: data.lagerbestand,
      qty,
      pictureurl: data.pictureurl,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeOneFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ONE_ITEM, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
