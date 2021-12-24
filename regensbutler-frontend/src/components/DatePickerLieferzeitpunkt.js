import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays, setHours, setMinutes } from "date-fns";
import dateformat from "dateformat";
import { useDispatch } from "react-redux";
import {
  addToShippingTimeCookie,
} from "../actions/shippingTimeActions";

registerLocale("de", de);
const DatePickerLieferzeitpunkt = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), new Date().getHours() + 3)
  );

  useEffect(() => {
    let formatted_date = dateformat(startDate, "dd.mm.yyyy hh:MM");
    dispatch(addToShippingTimeCookie(formatted_date));
  }, [startDate, dispatch]);

  const maximalDate = addDays(new Date(), 7);
  const minimalDate = subDays(new Date(), -1);
  return (
    <DatePicker
      className="border-2 border-green-500 text-xl cursor-pointer"
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
      }}
      maxDate={maximalDate}
      minDate={minimalDate}
      locale="de"
      timeFormat="p"
      dateFormat="Pp"
      timeIntervals="60"
      showTimeSelect
      timeCaption="Zeit ab"
      includeTimes={[
        setHours(setMinutes(new Date(), 0), 8),
        setHours(setMinutes(new Date(), 0), 12),
        setHours(setMinutes(new Date(), 0), 16),
        setHours(setMinutes(new Date(), 0), 20),
      ]}
    />
  );
};

export default DatePickerLieferzeitpunkt;
