import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Impressum from "./Impressum";
import Datenschutz from "./Datenschutz";
import AGB from "./AGB";
import logo1 from "../images/logo.png";
import logo2 from "../images/logosmall.png";

function Footer() {
  return (
    <footer className="flex flex-column relative inset-x-0 top-16">
      <Container
        fluid
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#222",
          bottom: "0",
          alignItems: "center",
        }}
      >
        <Row>
          <Col className="text-center py-3">
            <Impressum />
            <Datenschutz />
            <AGB />
          </Col>
        </Row>
        <Row>
          <Col className="flex flex-col justify-center items-center justify-items-center content-center text-center py-3 white mainfont">
            Copyright &copy; {new Date().getFullYear()} Walhalla-Software /
            Pauer Kriwoschej GbR <br />
            <img style={{ maxWidth: "60px" }} src={logo1} alt="logo" />
            <img style={{ maxWidth: "200px" }} src={logo2} alt="logo" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
