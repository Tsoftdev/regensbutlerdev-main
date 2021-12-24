import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ListGroup } from "react-bootstrap";
import "./Fonts.css";

function Impressum() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        className="impressum_button"
        variant="secondary"
        onClick={() => setShow(true)}
      >
        Impressum
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable="true"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="mainfont"
          >
            <h1>IMPRESSUM</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mainfont dim_gray size_impressum">
          <ListGroup variant="flush">
            <ListGroup.Item>
              Regensbutler Pauer Kriwoschej GbR
              <br />
              Landshuterstr 48a
              <br />
              93053 Regensburg
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Vertreten durch:</h2>
              <br /> Daniel Pauer | Nemo Kriwoschej-Magnusson
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Kontakt:</h2>
              <br />
              <h3>Telefon:</h3>
              Tel. 0941 / 569 561 40
              <br />
              Fax 0941 / 569 561 409
              <br />
              <br />
              <h3>Internet:</h3>
              www.regensbutler.de
              <br />
              <br />
              <h3>E-Mail:</h3>
              info@regensbutler.de
            </ListGroup.Item>
            <ListGroup.Item>
              Amtsgericht Regensburg
              <br />
              Steuernummer 244 / 172 / 06902
              <br />
              UST-ID DE276589241
            </ListGroup.Item>
            <ListGroup.Item>
              Plattform der EU-Kommission zur Online-Streitbeilegung:
              <br />
              <a
                href="http://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noreferrer"
              >
                http://ec.europa.eu/consumers/odr
              </a>
            </ListGroup.Item>
            <ListGroup.Item className="mainfont">
              <h2>Credits</h2>
              <h3>Bildmaterial des Cookie Consents</h3>
              <p>
                Das für die Cookieinformation verwendete Cookie-Monster
                (Bilddatei Quelle: https://clipartspub.com/) ähnelt dem Original
                der Sesamstraße. Wir erheben keinerlei Anspruch/Copyright auf
                das Originaldesign oder dessen Urheberrechte.
              </p>
              <h2>Icons</h2>
              <p>
                Icons made by{" "}
                <a href="https://www.freepik.com" title="Freepik">
                  Freepik
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  www.flaticon.com
                </a>
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Impressum;
