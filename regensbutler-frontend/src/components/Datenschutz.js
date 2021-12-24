import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ListGroup } from "react-bootstrap";
import "./Fonts.css";

function Datenschutz() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        className="impressum_button"
        variant="secondary"
        onClick={() => setShow(true)}
      >
        Datenschutz
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
            <h1>DATENSCHUTZ</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mainfont dim_gray size_impressum">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Datenschutzerklärung</h1>
              <br />
              Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz
              Ihrer Privatsphäre ist für uns sehr wichtig. Nachstehend
              informieren wir Sie ausführlich über den Umgang mit Ihren Daten,
              Erhebung, Verarbeitung und Nutzung personenbezogener Daten. Sie
              können unsere Seite besuchen, ohne Angaben zu Ihrer Person zu
              machen. Wir speichern lediglich Zugriffsdaten ohne Personenbezug
              wie z.B. den Namen Ihres Internet Service Providers, die Seite,
              von der aus Sie uns besuchen oder den Namen der angeforderten
              Datei. Diese Daten werden ausschließlich zur Verbesserung unseres
              Angebotes ausgewertet und erlauben keinen Rückschluss auf Ihre
              Person.
              <br />
              <br /> Personenbezogene Daten werden nur erhoben, wenn Sie uns
              diese im Rahmen Ihrer Warenbestellung oder bei Eröffnung eines
              Kundenkontos oder Registrierung für unseren Newsletter freiwillig
              mitteilen. Wir verwenden die von ihnen mitgeteilten Daten ohne
              Ihre gesonderte Einwilligung ausschließlich zur Erfüllung und
              Abwicklung Ihrer Bestellung, bei Eröffnung eines Kundenkontos,
              zudem zur Verwaltung Ihres Kundenkontos und der Bonuspunkte. Mit
              vollständiger Abwicklung des Vertrages und vollständiger
              Kaufpreiszahlung werden Ihre Daten für die weitere Verwendung
              gesperrt und nach Ablauf der steuer- und handelsrechtlichen
              Aufbewahrungsfristen gelöscht, sofern Sie nicht ausdrücklich in
              die weitere Nutzung Ihrer Daten eingewilligt haben.
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Newsletter</h2>
              <br />
              Bei Anmeldung zum Newsletter wird Ihre E-Mail-Adresse für eigene
              Werbezwecke genutzt, bis Sie sich vom Newsletter abmelden, was
              jederzeit möglich ist. Diese Einwilligung zur Nutzung Ihrer
              E-Mail-Adresse für Werbezwecke können Sie jederzeit mit Wirkung
              für die Zukunft widerrufen, indem Sie den Link „Abmelden“ am Ende
              des Newsletters anklicken und sich auf der verlinkten Abmeldeseite
              abmelden.
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Kundenkonto</h2>
              <br />
              Bei Eröffnung eines Kundekontos werden die Daten zur Verwaltung
              Ihres Kundenkontos sowie zur Verwaltung Ihrer Bonuspunkte
              gespeichert. Die Löschung des Kundenkontos ist jederzeit möglich.
              Dadurch werden sämtliche Ihrer im Kundenkonto gespeicherten Daten
              gelöscht. Mit der Löschung verfallen sämtliche Bonuspunkte, da
              diese dann nicht mehr gespeichert und verwaltet werden können.
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Verwendung von Cookies</h2>
              <br />
              Um den Besuch unserer Website attraktiv zu gestalten und die
              Nutzung bestimmter Funktionen zu ermöglichen, verwenden wir auf
              verschiedenen Seiten sogenannte Cookies. Hierbei handelt es sich
              um kleine Textdateien, die auf Ihrem Endgerät abgelegt werden.
              Einige der von uns verwendeten Cookies werden nach dem Ende der
              Browser-Sitzung, also nach Schließen Ihres Browsers, wieder
              gelöscht (sog. Sitzungs-Cookies). Andere Cookies verbleiben auf
              Ihrem Endgerät und ermöglichen uns Ihren Browser beim nächsten
              Besuch wiederzuerkennen (persistente Cookies).
              <br />
              <br /> Sie können Ihren Browser so einstellen, dass Sie über das
              Setzen von Cookies informiert werden und einzeln über deren
              Annahme entscheiden oder die Annahme von Cookies für bestimmte
              Fälle oder generell ausschließen. Bei der Nichtannahme von Cookies
              kann die Funktionalität unserer Website eingeschränkt sein.
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Erstellung pseudonymer Nutzungsprofile zur Webanalyse</h2>
              <br />
              Diese Website nutzt Google Analytics, einen Webanalysedienst der
              Google Inc. („Google“). Dabei verwendet Google Analytics sog.
              „Cookies“, also Textdateien, die auf Ihrem Computer gespeichert
              werden und eine Analyse der Websitenutzung durch Sie ermöglichen.
              Die durch den Cookie erzeugten Informationen über Ihre Benutzung
              dieser Website werden i.d.R. an einen Server von Google in den USA
              übertragen und gespeichert. Im Falle der Aktivierung der
              IP-Anonymisierung auf dieser Website wird Ihre IP-Adresse von
              Google innerhalb von Mitgliedstaaten der Europäischen Union oder
              in anderen Vertragsstaaten des Abkommens über den Europäischen
              Wirtschaftsraum gekürzt. Nur in Ausnahmefällen wird die volle
              IP-Adresse an einen Server von Google in den USA übertragen und
              dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google
              diese Informationen nutzen, um Ihre Nutzung der Website
              auszuwerten, Reports über Websiteaktivitäten zusammenzustellen und
              um weitere, mit der Websitenutzung und der Internetnutzung
              verbundene, Dienstleistungen gegenüber dem Websitebetreiber zu
              erbringen. Die im Rahmen von Google Analytics von Ihrem Browser
              übermittelte IP-Adresse wird nicht mit anderen Daten von Google
              zusammengeführt. Sie können die Cookie-Speicherung durch eine
              entsprechende Einstellung Ihres Browsers verhindern. Wir weisen
              Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls
              nicht sämtliche Funktionen dieser Website vollumfänglich nutzen
              können. Darüber hinaus können Sie die Erfassung der durch das
              Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten
              (inkl. Ihrer IP-Adresse) sowie die Verarbeitung dieser Daten durch
              Google verhindern, indem sie das unter dem folgenden Link
              verfügbare Browser-Plugin herunterladen und installieren
              http://tools.google.com/dlpage/gaoptout?hl=de. Nähere
              Informationen finden Sie unter
              http://tools.google.com/dlpage/gaoptout?hl=de bzw.
              http://www.google.com/intl/de/analytics/privacyoverview.html
              (allgemeine Informationen zu Google Analytics und Datenschutz).
              Wir weisen darauf hin, dass auf dieser Website Google Analytics um
              den Code „gat._anonymizeIp();“ erweitert wurde, um die IP-Adressen
              durch Löschung des letzten Oktett zu anonymisieren.
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <h2>Weitergabe personenbezogener Daten</h2>
              <br />
              Eine Weitergabe Ihrer Daten an Dritte oder eine Nutzung zu
              Werbezwecken Dritter erfolgt nicht. Ihre personenbezogenen Daten
              werden im Bestellprozess verschlüsselt mittels SSL-Verschlüsselung
              über das Internet übertragen. Wir sichern unsere Website und
              sonstigen Systeme durch technische und organisatorische Maßnahmen
              gegen Verlust, Zerstörung, Zugriff, Veränderung oder Verbreitung
              Ihrer Daten durch unbefugte Personen. Trotz regelmäßiger
              Kontrollen ist ein vollständiger Schutz gegen alle Gefahren jedoch
              nicht möglich. Der Zugang zu Ihrem Kundenkonto ist nur nach
              Eingabe Ihres persönlichen Passwortes möglich. Sie sollten Ihre
              Zugangsinformationen stets vertraulich behandeln und das
              Browserfenster schließen, wenn Sie die Kommunikation mit uns
              beendet haben, insbesondere wenn Sie den Computer gemeinsam mit
              anderen nutzen. Nach dem Bundesdatenschutzgesetz haben Sie ein
              Recht auf unentgeltliche Auskunft über Ihre gespeicherten Daten
              sowie ggf. ein Recht auf Berichtigung, Sperrung oder Löschung
              dieser Daten.
            </ListGroup.Item>
            <ListGroup.Item>
              <br />
              <h2>Ansprechpartner für Datenschutz</h2>
              <br />
              Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer
              personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung
              oder Löschung von Daten sowie Widerruf erteilter Einwilligungen
              wenden Sie sich bitte an:
              <br />
              <br />
              Daniel Pauer oder Nemo Kriwoschej-Magnusson
              <br />
              Tel. 0941 / 569 561 40
              <br />
              Fax 0941 / 569 561 409
              <br />
              Internet: www.deinbutler.de
              <br />
              E-Mail: info@deinbutler.de
              <br />
              <br />
              Die nachstehenden Einwilligungen haben Sie uns gegebenenfalls
              ausdrücklich erteilt und wir haben Ihre Einwilligung
              protokolliert. Nach dem Telemediengesetz sind wir verpflichtet,
              den Inhalt von Einwilligungen jederzeit zum Abruf bereit zu
              halten. Sie können Ihre Einwilligung(en) jederzeit mit Wirkung für
              die Zukunft widerrufen.
              <br />
              <br />
              a) Erlaubnis zur E-Mail-Werbung Ich möchte regelmäßig interessante
              Angebote per E-Mail erhalten. Meine E-Mail-Adresse wird nicht an
              andere Unternehmen weitergegeben. Diese Einwilligung zur Nutzung
              meiner E-Mail-Adresse für Werbezwecke kann ich jederzeit mit
              Wirkung für die Zukunft widerrufen, indem ich den Link „Abmelden“
              am Ende des Newsletters anklicke und mich auf der verlinkten
              Abmeldeseite abmelde.
              <br />
              <br />
              b) Registrierung: Ich möchte mich für künftige Bestellungen
              registrieren und bitte um Aufnahme meiner Daten in Ihre
              Kundendatenbank.
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Datenschutz;
