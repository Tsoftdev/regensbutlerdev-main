import axios from "axios";
import {
  FREQUENTLY_LIST_REQUEST,
  FREQUENTLY_LIST_SUCCESS,
  FREQUENTLY_LIST_FAIL,
  FREQUENTLY_ADD_ITEM,
  FREQUENTLY_REMOVE_ITEM
} from "../constants/frequentlyConstants";

export const addToFrequentlyItem = (product, count, id) => async (dispatch, getState) => {
  dispatch({
    type: FREQUENTLY_ADD_ITEM,
    payload: {
      product_id: product.product_id,
      userId: id,
      count: count,
      express_sortiment: product.express_sortiment,
      voll_sortiment: product.voll_sortiment,
      product_lager_id: product.product_lager_id,
      produktname: product.produktname,
      beschreibung: product.beschreibung,
      ek: product.ek,
      vk: product.vk,
      ustr: product.ustr,
      Verpackungsinhalt: product.Verpackungsinhalt,
      Verpackungseinheit: product.Verpackungseinheit,
      lagerbestand: product.lagerbestand,
      kategorie: product.kategorie,
      unterkategorie: product.unterkategorie,
      direktkategorie: product.direktkategorie,
      pfand: product.pfand,
      gewicht: product.gewicht,
      kalorien: product.kalorien,
      verpackung: product.verpackung,
      bildname: product.bildname,
      bildname_inhaltsstoffe: product.bildname_inhaltsstoffe,
      neu_inhaltsstoffe: product.neu_inhaltsstoffe,
      neu_zusatzst: product.neu_zusatzst,
      neu_naehrwerte: product.neu_naehrwerte,
      neu_pflichthinweis: product.neu_pflichthinweis,
      numReviews: product.numReviews,
      rating: product.rating,
      tiefkuehlware: product.tiefkuehlware,
      kasten: product.kasten,
      trockenware: product.trockenware,
      kuehlware: product.kuehlware,
      pictureurl: product.pictureurl,
      Altersgrenze: product.Altersgrenze
    },
  });

  localStorage.setItem("frequentlyItems", JSON.stringify(getState().frequently.frequentlyItems));

};

export const handleCreateFrequentlyOrder = (datas) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/frequenties/`, datas, config);
    dispatch({
      type: FREQUENTLY_LIST_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem("frequentlyItems", JSON.stringify(getState().frequently.frequentlyItems));
  } catch (error) {
    dispatch({
      type: FREQUENTLY_LIST_FAIL,
      payload: error
    });
  }
};

export const getPerFrequentlyItems = () => async (dispatch, getState) => {
  // const frequentlydata = JSON.parse(localStorage.getItem("frequentlyItems"));

  // if (frequentlydata === null || frequentlydata.length === 0) {
  try {
    dispatch({ type: FREQUENTLY_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/frequenties/${userInfo._id}`, config);
    dispatch({
      type: FREQUENTLY_LIST_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem("frequentlyItems", JSON.stringify(getState().frequently.frequentlyItems));
  } catch (error) {
    dispatch({
      type: FREQUENTLY_LIST_FAIL,
      payload: error
    });
  }
  // }

  // else {
  //   dispatch({
  //     type: FREQUENTLY_LIST_SUCCESS,
  //     payload: frequentlydata,
  //   });
  // }
};

export const removeFromFrequentlyItem = (product, count, id) => async (dispatch, getState) => {
  dispatch({
    type: FREQUENTLY_REMOVE_ITEM,
    payload: {
      product_id: product.product_id,
      userId: id,
      count: count,
      express_sortiment: product.express_sortiment,
      voll_sortiment: product.voll_sortiment,
      product_lager_id: product.product_lager_id,
      produktname: product.produktname,
      beschreibung: product.beschreibung,
      ek: product.ek,
      vk: product.vk,
      ustr: product.ustr,
      Verpackungsinhalt: product.Verpackungsinhalt,
      Verpackungseinheit: product.Verpackungseinheit,
      lagerbestand: product.lagerbestand,
      kategorie: product.kategorie,
      unterkategorie: product.unterkategorie,
      direktkategorie: product.direktkategorie,
      pfand: product.pfand,
      gewicht: product.gewicht,
      kalorien: product.kalorien,
      verpackung: product.verpackung,
      bildname: product.bildname,
      bildname_inhaltsstoffe: product.bildname_inhaltsstoffe,
      neu_inhaltsstoffe: product.neu_inhaltsstoffe,
      neu_zusatzst: product.neu_zusatzst,
      neu_naehrwerte: product.neu_naehrwerte,
      neu_pflichthinweis: product.neu_pflichthinweis,
      numReviews: product.numReviews,
      rating: product.rating,
      tiefkuehlware: product.tiefkuehlware,
      kasten: product.kasten,
      trockenware: product.trockenware,
      kuehlware: product.kuehlware,
      pictureurl: product.pictureurl,
      Altersgrenze: product.Altersgrenze
    },
  });

  localStorage.setItem("frequentlyItems", JSON.stringify(getState().frequently.frequentlyItems));
};
