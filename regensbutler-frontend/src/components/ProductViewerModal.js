import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ListGroup } from "react-bootstrap";
import "./Fonts.css";

function ProductViewerModal() {
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
        className="z-50"
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
            REGENSBUTLER IMPRESSUM
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
              <strong>Vertreten durch:</strong>
              <br /> Daniel Pauer Nemo Kriwoschej-Magnusson
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Kontakt:</strong>
              <br />
              Tel. 0941 / 569 561 40
              <br />
              Fax 0941 / 569 561 409
              <br />
              <br />
              <strong>Internet:</strong>
              <br />
              www.regensbutler.de
              <br />
              <br />
              <strong>E-Mail:</strong>
              <br />
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
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductViewerModal;
