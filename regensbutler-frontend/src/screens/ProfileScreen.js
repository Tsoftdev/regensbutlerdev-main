import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Snackbar from "../components/Snackbar";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { ENDPOINTURL0, ENDPOINTURL1 } from "../constants/config";
import axios from "axios";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function ProfileScreen({ location, history }) {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [adresse, setAdresse] = useState("");
  const [adresszusatz, setAdresszusatz] = useState("");
  const [wohnort, setWohnort] = useState("");
  const [plz, setPlz] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [bonusscore, setBonusscore] = useState(0);
  const [FLsnackbar, setFLSnackbar] = React.useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    if (clientId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
      script.async = true;
      script.onload = () => {
        console.log('addPayPalScript')
      };
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listMyOrders());
      if (!user || !user.nachname) {
        dispatch(getUserDetails("profile"));
      } else if (success) {
        setTimeout(() => {
          dispatch({ type: USER_UPDATE_PROFILE_RESET });
          dispatch(getUserDetails("profile"));
        }, 5000);
      } else {
        setVorname(user.vorname);
        setNachname(user.nachname);
        setBirthday(handlegetBirthday(user.birthday));
        setAdresse(user.adresse);
        setAdresszusatz(user.adresszusatz);
        setWohnort(user.wohnort);
        setPlz(user.plz);
        setTelefon(user.telefon);
        setEmail(user.email);
        setBonusscore(user.bonus);
      }
    }

    if (!window.paypal) {
      addPayPalScript();
    }

  }, [dispatch, history, userInfo, user, success]);

  const handlegetBirthday = (date) => {
    var curr = new Date(date);
    var currYear = curr.getFullYear();
    var currMonth = curr.getMonth();
    var currDate = curr.getDate();
    var newBirthday = new Date(`${currYear}-${currMonth + 1 < 10 ? `0${currMonth + 1}` : currMonth + 1}-${currDate < 10 ? `0${currDate}` : currDate}T24:00:00`)
    return newBirthday;
  }

  const handlesetBirthday = (date) => {
    var curr = new Date(date);
    var currYear = curr.getFullYear();
    var currMonth = curr.getMonth();
    var currDate = curr.getDate();
    var newBirthday = new Date(`${currYear}-${currMonth + 1 < 10 ? `0${currMonth + 1}` : currMonth + 1}-${currDate < 10 ? `0${currDate}` : currDate}T07:00:00`)
    return newBirthday;
  }

  const submitHandler = () => {
    var newbirthday = handlesetBirthday(birthday);
    if (newPassword !== confirmPassword) {
      setFLSnackbar(true);
      setTimeout(() => {
        setFLSnackbar(false);
      }, 3000);
      setMessage("Die Passwortbestätigung muss übereinstimmen!");
    } else {
      if (password === "") {
        setFLSnackbar(true);
        setTimeout(() => {
          setFLSnackbar(false);
        }, 3000);
        setMessage("Die Email oder das aktuelle Passwort ist falsch!");
      } else {
        var axios = require("axios");
        var port = window.location.port;
        var data = JSON.stringify({
          email: email,
          password: password,
        });

        var config = {
          method: "post",
          url: `${port ? ENDPOINTURL1 : ENDPOINTURL0
            }/api/users/validatePassword`,
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            if (response.data.status) {
              if (newPassword === "" || confirmPassword === "") {
                setFLSnackbar(true);
                setTimeout(() => {
                  setFLSnackbar(false);
                }, 3000);
                setMessage(
                  "Das Passwort kann nicht auf leere Zeichen gesetzt werden."
                );
              } else {
                if (newPassword !== confirmPassword) {
                  setFLSnackbar(true);
                  setTimeout(() => {
                    setFLSnackbar(false);
                  }, 3000);
                  setMessage("Die Passwortbestätigung muss übereinstimmen!");
                } else {
                  dispatch(
                    updateUserProfile({
                      id: user.id,
                      vorname,
                      nachname,
                      newbirthday,
                      adresse,
                      adresszusatz,
                      wohnort,
                      plz,
                      telefon,
                      email,
                      newPassword,
                    })
                  );
                }
              }
            } else {
              setFLSnackbar(true);
              setTimeout(() => {
                setFLSnackbar(false);
              }, 3000);
              setMessage("Email und Passwort stimmen nicht überein.");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
  return (
    <Container className="xl:container mx-auto bg-white mt-20 p-0">
      <Row>
        <Col md={12}>
          <h1 className="text-xl">Dein Account</h1>
        </Col>
        <Col md={12}>
          <h1 className="text-lg">Persönliche Angaben</h1>
          {FLsnackbar && <Snackbar alert={message} severity={"error"} />}
          {error && <Snackbar alert={error} severity={"error"} />}
          {success && (
            <Snackbar alert={"Account aktualisiert"} severity={"success"} />
          )}
          {loading && <Loader />}
          <Container style={{ padding: 0, display: "flex", flexWrap: "wrap" }}>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="vorname">
                <Form.Label>Vorname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dein Vorname"
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="nachname">
                <Form.Label>Nachname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dein Nachname"
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Form.Group controlId="Geburtsdatum">
                  <Form.Label>Geburtsdatum</Form.Label>
                  <DatePicker
                    inputVariant={"outlined"}
                    orientation={"portrait"}
                    margin="normal"
                    format="DD/MM/YYYY"
                    name="birthday"
                    id="birthday"
                    value={birthday}
                    onChange={(date) => setBirthday(date)}
                    className="birthdayBox"
                  />
                </Form.Group>
              </MuiPickersUtilsProvider>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="adresse">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Deine Straße mit Hausnummer"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="adresszusatz">
                <Form.Label>Adresszusatz</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="z.B. 1.Obergeschoss"
                  value={adresszusatz}
                  onChange={(e) => setAdresszusatz(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="wohnort">
                <Form.Label>Wohnort</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dein Wohnort"
                  value={wohnort}
                  onChange={(e) => setWohnort(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="plz">
                <Form.Label>Postleitzahl</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="PLZ"
                  value={plz}
                  onChange={(e) => setPlz(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="telefon">
                <Form.Label>Telefon</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Deine Nummer"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="email">
                <Form.Label>Email Adresse</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  defaultValue={email}
                // onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="password">
                <Form.Label>Aktuelles Passwort</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="newPassword">
                <Form.Label>Neues Passwort</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Neu Passwort"
                  value={newPassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Passwort bestätigen</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Passwort bestätigen"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col
              xs={12}
              sm={6}
              md={4}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Group controlId="bonuspunktzahl">
                <Form.Label>Deine Bonuspunkte</Form.Label>
                <Form.Control
                  placeholder="Bonuspunktzahl"
                  value={bonusscore}
                  readOnly
                ></Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                onClick={submitHandler}
                style={{ marginTop: 15 }}
              >
                Update
              </Button>
            </Col>
          </Container>
        </Col>
        <Col md={12}>
          <h2 className="text-lg">Bestellungen</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>DATUM</th>
                  <th style={{ textAlign: "center" }}>GESAMT</th>
                  <th style={{ textAlign: "center" }}>BEZAHLT</th>
                  <th style={{ textAlign: "center" }}>GELIEFERT</th>
                  <th style={{ textAlign: "center" }}>Aktion</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "center" }}>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      € {order.totalPrice}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {order.isPaid ? (
                        <div>
                          {order.paidAt.substring(0, 10)}
                          <CheckCircleIcon
                            style={{
                              color: "#61d15f",
                              marginLeft: 5,
                            }}
                          />
                        </div>
                      ) : (
                        <strong>Nein</strong>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {order.isDelivered ? (
                        <div>
                          {order.deliveredAt.substring(0, 10)}
                          <CheckCircleIcon
                            style={{
                              color: "#61d15f",
                              marginLeft: 5,
                            }}
                          />
                        </div>
                      ) : (
                        <strong>Nein</strong>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <LinkContainer to={`/order/${order.id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileScreen;
