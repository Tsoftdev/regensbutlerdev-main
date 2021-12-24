import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Product from "../components/Product";
import axios from "axios";
import Loader from "../components/Loader";
import { Col, Row, Form, Button } from "react-bootstrap";

const ProductsExpress = (props) => {
  const [keyword, setKeyword] = useState(props.keyword);
  const [key_kat, setKey_kat] = useState(props.key_kat);
  const [key_ukat, setKey_ukat] = useState(props.key_ukat);
  const [key_dkat, setKey_dkat] = useState(props.key_dkat);

  const [pageNumber, setPageNumber] = useState(1);
  const [productsLoaded, setProductsLoaded] = useState([]);
  const [hasMoreEntries, setHasMoreEntries] = useState(true);

  //   useEffect(() => {
  //     const fetch = async () => {
  //       setPageNumber(pageNumber + 1);
  //       const { data } = await axios.get(
  //         `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`
  //       );
  //       if (data) {
  //         setProductsLoaded(productsLoaded.concat(data.products));
  //       }
  //     };
  //     fetch();
  //   }, [keyword, pageNumber, key_kat, key_ukat, key_dkat, productsLoaded]);

  return (
    <div>
      <InfiniteScroll
        dataLength={productsLoaded.length}
        next={async () => {
          setPageNumber(pageNumber + 1);
          const { data } = await axios.get(
            `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`
          );
          if (data) {
            setProductsLoaded(productsLoaded.concat(data.products));
            if (data.pages === pageNumber) {
              setHasMoreEntries(false);
            }
          }
        }}
        className="flex flex-wrap overflow-hidden"
        //To put endMessage and loader to the top.

        hasMore={hasMoreEntries}
        loader={
          <h4>
            <Loader />
          </h4>
        }
      >
        {productsLoaded.length > 0 &&
          productsLoaded.map((product) => (
            <Col
              className="p-1 m-0"
              key={product.id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Product product={product} />
            </Col>
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default ProductsExpress;
