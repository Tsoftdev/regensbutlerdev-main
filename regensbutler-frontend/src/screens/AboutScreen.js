import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

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
  textP: {
    marginTop: "20px",
  },
});
const AboutScreen = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <h1 className={classes.headerH1}>Über Regensbutler</h1>
      <p className={classes.textP}>
        Wir sind Regensburgs Onlinelieferdienst. Nur innerhalb von Regensburg
        sowie angrenzenden Gemeinden liefern wir hauptsächlich Lebensmittel,
        Getränke und Drogerieartikel aber auch überraschend viele weitere
        Produkte die Sie in unserem Shop entdecken können. Hohe Qualität und
        Vielfalt bieten wir Ihnen über unsere starken Partner wie Edeka Ott &
        Fuchs oder Metro Regensburg.
      </p>
      <p className={classes.textP}>
        Sie lieben unsere Edeka Lebensmittel? Diese können Sie übrigens auch
        persönlich shoppen und zwar in der Joseph-Dahlem-Straße 7, 93049
        Regensburg.
      </p>
      <p className={classes.textP}>
        Unsere Lieferungen bieten wir zu zwei verschiedenen Zeitfenstern täglich
        an. Für angrenzende Gemeinden haben wir jeweils zwei Lieferfenster pro
        Woche, wir hoffen Ihnen somit eine gute Möglichkeit zu bieten regelmäßig
        zu bestellen und bitten um Verständnis dafür, dass wir nicht öfter
        kommen können.
      </p>
      <p className={classes.textP}>
        Eine tolle Auswahl von insgesamt über 15000 Artikeln steht Ihnen zur
        Verfügung und Sie dürfen nach dem typischen Butlerprinzip Ihre
        Lebensmittelbestellung von verschiedenen Anbietern kombinieren!
      </p>
      <p className={classes.textP}>
        Ihre Bestellungen für das Lieferzeitfenster 14-18 Uhr geben Sie bitte
        bis 12:00 Uhr ab. Ausserdem haben wir mit 20-23 Uhr ein zweites
        Lieferzeitfenster für Sie eröffnet, Bestellungen hierfür können Sie noch
        bis 18:00 Uhr abgeben. Somit erhalten Sie von uns die mit Abstand
        schnellsten Lieferungen aus einem Supermarkt Komplettsortiment in der
        Oberpfalz!
      </p>
      <p className={classes.textP}>
        Wir setzen auf Ihr Verständnis falls wir Ihnen einmal ein Produkt doch
        nicht liefern können, das vielleicht ausgegangen ist. In diesem Fall
        schreiben wir Ihrem Kundenkonto den Kaufbetrag der ausverkauften
        Produkte gut und Sie können diese bei Folgelieferungen anrechnen. Wir
        freuen uns Sie beliefern zu dürfen. Vielen Dank für Ihr Interesse am
        Regensbutler.
      </p>
      <h1 className={classes.headerH1}>Unsere Geschichte</h1>
      <p className={classes.textP}>
        Regensbutler ist als Notprojekt der Pauer Kriwoschej GbR, besser bekannt
        als "DeinButler" ursprünglich im März 2020 angelegt worden. In der
        "Viruskrise" hat der "Superbutler Minimarkt", Vorläufer von Regensbutler
        und nach wie vor im Angebot auf www.deinbutler.de, kurzfristig ein sehr
        kleines Notsortiment an Lebensmitteln und Alltagsartikeln
        zusammengestellt um für alle die sich isolieren mussten eine Möglichkeit
        zu schaffen sich zu versorgen. Seit Mai 2020 bieten wir ein großes
        Angebot auf dieser neu entwickelten Website (www.regensbutler.de) und
        liefern diese Bestellung auch mit professionellen Kühlfahrzeugen aus.
        Das Liefergebiet von Regensbutler wurde gegenüber der Notlösung
        "Superbutler Minimarkt" auf vielfachen Wunsch stark erweitert. Vororte
        können aber aus logistischen wie kostentechnischen Gründen leider nur
        2mal wöchentlich angefahren werden, wir hoffen und denken allerdings,
        dass das schon einmal besser ists "als nichts" und dass Sie, liebe
        Kunden aus den angrenzenden Gemeinden, sich damit auch arrangieren
        können. Nochmals danke für Ihr Interesse und hoffentlich bis bald, Ihr
        Butler-Team
      </p>
    </Container>
  );
};

export default AboutScreen;
