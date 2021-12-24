import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { listCategories } from "../actions/productActions";
import BackgroundSlider from "../components/BackgroundSlider";
import PersistentDrawerLeft from "../components/SidemenuMatUi";
import useIsMountedRef from "../components/hooks/useIsMountedRef";
import { ENDPOINTURL0, ENDPOINTURL1 } from "../constants/config";
import PlzChecker from "../components/PlzChecker";
import { getPerFrequentlyItems } from "../actions/frequentlyActions";
import { getFrequentlyItems } from "../actions/allfrequentlyActions";

function HomeScreen({ match, history, location }) {
  const search = useLocation().search;
  const key_kat = new URLSearchParams(search).get("key_kat") || "";
  const key_ukat = new URLSearchParams(search).get("key_ukat") || "";
  const key_dkat = new URLSearchParams(search).get("key_dkat") || "";
  const [keywordInBox, setKeywordInBox] = useState("");
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [allProducts, setAllproducts] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useIsMountedRef();
  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const sortimentType = useSelector((state) => state.sortimentType);
  const { sortimentType: sortiment_type } = sortimentType;
  const categoriesList = useSelector((state) => state.categorieList);
  const { loading: loadingCategories, kategorien } = categoriesList;

  const submitHandler = (k) => {
    history.push({
      pathname: "/page/1",
      search: `?type=${sortiment_type}&keyword=&key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`,
    });
    setAllproducts([]);
    setKeyword(k);
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(getPerFrequentlyItems());

      if (userInfo.isAdmin) dispatch(getFrequentlyItems());
    }
    if (!categoriesLoaded) {
      dispatch(listCategories());
      setCategoriesLoaded(true);
    }
  }, [categoriesLoaded, dispatch, userInfo]);

  const handleGetProducts = useCallback(() => {
    var axios = require("axios");
    var port = window.location.port;
    setLoading(true);
    const p = pageNumber || 1;
    history.push({
      pathname: "/page/" + p,
      search: `?type=${sortiment_type}&keyword=${keyword}&key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`,
    });

    var config = {
      method: "get",
      url: `${
        port ? ENDPOINTURL1 : ENDPOINTURL0
      }/api/products?type=${sortiment_type}&keyword=${keyword}&pageNumber=${p}&key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log("00000000000000000000000000000", response.data);
        if (isMountedRef.current) {
          var result = response.data;
          let newObj = allProducts;
          result.products.forEach((val) => {
            newObj.push(val);
          });
          setPage(result.page);
          setPages(result.pages);
          setAllproducts(newObj);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [
    isMountedRef,
    allProducts,
    pageNumber,
    key_kat,
    key_ukat,
    key_dkat,
    keyword,
    sortiment_type,
    history,
  ]);

  useEffect(() => {
    handleGetProducts();
  }, [handleGetProducts]);

  return (
    <>
      <PlzChecker />
      <BackgroundSlider />
      <Grid className="xl:container mx-auto bg-white mt-20 p-0">
        <div className="flex">
          <PersistentDrawerLeft
            setAllproducts={setAllproducts}
            products={allProducts}
            kategorien={kategorien}
            pageNumber={pageNumber}
            loadingCategories={loadingCategories}
            pages={pages}
            page={page}
            key_kat={key_kat}
            key_ukat={key_ukat}
            key_dkat={key_dkat}
            loading={loading}
            keywordInBox={keywordInBox}
            setKeywordInBox={setKeywordInBox}
            submitHandler={submitHandler}
          />
        </div>
      </Grid>
    </>
  );
}

export default HomeScreen;
