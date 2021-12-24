import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import "../components/Fonts.css";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/lieferadresse");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  const backHandler = (e) => {
    e.preventDefault();
    history.push("/lieferzeitpunkt");
  };

  return (
    <FormContainer>
      <div className="xl:container mx-auto bg-white mt-20 p-0 mainfont">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="xl:container mx-auto bg-white mt-20 p-0">
          <h1 className="text-xl">Bezahlmethoden</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Methode wählen</Form.Label>
              <Col className="mainfont">
                <p className="size_text_standard">
                  Sie haben die Möglichkeit mit folgenden Arten über Paypal zu
                  bezahlen:
                </p>
                <ul className="size_text_standard mt-4 mb-4">
                  <li>Paypal Guthaben</li>
                  <li>Kreditkarte</li>
                  <li>Sofortüberweisung</li>
                  <li>Bankeinzug</li>
                </ul>
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>
            <Button
              onClick={backHandler}
              type="button"
              variant="secondary"
              className="mr-4"
            >
              Zurück
            </Button>
            <Button type="submit" variant="primary">
              Weiter
            </Button>
          </Form>
        </div>
      </div>
    </FormContainer>
  );
}

export default PaymentScreen;
