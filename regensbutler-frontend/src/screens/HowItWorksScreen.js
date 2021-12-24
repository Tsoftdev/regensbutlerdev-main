import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles({
  root: {},
  container: {
    fontFamily: "Source Sans Pro",
    lineHeight: "1.2em",
    fontSize: "22px",
    marginTop: "100px",
    padding: "40px 20px",
  },
  headerH1: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: "45px",
    marginTop: "20px",
  },
  headerH2: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: "32px",
    marginTop: "20px",
  },
  textP: {
    marginTop: "20px",
  },
});
const HowItWorksScreen = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <h1 className={classes.headerH1}>Wie funktioniert's?</h1>
      <h2 className={classes.headerH2}>
        <ArrowForwardIosIcon /> Befindest du dich in unserem Liefergebiet?
      </h2>
      <p className={classes.textP}>
        Prüfen Sie zunächst auf der Startseite, ob Ihre Postleitzahl in unserem
        Liefergebiet liegt. Wir liefern in und um Regensburg.{" "}
      </p>
      <h2 className={classes.headerH2}>
        <ArrowForwardIosIcon /> Einloggen oder neu registrieren
      </h2>
      <p className={classes.textP}>
        Loggen Sie sich in Ihren Account ein oder registrieren Sie sich neu.
      </p>
      <h2 className={classes.headerH2}>
        <ArrowForwardIosIcon /> Produkte in den Warenkorb legen
      </h2>
      <p className={classes.textP}>
        Legen Sie Produkte nach Ihrem Geschmack in den Warenkorb.
      </p>
      <h2 className={classes.headerH2}>
        <ArrowForwardIosIcon /> Bestellvorgang durchführen
      </h2>
      <p className={classes.textP}>
        Über den Warenkorb gelangen Sie mit dem Button "Jetzt bestellen" in den
        Checkout Bereich. Sie machen hier Angaben zum gewünschten Liefertermin,
        der Lieferadresse und Zahlungsmethode. Sobald Sie Ihre Bestellung
        abgeschlossen haben wird diese umgehend vom Butler-Team bearbeitet.
        Innerhalb des gewählten Lieferzeitfensters wird dann ein Butler bei
        Ihnen erscheinen, Ihnen Ihre Bestellung übergeben oder bei Nicht
        Antreffen vor der Tür für Sie abstellen. Sie können Ihre getätigten
        Bestellungen nach dem Einloggen in Ihrem Account ansehen und nach der
        Lieferung gegebenenfalls bewerten! Für Bewertungen erhalten Sie
        Bonuspunkte, welche bei Ihrer nächsten Bestellung für Vergünstigungen
        eingesetzt werden können.
      </p>
      <h2 className={classes.headerH2}>
        <ArrowForwardIosIcon /> Abonnement Bestellungen
      </h2>
      <p className={classes.textP}>
        Gerne Liefern wir Ihnen Ihre Artikel auch wiederholend zu bestimmten
        Lieferzeiten.
      </p>
      <p className={classes.textP}>
        Bei Problemen oder Fragen können Sie uns täglich zwischen 11 Uhr und
        23:30 Uhr gerne auch telefonisch unter 0941/56956140 kontaktieren. Wir
        freuen uns sehr über Ihr Interesse an unserem Lieferdienst und wünschen
        Ihnen viel Freude mit Ihrer Bestellung!
      </p>
    </Container>
  );
};

export default HowItWorksScreen;
