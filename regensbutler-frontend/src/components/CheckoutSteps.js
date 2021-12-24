import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../components/Fonts.css";

function CheckoutSteps({ step1, step2, step3, step4, step5 }) {
  return (
    <Nav className="justify-content-center mb-4 mainfont">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className="size_text_standard">1 Login</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>1 Login</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/lieferadresse">
            <Nav.Link className="size_text_standard">2 Lieferadresse</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>2 Lieferadresse</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/lieferzeitpunkt">
            <Nav.Link className="size_text_standard">
              3 Lieferzeitpunkt
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>3 Lieferzeitpunkt</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="size_text_standard">4 Bezahlmethode</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>4 Bezahlmethode</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step5 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="size_text_standard">5 Checkout</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="size_text_standard">
            5 Checkout
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
