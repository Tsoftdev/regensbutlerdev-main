import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { removeAllCartItems } from "../actions/cartActions";
import { ORDER_CREATE_REQUEST } from "../constants/orderConstants";
import axios from "axios";
import "../components/Fonts.css";

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const shippingTime = useSelector((state) => state.shippingTime);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!cart.shippingAddress.address) {
    history.push("/lieferadresse");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  } else if (!shippingTime.shippingtime) {
    history.push("/lieferzeitpunkt");
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.vk * item.qty, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 90 ? 0.0 : 4.99;

  cart.taxPrice = addDecimals(Number(0.19 * cart.itemsPrice));
  cart.pfandPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.pfand * item.qty, 0)
  );
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.pfandPrice) -
    Number(userInfo.bonus) / 100
  );

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    if (clientId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
      script.async = true;
      script.onload = () => {
        console.log("addPayPalScript");
      };
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order.id}`);
    }
    if (!window.paypal) {
      addPayPalScript();
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    localStorage.removeItem("cartItems");
    
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        lieferzeitpunkt: shippingTime.shippingtime,
        userInfo: userInfo,
      })
    );
    setTimeout(() => {
      dispatch(removeAllCartItems());
      dispatch({ type: ORDER_CREATE_REQUEST });
    }, 1500);
  };
  return (
    <div className="xl:container mx-auto bg-white mt-20 p-0 mainfont">
      <CheckoutSteps step1 step2 step3 step4 step5 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="text-lg">Lieferung an</h2>
              <p className="size_text_standard">
                <strong>Lieferadresse: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.stockwerk},{" "}
                {cart.shippingAddress.apartment},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-lg">Gewählte Bezahlmethode</h2>
              <p className="size_text_standard">
                <strong>Zahlungsart: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-lg">Gewählter Lieferzeitpunkt</h2>
              <p className="size_text_standard">
                <strong>Zeitraum: </strong>
                {shippingTime.shippingtime}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-lg">Artikel</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Dein Warenkorb ist leer</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={
                              item.bildname
                                ? item.pictureurl + item.bildname
                                : item.pictureurl + "noimage.jpg"
                            }
                            alt={item.produktname}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={2} className="size_text_standard">
                          {item.produktname}
                        </Col>
                        <Col md={5} className="size_text_standard">
                          {item.pfand > 0 && (
                            <p>Pfand pro Artikel: € {item.pfand}</p>
                          )}
                        </Col>
                        <Col md={4} className="size_text_standard">
                          {item.qty} x €{item.vk} = €
                          {addDecimals(item.qty * item.vk)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Zusammenfassung</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="size_text_standard">Summe Artikel</Col>
                  <Col className="size_text_standard">€{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="size_text_standard">Summe Pfand</Col>
                  <Col className="size_text_standard">€ {cart.pfandPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="size_text_standard">Lieferung</Col>
                  <Col className="size_text_standard">
                    €{cart.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="size_text_standard">Steuer (16% MWST)</Col>
                  <Col className="size_text_standard">€{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="size_text_standard">
                    <strong>Gesamt</strong>
                  </Col>
                  <Col className="size_text_standard">€{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Bestellung absenden
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
