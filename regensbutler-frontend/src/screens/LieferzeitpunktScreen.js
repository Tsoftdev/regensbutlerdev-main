import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { Badge } from "@material-ui/core";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { makeStyles } from "@material-ui/core/styles";
import { CustomScrollbars } from "../components/CustomScrollbar";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { getdeliveryScheduleItems } from "../actions/deliveryScheduleActions";
import Snackbar from "../components/Snackbar";
import { addToShippingTimeCookie } from "../actions/shippingTimeActions";
import "../components/Fonts.css";

const useStyles = makeStyles((theme) => ({
  saltBox: {
    "@media (max-width: 959px)": {
      display: "none",
    },
  },
  pickerBox: {
    boxShadow: "rgb(0 0 0 / 15%) 10px 10px 10px",
  },
  selected: {
    color: "#ff0000",
    fontSize: 17,
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
    cursor: 'pointer',
    zIndex: 1
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
const germanMonths = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Im Mai",
  "Juni",
  "Im Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

function LieferzeitpunktScreen({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  var current = new Date();
  const [daykey, setDayKey] = React.useState(current.getDay());
  const deliverySchedule = useSelector((state) => state.deliverySchedule);
  const { deliveryScheduleItems } = deliverySchedule;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [selectedDays, setSelectedDays] = React.useState([]);
  const [selectedTime, setSelectedTime] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(moment(new Date(), "DD-MM-YYYY"));
  const [error, setError] = React.useState(false);
  const [errorMSG, setErrorMSG] = React.useState("");
  const [severity, setSeverity] = React.useState("error");
  const [arrTime, setArrTime] = React.useState([]);

  const submitHandler = () => {
    if (selectedTime === "") {
      setError(true);
      setErrorMSG("Sie müssen ein Lieferdatum und eine Lieferzeit auswählen.");
      setSeverity("error");
      setTimeout(() => {
        setError(false);
        setErrorMSG("");
        setSeverity("");
      }, 2000);
    }
    if (selectedTime !== "") {
      const formatted_date = `${moment(selectedDate).format(
        "DD-MM-YYYY"
      )} ${selectedTime}`;
      dispatch(addToShippingTimeCookie(formatted_date));
      history.push("/payment");
    }
  };

  const backHandler = (e) => {
    e.preventDefault();
    history.push("/lieferadresse");
  };

  const handleChangeSelectedTime = (event) => {
    setSelectedTime(event.target.value);
  };

  const handlegettimesinit = (key) => {
    if (deliveryScheduleItems !== undefined) {
      if (deliveryScheduleItems.length !== 0) {
        var scheduleItems = [];
        let category = cartItems.find((x) => x.category === "voll")
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

  const handlegetTimesfromDay = (date) => {
    const selectDay = moment(date).format("DD");
    const isSelected = selectedDays.includes(parseInt(selectDay));
    if (isSelected) {
      setSelectedDate(date);
      var key = selectDay - current.getDate() + current.getDay();
      if (key > 6)
        key -= 7;
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

  useEffect(() => {
    dispatch(getdeliveryScheduleItems());
  }, [dispatch]);

  function checkAdult(Item) {
    let category = cartItems.find((x) => x.category === "voll")
      ? "voll"
      : "express";
    return Item.flag === category;
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
        var curr = new Date(); // get current date
        var currday = curr.getDate();
        var firstday = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        for (var i = 0; i <= 6; i++) {
          if (outputData[i] !== undefined) {
            if (outputData[i].daysNum + firstday < currday)
              data.push(outputData[i].daysNum + firstday + 7)
            else
              data.push(outputData[i].daysNum + firstday)
          }
        }
        setSelectedDays(data);
      }
    }
    handlegettimesinit(current.getDay());
  }, [deliveryScheduleItems]);

  return (
    <>
      {error && <Snackbar severity={severity} alert={errorMSG} />}
      <div className="xl:container mx-auto bg-white mt-20 p-0 mainfont">
        <CheckoutSteps step1 step2 step3 />

        <div className="xl:container mx-auto bg-white p-0">
          <div
            style={{
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            <h1 className="text-xl">Lieferzeitpunkt wählen</h1>
            <p className="size_text_standard">
              Wir liefern innerhalb eines 2 Stunden Fensters ab dem von Ihnen
              gewählten Lieferzeitpunkt.
            </p>
          </div>
          <Grid container>
            <Grid item xs={12} md={2} className={classes.saltBox}></Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              style={{
                textAlign: "center",
              }}
            >
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  readOnly={true}
                  variant={"static"}
                  inputVariant={"outlined"}
                  orientation={"portrait"}
                  margin="normal"
                  format="DD/MM/YYYY"
                  name="deliveryDate"
                  id="deliveryDate"
                  value={selectedDate}
                  onChange={(date) => handlegetTimesfromDay(date)}
                  minDate={`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`}
                  maxDate={`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate() + 6}`}
                  renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                    const date = moment(day).format('DD');
                    const isSelected = isInCurrentMonth && selectedDays.includes(parseInt(date));
                    return <Badge badgeContent={isSelected ? "🚚" : undefined}>{dayComponent}</Badge>;
                  }}
                  className={classes.pickerBox}
                />
              </MuiPickersUtilsProvider>
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
                  <div className={classes.labelBox}>
                    <div className={classes.label}>{`${
                      germanDays[daykey]
                    }, ${moment(selectedDate).format("DD")}. ${
                      germanMonths[current.getMonth()]
                    } ${moment(selectedDate).format("YYYY")}`}</div>
                  </div>
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
          <div
            style={{
              textAlign: "center",
              marginTop: 50,
            }}
          >
            <Button
              onClick={backHandler}
              type="button"
              variant="secondary"
              className="mr-4"
            >
              Zurück
            </Button>
            <Button onClick={submitHandler} variant="primary">
              Weiter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LieferzeitpunktScreen;
