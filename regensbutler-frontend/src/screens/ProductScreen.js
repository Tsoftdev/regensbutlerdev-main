import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview, product]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Zurück
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.bildname} alt={product.produktname} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.produktname}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    val={product.rating}
                    text={`${product.numReviews} Bewertungen`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Preis: €{product.vk}</ListGroup.Item>
                <ListGroup.Item>
                  Beschreibung: {product.beschreibung}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Preis:</Col>
                      <Col>
                        <strong>
                          <h1 className="product__preis">€{product.vk}</h1>
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.lagerbestand > 0
                          ? "lagernd"
                          : "nicht mehr vorrätig"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.lagerbestand > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Anzahl</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.lagerbestand).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.lagerbestand === 0}
                    >
                      In den Warenkorb
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col m={6}>
              <h2>Bewertungen</h2>
              {product.reviews.length === 0 && (
                <Message>Noch keine Bewertungen</Message>
              )}
              {loadingProductReview && <Loader />}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating val={review.rating} />
                    <p>
                      {review.createdAt && review.createdAt.substring(0, 10)}
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Schreibe eine Bewertung</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Bewertung</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Wählen...</option>
                          <option value="1">1 - Schlecht</option>
                          <option value="2">1 - Fair</option>
                          <option value="3">1 - Gut</option>
                          <option value="4">1 - Sehr gut</option>
                          <option value="5">1 - Exzellent</option>
                        </Form.Control>
                        <Form.Group controlId="comment">
                          <Form.Label>Kommentar</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Speichern
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      <Link to="/login">Einloggen</Link> um eine Bewertung zu
                      schreiben
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
