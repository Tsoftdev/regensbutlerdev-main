import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getdeliveryScheduleItems } from "../actions/deliveryScheduleActions";
import { Badge } from "@material-ui/core";
import SetdeliveryScheduleItem from "../components/setdeliveryScheduleItem";
import "../components/Fonts.css";

const useStyles = makeStyles((theme) => ({
  saltBox: {
    "@media (max-width: 959px)": {
      display: "none",
    },
  },
  pickerBox: {
    boxShadow: "rgb(0 0 0 / 15%) 10px 10px 10px",
    margin: theme.spacing(2),
  },
  selected: {
    color: "#ff0000",
    fontSize: 17,
  },
  container: {
    marginTop: 150,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DeliverySchedule = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expressselectedDays, setExpressSelectedDays] = React.useState([]);
  const [vollselectedDays, setVollSelectedDays] = React.useState([]);
  var current = new Date();
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const deliverySchedule = useSelector((state) => state.deliverySchedule);
  const { deliveryScheduleItems } = deliverySchedule;

  useEffect(() => {
    if (deliveryScheduleItems !== undefined) {
      if (deliveryScheduleItems.length !== 0) {
        var expressoutputData = {},
          volloutputData = {};
        var expressdata = [],
          volldata = [];
        for (let doc of deliveryScheduleItems.data) {
          if (doc.flag === "express") {
            if (expressoutputData[`express${doc.daysNum}`]) {
              expressoutputData[`express${doc.daysNum}`].daysNum =
                expressoutputData[`express${doc.daysNum}`].daysNum;
            } else {
              expressoutputData[`express${doc.daysNum}`] = doc;
            }
          }
          if (doc.flag === "voll") {
            if (volloutputData[`voll${doc.daysNum}`]) {
              volloutputData[`voll${doc.daysNum}`].daysNum =
                volloutputData[`voll${doc.daysNum}`].daysNum;
            } else {
              volloutputData[`voll${doc.daysNum}`] = doc;
            }
          }
        }
        var curr = new Date(); // get current date
        var firstday = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        for (var i = 0; i <= 6; i++) {
          if (expressoutputData[`express${i}`] !== undefined) {
            expressdata.push(
              expressoutputData[`express${i}`].daysNum + firstday
            );
          }
        }
        setExpressSelectedDays(expressdata)
        for (var j = 0; j <= 6; j++) {
          if (volloutputData[`voll${j}`] !== undefined) {
            volldata.push(volloutputData[`voll${j}`].daysNum + firstday)
          }
        }
        setVollSelectedDays(volldata);
      }
    }
  }, [deliveryScheduleItems]);

  useEffect(() => {
    dispatch(getdeliveryScheduleItems());
  }, [dispatch]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container className="xl:container mx-auto bg-white mt-20 p-0">
        <Grid container className="mainfont items-center justify-center">
          <h1>Einstellung Lieferzeitpunkte: Express Bestellung</h1>

          <div className={classes.container}>
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
              disableFuture={true}
              disablePast={true}
              onChange={(date) => handleDateChange(date)}
              minDate={`${current.getFullYear()}-${current.getMonth() + 1}-01`}
              maxDate={`${current.getFullYear()}-${current.getMonth() + 1}-31`}
              renderDay={(
                day,
                selectedDate,
                isInCurrentMonth,
                dayComponent
              ) => {
                const date = moment(day).format("DD");
                const isSelected =
                  isInCurrentMonth &&
                  expressselectedDays.includes(parseInt(date));
                return (
                  <Badge badgeContent={isSelected ? "🚚" : undefined}>
                    {dayComponent}
                  </Badge>
                );
              }}
              className={classes.pickerBox}
            />
            {days.map((val, index) => {
              return (
                <SetdeliveryScheduleItem
                  label={val}
                  key={index}
                  index={index}
                  flag={"express"}
                />
              );
            })}
          </div>
          <h1>Einstellung Lieferzeitpunkte: Vollsortiment Bestellung</h1>
          <div className={classes.container}>
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
              disableFuture={true}
              disablePast={true}
              onChange={(date) => handleDateChange(date)}
              minDate={`${current.getFullYear()}-${current.getMonth() + 1}-01`}
              maxDate={`${current.getFullYear()}-${current.getMonth() + 1}-31`}
              renderDay={(
                day,
                selectedDate,
                isInCurrentMonth,
                dayComponent
              ) => {
                const date = moment(day).format("DD");
                const isSelected =
                  isInCurrentMonth && vollselectedDays.includes(parseInt(date));
                return (
                  <Badge badgeContent={isSelected ? "🚚" : undefined}>
                    {dayComponent}
                  </Badge>
                );
              }}
              className={classes.pickerBox}
            />
            {days.map((val, index) => {
              return (
                <SetdeliveryScheduleItem
                  label={val}
                  key={index}
                  index={index}
                  flag={"voll"}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DeliverySchedule;
