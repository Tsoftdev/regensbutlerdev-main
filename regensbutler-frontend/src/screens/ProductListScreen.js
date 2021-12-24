import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";

function ProductListScreen({ history, match }) {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct.id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Möchtest du den Artikel wirklich löschen?"))
      dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1 className="text-4xl">Administration</h1>
            <h1 className="text-xl">Artikelliste</h1>
          </Col>
          <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <AddCircleOutlineIcon />
              Artikel anlegen
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>ID (database)</th>
                  <th style={{ textAlign: 'center' }}>PRODUKT_ID</th>
                  <th style={{ textAlign: 'center' }}>NAME</th>
                  <th style={{ textAlign: 'center' }}>VK</th>
                  <th style={{ textAlign: 'center' }}>KATEGORIE</th>
                  <th style={{ textAlign: 'center' }}>UNTERKATEGORIE</th>
                  <th style={{ textAlign: 'center' }}>DIREKTKATEGORIE</th>
                  <th style={{ textAlign: 'center' }}>Aktion</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ textAlign: 'center' }}>{product.id}</td>
                    <td style={{ textAlign: 'center' }}>{product.product_id}</td>
                    <td style={{ textAlign: 'center' }}>{product.produktname}</td>
                    <td style={{ textAlign: 'center' }}>€ {product.vk}</td>
                    <td style={{ textAlign: 'center' }}>{product.kategorie}</td>
                    <td style={{ textAlign: 'center' }}>{product.unterkategorie}</td>
                    <td style={{ textAlign: 'center' }}>{product.direktkategorie}</td>

                    <td style={{ textAlign: 'center' }}>
                      <LinkContainer to={`/admin/product/${page}/${product.id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <EditIcon />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product.id)}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </Container>
    </>
  );
}

export default ProductListScreen;
