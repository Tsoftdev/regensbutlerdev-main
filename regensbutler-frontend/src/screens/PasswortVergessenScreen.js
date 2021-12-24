import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { passwordForgotten } from "../actions/userActions";

function PasswortVergessenScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userPasswordForgotten = useSelector(
    (state) => state.userPasswordForgotten
  );
  const {
    loading: loadingResetToken,
    error: errorResetToken,
    success,
    data,
  } = userPasswordForgotten;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (success && data) {
      setSuccessMessage(true);
    }
  }, [history, userInfo, redirect, success, data]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(passwordForgotten(email));
  };
  return (
    <FormContainer>
      <h1 className="text-2xl">Passwort vergessen?</h1>
      <h1>
        Gib deine registrierte E-Mail Adresse ein und fordere ein neues Passwort
        an.
      </h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Adresse</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Passwort anfordern
        </Button>
        {errorResetToken && (
          <Message variant="danger">{errorResetToken}</Message>
        )}
        {loadingResetToken && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          Neu bei Regensbutler?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <strong>Registrieren</strong>
          </Link>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          {successMessage && (
            <Message variant="success">
              Wir haben dir eine E-Mail mit weiteren Instruktionen gesendet!
            </Message>
          )}
        </Col>
      </Row>
    </FormContainer>
  );
}

export default PasswortVergessenScreen;
