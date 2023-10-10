import {
  getDaysInMonth,
  getDay,
  format,
  getDate,
  startOfMonth,
  endOfMonth,
  isToday,
  isLastDayOfMonth,
  isFirstDayOfMonth,
} from 'date-fns';
import { v4 as uuid } from 'uuid';

const TOTAL_CELLS_COUNT = 42;

const createDayData = (
  year: number,
  month: number,
  day: number,
  isCurrentMonth: boolean,
) => {
  const dayOfWeek = getDay(new Date(year, month, day));
  const date = new Date(year, month, day)

  return {
    id: uuid(),
    date: format(date, 'yyyy-MM-dd'),
    dayOfWeek,
    day,
    month,
    year,
    isCurrentMonth,
    events: [],
    isLastDayOfMonth: isLastDayOfMonth(date),
    isFirstDayOfMonth: isFirstDayOfMonth(date),
    isToday: isToday(new Date(year, month, day)),
  };
};

const createDaysForCurrentMonth = (year: number, month: number) => {
  return [...Array(getDaysInMonth(new Date(year, month)))].map((_, index) =>
    createDayData(year, month, index + 1, true)
  );
};

const createDaysForPreviousMonth = (year: number, month: number) => {
  const firstDayOfMonth = startOfMonth(new Date(year, month));
  const firstDayOfTheMonthWeekday = getDay(firstDayOfMonth) || 7;

  const prevMonthDays = [];

  // Negative numbers in new Date returns days from prev month
  const indexOfFirstVisibleDayFromPrevMonth = -1 * (firstDayOfTheMonthWeekday - 2);
  for (let i = indexOfFirstVisibleDayFromPrevMonth; i <= 0; i++) {
    const dateInPrevMonth = getDate(new Date(year, month, i));
    prevMonthDays.push(createDayData(year, month - 1, dateInPrevMonth, false) as never);
  }

  return prevMonthDays;
};

const createDaysForNextMonth = (year: number, month: number) => {
  const lastDayOfMonth = endOfMonth(new Date(year, month));
  const lastDayOfTheMonthWeekday = getDay(lastDayOfMonth) || 7;

  const nextMonthDays = [];

  const numberOfDaysLeftInLastWeekOfSelectedMonth = 7 - lastDayOfTheMonthWeekday;

  for (let i = 1; i <= numberOfDaysLeftInLastWeekOfSelectedMonth; i++) {
    nextMonthDays.push(createDayData(year, month + 1, i, false) as never);
  }

  return nextMonthDays;
};

export const createDaysForCalendarView = (year: number, month: number) => {
  const days = [
    ...createDaysForPreviousMonth(year, month),
    ...createDaysForCurrentMonth(year, month),
    ...createDaysForNextMonth(year, month),
  ];

  // Here we check if extra days from next month are needed to complete the grid view and keep it always 42 cells
  // 7 columns x 6 rows
  if (days.length < TOTAL_CELLS_COUNT) {
    const lastDateInArray = days[days.length - 1].day;

    let nextDate = getDate(new Date(year, month, lastDateInArray + 1));
    for (let i = days.length; i < TOTAL_CELLS_COUNT; i++) {
      days.push(createDayData(year, month + 1, nextDate, false));
      nextDate++;
    }
  }

  return days;
};
