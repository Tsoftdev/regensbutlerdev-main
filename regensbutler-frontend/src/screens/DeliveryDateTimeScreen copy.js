import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import {
  addToDeliveryDateItem,
  getDeliveryDateItems,
  removeFromDeliveryDateItem
} from "../actions/deliveryDateActions";
import {
  addToDeliveryTimeItem,
  getDeliveryTimeItems,
  removeFromDeliveryTimeItem
} from "../actions/deliveryTimeActions";
import Snackbar from "../components/Snackbar";
import { Table } from "react-bootstrap";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Badge } from "@material-ui/core";
// import { makeJSDateObject } from '../components/utils/helpers';

const useStyles = makeStyles((theme) => ({
  saltBox: {
    "@media (max-width: 959px)": {
      display: 'none',
    },
  },
  pickerBox: {
    boxShadow: 'rgb(0 0 0 / 15%) 10px 10px 10px',
  },
  selected: {
    color: '#ff0000',
    fontSize: 17,
  }
}));

const deliverySchedule = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedDays, setSelectedDays] = React.useState([]);
  var current = new Date();
  const [selectedDate, handleDateChange] = React.useState(`${current.getFullYear()}-01-01`);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [time, setTime] = React.useState(new Date());
  const [errflag, setErrflag] = React.useState(false);
  const [error, setError] = React.useState("");
  const deliveryDate = useSelector((state) => state.deliveryDate);
  const { deliveryDateItems } = deliveryDate;
  const deliveryTime = useSelector((state) => state.deliveryTime);
  const { deliveryTimeItems } = deliveryTime;

  const handleChange = (key, date) => {
    switch (key) {
      case "date":
        handleDateChange(date);
        const dateAt = parseInt(moment(date).format('DD'));
        const existDateItem = deliveryDateItems.length !== 0 && deliveryDateItems.data.find((x) => x.dateAt === dateAt);
        if (!existDateItem)
          dispatch(addToDeliveryDateItem({ dateAt: dateAt }));
        else {
          setErrflag(true);
          setError("Ungültige Bewertungsdaten Oder die Daten sind bereits vorhanden.")
          setTimeout(() => {
            setErrflag(false);
            setError("");
          }, 3000);
        }
        break;
      case "time":
        setTime(date);
        const timeAt = moment(date).format('HH:mm');
        const existTimeItem = deliveryTimeItems.length !== 0 && deliveryTimeItems.data.find((x) => x.timeAt === timeAt);
        if (!existTimeItem)
          dispatch(addToDeliveryTimeItem({ timeAt: timeAt }));
        else {
          setErrflag(true);
          setError("Ungültige Bewertungstimen Oder die Timen sind bereits vorhanden.")
          setTimeout(() => {
            setErrflag(false);
            setError("");
          }, 3000);
        }
        break;
      default:
        break;
    }
  };

  const handleRemoveDate = (id) => {
    dispatch(removeFromDeliveryDateItem(id));
  }

  const handleRemoveTime = (id) => {
    dispatch(removeFromDeliveryTimeItem(id));
  }

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, [currentTime])

  useEffect(() => {
    var data = []
    deliveryDateItems.length !== 0 && deliveryDateItems.data.forEach((val) => {
      data.push(val.dateAt);
    })
    setSelectedDays(data)
  }, [deliveryDateItems])

  useEffect(() => {
    dispatch(getDeliveryDateItems());
    dispatch(getDeliveryTimeItems());
  }, [dispatch])

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {errflag && (
        <Snackbar severity={"error"} alert={error} />
      )}
      <Grid container className="xl:container mx-auto bg-white mt-20 p-0" style={{ marginTop: 150 }}>
        <Grid item xs={12} md={2} className={classes.saltBox}></Grid>

        <Grid item xs={12} sm={6} md={3} style={{
          textAlign: 'center'
        }}>
          <DatePicker
            variant={"static"}
            margin="normal"
            format="DD/MM/YYYY"
            name="deliveryDate"
            orientation={"portrait"}
            id="deliveryDate"
            value={() => { new Date() }}
            onChange={(date) => console.log(date)}
            minDate={`${current.getFullYear()}-01-01`}
            maxDate={`${current.getFullYear()}-01-31`}
            readOnly={true}
            renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
              const date = moment(day).format('DD');
              const isSelected = isInCurrentMonth && selectedDays.includes(parseInt(date));
              return <Badge badgeContent={isSelected ? "🚚" : undefined}>{dayComponent}</Badge>;
            }}
            className={classes.pickerBox}
          />
          <DatePicker
            inputVariant={"outlined"}
            orientation={"portrait"}
            margin="normal"
            format="DD/MM/YYYY"
            name="deliveryDate"
            id="deliveryDate"
            value={selectedDate}
            onChange={(date) => handleChange('date', date)}
            minDate={`${current.getFullYear()}-01-01`}
            maxDate={`${current.getFullYear()}-01-31`}
            disableToolbar={true}
            renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
              const date = moment(day).format('DD');
              const isSelected = isInCurrentMonth && selectedDays.includes(parseInt(date));
              return <Badge badgeContent={isSelected ? "🚚" : undefined}>{dayComponent}</Badge>;
            }}
            className={classes.pickerBox}
          />
          <div className={classes.pickerBox}>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>ID</th>
                  <th style={{ textAlign: 'center' }}>Datum</th>
                  <th style={{ textAlign: 'center' }}>Aktion</th>
                </tr>
              </thead>
              {
                deliveryDateItems.length !== 0 && (
                  <tbody>
                    {deliveryDateItems.data.map((val, index) => (
                      <tr key={val.id}>
                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ textAlign: 'center' }}>Alle <strong className={classes.selected}>{val.dateAt}</strong> Tage im Monat...</td>
                        <td style={{ textAlign: 'center' }}>
                          <HighlightOffIcon
                            style={{
                              color: '#ff4136',
                              cursor: 'pointer'
                            }}
                            onClick={() => { handleRemoveDate(val.id) }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )
              }
            </Table>
          </div>
        </Grid>

        <Grid item xs={12} md={1} className={classes.saltBox}></Grid>

        <Grid item xs={12} sm={6} md={3} style={{
          textAlign: 'center'
        }}>
          <TimePicker
            readOnly={true}
            inputVariant={"outlined"}
            variant={"static"}
            ampm={false}
            margin="normal"
            name="deliveryTime"
            id="deliveryTime"
            value={currentTime}
            views={["hours", "minutes", "seconds"]}
            orientation={"portrait"}
            onChange={(date) => console.log(date)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            className={classes.pickerBox}
          />
          <TimePicker
            inputVariant={"outlined"}
            ampm={false}
            orientation={"portrait"}
            margin="normal"
            name="deliveryTime"
            id="deliveryTime"
            value={time}
            onChange={(date) => handleChange('time', date)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            className={classes.pickerBox}
          />
          <div className={classes.pickerBox}>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>ID</th>
                  <th style={{ textAlign: 'center' }}>Zeit</th>
                  <th style={{ textAlign: 'center' }}>Aktion</th>
                </tr>
              </thead>{
                deliveryTimeItems.length !== 0 && (
                  <tbody>
                    {deliveryTimeItems.data.map((val, index) => (
                      <tr key={val.id}>
                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ textAlign: 'center' }}>{val.timeAt}</td>
                        <td style={{ textAlign: 'center' }}>
                          <HighlightOffIcon
                            style={{
                              color: '#ff4136',
                              cursor: 'pointer'
                            }}
                            onClick={() => { handleRemoveTime(val.id) }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )
              }
            </Table>
          </div>
        </Grid>

        <Grid item xs={12} md={2} className={classes.saltBox}></Grid>
      </Grid>
    </MuiPickersUtilsProvider >
  )
}

export default deliverySchedule;