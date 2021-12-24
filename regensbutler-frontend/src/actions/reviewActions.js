import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_PAY_REQUEST,
  REVIEW_PAY_SUCCESS,
  REVIEW_PAY_FAIL,
  REVIEW_LIST_MY_REQUEST,
  REVIEW_LIST_MY_SUCCESS,
  REVIEW_LIST_MY_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_DELIVER_FAIL,
  REVIEW_DELIVER_REQUEST,
  REVIEW_DELIVER_SUCCESS,
  UPDATE_EACH_PSTAR_REQUEST,
  UPDATE_EACH_PSTAR_FAIL,
} from "../constants/reviewConstants";
import axios from "axios";

export const createReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/reviews`, review, config);

    dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getReviewDetails = (userId, orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/reviews/${userId}/${orderId}`, config);

    dispatch({ type: REVIEW_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: REVIEW_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEachProductStar = (id, productId, star) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_EACH_PSTAR_REQUEST });
    const data = {
      productId: productId,
      star: star
    }

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/reviews/${id}/star`, data, config);
    await axios.put(`/api/products/${productId}/rating`, { rating: star }, config);
    getReviewDetails(id);

  } catch (error) {
    dispatch({
      type: UPDATE_EACH_PSTAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payReview = (reviewId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: REVIEW_PAY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/reviews/${reviewId}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: REVIEW_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEW_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyReviews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/reviews/myreviews`,

      config
    );

    dispatch({ type: REVIEW_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_DELIVER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/reviews/${review.id}/deliver`,
      {},
      config
    );

    dispatch({ type: REVIEW_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEW_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listReviews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/reviews`,

      config
    );

    dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
