import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import Grid from "@material-ui/core/Grid";
import { getRandomString } from "../constants/secretCode";
import { ENDPOINTURL0, ENDPOINTURL1 } from "../constants/config";
import Snackbar from "../components/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles((theme) => ({
  btnAgree: {
    backgroundColor: "#1976d2",
    color: "#fff",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  },
  btnDisagree: {
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    backgroundColor: "#e0e0e0",
  },
  submit: {
    float: "left",
    borderRadius: 3,
    textAlign: "center",
    height: 36,
    background: "#b7de01",
    boxShadow: "0px 5px #6b6d5f",
    color: "#333",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      background: "#99ba01",
      boxshadow: "0px 4px #435100",
      color: "#687e00",
    },
    "&:active": {
      boxshadow: "0px 0px #717a33",
    },
  },
  RegisterBox: {
    padding: "30px 70px",
    background: "#fff",
    borderRadius: 5,
    boxShadow: "0px 0px 10px rgba(0,0,0,.2)",
    marginTop: theme.spacing(18),
  },
}));

function RegisterScreen({ location, history }) {
  const classes = useStyles();
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [adresse, setAdresse] = useState("");
  const [adresszusatz, setAdresszusatz] = useState("");
  const [stockwerk, setStockwerk] = useState("");
  const [apartment, setApartment] = useState("");
  const [wohnort, setWohnort] = useState("");
  const [plz, setPlz] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [birthday, setBirthday] = React.useState(new Date());

  const [vornameErr, setVornameErr] = useState({});
  const [nachnameErr, setNachnameErr] = useState({});
  const [birthdayErr, setBirthdayErr] = useState({});
  const [adresseErr, setAdresseErr] = useState({});
  const [wohnortErr, setWohnortErr] = useState({});
  const [plzErr, setPlzErr] = useState({});
  const [telefonErr, setTelefonErr] = useState({});

  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});

  const [plzexistvalidate, setPlzExistValidate] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo, success } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (success) history.push("/register-confirm");
  }, [success, history]);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const validateEmail = (elementValue) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  };

  const formValidation = () => {
    var curr = new Date();
    var currYear = curr.getFullYear();
    var bith_curr = new Date(birthday);
    var bith_currYear = bith_curr.getFullYear();
    let isValid = true;

    const vornameErr = {};
    const nachnameErr = {};
    const birthdayErr = {};
    const adresseErr = {};
    const wohnortErr = {};
    const plzErr = {};
    const telefonErr = {};

    const passwordErr = {};
    const emailErr = {};

    if (vorname.trim() === "") {
      vornameErr.vornameEmpty = "Bitte einen Vornamen eingeben";
      isValid = false;
    }
    if (vorname.trim().length > 28) {
      vornameErr.vornameLength = "Dein Vorname scheint etwas zu lang zu sein";
      isValid = false;
    }

    if (nachname.trim() === "") {
      nachnameErr.nachnameEmpty = "Bitte einen Nachnamen eingeben";
      isValid = false;
    }
    if (currYear === bith_currYear) {
      birthdayErr.birthdayEmpty = "Bitte geben Sie Ihr Geburtsdatum ein";
      isValid = false;
    }
    if (vorname.trim().length > 28) {
      vornameErr.nachnameLength = "Dein Nachname scheint etwas zu lang zu sein";
      isValid = false;
    }

    if (adresse.trim() === "") {
      adresseErr.adresseEmpty = "Bitte eine Adresse angeben";
      isValid = false;
    }

    if (adresse.trim().length > 300) {
      adresseErr.adresseLength = "Deine Adresse scheint etwas zu lnag zu sein";
      isValid = false;
    }

    if (wohnort.trim() === "") {
      wohnortErr.wohnortEmpty = "Bitte einen Wohnort angeben";
      isValid = false;
    }

    if (plz.trim() === "") {
      plzErr.plzEmpty = "Bitte eine Postleitzahl angeben";
      isValid = false;
    }

    if (plz.trim().length > 5) {
      plzErr.plzLength =
        "Es scheint sich nicht um eine gültige Postleitzahl zu handeln";
      isValid = false;
    }

    if (isNaN(plz.trim())) {
      plzErr.isNotANumber =
        "Eine Postleitzahl aus unserer Region besteht in der Regel aus 5 Zahlen.";
      isValid = false;
    }

    if (telefon.trim() === "") {
      telefonErr.telefonEmpty = "Bitte eine Telefonnummer angeben";
      isValid = false;
    }

    if (telefon.trim().length > 25) {
      telefonErr.telefonLength = "So eine lange Telefonnummer soll existieren?";
      isValid = false;
    }

    if (password === "") {
      passwordErr.passwordEmpty = "Du musst ein Passwort festlegen";
      isValid = false;
    }
    if (password !== confirmPassword) {
      passwordErr.confirmBoth =
        "Die beiden eingegebenen Passwörter müssen übereinstimmen!";
      isValid = false;
    }
    if (email.trim() === "") {
      emailErr.emailEmpty = "Bitte deine Email Adresse angeben";
      isValid = false;
    }
    // if (!validateEmail(email)) {
    //   emailErr.emailWrongFormat =
    //     "Deine Email Adresse entspricht nicht dem gewünschten Format";
    //   isValid = false;
    // }

    setVornameErr(vornameErr);
    setNachnameErr(nachnameErr);
    setPasswordErr(passwordErr);
    setAdresseErr(adresseErr);
    setBirthdayErr(birthdayErr);
    setWohnortErr(wohnortErr);
    setPlzErr(plzErr);
    setEmailErr(emailErr);
    setTelefonErr(telefonErr);
    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formValidation()) {
      setMessage(
        "Formularvalidierung fehlgeschlagen. Bitte prüfe die Eingabefelder mit rotem Hinweis darunter."
      );
      setIsValid(true);
      setTimeout(() => {
        setIsValid(false);
        setMessage("");
      }, 3000);
    } else {
      if (!validateEmail(email)) {
        setMessage(
          "Deine Email Adresse entspricht nicht dem gewünschten Format"
        );
        setIsValid(true);
        setTimeout(() => {
          setIsValid(false);
          setMessage("");
        }, 3000);
      } else {
        var axios = require("axios");
        var port = window.location.port;
        var data = JSON.stringify({
          plz: plz,
        });

        var config = {
          method: "post",
          url: `${port ? ENDPOINTURL1 : ENDPOINTURL0
            }/api/liefergebiete/checkExist`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            if (response.data.status) handleSave();
            else setPlzExistValidate(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  const getBirthday = () => {
    var curr = new Date(birthday);
    var currYear = curr.getFullYear();
    var currMonth = curr.getMonth();
    var currDate = curr.getDate();
    var newBirthday = new Date(`${currYear}-${currMonth + 1 < 10 ? `0${currMonth + 1}` : currMonth + 1}-${currDate < 10 ? `0${currDate}` : currDate}T07:00:00`)
    return newBirthday;
  }

  const handleSave = () => {
    dispatch(
      register(
        vorname,
        nachname,
        getBirthday(),
        adresse,
        adresszusatz,
        stockwerk,
        apartment,
        wohnort,
        plz,
        telefon,
        email,
        password,
        getRandomString()
      )
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} className={classes.RegisterBox}>
          <div>
            <Dialog
              open={plzexistvalidate}
              onClose={() => {
                setPlzExistValidate(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <div>
                    Wir liefern nicht an eine Adresse, die sich nicht in unserer
                    Lieferzone befindet.
                  </div>
                  <div>
                    Sie können sich also jetzt registrieren, aber mit dieser
                    Postleitzahl nicht bestellen.
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setPlzExistValidate(false);
                  }}
                  className={classes.btnDisagree}
                  color="secondary"
                  variant="contained"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => {
                    handleSave();
                    setPlzExistValidate(false);
                  }}
                  color="primary"
                  variant="contained"
                  className={classes.btnAgree}
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <h2 className="text-xl">Registrieren</h2>
          <p className="p-2 mb-10">
            "Bevor Du dich registrierst, kannst du auf der Startseite
            überprüfen, ob wir an deine Postleitzahl liefern!"
          </p>
          {isValid && <Snackbar alert={message} severity="error" />}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Grid container style={{ width: "100%" }}>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="vorname">
                <Form.Label>Vorname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dein Vorname"
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {Object.keys(vornameErr).map((key) => (
                <Message variant="danger">{vornameErr[key]}</Message>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="nachname">
                <Form.Label>Nachname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dein Nachname"
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {Object.keys(nachnameErr).map((key) => (
                <Message variant="danger">{nachnameErr[key]}</Message>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
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
              {Object.keys(birthdayErr).map((key) => (
                <Message variant="danger">{birthdayErr[key]}</Message>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="adresse">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Deine Straße mit Hausnummer"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {Object.keys(adresseErr).map((key) => (
                <Message variant="danger">{adresseErr[key]}</Message>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="adresszusatz">
                <Form.Label>Adresszusatz</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="z.B. 1.Obergeschoss"
                  value={adresszusatz}
                  onChange={(e) => setAdresszusatz(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="stockwerk">
                <Form.Label>Stockwerk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="stockwerk"
                  value={stockwerk}
                  onChange={(e) => setStockwerk(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="apartment">
                <Form.Label>Apartment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apartment"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="wohnort">
                <Form.Label>Wohnort</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dein Wohnort"
                  value={wohnort}
                  onChange={(e) => setWohnort(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {Object.keys(wohnortErr).map((key) => (
                <Message variant="danger">{wohnortErr[key]}</Message>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="plz">
                <Form.Label>Postleitzahl</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="PLZ"
                  value={plz}
                  onChange={(e) => setPlz(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {Object.keys(plzErr).map((key) => (
                <Message variant="danger">{plzErr[key]}</Message>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="telefon">
                <Form.Label>Telefon (nur für Lieferrückfragen)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Deine Nummer für Rückrufe"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {Object.keys(telefonErr).map((key) => (
                <Message variant="danger">{telefonErr[key]}</Message>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="email">
                <Form.Label>Email Adresse</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {Object.keys(emailErr).map((key) => (
                <Message variant="danger">{emailErr[key]}</Message>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="password">
                <Form.Label>Passwort</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Passwort bestätigen</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Passwort bestätigen"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {Object.keys(passwordErr).map((key) => (
                <Message variant="danger">{passwordErr[key]}</Message>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ padding: 7 }}>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              style={{ padding: 7, textAlign: "center" }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submitHandler}
                className={classes.submit}
              >
                Registrieren
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              style={{ padding: 7, textAlign: "center" }}
            >
              <Col style={{ margin: "24px 0px 16px", height: 36 }}>
                Hast du bereits einen Account?{" "}
                <Link to={redirect ? `/ login ? redirect = ${redirect} ` : "/login"}>
                  <strong>Einloggen</strong>
                </Link>
              </Col>
            </Grid>
          </Grid>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterScreen;
