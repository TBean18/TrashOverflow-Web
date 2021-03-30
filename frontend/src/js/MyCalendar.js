import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../css/MyCalendar.css';

function MyCalendar() {

    const [value, onChange] = useState(new Date());
    
    return (
        <div className="myCalendar">
            <Calendar
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default MyCalendar