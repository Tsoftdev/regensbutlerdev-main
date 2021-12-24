import {PLZ_LIST_REQUEST, PLZ_LIST_SUCCESS, PLZ_LIST_FAIL} from "../constants/plzConstants"



export const plzListReducer = (state = { liefergebiete: [] }, action) => {
    switch (action.type) {
      case PLZ_LIST_REQUEST:
        return { loading: true, liefergebiete: [] };
      case PLZ_LIST_SUCCESS:
        return {
          loading: false,
          liefergebiete: action.payload,                 
        };
      case PLZ_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };