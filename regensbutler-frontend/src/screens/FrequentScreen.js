import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
    ListGroup,
    Row,
    Col,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Snackbar from "../components/Snackbar";
import {
    addToFrequentlyItem,
    handleCreateFrequentlyOrder,
    removeFromFrequentlyItem,
} from "../actions/frequentlyActions";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { getdeliveryScheduleItems } from "../actions/deliveryScheduleActions";
import { CustomScrollbars } from "../components/CustomScrollbar";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    pickerBox: {
        boxShadow: "rgb(0 0 0 / 15%) 10px 10px 10px",
        margin: 10,
    },
    deliveryScheduleBox: {
        textAlign: "center",
        minHeight: 405,
        maxHeight: 405,
        "@media (max-width: 599px)": {
            marginTop: 50,
        },
    },
    timeBox: {
        width: 120,
        height: 30,
        border: "1px solid #333",
        borderRadius: 5,
        margin: 7,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    container: {
        minWidth: 310,
        boxShadow: "rgb(38 57 77) 0px 10px 20px -10px",
        height: 405,
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    labelBox: {
        width: "100%",
        textAlign: "center",
        boxShadow: "rgb(38 57 77) 0px 10px 10px -10px",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        cursor: "pointer",
    },
    labelBox1: {
        width: "100%",
        textAlign: "center",
        boxShadow: "0 1px 4px rgb(0 0 0 / 30%), 0 0 40px rgb(0 0 0 / 10%) inset",
        backgroundColor: "#fff",
        cursor: "pointer",
        marginBottom: theme.spacing(1.5),
        marginTop: theme.spacing(1.5),
        height: 42,
        "&:before": {
            boxShadow: "0 0 20px rgb(0 0 0 / 80%)",
        },
        "&:after": {
            boxShadow: "0 0 20px rgb(0 0 0 / 80%)",
        },
    },
    label: {
        fontFamily: "preisFont",
        color: "#666",
        fontSize: 25,
    },
    timepickerBox: {
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: theme.spacing(2),
    },
}));

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const germanDays = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
];

const FrequentScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const [selectedDays, setSelectedDays] = React.useState([]);
    var current = new Date();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const frequently = useSelector((state) => state.frequently);
    const { frequentlyItems } = frequently;
    const deliverySchedule = useSelector((state) => state.deliverySchedule);
    const { deliveryScheduleItems } = deliverySchedule;
    const [arrTime, setArrTime] = React.useState([]);
    const [daykey, setDayKey] = React.useState(current.getDay());
    const [selectedTime, setSelectedTime] = React.useState("");
    const [error, setError] = React.useState(false);
    const [errorMSG, setErrorMSG] = React.useState("");
    const [severity, setSeverity] = React.useState("error");
    const [createproduct, setCreateProduct] = React.useState([]);
    const [createplan, setCreatePlan] = React.useState([]);
    const [payalToken, setPaypalToken] = React.useState("");
    const [sdkReady, setSdkReady] = React.useState(false);

    const removeFromCartHandler = (product) => {
        dispatch(removeFromFrequentlyItem(product, 0, userInfo._id));
        setError(true);
        setSeverity("warning");
        setErrorMSG("Produkt aus der häufigen Liste entfernt");
        setTimeout(function () {
            setError(false);
            setSeverity("");
            setErrorMSG("");
        }, 2000);
    };

    const handlerAddFunc = (product, val) => {
        var num = parseInt(val);
        if (num > 0) {
            dispatch(addToFrequentlyItem(product, num, userInfo._id));
            setError(true);
            setSeverity("success");
            setErrorMSG("Produkt aus der häufigen Liste hinzugefügt");
            setTimeout(function () {
                setError(false);
                setSeverity("");
                setErrorMSG("");
            }, 2000);
        } else {
            dispatch(removeFromFrequentlyItem(product, 0, userInfo._id));
            setError(true);
            setSeverity("warning");
            setErrorMSG("Produkt aus der häufigen Liste entfernt");
            setTimeout(function () {
                setError(false);
                setSeverity("");
                setErrorMSG("");
            }, 2000);
        }
    };

    const addPayPalScript = async () => {
        const { data: clientId } = await axios.get("/api/config/paypal");
        if (clientId) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&vault=true&intent=subscription`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        }
    };

    const getPayPalAccessToken = async () => {
        var axios = require("axios");
        const client_id =
            "Adqp3Dv3gyvyjKjKOnxAMz2AmDnrehZglr_ZzdLUEut-KseDMth_hi1sU-279Vgdx9Q7N-RI3ViN7n9H";
        const client_secret =
            "EMwmjje0NoyRlq7JmxlkRoKfOprAVf4uUWnje_Emas9MAmCZeIoBZTNhL15YFxQ5q5UyLObwvdffqw2d";
        const options = {
            url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-Language": "en_US",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: client_id,
                password: client_secret,
            },
            params: {
                grant_type: "client_credentials",
            },
        };
        const { data } = await axios(options);
        return data.access_token;
    };

    // create a product
    const createProduct = (id, token) => {
        var axios = require("axios");
        var data = JSON.stringify({
            name: `subscription of ${id}`,
            description: `${id} created a product for frequently order.`,
            type: "SERVICE",
            category: "SOFTWARE",
            image_url: "https://example.com/streaming.jpg",
            home_url: "https://example.com/home",
        });

        var config = {
            method: "post",
            url: "https://api-m.sandbox.paypal.com/v1/catalogs/products",
            headers: {
                "PayPal-Request-Id": `PLAN-${id}`,
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setCreateProduct(response.data);
            })
            .catch(function (error) {
                console.log("create error--->", error);
            });
    };

    // create a plan
    const createPlan = () => {
        var vktotalPrice = frequentlyItems
            .reduce((acc, item) => acc + item.count * item.vk, 0)
            .toFixed(2);
        var shippingPrice = vktotalPrice > 90 ? 0.0 : 4.99;
        var pfandPrice = addDecimals(
            frequentlyItems.reduce((acc, item) => acc + item.pfand * item.count, 0)
        );
        var totalPrice = addDecimals(
            Number(vktotalPrice) +
            Number(shippingPrice) +
            Number(pfandPrice) -
            Number(userInfo.bonus) / 100
        );

        var axios = require("axios");
        var data = JSON.stringify({
            product_id: createproduct.id,
            name: `Plan of ${userInfo._id}`,
            description: `plan of ${userInfo._id}`,
            billing_cycles: [
                {
                    frequency: {
                        interval_unit: "WEEK",
                        interval_count: 1,
                    },
                    tenure_type: "TRIAL",
                    sequence: 1,
                    total_cycles: 1,
                },
                {
                    frequency: {
                        interval_unit: "WEEK",
                        interval_count: 1,
                    },
                    tenure_type: "REGULAR",
                    sequence: 2,
                    total_cycles: 0,
                    pricing_scheme: {
                        fixed_price: {
                            value: `${totalPrice}`,
                            currency_code: "EUR",
                        },
                    },
                },
            ],
            payment_preferences: {
                service_type: "PREPAID",
                auto_bill_outstanding: true,
                setup_fee: {
                    value: `${totalPrice}`,
                    currency_code: "EUR",
                },
                setup_fee_failure_action: "CONTINUE",
                payment_failure_threshold: 3,
            },
            quantity_supported: true,
            taxes: {
                percentage: "10",
                inclusive: false,
            },
        });

        var config = {
            method: "post",
            url: "https://api-m.sandbox.paypal.com/v1/billing/plans",
            headers: {
                Prefer: "return=representation",
                "PayPal-Request-Id": userInfo._id,
                "Content-Type": "application/json",
                Authorization: `Bearer ${payalToken}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setCreatePlan(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const checkoutHandler = () => {
        if (selectedTime === "") {
            setError(true);
            setErrorMSG("Sie müssen ein Lieferdatum und eine Lieferzeit auswählen.");
            setSeverity("warning");
            setTimeout(() => {
                setError(false);
                setErrorMSG("");
                setSeverity("");
            }, 2000);
        }
        if (selectedTime !== "") {
            var vktotalPrice = frequentlyItems
                .reduce((acc, item) => acc + item.count * item.vk, 0)
                .toFixed(2);

            if (vktotalPrice >= 30) {
                getPayPalAccessToken().then((res) => {
                    setPaypalToken(res);
                    createProduct(userInfo._id, res);
                });
            } else {
                setError(true);
                setErrorMSG("Mindestbestellwert: 30 € Bestellwert");
                setSeverity("warning");
                setTimeout(() => {
                    setError(false);
                    setErrorMSG("");
                    setSeverity("");
                }, 2000);
            }
        }
    };

    const saveToDB = () => {
        dispatch(
            handleCreateFrequentlyOrder({
                orderItems: frequentlyItems,
                daysNum: daykey,
                timeAt: selectedTime,
                userId: userInfo._id,
            })
        );
        setError(true);
        setErrorMSG("Erfolgreich hinzugefügt.");
        setSeverity("success");
        setTimeout(() => {
            setError(false);
            setErrorMSG("");
            setSeverity("");
        }, 2000);
    };

    useEffect(() => {
        if (createproduct.length !== 0) createPlan();
    }, [createproduct]);

    useEffect(() => {
        if (createproduct.length !== 0) addPayPalScript();
    }, [createplan]);

    const handlegettimesinit = (key) => {
        if (deliveryScheduleItems !== undefined) {
            if (deliveryScheduleItems.length !== 0) {
                var scheduleItems = [];
                let category = frequentlyItems.find((x) => x.voll_sortiment === true)
                    ? "voll"
                    : "express";
                deliveryScheduleItems.data.forEach((element) => {
                    if (element.flag === category && element.day === days[key])
                        scheduleItems.push(element);
                });
                setArrTime(scheduleItems);
            }
        }
    };

    const handlegetTimesfromDay = (key) => {
        const isSelected = selectedDays.includes(parseInt(key));
        if (isSelected) {
            setDayKey(key);
            handlegettimesinit(key);
        } else {
            setError(true);
            setErrorMSG("Für das ausgewählte Datum liegt kein Lieferplan vor.");
            setSeverity("error");
            setTimeout(() => {
                setError(false);
                setErrorMSG("");
                setSeverity("");
            }, 2000);
        }
    };

    const handleChangeSelectedTime = (event) => {
        setSelectedTime(event.target.value);
    };

    useEffect(() => {
        dispatch(getdeliveryScheduleItems());
    }, [dispatch]);

    function checkAdult(Item) {
        if (frequentlyItems.length !== 0) {
            let category = frequentlyItems.find((x) => x.voll_sortiment === true)
                ? "voll"
                : "express";
            return Item.flag === category;
        }
    }

    useEffect(() => {
        if (deliveryScheduleItems !== undefined) {
            if (deliveryScheduleItems.length !== 0) {
                var outputData = {};
                var data = [];
                var filterData = deliveryScheduleItems.data.filter(checkAdult);
                for (let doc of filterData) {
                    if (outputData[doc.daysNum]) {
                        outputData[doc.daysNum].daysNum = outputData[doc.daysNum].daysNum;
                    } else {
                        outputData[doc.daysNum] = doc;
                    }
                }
                for (var i = 0; i <= 6; i++) {
                    if (outputData[i] !== undefined) {
                        data.push(outputData[i].daysNum);
                    }
                }
                setSelectedDays(data);
            }
        }
        if (frequentlyItems.length !== 0) {
            if (frequentlyItems[0].timeAt !== undefined) {
                setSelectedTime(frequentlyItems[0].timeAt);
                setDayKey(frequentlyItems[0].daysNum);
                handlegettimesinit(frequentlyItems[0].daysNum);
            } else {
                setDayKey(current.getDay());
                handlegettimesinit(current.getDay());
            }
        } else {
            setDayKey(current.getDay());
            handlegettimesinit(current.getDay());
        }
    }, [deliveryScheduleItems]);

    return (
        <div className="xl:container mx-auto bg-white mt-20 p-0">
            {error && (
                <Snackbar
                    severity={severity}
                    posVert="bottom"
                    posHori="left"
                    alert={errorMSG}
                />
            )}
            {frequentlyItems.length === 0 ? (
                <div style={{ marginTop: 150 }}>
                    <Message>Dein Warenkorb ist leer</Message>
                </div>
            ) : (
                <ListGroup variant="flush">
                    {frequentlyItems.map((item) => (
                        <ListGroup.Item key={item.product_id}>
                            <Row className="flex justify-center">
                                <Col
                                    md={2}
                                    className="flex justify-center content-center"
                                    style={{ alignItems: "center" }}
                                >
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
                                <Col
                                    md={2}
                                    className="flex justify-center content-center"
                                    style={{ alignItems: "center" }}
                                >
                                    {item.produktname}
                                </Col>
                                <Col
                                    md={2}
                                    className="flex justify-center content-center"
                                    style={{ alignItems: "center" }}
                                >
                                    {`€ ${item.vk}`}
                                    <br />
                                    {item.pfand && item.pfand > 0
                                        ? "Pfand: € " + item.pfand.toFixed(2)
                                        : "kein Pfand"}
                                </Col>
                                <Col
                                    md={4}
                                    className="flex justify-center content-center"
                                    style={{ alignItems: "center" }}
                                >
                                    <div className="flex flex-row">
                                        <Button
                                            className="text-base w-10 h-10"
                                            onClick={() => {
                                                if (userInfo) {
                                                    dispatch(
                                                        removeFromFrequentlyItem(
                                                            item,
                                                            Number(item.count - 1),
                                                            userInfo._id
                                                        )
                                                    );
                                                } else {
                                                    history.push('/login');
                                                }
                                            }}
                                            name="minusItem"
                                            variant={item.count > 0 ? "danger" : "secondary"}
                                        >
                                            -
                                        </Button>

                                        <Form.Control
                                            className="nospin w-16 mr-1.5 ml-1.5 items-center text-center text-base"
                                            value={`${item.count}`}
                                            onChange={(e) => {
                                                if (userInfo)
                                                    handlerAddFunc(item, e.target.value);
                                                else
                                                    history.push('/login');
                                            }}
                                        ></Form.Control>

                                        <Button
                                            className="text-base w-10 add-to-cart h-10"
                                            onClick={() => {
                                                if (userInfo) {
                                                    dispatch(
                                                        addToFrequentlyItem(
                                                            item,
                                                            Number(item.count + 1),
                                                            userInfo._id
                                                        )
                                                    );
                                                } else
                                                    history.push('/login');
                                            }}
                                            name="plusItem"
                                            variant="danger"
                                        >
                                            +
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={2} className="flex justify-center content-center">
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => {
                                            if (userInfo)
                                                removeFromCartHandler(item)
                                            else
                                                history.push('/login');
                                        }}
                                        style={{ margin: "auto" }}
                                    >
                                        <DeleteForeverIcon />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                    <Card>
                        <Grid container>
                            <Grid item xs={12} md={2} className={classes.saltBox}></Grid>

                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                className={classes.deliveryScheduleBox}
                            >
                                <div className={classes.container}>
                                    <CustomScrollbars
                                        autoHide
                                        autoHideTimeout={500}
                                        autoHideDuration={200}
                                    >
                                        {days.map((val, index) => {
                                            return (
                                                <div
                                                    className={classes.labelBox1}
                                                    key={index}
                                                    onClick={() => {
                                                        handlegetTimesfromDay(index);
                                                    }}
                                                >
                                                    <div
                                                        className={classes.label}
                                                        style={
                                                            index === 0
                                                                ? { color: "#ff0000" }
                                                                : daykey === index
                                                                    ? { color: "blue" }
                                                                    : null
                                                        }
                                                    >
                                                        {`${germanDays[index]} (${val})`}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </CustomScrollbars>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={1} className={classes.saltBox}></Grid>

                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                className={classes.deliveryScheduleBox}
                            >
                                <div className={classes.container}>
                                    <CustomScrollbars
                                        autoHide
                                        autoHideTimeout={500}
                                        autoHideDuration={200}
                                    >
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="selectedTime"
                                                name="selectedTime"
                                                value={selectedTime}
                                                onChange={handleChangeSelectedTime}
                                            >
                                                <div className={classes.timepickerBox}>
                                                    {arrTime.map((val, index) => {
                                                        return (
                                                            <div className={classes.timeBox} key={index}>
                                                                <FormControlLabel
                                                                    value={val.timeAt}
                                                                    control={<Radio />}
                                                                    style={{ margin: 0 }}
                                                                />
                                                                <div>{val.timeAt}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </CustomScrollbars>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={2} className={classes.saltBox}></Grid>
                        </Grid>
                        <Grid container style={{ marginTop: 50 }}>
                            <Grid item xs={12} md={3} className={classes.saltBox}></Grid>

                            <Grid item xs={12} md={6} className={classes.detailBox}>
                                <ListGroup variant="flush" style={{ marginTop: "auto" }}>
                                    <ListGroup.Item
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <h2 style={{ marginRight: 30 }}>
                                            Gesamtmenge (
                                            {frequentlyItems.reduce(
                                                (acc, item) => acc + item.count,
                                                0
                                            )}
                                            ) Artikel
                                        </h2>
                                        <h2>
                                            Gesamtpreis €
                                            {frequentlyItems
                                                .reduce((acc, item) => acc + item.count * item.vk, 0)
                                                .toFixed(2)}
                                        </h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {!sdkReady && (
                                            <Button
                                                type="button"
                                                className="btn-block"
                                                disabled={frequentlyItems.length === 0}
                                                onClick={() => {
                                                    if (userInfo)
                                                        checkoutHandler();
                                                    else
                                                        history.push('/login');
                                                }}
                                            >
                                                Jetzt bestellen
                                            </Button>
                                        )}
                                        {sdkReady && (
                                            <PayPalButton
                                                options={{ vault: true }}
                                                createSubscription={(data, actions) => {
                                                    return actions.subscription.create({
                                                        plan_id: createplan.id,
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    // Capture the funds from the transaction
                                                    return actions.subscription
                                                        .get()
                                                        .then(function (details) {
                                                            // Show a success message to your buyer
                                                            saveToDB();
                                                        });
                                                }}
                                                onCancel={(data) => {
                                                    console.log("cancelling!!!");
                                                    setSdkReady(false);
                                                    setSelectedTime("");
                                                    setCreateProduct([]);
                                                    setCreatePlan([]);
                                                    setPaypalToken("");
                                                }}
                                            />
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Grid>

                            <Grid item xs={12} md={3} className={classes.saltBox}></Grid>
                        </Grid>
                    </Card>
                </ListGroup>
            )}
        </div>
    );
};

export default FrequentScreen;