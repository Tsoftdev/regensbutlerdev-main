import React, { useEffect, useState, useCallback } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Button, Row, Col, ListGroup, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { createReview } from "../actions/reviewActions";
import OrderItem from "../components/OrderItem";
import Snackbar from "../components/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import { ENDPOINTURL0, ENDPOINTURL1 } from "../constants/config";

const useStyles = makeStyles((theme) => ({
  reviewBox: {
    marginTop: theme.spacing(2.5),
    border: 0,
  },
  textField: {
    width: "100%",
  },
  txtLabel: {
    fontSize: theme.spacing(2),
  },
  descriptionBox: {
    marginBottom: theme.spacing(2),
  },
}));

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const [orderReviewComment, setOrderreviewComment] = React.useState("");
  const [bonusscore, setBonusscore] = React.useState(0);
  const [orderstatus, setOrderStatus] = React.useState(false);
  const [orderReviewStar, setOrderReviewStar] = React.useState(0);
  const [snackerror, setSnackerror] = React.useState(false);
  const [snackalert, setSnackalert] = React.useState("");
  const [snackseverity, setSnackseverity] = React.useState("error");
  const classes = useStyles();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.order.ohnePfand = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.vk * item.qty, 0)
    );

    order.order.pfand = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.pfand * item.qty, 0)
    );
  }

  const handlegetReviewDetails = useCallback((userId, orderId) => {
    var axios = require("axios");
    var port = window.location.port;

    var config = {
      method: "get",
      url: `${port ? ENDPOINTURL1 : ENDPOINTURL0
        }/api/reviews/${userId}/${orderId}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setOrderStatus(response.data.status);
        setOrderreviewComment(response.data.reviewComment);
        if (response.data.stars === undefined) setOrderReviewStar(0);
        else setOrderReviewStar(response.data.stars);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (userInfo.isAdmin) {
      var config1 = {
        method: "get",
        url: `${port ? ENDPOINTURL1 : ENDPOINTURL0}/api/users/${userId}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios(config1)
        .then(function (response) {
          setBonusscore(response.data.bonus);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [userInfo.isAdmin, userInfo.token]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      if (clientId) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      }
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, dispatch, successPay, successDeliver, userInfo, history]);

  useEffect(() => {
    var id = localStorage.getItem("userIdforAdmin");
    handlegetReviewDetails(
      userInfo.isAdmin ? id : userInfo._id,
      Number(orderId)
    );
  }, [history, dispatch, orderId, userInfo.isAdmin, userInfo._id, handlegetReviewDetails]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order.order));
  };

  const handleleavereview = () => {
    if (orderReviewComment === "") {
      setSnackerror(true);
      setSnackalert("Bitte geben Sie den Bewertungskommentar ein.");
      setSnackseverity("error");
      setTimeout(() => {
        setSnackerror(false);
        setSnackalert("");
        setSnackseverity("");
      }, 2000);
    } else {
      const data = {
        orderId: orderId,
        userId: userInfo._id,
        stars: orderReviewStar,
        reviewComment: orderReviewComment,
      };
      setSnackerror(true);
      setSnackalert(
        "Sie haben eine Bewertung für Ihre Bestellung hinterlassen."
      );
      setSnackseverity("success");
      setTimeout(() => {
        setSnackerror(false);
        setSnackalert("");
        setSnackseverity("");
      }, 2000);
      dispatch(createReview(data));
    }
  };

  const handleleavebonus = () => {
    var id = localStorage.getItem("userIdforAdmin");
    var axios = require("axios");
    var port = window.location.port;
    var data = JSON.stringify({
      bonus: bonusscore,
    });

    var config = {
      method: "post",
      url: `${port ? ENDPOINTURL1 : ENDPOINTURL0}/api/users/${id}/bonus`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setSnackerror(true);
        setSnackalert("Wir haben unseren Benutzern Boni bereitgestellt.");
        setSnackseverity("success");
        setTimeout(() => {
          setSnackerror(false);
          setSnackalert("");
          setSnackseverity("");
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="xl:container mx-auto bg-white mt-20 p-0 mainfont">
      <Container>
        <h1 className="text-xl">Deine Bestellung</h1>
        <p className="size_text_standard">
          <strong>Bestellnr.: {order.order.id}</strong>
        </p>
        {snackerror && <Snackbar alert={snackalert} severity={snackseverity} />}
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="text-lg">Gewählte Bezahlmethode</h2>
                <p className="size_text_standard">
                  <strong>Methode: </strong>
                  {order.order.paymentMethod}
                </p>
                {order.order.isPaid ? (
                  <Message variant="success">
                    Bezahlt am {order.order.paidAt}
                  </Message>
                ) : (
                  <Message variant="danger">noch nicht bezahlt</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2 className="text-lg">Lieferung an</h2>
                <p className="size_text_standard">
                  <strong>Name: </strong>{" "}
                  {`${order.userInfoToOrder.vorname} ${order.userInfoToOrder.nachname}`}
                </p>
                <p className="size_text_standard">
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${order.userInfoToOrder.email}`}>
                    {order.userInfoToOrder.email}
                  </a>
                </p>

                <p className="size_text_standard">
                  <strong>Lieferadresse: </strong>
                  {order.order.shippingAdressAdress},{" "}
                  {order.order.shippingAdressPostalCode},{" "}
                  {order.order.shippingAdressCity},{" "}
                  {order.order.shippingAdressCountry},{" "}
                  {order.order.shippingAdressStockwerk},{" "}
                  {order.order.shippingAdressApartment}
                </p>
                <p className="size_text_standard">
                  <strong>Lieferdatum und -uhrzeit: </strong>
                  {order.order.lieferzeitpunkt}
                </p>
                {order.order.isDelivered ? (
                  <Message variant="success">
                    Geliefert am {order.order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">noch nicht geliefert</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2 className="text-lg">Gewählte Artikel</h2>
                {order.orderItems && order.orderItems.length === 0 ? (
                  <Message>Deine Bestellung ist leer</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <OrderItem
                        item={item}
                        isDelivered={order.order.isDelivered}
                        key={index}
                      />
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
                  <h2 className="text-lg">Zusammenfassung</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="size_text_standard">Artikel</Col>
                    <Col className="size_text_standard">
                      € {order.order.ohnePfand}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="size_text_standard">+ Lieferung</Col>
                    <Col className="size_text_standard">
                      € {order.order.shippingPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="size_text_standard">+ Pfand</Col>
                    <Col className="size_text_standard">
                      € {order.order.pfand}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="size_text_standard">inkl. MWSt</Col>
                    <Col className="size_text_standard">
                      € {order.order.taxPrice.toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h3>Gesamt</h3>
                    </Col>
                    <Col>
                      <h2>€ {order.order.totalPrice}</h2>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order.order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <>
                        <h2 className="text-lg text-red-600">
                          Jetzt bezahlen!
                        </h2>
                        <PayPalButton
                          amount={order.order.totalPrice}
                          currency={"EUR"}
                          onSuccess={successPaymentHandler}
                        />
                      </>
                    )}
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.order.isPaid &&
                  !order.order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        Als Versandt markieren
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
            {order.order.isDelivered && (
              <Card className={classes.reviewBox}>
                <div className={classes.descriptionBox}>
                  <div className={classes.txtLabel}>
                    Fragen zur Bestellprüfung:
                  </div>
                  <div className={classes.txtLabel}>
                    Wie schnell war die Lieferung?
                  </div>
                  <div className={classes.txtLabel}>
                    Wie zufrieden sind Sie mit dem Service?
                  </div>
                  <div className={classes.txtLabel}>...</div>
                </div>
                <TextField
                  id="orderreview-comment"
                  variant="outlined"
                  multiline
                  rows={5}
                  placeholder={`Auf hier...`}
                  className={classes.textField}
                  value={orderReviewComment}
                  onChange={(e) => {
                    setOrderreviewComment(e.target.value);
                  }}
                  disabled={userInfo.isAdmin}
                />
                <div style={{ textAlign: "center", margin: 10 }}>
                  <Rating
                    name="orderReviewStar"
                    id="orderReviewStar"
                    value={orderReviewStar}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setOrderReviewStar(newValue);
                    }}
                    readOnly={userInfo.isAdmin}
                  />
                </div>
                {!userInfo.isAdmin && (
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={handleleavereview}
                  >
                    Hinterlasse jetzt eine Bewertung
                  </Button>
                )}
              </Card>
            )}
            {orderstatus && userInfo.isAdmin && (
              <Card className={classes.reviewBox}>
                <TextField
                  id="bonus-score"
                  variant="outlined"
                  type={"number"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  value={bonusscore}
                  onChange={(e) => {
                    if (e.target.value <= 250 && e.target.value >= -250)
                      setBonusscore(e.target.value);
                  }}
                />
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={handleleavebonus}
                  style={{ marginTop: 10 }}
                >
                  Hinterlassen Sie jetzt Ihren Bonus
                </Button>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderScreen;
