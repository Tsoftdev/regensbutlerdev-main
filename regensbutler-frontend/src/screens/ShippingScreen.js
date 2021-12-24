import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { getPlzItems } from "../actions/plzActions";
import Loader from "../components/Loader";
import Snackbar from "../components/Snackbar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "../components/Fonts.css";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
}));

function ShippingScreen({ history }) {
  const classes = useStyles();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [address, setAddress] = useState(userInfo.adresse);
  const [adresszusatz, setAdresszusatz] = React.useState(userInfo.adresszusatz);
  const [city, setCity] = useState(userInfo.wohnort);
  const [stockwerk, setStockwerk] = useState(userInfo.stockwerk);
  const [apartment, setApartment] = useState(userInfo.apartment);
  const [postalCode, setPostalCode] = useState(userInfo.plz);
  const country = "Deutschland";
  const [snackerror, setSnackerrorError] = React.useState(false);
  const [checkNIO, setcheckNIO] = useState(false);

  const dispatch = useDispatch();
  const plzList = useSelector((state) => state.plzList);
  const { loading, error, liefergebiete } = plzList;

  useEffect(() => {
    dispatch(getPlzItems());
  }, [dispatch]);

  const submitHandler = (e) => {
    var totalPrice = 0;
    cartItems.forEach((element) => {
      totalPrice += element.qty * element.vk;
    });
    if (totalPrice >= 30) {
      let check = liefergebiete.find((x) => x.plz === Number(postalCode));
      if (check) {
        setcheckNIO(false);
        dispatch(
          saveShippingAddress({
            address,
            city,
            stockwerk,
            apartment,
            postalCode,
            country,
          })
        );
        history.push("/lieferzeitpunkt");
      } else {
        setcheckNIO(true);
        setTimeout(() => {
          setcheckNIO(false);
        }, 2000);
      }
    } else {
      setSnackerrorError(true);
      setTimeout(() => {
        setSnackerrorError(false);
      }, 3000);
    }
  };

  return (
    <FormContainer>
      {snackerror && (
        <Snackbar
          severity={"warning"}
          alert={"Mindestbestellwert: 30 € Bestellwert"}
        />
      )}
      {checkNIO && (
        <Snackbar
          severity={"warning"}
          alert={
            "Wir liefern nicht an eine Adresse, die sich nicht in Ihrer Lieferzone befindet."
          }
        />
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <h3 style={{ marginTop: 150 }}>{error}</h3>
      ) : (
        <div className="xl:container mx-auto bg-white mt-20 p-0 mainfont">
          <CheckoutSteps step1 step2 />
          <h1 className="text-xl">Lieferadresse</h1>
          <p className="mb-6 size_text_standard">
            Die Lieferadresse kann von der im Account hinterlegten Adresse
            abweichen, muss sich aber dennoch in unserem Liefergebiet um
            Regensburg befinden.
          </p>
          <Grid container>
            <TextField
              id="Adresse"
              label="Adresse"
              variant="outlined"
              className={classes.textField}
              required
              value={address === null ? "" : address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              id="adresszusatz"
              label="adresszusatz"
              variant="outlined"
              className={classes.textField}
              required
              value={adresszusatz === null ? "" : adresszusatz}
              onChange={(e) => setAdresszusatz(e.target.value)}
            />
            <TextField
              id="Stadt"
              label="Stadt"
              variant="outlined"
              className={classes.textField}
              required
              value={city === null ? "" : city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              id="Stockwerk"
              label="Stockwerk"
              variant="outlined"
              className={classes.textField}
              value={stockwerk === null ? "" : stockwerk}
              onChange={(e) => setStockwerk(e.target.value)}
            />
            <TextField
              id="apartment"
              label="Apartment"
              variant="outlined"
              className={classes.textField}
              value={apartment === null ? "" : apartment}
              onChange={(e) => setApartment(e.target.value)}
            />
            <TextField
              id="PLZ"
              label="PLZ"
              variant="outlined"
              className={classes.textField}
              value={postalCode === null ? "" : postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <TextField
              id="Deutschland"
              label="Deutschland"
              variant="outlined"
              className={classes.textField}
              defaultValue="Deutschland"
              required
              readOnly
            />
            <Grid item xs={12} style={{ textAlign: "right" }}>
              <Button variant="primary" onClick={submitHandler}>
                Weiter
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </FormContainer>
  );
}

export default ShippingScreen;
