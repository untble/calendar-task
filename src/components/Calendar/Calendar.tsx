import { FC, useState, ReactElement, useEffect, useCallback, useContext } from 'react';
import styles from './Calendar.module.scss';
import { getYear, getMonth, format } from 'date-fns';
import Day from './components/Day/Day';
import { IDay } from './interfaces/IDay';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { css } from '@emotion/css';
import { CalendarContext } from '../../context/CalendarContext';
import { IHoliday } from './interfaces/IHoliday';
import axios from 'axios';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar: FC = (): ReactElement => {
  const today = new Date();
  const initialYear = getYear(today);
  const initialMonth = getMonth(today);
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [pageId, setPageId] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth);
  const [holidays, setHolidays] = useState<IHoliday[]>([]);

  const { createNewCalendarPage, currentCalendarPage } = useContext(CalendarContext);
  const currentPage = currentCalendarPage(pageId);
  useEffect(() => {
    setPageId(createNewCalendarPage(selectedYear, selectedMonth));
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    (() => axios.get(`https://date.nager.at/api/v3/PublicHolidays/${selectedYear}/UA`).then(res => setHolidays(res.data)))();
  }, [selectedMonth, selectedYear]);

  const goToPrevMonth = useCallback(() => {
    if (selectedMonth === 0) {
      setSelectedYear((prevYear) => prevYear - 1);
      setSelectedMonth(11);
    } else {
      setSelectedMonth((prevMonth) => prevMonth - 1);
    }
  }, [selectedMonth]);

  const goToNextMonth = useCallback(() => {
    if (selectedMonth === 11) {
      setSelectedYear((prevYear) => prevYear + 1);
      setSelectedMonth(0);
    } else {
      setSelectedMonth((prevMonth) => prevMonth + 1);
    }
  }, [selectedMonth]);


  return (
    <>
      <div className={styles.header}>
        <div className={css`gap: 4px;
          display: flex`}
        >
          <FiChevronUp onClick={() => goToPrevMonth()} className={styles.arrowButton} />
          <FiChevronDown onClick={() => goToNextMonth()} className={styles.arrowButton} />
        </div>
        <div className={styles.selectedMonth}>
          {format(new Date(selectedYear, selectedMonth), 'MMMM yyyy')}
        </div>
      </div>

      <div className={styles.calendar}>
        {WEEKDAYS.map((weekday, index) => {
          return (
            <div key={'weekday-' + index} className={styles.weekday}>
              {weekday}
            </div>
          );
        })}
        {
          currentPage && currentPage?.map((day: IDay) => (
            <Day key={day.id} {...day} pageId={pageId} holidays={holidays}/>
          ))
        }
      </div>
    </>
  );
};

export default Calendar;
