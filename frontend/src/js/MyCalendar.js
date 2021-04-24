import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/MyCalendar.css";

function MyCalendar(props) {
  const { onChange, value, refForward } = props;
  return (
    <div className="myCalendar" ref={refForward}>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default MyCalendar;
