import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_UPDATE_FAIL,
  PRODUCTS_UPDATE_SUCCESS,
  PRODUCTS_UPDATE_REQUEST,
} from "../constants/settingsConstants";

export const productListUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCTS_UPDATE_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case PRODUCTS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return { loading: true };
    case PRODUCTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
