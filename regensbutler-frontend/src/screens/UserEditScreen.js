import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditScreen({ match, history }) {
  const userId = match.params.id;

  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [adresse, setAdresse] = useState("");
  const [adresszusatz, setAdresszusatz] = useState("");
  const [wohnort, setWohnort] = useState("");
  const [plz, setPlz] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.nachname || Number(user.id) !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setVorname(user.vorname);
        setNachname(user.nachname);
        setAdresse(user.adresse);
        setAdresszusatz(user.adresszusatz);
        setWohnort(user.wohnort);
        setPlz(user.plz);
        setTelefon(user.telefon);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, dispatch, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        vorname,
        nachname,
        adresse,
        adresszusatz,
        wohnort,
        plz,
        telefon,
        email,
        isAdmin,
      })
    );
  };
  return (
    <>
      <Container>
        <Link to="/admin/userList" className="btn btn-light my-3">
          Zurück
        </Link>
        <FormContainer>
          <h1>Benutzer editieren</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="vorname">
                <Form.Label>Vorname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dein Vorname"
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="nachname">
                <Form.Label>Nachname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dein Nachname"
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="adresse">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Deine Straße mit Hausnummer"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="adresszusatz">
                <Form.Label>Adresszusatz</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="z.B. 1.Obergeschoss"
                  value={adresszusatz}
                  onChange={(e) => setAdresszusatz(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="wohnort">
                <Form.Label>Wohnort</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dein Wohnort"
                  value={wohnort}
                  onChange={(e) => setWohnort(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="plz">
                <Form.Label>Postleitzahl</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="PLZ"
                  value={plz}
                  onChange={(e) => setPlz(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="telefon">
                <Form.Label>Telefon</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Deine Nummer"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Adresse</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="isadmin">
                <Form.Check
                  type="checkbox"
                  label="Admin?"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
}

export default UserEditScreen;
