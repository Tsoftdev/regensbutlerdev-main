import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { CustomScrollbars } from "../components/CustomScrollbar";
import {
    ListGroup,
    Row,
    Col,
    Image,
    Form,
    Button,
    Card,
    Table
} from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const germanDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

const useStyles = makeStyles((theme) => ({
    pickerBox: {
        boxShadow: 'rgb(0 0 0 / 15%) 10px 10px 10px',
        margin: 10
    },
    deliveryScheduleBox: {
        textAlign: 'center',
        minHeight: 405,
        maxHeight: 405,
        "@media (max-width: 599px)": {
            marginTop: 50
        },
    },
    timeBox: {
        width: 120,
        height: 30,
        border: '1px solid #333',
        borderRadius: 5,
        margin: 7,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    container: {
        minWidth: 310,
        boxShadow: 'rgb(38 57 77) 0px 10px 20px -10px',
        height: 405,
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    labelBox: {
        width: '100%',
        textAlign: 'center',
        boxShadow: 'rgb(38 57 77) 0px 10px 10px -10px',
        backgroundColor: '#fff',
        position: 'sticky',
        top: 0,
        cursor: 'pointer'
    },
    labelBox1: {
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 1px 4px rgb(0 0 0 / 30%), 0 0 40px rgb(0 0 0 / 10%) inset',
        backgroundColor: '#fff',
        cursor: 'pointer',
        marginBottom: theme.spacing(1.5),
        marginTop: theme.spacing(1.5),
        height: 42,
        "&:before": {
            boxShadow: '0 0 20px rgb(0 0 0 / 80%)'
        },
        "&:after": {
            boxShadow: '0 0 20px rgb(0 0 0 / 80%)'
        }
    },
    label: {
        fontFamily: 'preisFont',
        color: '#666',
        fontSize: 25,
    },
    timepickerBox: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2)
    },
}));

const FrequentListScreen = () => {
    const classes = useStyles();
    const allfrequently = useSelector((state) => state.allfrequently);
    const { allfrequentlyItems } = allfrequently;
    const localAllfrequentlyItes = allfrequentlyItems;
    const [frequentlyData, setFrequentlyData] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [detailItem, setDetailItem] = React.useState([]);
    const [detailDeliveryschedule, setDetailsDeliveryschedule] = React.useState(0);

    const handleViewdetails = (id) => {
        const data = localAllfrequentlyItes.filter((x) => x.userId === id);
        setDetailItem(data);
        setDetailsDeliveryschedule(`${germanDays[data[0].daysNum]} ${data[0].timeAt}`)
        setShow(true);
    }

    useEffect(() => {
        if (allfrequentlyItems.length !== 0) {
            var outputData = [];
            var data = [];
            for (let doc of allfrequentlyItems) {
                if (outputData[doc.userId]) {
                    outputData[doc.userId].vk = outputData[doc.userId].vk + doc.vk;
                } else {
                    outputData[doc.userId] = doc
                }
            }
            outputData.forEach(element => {
                data.push(element);
            });
            setFrequentlyData(data);
        }
    }, [allfrequentlyItems])

    return (
        <div className="xl:container mx-auto bg-white mt-20 p-0" style={{ marginTop: 150 }}>
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
                        ORDER DETAILS
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
                            {detailItem.map((item) => (
                                <ListGroup.Item key={item.product_id}>
                                    <Row className="flex justify-center">
                                        <Col md={2} className="flex justify-center content-center" style={{ alignItems: 'center' }}>
                                            <Image
                                                src={
                                                    item.bildname
                                                        ? item.pictureurl + item.bildname
                                                        : item.pictureurl + "noimage.jpg"
                                                }
                                                alt={item.produktname}
                                                fluid
                                                rounded
                                                className="w-24"
                                            />
                                        </Col>
                                        <Col md={2} className="flex justify-center content-center" style={{ alignItems: 'center' }}>
                                            {item.produktname}
                                        </Col>
                                        <Col md={2} className="flex justify-center content-center" style={{ alignItems: 'center' }}>
                                            {`€ ${item.vk}`}
                                            <br />
                                            {item.pfand && item.pfand > 0
                                                ? "Pfand: € " + item.pfand.toFixed(2)
                                                : "kein Pfand"}
                                        </Col>
                                        <Col md={4} className="flex justify-center content-center" style={{ alignItems: 'center' }}>
                                            <div className="flex flex-row">
                                                <Form.Control
                                                    className="nospin w-16 mr-1.5 ml-1.5 items-center text-center text-base"
                                                    value={`${item.count}`}
                                                    readOnly={true}
                                                ></Form.Control>
                                            </div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            <Card>
                                <Grid container style={{ marginTop: 50 }}>
                                    <Grid item xs={12} md={3} className={classes.saltBox}></Grid>

                                    <Grid item xs={12} md={6} className={classes.detailBox}>
                                        <ListGroup variant="flush" style={{ marginTop: 'auto' }}>
                                            <ListGroup.Item style={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}>
                                                <h5 style={{ marginRight: 30 }}>
                                                    Gesamtmenge (
                                                    {detailItem.reduce((acc, item) => acc + item.count, 0)})
                                                    Artikel
                                                </h5>
                                                <h5>
                                                    Gesamtpreis €
                                                    {detailItem
                                                        .reduce(
                                                            (acc, item) =>
                                                                acc + item.count * (item.vk + item.pfand),
                                                            0
                                                        )
                                                        .toFixed(2)}
                                                </h5>
                                            </ListGroup.Item>
                                            <div style={{ width: '100%', textAlign: 'center' }}>
                                                <h5>
                                                    {detailDeliveryschedule}
                                                </h5>
                                            </div>
                                            <ListGroup.Item>
                                                <Button
                                                    type="button"
                                                    className="btn-block"
                                                    disabled={detailItem.length === 0}
                                                    onClick={() => { setShow(false) }}
                                                >
                                                    verschließen
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Grid>

                                    <Grid item xs={12} md={3} className={classes.saltBox}></Grid>
                                </Grid>
                            </Card>
                        </ListGroup>
                    </CustomScrollbars>
                </Modal.Body>
            </Modal>
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>ID</th>
                        <th style={{ textAlign: 'center' }}>BENUTZER</th>
                        <th style={{ textAlign: 'center' }}>Lieferdatum und -uhrzeit</th>
                        <th style={{ textAlign: 'center' }}>GESAMTPREIS</th>
                        <th style={{ textAlign: 'center' }}>Aktion</th>
                    </tr>
                </thead>
                <tbody>
                    {frequentlyData.map((order, index) => (
                        <tr key={order.id}>
                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ textAlign: 'center' }}>{order.userId}</td>
                            <td style={{ textAlign: 'center' }}>{`${germanDays[order.daysNum]} ${order.timeAt}`}</td>
                            <td style={{ textAlign: 'center' }}>€{order.vk}</td>
                            <td style={{ textAlign: 'center' }}>
                                <Button variant="light" className="btn-sm"
                                    onClick={() => { handleViewdetails(order.userId) }}
                                >
                                    Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default FrequentListScreen;