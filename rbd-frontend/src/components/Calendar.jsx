import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, parse } from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center py-2">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <span className="text-lg font-semibold">Prev</span>
        </button>
        <div>
          <span className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
        </div>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <span className="text-lg font-semibold">Next</span>
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-sm font-semibold text-gray-700">
          {format(addDays(startDate, i), 'E')}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`p-2 text-center cursor-pointer ${!isSameMonth(day, monthStart)
                ? 'text-gray-400'
                : isSameDay(day, selectedDate)
                  ? 'bg-blue-500 text-white rounded-full'
                  : 'text-gray-900'
              }`}
            onClick={() => setSelectedDate(parse(cloneDay))}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
