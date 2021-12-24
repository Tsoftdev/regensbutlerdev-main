import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    history.push("/cart");
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Warenkorb</h1>
        {cartItems.length === 0 ? (
          <Message>
            Dein Warenkorb ist leer <Link to="/">Zurück</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.products}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.pictureUrl + item.bildname}
                      alt={item.produktname}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.products}`}>
                      {item.produktname}
                    </Link>
                  </Col>
                  <Col md={2}>{`${item.vk}`}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.products, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.lagerbestand).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.products)}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Col md={12}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Gesamtmenge (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Artikel
                </h2>
                €
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.vk, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Jetzt bestellen
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Col>
    </Row>
  );
}

export default CartScreen;
