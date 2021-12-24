import React, { useEffect, useState } from "react";
import "./PlzChecker.css";
//import { Button, Form } from "react-bootstrap";
import { getPlzItems } from "../actions/plzActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import check from "../images/check.png";
import checkfail from "../images/checkfail.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const PlzChecker = () => {
  const [plzEingabe, setPlzEingabe] = useState("");
  const [show, setShow] = useState(false);
  const [checkIO, setcheckIO] = useState(false);

  const dispatch = useDispatch();
  const plzList = useSelector((state) => state.plzList);
  const { loading, error, liefergebiete } = plzList;
  useEffect(() => {
    dispatch(getPlzItems());
  }, [dispatch]);

  const onClickHandler = () => {
    let check = liefergebiete.find((x) => x.plz === Number(plzEingabe));
    if (check) {
      setcheckIO(true);
      setShow(true);
    } else {
      setcheckIO(false);
      setShow(true);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setPlzEingabe(e.target.value.trim());
  };

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div
          style={{
            position: "absolute",
            top: 150,
            width: "100%",
            zIndex: 1,
          }}
        >
          <div className="plzCheckerBox">
            <form
              noValidate
              autoComplete="off"
              className="flex flex-col items-center content-center"
            >
              <InputLabel className="mb-4" htmlFor="plz">
                Liefern wir zu dir?
              </InputLabel>
              <TextField
                id="plz"
                label="Deine Postleitzahl"
                variant="outlined"
                type="number"
                onChange={onChangeHandler}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onClickHandler();
                  }
                }}
                value={plzEingabe}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon style={{ color: "#F82FDE" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                className="mt-4 w-full h-10"
                onClick={onClickHandler}
              >
                Jetzt plz Prüfen
              </Button>
            </form>

            {/* <Form>
              <Form.Group className="flex flex-col items-center">
                <Form.Label
                  className="text-lg"
                  style={{
                    padding: 20,
                    fontSize: 20,
                    background: "#fff",
                    borderRadius: 15,
                    textAlign: "center",
                    opacity: 0.9,
                  }}
                >
                  Prüfe ob wir zu dir liefern
                </Form.Label>
                <div className="flex flex-row flex-wrap justify-center">
                  <Form.Control
                    className="text-xl w-36 mr-2 mt-1"
                    onChange={onChangeHandler}
                    value={plzEingabe}
                    type="number"
                    name=""
                    placeholder="Deine PLZ..."
                  />
                  <Button
                    className="mt-1 text-lg"
                    variant="primary"
                    onClick={onClickHandler}
                  >
                    Jetzt prüfen
                  </Button>
                </div>
              </Form.Group>
            </Form> */}
          </div>
        </div>
      )}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable="true"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="fontTitle"
          >
            UNSERE LIEFERGEBIETE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" flex mainfont dim_gray size_impressum justify-center items-center fontSize">
          {checkIO ? (
            <>
              <img src={check} alt="im Liefergebiet" className="w-1/4 p-2" />
              Deine Postleitzahl befindet sich innerhalb unseres Liefergebiets.
              <br />
              Du kannst ganz normal einen Account erstellen und an deine Adresse
              bestellen!
            </>
          ) : (
            <>
              <img
                src={checkfail}
                alt="nicht im Liefergebiet"
                className="w-1/4 p-2"
              />
              Leider befindet sich deine Postleitzahl nicht in unserem
              Liefergebiet. <br />
              Unser Angebot gilt in und nahe Regensburg.{" "}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PlzChecker;
