import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { passwordReset } from "../actions/userActions";

function PasswortResetScreen({ location, history }) {
  const search = useLocation().search;
  const email = new URLSearchParams(search).get("email") || "";
  const token = new URLSearchParams(search).get("token") || "";
  const [pw, setPw] = useState("");
  const [pwAgain, setPwAgain] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [fail, setFail] = useState(false);
  const [passwortErneuert, setPasswortErneuert] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const {
    loading: loadingUserPasswordReset,
    error: errorUserPasswordReset,
    success: successUserPasswordReset,
    data,
  } = userPasswordReset;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (successUserPasswordReset && data) {
      if (data.status === "ok") {
        setSuccessMessage(true);
        setPasswortErneuert(true);
      } else {
        setSuccessMessage(false);
        setPasswortErneuert(false);
      }
    }
  }, [history, userInfo, redirect, successUserPasswordReset, data]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (pw === pwAgain) {
      setFail(false);
      dispatch(passwordReset(pw, pwAgain, email, token));
    } else {
      setFail(true);
    }
  };
  return (
    <FormContainer>
      <h1 className="text-2xl">Passwort erneuern</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {!passwortErneuert && (
        <>
          <h1>Gib dein neues Passwort ein.</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="password">
              <Form.Label>Passwort</Form.Label>
              <Form.Control
                type="password"
                placeholder="Passwort"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              ></Form.Control>
              <Form.Label>Passwort wiederholen</Form.Label>
              <Form.Control
                type="password"
                placeholder="Passwort wiederholen"
                value={pwAgain}
                onChange={(e) => setPwAgain(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Passwort speichern
            </Button>
          </Form>
        </>
      )}

      <Row className="py-3">
        <Col>
          {loadingUserPasswordReset && <Loader />}
          {successMessage && (
            <Message variant="success">
              Dein Passwort wurde gespeichert.
            </Message>
          )}
          {errorUserPasswordReset && (
            <Message variant="danger">{errorUserPasswordReset}</Message>
          )}
          {fail && (
            <Message variant="danger">Passwörter müssen übereinstimmen</Message>
          )}
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <Link to={`/login`}>
            <strong>Zum Login</strong>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default PasswortResetScreen;
