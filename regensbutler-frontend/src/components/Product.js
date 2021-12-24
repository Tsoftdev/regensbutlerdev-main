import { Card, Button, Form, ListGroup, Image } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Rating from "@material-ui/lab/Rating";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
  addToFrequentlyItem,
  removeFromFrequentlyItem,
} from "../actions/frequentlyActions";
import { useDispatch, useSelector } from "react-redux";
import { SRLWrapper } from "simple-react-lightbox";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReactTooltip from "react-tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { CustomScrollbars } from "./CustomScrollbar";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "./Snackbar";
import "./Product.css";
import "./Fonts.css";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import InfoIcon from "@material-ui/icons/Info";
import PermScanWifiIcon from "@material-ui/icons/PermScanWifi";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
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
  modalLeft: {
    "@media (max-width: 1199px)": { width: "100%" },
  },
  modalRight: {
    "@media (max-width: 1199px)": { width: "100%" },
  },
}));

const Product = ({ product }) => {
  const history = useHistory();
  const [anzahlArtikel, setAnzahlArtikel] = useState(0);
  const [show, setShow] = useState(false);
  const [Altersgrenze, setAltersgrenze] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const classes = useStyles();
  const [FLfrequently, setFLfrequently] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackalert, setSnackAlert] = useState("");
  const [snackseverity, setSnackseverity] = useState("error");
  const frequently = useSelector((state) => state.frequently);
  const { frequentlyItems } = frequently;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const existItem = cartItems.find((x) => x.product === product.id);
    if (existItem) setAnzahlArtikel(existItem.qty);
    else setAnzahlArtikel(0);

    const existfrequentlyItem = frequentlyItems.find(
      (x) => x.product_id === product.product_id
    );
    if (existfrequentlyItem) setFLfrequently(true);
    else setFLfrequently(false);
  }, [cartItems, dispatch, product.id, frequentlyItems, product.product_id]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    var num = parseInt(e.target.value);
    if (num > 0) dispatch(addToCart(product.id, num));
    else dispatch(removeFromCart(product.id, 0));
  };

  const handleAnzahl = (e) => {
    switch (e.target.name) {
      case "plusItem":
        if (product.Altersgrenze === 18) setAltersgrenze(true);
        else {
          dispatch(addToCart(product.id, anzahlArtikel + 1));
          setShowSnackbar(true);
          setSnackseverity("success");
          setSnackAlert("Produkt in den Warenkorb gelegt");
          setTimeout(function () {
            setShowSnackbar(false);
            setSnackseverity("");
            setSnackAlert("");
          }, 2000);
        }
        break;
      case "minusItem":
        if (anzahlArtikel > 0) {
          dispatch(removeFromCart(product.id, anzahlArtikel - 1));
          setShowSnackbar(true);
          setSnackseverity("warning");
          setSnackAlert("Produkt in den Warenkorb entfernt");
          setTimeout(function () {
            setShowSnackbar(false);
            setSnackseverity("");
            setSnackAlert("");
          }, 2000);
        }
        break;
      default:
        break;
    }
  };

  const handlefrequently = (key) => {
    if (userInfo) {
      switch (key) {
        case "plusfrequentlyItem":
          // if (product.Altersgrenze === 18) setAltersgrenze(true);
          // else {
          dispatch(addToFrequentlyItem(product, 1, userInfo._id));
          setShowSnackbar(true);
          setSnackseverity("success");
          setSnackAlert("Produkt zu den Favoriten hinzugefügt");
          setTimeout(function () {
            setShowSnackbar(false);
            setSnackseverity("");
            setSnackAlert("");
          }, 2000);
          // }
          break;
        case "minusfrequentlyItem":
          dispatch(removeFromFrequentlyItem(product, 0, userInfo._id));
          setShowSnackbar(true);
          setSnackseverity("warning");
          setSnackAlert("Produkt aus den Favoriten entfernt");
          setTimeout(function () {
            setShowSnackbar(false);
            setSnackseverity("");
            setSnackAlert("");
          }, 2000);
          break;
        default:
          break;
      }
    }
    else {
      history.push("/login")
    }
  };

  return (
    <>
      {showSnackbar && (
        <Snackbar
          severity={snackseverity}
          posVert="bottom"
          posHori="left"
          alert={snackalert}
        />
      )}
      <div>
        <Dialog
          open={Altersgrenze}
          onClose={() => {
            setAltersgrenze(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>Dieses Produkt ist nur für Erwachsene.</div>
              <div>
                Bitte halten Sie bei Lieferung einen Altersnachweis(Ausweis,
                Führerschein) bereit!
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setAltersgrenze(false);
              }}
              className={classes.btnDisagree}
              color="secondary"
              variant="contained"
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                dispatch(addToCart(product.id, anzahlArtikel + 1));
                setAltersgrenze(false);
                setShowSnackbar(true);
                setSnackseverity("success");
                setSnackAlert("Produkt in den Warenkorb gelegt");
                setTimeout(function () {
                  setShowSnackbar(false);
                  setSnackseverity("");
                  setSnackAlert("");
                }, 2000);
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
      <ReactTooltip id={product.id.toString()} type="dark" />
      <Card
        style={{
          minHeight: "440px",
          textAlign: "center",
          boxShadow: "inset rgb(230 233 255) 5px 5px 10px 0px",
          position: "relative",
        }}
        className="mx-0 my-3 p-2 rounded h-100 card__hover"
      >
        <div
          style={{
            position: "absolute",
            cursor: "pointer",
          }}
        >
          {!FLfrequently && (
            <FavoriteBorderIcon
              name="plusfrequentlyItem"
              onClick={() => {
                handlefrequently("plusfrequentlyItem");
              }}
              style={{
                color: "#ff0000",
              }}
              id="plusfrequentlyItem"
            />
          )}
          {FLfrequently && (
            <FavoriteIcon
              name="minusfrequentlyItem"
              onClick={() => {
                handlefrequently("minusfrequentlyItem");
              }}
              style={{
                color: "#ff0000",
              }}
              id="minusfrequentlyItem"
            />
          )}
        </div>
        <Card.Img
          src={
            product.bildname
              ? product.pictureurl + product.bildname
              : product.pictureurl + "noimage.jpg"
          }
          className="modal-product-image"
          style={{ cursor: "pointer" }}
          variant="top"
          onClick={() => setShow(true)}
        />

        <Card.Body onClick={() => setShow(true)} style={{ cursor: "pointer" }}>
          <Card.Title as="div" className="roboto text-xl">
            {product.produktname}
          </Card.Title>

          <Card.Text as="div">
            <p className="mb-2 flex-wrap">
              {product.beschreibung.length > 40
                ? product.beschreibung.substring(0, 40) + " ..."
                : product.beschreibung}
            </p>
            <Rating
              name={product.produktname}
              value={product.rating}
              precision={0.5}
              readOnly
            />
            <div>
              {`${product.numReviews > 1
                ? product.numReviews + " Bewertungen"
                : product.numReviews + " Bewertung"
                }`}
            </div>
          </Card.Text>
          <Card.Text as="h1" className="product__preis">
            € {product.vk}
          </Card.Text>
        </Card.Body>

        <Card.Footer className="flex flex-col items-center justify-center">
          <div className="flex flex-row h-14">
            <Button
              className="text-base w-14 h-14"
              onClick={handleAnzahl}
              name="minusItem"
              variant={anzahlArtikel > 0 ? "danger" : "secondary"}
              disabled={anzahlArtikel > 0 ? false : true}
            >
              -
            </Button>

            <Form.Control
              className="nospin w-16 h-14 mr-1.5 ml-1.5 items-center text-center text-xl"
              value={anzahlArtikel}
              onChange={onChangeHandler}
            ></Form.Control>

            <Button
              className="text-base w-14 h-14 add-to-cart"
              onClick={handleAnzahl}
              name="plusItem"
              variant="danger"
            >
              +
            </Button>
          </div>
          <div className="flex flex-row">
            <span className="text-md">Stück</span>
          </div>
        </Card.Footer>
      </Card>

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
            PRODUKT DETAILS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="mainfont dim_gray size_impressum"
          style={{ height: 800 }}
        >
          <CustomScrollbars
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="modal-top-container">
                  <div
                    className={clsx(
                      `modal-top-container-left`,
                      classes.modalLeft
                    )}
                  >
                    <h1>{product.produktname}</h1>
                    <p>
                      {product.beschreibung.length > 40
                        ? `${product.beschreibung.substring(0, 40)}...`
                        : product.beschreibung}
                    </p>
                    <p className="product__preis">€ {product.vk.toFixed(2)}</p>
                    <p className="text-gray text-sm">
                      <strong>Pfand:</strong> € {product.pfand.toFixed(2)}
                    </p>
                    <p
                      className="text-gray text-sm"
                      style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    >
                      <strong>Lagerbestand:</strong>{" "}
                      {product.express_sortiment
                        ? product.lagerbestand
                        : "Wird für Sie aus einem lokalen Geschäft besorgt."}
                    </p>
                    <p
                      className="text-gray text-sm"
                      style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    >
                      <strong>Kategorie:</strong>{" "}
                      {`${product.kategorie} -> ${product.unterkategorie} -> ${product.direktkategorie}`}
                    </p>
                    <ListGroup variant="flush">
                      <ListGroup.Item
                        variant="flush"
                        className="flex flex-col items-center justify-left pl-0"
                      >
                        <div className="flex flex-row">
                          <Button
                            className="text-base w-10"
                            onClick={handleAnzahl}
                            name="minusItem"
                            variant={anzahlArtikel > 0 ? "danger" : "secondary"}
                            disabled={anzahlArtikel > 0 ? false : true}
                          >
                            -
                          </Button>

                          <Form.Control
                            className="nospin w-16 mr-1.5 ml-1.5 items-center text-center text-base"
                            value={`${anzahlArtikel}`}
                            onChange={onChangeHandler}
                          ></Form.Control>

                          <Button
                            className="text-base w-10 add-to-cart"
                            onClick={handleAnzahl}
                            name="plusItem"
                            variant="danger"
                          >
                            +
                          </Button>
                        </div>
                        <div className="flex flex-row">
                          <span className="text-xs">Stück</span>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                  <div
                    className={clsx(
                      `modal-top-container-right`,
                      classes.modalRight
                    )}
                  >
                    <Image
                      className="modal-product-image border-none"
                      thumbnail
                      src={
                        product.bildname
                          ? product.pictureurl + product.bildname
                          : product.pictureurl + "noimage.jpg"
                      }
                      alt={product.produktname}
                    />
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>Bewertung: </h3>
                <Rating
                  name={product.bildname}
                  value={product.rating}
                  readOnly
                />
                <div>
                  {`${product.numReviews > 1
                    ? product.numReviews + " Bewertungen"
                    : product.numReviews + " Bewertung"
                    }`}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <FitnessCenterIcon
                  style={{ color: "#303030", fontSize: "1.4em", float: "left" }}
                />
                <h3>Gewicht: </h3>
                <p className="normal_text">{product.gewicht}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <AcUnitIcon
                  style={{
                    color: "steelblue",
                    fontSize: "1.4em",
                    float: "left",
                  }}
                />
                <h3>Tiefkühlprodukt: </h3>
                <p className="normal_text">{`${product.tiefkuehlware ? "Ja" : "Nein"
                  }`}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <InfoIcon
                  style={{ color: "purple", fontSize: "1.4em", float: "left" }}
                />
                <h3>Nährwerte: </h3>
                <p className="normal_text">{product.neu_naehrwerte}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <InfoIcon
                  style={{ color: "purple", fontSize: "1.4em", float: "left" }}
                />
                <h3>Inhaltstoffe: </h3>
                <p className="normal_text">{product.neu_inhaltsstoffe}</p>
                <SRLWrapper>
                  <Image
                    className="modal-product-image border-none"
                    thumbnail
                    src={
                      product.bildname_inhaltsstoffe
                        ? product.pictureurl +
                        +"inhaltsstoffe/" +
                        product.bildname_inhaltsstoffe
                        : product.pictureurl +
                        "inhaltsstoffe/" +
                        "noinhaltsstoffe.jpg"
                    }
                    alt={product.produktname}
                  />
                </SRLWrapper>
              </ListGroup.Item>
              <ListGroup.Item>
                <InfoIcon
                  style={{ color: "purple", fontSize: "1.4em", float: "left" }}
                />
                <h3>Zusatzstoffe: </h3>
                <p className="normal_text">{product.neu_zusatzst}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <PermScanWifiIcon
                  style={{ color: "darkred", fontSize: "1.4em", float: "left" }}
                />
                <h3>Pflichthinweise: </h3>
                <p className="normal_text">{product.neu_pflichthinweis}</p>

                {product.Altersgrenze >= 18 && (
                  <p className="normal_text" style={{ marginTop: 10 }}>
                    Dieses Produkt ist nur für Erwachsene
                    <br />
                    Bitte halten Sie einen Altersnachweis bei der Anlieferung
                    bereit - Danke!
                  </p>
                )}

                {product.voll_sortiment && !product.express_sortiment && (
                  <p className="normal_text" style={{ marginTop: 10 }}>
                    Das Produkt befindet sich <strong>nur</strong> im
                    Voll-Sortiment.
                    <br />
                    Die Verfügbarkeit kann nicht immer garantiert werden.
                    <br />
                    Es handelt sich somit um eine Anfrage.
                  </p>
                )}
              </ListGroup.Item>
            </ListGroup>
          </CustomScrollbars>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Product;
