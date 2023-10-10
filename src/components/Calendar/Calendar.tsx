import { FC, useState, ReactElement, useEffect, useCallback, useContext } from 'react';
import { getYear, getMonth, format } from 'date-fns';
import Day from './components/Day/Day';
import { IDay } from './interfaces/day';
import { FiChevronUp, FiChevronDown, FiCamera } from 'react-icons/fi';
import { CalendarContext } from '../../context/CalendarContext';
import { IHoliday } from './interfaces/holiday';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  DownloadButton,
  Header,
  Month,
  UpDownWrapper,
  Calendar as CalendarWrapper,
  WeekDay,
  arrowButton,
} from './styles';
import { downloadAsImage } from '../../utilities/downloadAsImage';
import { css } from '@emotion/css';
import SearchDropdown from '../custom/SearchDropdown/SearchDropdown';


const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar: FC = (): ReactElement => {
  const today = new Date();
  const initialYear = getYear(today);
  const initialMonth = getMonth(today);
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [pageId, setPageId] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth);
  const [holidays, setHolidays] = useState<IHoliday[]>([]);
  const { createNewCalendarPage, currentCalendarPage, calendarPagesPerMonth } = useContext(CalendarContext);
  const [currentPage, setCurrentPage] = useState<IDay[] | null>(null);

  useEffect(() => {
    setPageId(createNewCalendarPage(selectedYear, selectedMonth));
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    (() => axios.get(`https://date.nager.at/api/v3/PublicHolidays/${selectedYear}/UA`).then(res => setHolidays(res.data)))();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    setCurrentPage(currentCalendarPage(pageId));
  }, [currentCalendarPage, pageId]);

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

  const onDragEnd = (result, currentPage, setCurrentPage) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceDay = currentPage.find(d => d.id === source.droppableId);
      const destDay = currentPage.find(d => d.id === destination.droppableId);
      const sourceItems = [...sourceDay.events];
      const destItems = [...destDay.events];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setCurrentPage(currentPage.map(cp => {
        if (cp.id === source.droppableId) {
          cp.events = sourceItems;
        }
        if (cp.id === destination.droppableId) {
          cp.events = destItems;
        }
        return cp;
      }));
    } else {
      const sourceDay = currentPage.find(d => d.id === source.droppableId);
      const copiedEvents = [...sourceDay.events];
      const [removed] = copiedEvents.splice(source.index, 1);
      copiedEvents.splice(destination.index, 0, removed);
      setCurrentPage(currentPage.map(cp => {
        if (cp.id === source.droppableId) {
          cp.events = copiedEvents
        }
        return cp;
      }));
    }
  };

  return (
    <div id='calendar'>
      <Header>
        <UpDownWrapper>
          <FiChevronUp onClick={() => goToPrevMonth()} className={css`${arrowButton}`} />
          <FiChevronDown onClick={() => goToNextMonth()} className={css`${arrowButton}`} />
        </UpDownWrapper>
        <Month>{format(new Date(selectedYear, selectedMonth), 'MMMM yyyy')}</Month>
        <DownloadButton onClick={() => downloadAsImage("calendar", "calendar")}><FiCamera />Calendar</DownloadButton>
      </Header>
      <SearchDropdown initialData={calendarPagesPerMonth} />
      <CalendarWrapper>
        {WEEKDAYS.map((weekday, index) => (
          <WeekDay key={'weekday-' + index}>{weekday}</WeekDay>
        ))}
        <DragDropContext onDragEnd={(res) => onDragEnd(res, currentPage, setCurrentPage)}>
          {currentPage && currentPage?.map((day: IDay) => (
            <Day key={day.id} {...day} pageId={pageId} holidays={holidays} />
          ))}
        </DragDropContext>
      </CalendarWrapper>
    </div>
  );
};

export default Calendar;
