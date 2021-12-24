import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  UPDATE_EACH_PSTAR_REQUEST,
  UPDATE_EACH_PSTAR_SUCCESS,
  UPDATE_EACH_PSTAR_FAIL,
} from "../constants/reviewConstants";

export const reviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true };
    case REVIEW_CREATE_SUCCESS:
      return { loading: false, review: action.payload };
    case REVIEW_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const reviewDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DETAILS_REQUEST:
      return { ...state, loading: true };
    case REVIEW_DETAILS_SUCCESS:
      return { loading: false, review: action.payload };
    case REVIEW_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateEachProductStarReducer = (
  state = { loading: true, reviewItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_EACH_PSTAR_REQUEST:
      return { loading: true };
    case UPDATE_EACH_PSTAR_SUCCESS:
      return { loading: false };
    case UPDATE_EACH_PSTAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const reviewListReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return { loading: true };
    case REVIEW_LIST_SUCCESS:
      return { loading: false, reviews: action.payload };
    case REVIEW_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
