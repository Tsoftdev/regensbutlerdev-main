import React, { useEffect } from 'react';
import {
    TimePicker
} from '@material-ui/pickers';
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import {
    addTodeliveryScheduleItem,
    removeFromdeliveryScheduleItem
} from "../actions/deliveryScheduleActions";
import Snackbar from "./Snackbar";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { CustomScrollbars } from "./CustomScrollbar";

const useStyles = makeStyles((theme) => ({
    container: {
        width: 310,
        boxShadow: 'rgb(38 57 77) 0px 10px 20px -10px',
        minHeight: 405,
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
    label: {
        fontFamily: 'preisFont',
        color: '#666',
        fontSize: 40,
    },
    timepickerBox: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2)
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
    }
}));

const SetdeliveryScheduleItem = ({
    label,
    index,
    flag
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const deliverySchedule = useSelector((state) => state.deliverySchedule);
    const { deliveryScheduleItems } = deliverySchedule;
    const [errflag, setErrflag] = React.useState(false);
    const [severity, setSeverity] = React.useState("error");
    const [error, setError] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [arrTime, setArrTime] = React.useState([]);

    const handleChange = (date, key) => {
        const timeAt = moment(date).format('HH:mm');
        const expressexistTimeItem = arrTime.length !== 0 && arrTime.find((x) => x.timeAt === timeAt);
        if (!expressexistTimeItem) {
            var data = [];
            arrTime.forEach(element => {
                data.push(element)
            });
            data.push(timeAt);
            setArrTime(data);
            dispatch(addTodeliveryScheduleItem({
                flag: key,
                day: label,
                timeAt: timeAt,
                daysNum: index
            }));
            setErrflag(true);
            setSeverity("success");
            setError("Ein Lieferplan wurde hinzugefügt.")
            setTimeout(() => {
                setErrflag(false);
                setError("");
            }, 1000);
        }
        else {
            setErrflag(true);
            setSeverity('error');
            setError("Ungültige Bewertungstimen Oder die Timen sind bereits vorhanden.")
            setTimeout(() => {
                setErrflag(false);
                setSeverity("");
                setError("");
            }, 1000);
        }
    };

    const handleRemoveTime = (id) => {
        dispatch(removeFromdeliveryScheduleItem(id));
        setErrflag(true);
        setSeverity("success");
        setError("Ein Lieferplan gelöscht.")
        setTimeout(() => {
            setErrflag(false);
            setError("");
        }, 1000);
    }

    useEffect(() => {
        if (deliveryScheduleItems !== undefined) {
            if (deliveryScheduleItems.length !== 0) {
                var scheduleItems = [];
                deliveryScheduleItems.data.forEach(element => {
                    if (element.flag === flag && element.day === label)
                        scheduleItems.push(element)
                });
                setArrTime(scheduleItems);
            }
        }
    }, [dispatch, deliveryScheduleItems, label, flag])

    return (
        <>
            <div className={classes.container}>
                {errflag && (
                    <Snackbar severity={severity} alert={error} />
                )}
                <CustomScrollbars
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                >
                    <div className={classes.labelBox}
                        onClick={() => setOpen(true)}
                    >
                        <div className={classes.label} style={label === "Sun" ? { color: '#ff0000' } : null}> {label}</div>
                    </div>
                    <div className={classes.timepickerBox}>
                        {
                            arrTime.map((val, index) => {
                                return (
                                    <div className={classes.timeBox} key={index}>
                                        <div>{val.timeAt}</div>
                                        <HighlightOffIcon style={{ cursor: 'pointer' }}
                                            onClick={() => handleRemoveTime(val.id)}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </CustomScrollbars>
            </div>
            <div style={{ display: 'none' }}>
                <TimePicker
                    open={open}
                    inputVariant={"outlined"}
                    ampm={false}
                    orientation={"portrait"}
                    margin="normal"
                    name={`${flag}-${label}`}
                    id={`${flag}-${label}`}
                    onChange={(date) => handleChange(date, flag)}
                    onClose={() => setOpen(false)}
                />
            </div>
        </>
    )
}

export default SetdeliveryScheduleItem;