import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;
  const pageNum = match.params.pageNum;

  const [produkt_id, setProdukt_id] = useState(0);
  const [express_sortiment, setExpress_sortiment] = useState(false);
  const [voll_sortiment, setVoll_sortiment] = useState(true);
  const [product_lager_id, setProduct_lager_id] = useState(0);
  const [produktname, setProduktname] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [ek, setEk] = useState(0);
  const [vk, setVk] = useState(0);
  const [ustr, setUstr] = useState(0);
  const [lagerbestand, setLagerbestand] = useState(0);
  const [lagerueberwachung, setLagerueberwachung] = useState(false);
  const [kat_id, setKat_id] = useState(0);
  const [nur_von_tag, setNur_von_tag] = useState("");
  const [bis_tag, setBis_tag] = useState("");
  const [zwischen_zeit_von, setZwischen_zeit_von] = useState("");
  const [zwischen_zeit_bis, setZwischen_zeit_bis] = useState("");
  const [abogeeignet, setAbogeeignet] = useState(false);
  const [pfand, setPfand] = useState("");
  const [gewicht, setGewicht] = useState("");
  const [kalorien, setKalorien] = useState("");
  const [verpackung, setVerpackung] = useState("");
  const [bildname, setBildname] = useState("");
  const [neu_grundpreis, setNeu_grundpreis] = useState("");
  const [neu_zusatzst, setNeu_zusatzst] = useState("");
  const [neu_inhaltsst, setNeu_inhaltsst] = useState("");
  const [neu_naehrwerte, setNeu_naehrwerte] = useState("");
  const [neu_pflichthinweis, setNeu_pflichthinweis] = useState("");

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const checkBoxHandler = (e) => {
    switch (e.target.name) {
      case "express_sortiment":
        setExpress_sortiment(e.target.checked);
        break;
      case "voll_sortiment":
        setVoll_sortiment(e.target.checked);
        break;
      case "lagerueberwachung":
        setLagerueberwachung(e.target.checked);
        break;
      case "abogeeignet":
        setAbogeeignet(e.target.checked);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch(listProductDetails(productId));
      }, 3000);
    } else {
      if (product.id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setProdukt_id(product.product_id);
        setExpress_sortiment(product.express_sortiment);
        setVoll_sortiment(product.voll_sortiment);
        setProduct_lager_id(product.product_lager_id);
        setProduktname(product.produktname);
        setBeschreibung(product.beschreibung);
        setEk(product.ek);
        setVk(product.vk);
        setUstr(product.ustr);
        setLagerbestand(product.lagerbestand);
        setLagerueberwachung(product.lagerueberwachung);
        setKat_id(product.kat_id);
        setNur_von_tag(product.nur_von_tag);
        setBis_tag(product.bis_tag);
        setZwischen_zeit_von(product.zwischen_zeit_von);
        setZwischen_zeit_bis(product.zwischen_zeit_bis);
        setAbogeeignet(product.abogeeignet);
        setPfand(product.pfand);
        setGewicht(product.gewicht);
        setKalorien(product.kalorien);
        setVerpackung(product.verpackung);
        setBildname(product.bildname);
        setNeu_grundpreis(product.neu_grundpreis);
        setNeu_inhaltsst(product.neu_inhaltsst);
        setNeu_zusatzst(product.neu_zusatzst);
        setNeu_naehrwerte(product.neu_naehrwerte);
        setNeu_pflichthinweis(product.neu_pflichthinweis);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setBildname(data.Location);
      setUploading(false);
    } catch (error) {
      console.error("Upload error: " + error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        product_id: produkt_id,
        express_sortiment: express_sortiment,
        voll_sortiment: voll_sortiment,
        product_lager_id: product_lager_id,
        produktname: produktname,
        beschreibung: beschreibung,
        ek: ek,
        vk: vk,
        ustr: ustr,
        lagerbestand: lagerbestand,
        lagerueberwachung: lagerueberwachung,
        kat_id: kat_id,
        nur_von_tag: nur_von_tag,
        bis_tag: bis_tag,
        zwischen_zeit_von: zwischen_zeit_von,
        zwischen_zeit_bis: zwischen_zeit_bis,
        abogeeignet: abogeeignet,
        pfand: pfand,
        gewicht: gewicht,
        kalorien: kalorien,
        verpackung: verpackung,
        bildname: bildname,
        neu_grundpreis: neu_grundpreis,
        neu_inhaltsst: neu_inhaltsst,
        neu_zusatzst: neu_zusatzst,
        neu_naehrwerte: neu_naehrwerte,
        neu_pflichthinweis: neu_pflichthinweis,
      })
    );
  };
  return (
    <>
      <Link to={`/admin/productlist/${pageNum}`} className="btn btn-light my-3">
        Zurück
      </Link>
      <FormContainer>
        <h1>Artikel editieren</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="produktname">
              <Form.Label>Produktname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name des Produkts"
                value={produktname}
                onChange={(e) => setProduktname(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Bild</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bild"
                value={bildname}
                onChange={(e) => setBildname(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Bilddatei wählen"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="express_sortiment">
              <Form.Label>Express Sortiment</Form.Label>
              <Form.Check
                name="express_sortiment"
                type="checkbox"
                checked={express_sortiment}
                onChange={checkBoxHandler}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="voll_sortiment">
              <Form.Label>Voll Sortiment</Form.Label>
              <Form.Check
                name="voll_sortiment"
                type="checkbox"
                checked={voll_sortiment}
                onChange={checkBoxHandler}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="produkt_id">
              <Form.Label>Produkt ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="ID des Produkts"
                value={produkt_id}
                onChange={(e) => setProdukt_id(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="product_lager_id">
              <Form.Label>Produkt Lager ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Produkt Lager ID"
                value={product_lager_id}
                onChange={(e) => setProduct_lager_id(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="beschreibung">
              <Form.Label>Produktbeschreibung</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                rows="3"
                placeholder="Beschreibung des Produkts"
                value={beschreibung}
                onChange={(e) => setBeschreibung(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="ek">
              <Form.Label>Ek €</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ek des Produkts"
                value={ek}
                onChange={(e) => setEk(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="vk">
              <Form.Label>Vk €</Form.Label>
              <Form.Control
                type="number"
                placeholder="Vk des Produkts"
                value={vk}
                onChange={(e) => setVk(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="ustr">
              <Form.Label>Ustr (Beispiel: 0,05 == 5%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ustr auf das Produkt"
                value={ustr}
                onChange={(e) => setUstr(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="lagerbestand">
              <Form.Label>Lagerbestand</Form.Label>
              <Form.Control
                type="number"
                placeholder="Lagerbestand des Produkts"
                value={lagerbestand}
                onChange={(e) => setLagerbestand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="lagerueberwachung">
              <Form.Label>Lagerueberwachung?</Form.Label>
              <Form.Check
                name="lagerueberwachung"
                type="checkbox"
                checked={lagerueberwachung}
                onChange={checkBoxHandler}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="kat_id">
              <Form.Label>kat_id</Form.Label>
              <Form.Control
                type="number"
                placeholder="kat_id (Kategorie ID)"
                value={kat_id}
                onChange={(e) => setKat_id(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="nur_von_tag">
              <Form.Label>Nur_von_tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nur von Tag"
                value={nur_von_tag}
                onChange={(e) => setNur_von_tag(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="bis_tag">
              <Form.Label>bis_tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bis Tag"
                value={bis_tag}
                onChange={(e) => setBis_tag(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="zwischen_zeit_von">
              <Form.Label>zwischen_zeit_von</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zwischen Zeit von"
                value={zwischen_zeit_von}
                onChange={(e) => setZwischen_zeit_von(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="zwischen_zeit_bis">
              <Form.Label>zwischen_zeit_bis</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zwischen Zeit bis"
                value={zwischen_zeit_bis}
                onChange={(e) => setZwischen_zeit_bis(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="abogeeignet">
              <Form.Label>Abogeeignet?</Form.Label>
              <Form.Check
                name="abogeeignet"
                type="checkbox"
                checked={abogeeignet}
                onChange={checkBoxHandler}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="pfand">
              <Form.Label>Pfand</Form.Label>
              <Form.Control
                type="number"
                placeholder="Pfand"
                value={pfand}
                onChange={(e) => setPfand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="gewicht">
              <Form.Label>Gewicht</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gewicht"
                value={gewicht}
                onChange={(e) => setGewicht(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="kalorien">
              <Form.Label>Kalorien</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kalorien"
                value={kalorien}
                onChange={(e) => setKalorien(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="verpackung">
              <Form.Label>Verpackung</Form.Label>
              <Form.Control
                type="text"
                placeholder="Verpackung"
                value={verpackung}
                onChange={(e) => setVerpackung(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="neu_grundpreis">
              <Form.Label>neu_grundpreis</Form.Label>
              <Form.Control
                type="text"
                placeholder="neu_grundpreis"
                value={neu_grundpreis}
                onChange={(e) => setNeu_grundpreis(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="neu_inhaltsst">
              <Form.Label>neu_inhaltsst</Form.Label>
              <Form.Control
                type="text"
                placeholder="neu_inhaltsst"
                value={neu_inhaltsst}
                onChange={(e) => setNeu_inhaltsst(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="neu_zusatzst">
              <Form.Label>neu_zusatzst</Form.Label>
              <Form.Control
                type="text"
                placeholder="neu_zusatzst"
                value={neu_zusatzst}
                onChange={(e) => setNeu_zusatzst(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="neu_naehrwerte">
              <Form.Label>neu_naehrwerte</Form.Label>
              <Form.Control
                type="text"
                placeholder="neu_naehrwerte"
                value={neu_naehrwerte}
                onChange={(e) => setNeu_naehrwerte(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="neu_pflichthinweis">
              <Form.Label>neu_pflichthinweis</Form.Label>
              <Form.Control
                type="text"
                placeholder="neu_pflichthinweis"
                value={neu_pflichthinweis}
                onChange={(e) => setNeu_pflichthinweis(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
            {successUpdate && (
              <Message variant="success">Update erfolgreich</Message>
            )}
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default ProductEditScreen;
