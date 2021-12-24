import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ListGroup } from "react-bootstrap";
import "./Fonts.css";

function AGB() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        className="impressum_button"
        variant="secondary"
        onClick={() => setShow(true)}
      >
        AGB
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
            <h1>REGENSBUTLER AGB</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mainfont dim_gray size_impressum">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Allgemeine Geschäftsbedingungen Regensbutler</h1>
              <ul style={{ listStyle: "none" }}>
                <li>§ 1 Geltungsbereich und Anbieter</li>
                <li>§ 2 Vertragsschluss</li>
                <li>§ 3 Preise</li>
                <li>§ 4 Lieferkosten</li>
                <li>§ 5 Lieferbedingungen</li>
                <li>§ 6 Zahlungsbedingungen</li>
                <li>§ 7 Eigentumsvorbehalt</li>
                <li>§ 8 Ausschluss des Widerrufsrechts</li>
                <li>§ 9 Transportschäden</li>
                <li>§ 10 Gefahrübergang, Entgegennahme</li>
                <li>§ 11 Gewährleistung</li>
                <li>§ 12 Schutz von Minderjährigen</li>
                <li>§ 13 Kundenzufriedenheitsabfrage/Bonuspunkte</li>
                <li>§ 14 Schlussbestimmungen</li>
              </ul>
              Allgemeine Geschäftsbedingungen (mit gesetzlichen Informationen)
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 1 Geltungsbereich und Anbieter</h3>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle
              Bestellungen, die Verbraucher (§13 BGB) und Unternehmer über den
              Online-Shop DeinButler der
              <br />
              <br />
              Pauer Kriwoschej GbR
              <br />
              Landshuterstraße 48a
              <br />
              93053 Regensburg
              <br />
              Vertreten durch:
              <br />
              Daniel Pauer
              <br />
              Nemo Kriwoschej-Magnusson
              <br />
              (nachfolgend „DeinButler“) abgeben. Verbraucher ist jede
              natürliche Person, die ein Rechtsgeschäft zu einem Zwecke
              abschließt, der weder ihrer gewerblichen noch ihrer
              selbstständigen beruflichen Tätigkeit zugerechnet werden kann.
              <br />
              <br />
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
              <br />
              <br />
              DeinButler bietet die Bestellung und Auslieferung von Getränken,
              sowie Speisen aus seinen ausgewählten Partnerrestaurants an.
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 2 Vertragsschluss</h3>
              <p>
                § 2.1 Die Produktdarstellungen auf deinbutler.de dienen zur
                Abgabe eines Kaufangebotes und stellen noch kein verbindliches
                Angebot von DeinButler dar. Die Verfügbarkeit der Ware hängt in
                hohem Maße von der Verfügbarkeit dritter Dienstleister ab.
                DeinButler kann daher die Auswahl jederzeit, insbesondere wegen
                fehlender Verfügbarkeit, und ohne Nennung von Gründen begrenzen
                oder für alle oder einzelne Nutzer sperren.
              </p>
              <p>
                § 2.2 Mit Anklicken des Buttons „kaufen“ zusammen mit der
                Aktivierung der Akzeptanzkästchen auf der Bestellseite zur
                Zustimmung zu den AGB und zu den Datenschutzbestimmungen werden
                diese Vertragsbestandteil und Sie geben ein verbindliches
                Kaufangebot ab.
              </p>
              <p>
                Bei telefonischer Bestellung geben Sie mit Abgabe Ihrer
                Bestellung am Telefon gegenüber unserem Mitarbeiter ein
                verbindliches Kaufangebot ab.
              </p>
              <p>
                Vor Abgabe Ihrer Bestellung erhalten Sie eine Übersicht über die
                gewählten Positionen und die voraussichtliche Lieferzeit. Um
                Ihre Bestellung zu ändern, haben Sie die Möglichkeit zurück zum
                Warenkorb zu gehen und dort die gewünschten Änderungen
                vorzunehmen.
              </p>
              <p>
                § 2.3 Wir können Ihre Bestellung durch Versand einer separaten
                Auftragsbestätigung per E-Mail oder durch Auslieferung der Ware
                am Tag der Bestellung, beziehungsweise bei Vorbestellung, am Tag
                der Wunschlieferung, annehmen. Die Bestätigung des Zugangs der
                Bestellung erfolgt durch automatisierte E-Mail unmittelbar nach
                dem Absenden der Bestellung. Diese Bestellbestätigung stellt
                noch keine Vertragsannahme dar.
              </p>
              <p>
                § 2.4 Sollte unsere Bestellbestätigung Schreib- oder Druckfehler
                enthalten oder sollten unserer Preisfestlegung technisch
                bedingte Übermittlungsfehler zu Grunde liegen, so sind wir zur
                Anfechtung berechtigt, wobei wir Ihnen unseren Irrtum beweisen
                müssen. Bereits erfolgte Zahlungen werden Ihnen unverzüglich
                erstattet.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 3 Preise/Mindestbestellwert</h3>
              <p>
                Die auf den Produktseiten genannten Preise enthalten die
                gesetzliche Mehrwertsteuer und sonstige Preisbestandteile. Der
                genaue Mindestbestellwert wird in Abhängigkeit der Lieferstrecke
                und der Anzahl der ausgewählten Restaurants berechnet und Ihnen
                beim Bestellprozess individuell angezeigt.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 4 Lieferkosten</h3>
              <p>
                § 4.1 Für die Standardlieferung = Flex im Liefergebiet werden
                keine Lieferkosten berechnet.
                <br />§ 4.2 Falls Sie sich für die Option Expresslieferung
                entschieden haben, werden Liefergebühren von 4,50 EUR erhoben.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 5 Lieferbedingungen und Selbstbelieferungsvorbehalt</h3>
              <p>
                5.1 Die Lieferung erfolgt nur in Deutschland und nur innerhalb
                des Liefergebiets. Das Liefergebiet umfasst das Stadtgebiet
                Regensburg sowie das angrenzende Umland bis maximal 12 km
                Entfernung vom gewählten Partnerrestaurant. Falls mehr als ein
                Partnerrestaurant an der Bestellung beteiligt ist, so beträgt
                die maximale Gesamtstrecke zum Kunden 12 km. Ihnen werden nach
                Angabe der Lieferadresse lediglich jene Restaurants und
                Kombinationen angeboten, die diese Kriterien erfüllen.
                <br />
                Eine Belieferung ist nur von maximal drei verschiedenen
                Restaurants möglich.
              </p>
              <p>
                § 5.2 Die Lieferzeit wird individuell nach Lieferadresse,
                Restaurant- und Speisenauswahl berechnet und Ihnen vor Abschluss
                Ihrer Bestellung angezeigt.
              </p>
              <p>
                § 5.3 Sie haben die Möglichkeit gegen Aufpreis von 4,50 EUR eine
                Expresslieferung zu wählen. Falls Sie sich für die Option
                Expresslieferung entschieden haben, verringert sich die
                voraussichtliche Lieferzeit. Die jeweilige Expresslieferzeit
                wird Ihnen vor Absendung Ihrer Bestellung angezeigt.
              </p>
              <p>
                § 5.4 Die Einhaltung des voraussichtlichen Lieferzeitraumes
                setzt voraus, dass Ihre Bestellung konkret und
                individualisierbar erfolgte, Sie für Rückfragen unter der
                angegebenen bzw. gespeicherten Telefonnummer erreichbar sind und
                Sie sicherstellen, dass an die genannte Lieferadresse geliefert
                werden kann. Ist eine Lieferung aufgrund Ihres Verschuldens
                nicht möglich, so ist DeinButler zum Rücktritt berechtigt. Als
                Schadensersatz wird Ihnen mindestens der Bestellpreis zuzüglich
                5,00 EUR Bearbeitungsgebühr in Rechnung gestellt. Die
                Geltendmachung weiteren Schadenersatzes bleibt vorbehalten. Vom
                Kunden zu vertretende Umstände sind insbesondere die fehlende
                oder unvollständige oder falsche Angabe der Lieferadresse, der
                Kontaktperson oder der Kontakttelefonnummer sowie das
                Nichtantreffen einer zur Abnahme bereiten und bevollmächtigten
                Person im vereinbarten Lieferzeitraum.
              </p>
              <p>
                § 5.5 Sollten nicht alle bestellten Produkte vorrätig sein, sind
                wir zu Teillieferungen auf unsere Kosten berechtigt, soweit dies
                für Sie zumutbar ist.
              </p>
              <p>
                § 5.6 Wenn das bestellte Produkt nicht verfügbar ist, weil wir
                mit diesem Produkt von unseren Lieferanten ohne eigenes
                Verschulden nicht beliefert werden, können wir vom Vertrag
                zurücktreten. In diesem Fall werden wir Sie unverzüglich
                informieren und Ihnen ggf. die Lieferung eines vergleichbaren
                Produktes vorschlagen. Wenn kein vergleichbares Produkt
                verfügbar ist oder Sie keine Lieferung eines vergleichbaren
                Produktes wünschen, werden wir Ihnen ggf. bereits erbrachte
                Gegenleistungen unverzüglich erstatten.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 6 Zahlungsbedingungen</h3>
              <p>
                § 6.1 Die Zahlung erfolgt wahlweise per Barzahlung bei Lieferung
                oder durch Onlinezahlung über Paypal oder Sofortüberweisung.de.
                Bei Barzahlung fallen keine Gebühren an. Bei Zahlung über Paypal
                oder Sofortüberweisung.de erheben wir jeweils eine pauschale
                Bearbeitungsgebühr in Höhe von 1,50 EUR. Bei Zahlung per Paypal
                oder Sofortüberweisung.de erfolgt die Belastung Ihres dortigen
                Kundenkontos je nach ihrer Vereinbarung mit dem jeweiligen
                Anbieter.
              </p>
              <p>
                § 6.2 Bei Zahlung per Paypal oder Sofortüberweisung.de haben Sie
                ggf. jene Kosten zu tragen, die infolge einer Rückbuchung einer
                Zahlungstransaktion mangels Kontodeckung oder aufgrund von Ihnen
                falsch übermittelter Daten der Bankverbindung entstehen.
              </p>
              <p>
                § 6.3 Zahlungen des Kunden werden bei Lieferung oder spätestens
                Zugang der Rechnung von DeinButler fällig, soweit nicht ein
                anderes Zahlungsziel schriftlich vereinbart ist.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 7 Eigentumsvorbehalt</h3>
              <p>
                Die Ware bleibt bis zur vollständigen Zahlung unser Eigentum.
                Vor Übergang des Eigentums ist eine Verpfändung,
                Sicherungsübereignung, Verarbeitung oder Umgestaltung ohne
                unsere Zustimmung nicht gestattet.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 8 Ausschluss des Widerrufsrechts</h3>
              <p>
                Die Essensbestellung kann grundsätzlich nicht gegenüber
                DeinButler widerrufen werden. Das Fernabsatzwiderrufsrecht
                besteht nicht bei Lieferung von Lebensmitteln, Getränken oder
                sonstigen Haushaltsgegenständen des täglichen Bedarfs, die am
                Wohnsitz, am Aufenthaltsort oder am Arbeitsplatz eines
                Verbrauchers von Unternehmern im Rahmen häufiger und
                regelmäßiger Fahrten geliefert werden (§312b Abs. 3 Nr.5 BGB),
                und bei Lieferung von Waren, die nach Kundenspezifikation
                angefertigt werden oder eindeutig auf die persönlichen
                Bedürfnisse zugeschnitten sind oder die auf Grund ihrer
                Beschaffenheit nicht für eine Rücksendung geeignet sind oder
                schnell verderben können oder deren Verfalldatum überschritten
                würde (§ 312d Abs. 4 Nr.1 BGB).
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 9 Transportschäden</h3>
              <p>
                § 9.1 Werden Waren mit offensichtlichen Transportschäden
                angeliefert, so reklamieren Sie solche Fehler bitte sofort bei
                dem Zusteller, und nehmen Sie bitte schnellstmöglich Kontakt zu
                uns auf (Tel. 0941 / 569 561 40)
              </p>
              <p>
                § 9.2 Die Versäumung einer Reklamation oder Kontaktaufnahme hat
                für Ihre gesetzlichen Gewährleistungsrechte keinerlei
                Konsequenzen. Sie helfen uns aber, unsere eigenen Ansprüche
                gegenüber dem Auslieferer oder dem Restaurant geltend machen zu
                können.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 10 Gefahrübergang, Entgegennahme</h3>
              <p>
                Bei den zu erbringenden Lieferungen geht mit der Übergabe an den
                Kunden oder einen von ihm bestimmten Empfänger die Gefahr auf
                den Kunden über. Die Regelungen über den Gefahrübergang gelten
                auch, wenn Teilleistungen erfolgen oder weitere Leistungen von
                DeinButler zu erbringen sind. Verzögert sich oder unterbleibt
                die Lieferung oder Abnahme infolge von Umständen, die der Kunde
                zu vertreten hat, geht die Gefahr vom Zeitpunkt der
                Lieferbereitschaft, spätestens mit dem ersten vergeblichen
                Zustellversuch auf den Kunden über. Vom Kunden zu vertretende
                Umstände sind insbesondere die fehlende oder unvollständige oder
                falsche Angabe der Lieferadresse, der Kontaktperson oder der
                Kontakttelefonnummer.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 11 Gewährleistung</h3>
              <p>
                Ihnen stehen grundsätzlich die gesetzlichen Mängelansprüche zu,
                bei der Geltendmachung von Schadensersatzansprüchen jedoch mit
                nachfolgenden Einschränkungen: Ansprüche auf Ersatz von Schäden,
                die nicht an der gelieferten Ware selbst entstanden sind, sind
                ausgeschlossen. Dieser Haftungsausschluss gilt nicht bei Vorsatz
                und grober Fahrlässigkeit, bei schuldhafter Verletzung
                wesentlicher Vertragspflichten, in den Fällen der Haftung nach
                Produkthaftungsgesetz und bei der Übernahme einer Garantie für
                das Vorhandensein von Eigenschaften sowie auch nicht bei Schäden
                an Körper und Gesundheit von Menschen. Bei schuldhafter
                Verletzung wesentlicher Vertragspflichten haftet DeinButler nur
                für den vertragstypischen, vernünftigerweise vorhersehbaren
                Schaden. Für entgangenen Gewinn leisten wir keinen Ersatz. Eine
                selbständige Garantie für eine bestimmte Beschaffenheit der
                verkauften Produkte liegt nicht in den auf deinbutler.de
                vorhandenen Angaben über die Waren.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 12 Schutz der Minderjährigen</h3>
              <p>
                Der Verkauf von Tabakwaren und alkoholischen Getränken erfolgt
                nur an Personen, die das jeweilige gesetzliche Mindestalter
                erreicht haben. Bei Auslieferung von Tabakwaren und/oder
                alkoholischen Getränken ist zum Schutz Minderjähriger das
                gesetzliche Mindestalter vom Empfänger nachzuweisen.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 13 Kundenzufriedenheitsabfrage/Bonuspunkte</h3>
              <p>
                Nach Erhalt Ihrer Bestellung erhalten Sie von uns eine
                Einladung, eine Kundenzufriedenheitsbewertung abzugeben. Die
                Beantwortung und Teilnahme ist freiwillig. Sollten Sie sich zu
                einer Teilnahme entscheiden und ein Benutzerkonto angemeldet
                haben, können wir Ihnen als freiwillige Leistung als Dank für
                Ihre Bemühungen nach vollständiger Beantwortung unserer Fragen
                Bonuspunkte gutschreiben. Auf die Gewährung von Bonuspunkten
                besteht kein Rechtsanspruch. Das Maß Ihrer Kundenzufriedenheit
                hat keinen Einfluss auf die Anzahl der Bonuspunkte. Sofern wir
                Bonuspunkte gutgeschrieben haben, verfallen diese mit Ablauf
                eines Jahres nach Bestellung. Die Anzahl Ihrer gutgeschriebenen
                Bonuspunkte können Sie jederzeit in Ihrem Benutzerkonto
                einsehen.
              </p>
              <p>
                Ihre Punkte können Sie wie folgt einlösen:
                <br />
                100 Bonuspunkte entsprechen einem Warenwert von 1,00 EUR und
                können nur bei DeinButler und nur unter nachfolgenden
                Bestimmungen eingelöst werden.
              </p>
              <p>
                <strong>Menü-Upgrade:</strong>
                <br />
                Mit Einlösung von Bonuspunkten können Sie Ihr Menü-Upgrade
                kostenfrei erhalten. Dies ist nur möglich, wenn Sie eine dem
                Upgradepreis entsprechende Gesamtpunktzahl abzüglich 50 Punkten
                einlösen. 50 Punkte werden Ihnen von DeinButler auf das
                Menü-Upgrade zusätzlich gutgeschrieben, Sie haben also eine
                weitere Ersparnis von 0,50 EUR. Eine nur anteilige Reduzierung
                des Menü-Upgrade-Preises ist nicht möglich. Bei einem
                Menü-Upgrade von 3,50 EUR, können Sie also 300 Bonuspunkte
                einlösen, zuzüglich der von DeinButler geschenkten 50 Punkte.
                Damit ist das Menü-Upgrade kostenfrei. Haben Sie nur 250
                Bonuspunkte ist eine Einlösung in diesem Fall nicht möglich. Das
                Vorhandensein ausreichender Bonuspunkte vorausgesetzt, können
                Sie bei einer Bestellung für jedes bestellte Menü das jeweilige
                Upgrade durch die Einlösung von Bonuspunkten kostenfrei
                erhalten.
              </p>
              <p>
                <strong>Express:</strong>
                <br />
                Mit Einlösung von genau 350 Bonuspunkten erhalten Sie die
                Expresslieferung kostenfrei. Die auf den Expresspreis von 4,50
                EUR fehlenden 100 Punkte werden Ihnen von DeinButler zusätzlich
                in Abzug gebracht. Damit schenkt Ihnen DeinButler eine weitere
                Ersparnis von 1,00 EUR.
              </p>
              <p>
                <strong>Gesamtbestellung:</strong>
                <br />
                Auf die Gesamtbestellung erhalten Sie mit Einlösung von 250
                Bonuspunkten einen zusätzlichen Rabatt von 2,50 EUR. Eine
                anteilige Einlösung von Punkten ist auch hier nicht möglich
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>§ 14 Schlussbestimmungen</h3>
              <p>
                Sollte eine Bestimmung dieser Allgemeinen Geschäftsbedingungen
                unwirksam sein, so bleibt der Vertrag im Übrigen wirksam.
                Anstelle der unwirksamen Bestimmung gelten die einschlägigen
                gesetzlichen Vorschriften.
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AGB;
