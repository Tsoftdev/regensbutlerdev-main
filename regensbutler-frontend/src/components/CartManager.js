import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {
  Nav,
  ListGroup,
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import {
  getCartItems,
  addToCart,
  removeFromCart,
  removeOneFromCart,
} from "../actions/cartActions";
import Message from "../components/Message";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -4,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "10px 6px",
    fontSize: "medium",
  },
}))(Badge);

const CartManager = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const frequently = useSelector((state) => state.frequently);
  const { frequentlyItems } = frequently;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id, 0));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=lieferadresse");
    setShow(false);
  };

  const onChangeHandler = (id, val) => {
    var num = parseInt(val);
    if (num > 0) dispatch(addToCart(id, num));
    else dispatch(removeFromCart(id, 0));
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <>
      <Nav.Link>
        <div
          style={{
            display: "flex",
          }}
        >
          <div onClick={() => history.push("/frequently")}>
            <IconButton aria-label="cart">
              <StyledBadge
                badgeContent={frequentlyItems.reduce(
                  (acc, item) => acc + item.count,
                  0
                )}
                color="secondary"
              >
                <FavoriteBorderIcon />
              </StyledBadge>
            </IconButton>
          </div>
          <div onClick={() => setShow(true)}>
            <IconButton aria-label="cart">
              <StyledBadge
                badgeContent={cartItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}
                color="secondary"
              >
                <ShoppingCartIcon className="cart_anchor" />
              </StyledBadge>
            </IconButton>
            <span
              className="euro p-1 ml-1"
              style={{
                borderRadius: "10px",
                backgroundColor: "darkred",
                fontSize: "large",
                whiteSpace: "nowrap",
              }}
            >
              €{" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.vk, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </Nav.Link>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable="true"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="mainfont"
          >
            WARENKORB
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mainfont dim_gray size_impressum">
          {cartItems.length === 0 ? (
            <Message>Dein Warenkorb ist leer</Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="flex justify-center">
                    <Col
                      md={2}
                      className="flex justify-center content-center"
                      style={{ alignItems: "center" }}
                    >
                      <Image
                        src={
                          item.bildname
                            ? item.pictureurl + item.bildname
                            : item.pictureurl + "noimage.jpg"
                        }
                        alt={item.produktname}
                        fluid
                        rounded
                        className="w-24"
                      />
                    </Col>
                    <Col
                      md={2}
                      className="flex justify-center content-center"
                      style={{ alignItems: "center" }}
                    >
                      {item.produktname}
                    </Col>
                    <Col
                      md={2}
                      className="flex justify-center content-center"
                      style={{ alignItems: "center" }}
                    >
                      {`€ ${item.vk}`}
                      <br />
                      {item.pfand && item.pfand > 0
                        ? "Pfand: € " + item.pfand.toFixed(2)
                        : "kein Pfand"}
                    </Col>
                    <Col
                      md={4}
                      className="flex justify-center content-center"
                      style={{ alignItems: "center" }}
                    >
                      <div className="flex flex-row">
                        <Button
                          className="text-base w-10 h-10"
                          onClick={() => {
                            dispatch(
                              removeOneFromCart(
                                item.product,
                                Number(item.qty - 1)
                              )
                            );
                          }}
                          name="minusItem"
                          variant={item.qty > 0 ? "danger" : "secondary"}
                        >
                          -
                        </Button>

                        <Form.Control
                          className="nospin w-16 mr-1.5 ml-1.5 items-center text-center text-base"
                          value={`${item.qty}`}
                          onChange={(e) => {
                            onChangeHandler(item.product, e.target.value);
                          }}
                        ></Form.Control>

                        <Button
                          className="text-base w-10 add-to-cart h-10"
                          onClick={() =>
                            dispatch(
                              addToCart(item.product, Number(item.qty + 1))
                            )
                          }
                          name="plusItem"
                          variant="danger"
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col md={2} className="flex justify-center content-center">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                        style={{ margin: "auto" }}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>
                      Gesamtmenge (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      Artikel
                    </h2>
                    <h2>
                      €
                      {cartItems
                        .reduce(
                          (acc, item) =>
                            acc + item.qty * item.vk,
                          0
                        )
                        .toFixed(2)}
                    </h2>
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
            </ListGroup>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CartManager;
