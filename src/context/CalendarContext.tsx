// @ts-nocheck
import { createContext, FC, PropsWithChildren, useState } from 'react';
import { createDaysForCalendarView } from '../utilities/getCalendarData';
import { v4 as uuid } from 'uuid';

export const CalendarContext = createContext({
  calendarPagesPerMonth: [],
  createNewCalendarPage: (year: number, month: number) => String,
  createEvent: (id: string, text: string, onChangeText, pageId: string, isReadOnly: boolean) => {},
  currentCalendarPage: (pageId: string) => null,
  updateEvent: (id: string, eventId: string, updatedText: string, pageId: string) => {},
});

export const CalendarContextProvider: FC<PropsWithChildren> = (props) => {
  const [calendarPagesPerMonth, setCalendarPagesPerMonth] = useState([]);

  const createNewCalendarPage = (year: number, month: number) => {
    const pageId = year + month;
    if (!calendarPagesPerMonth.find(p => p[pageId])) {
      setCalendarPagesPerMonth([...calendarPagesPerMonth, { [pageId]: createDaysForCalendarView(year, month) }]);
    }
    return pageId;
  };

  const currentCalendarPage = (pageId: string) => {
    const calendarPage = calendarPagesPerMonth.find(p => p[pageId]);
    return calendarPage && calendarPage[pageId];
  };

  const createEvent = (id, text, onChangeText, pageId, isReadOnly) => {
    const existingEvents= currentCalendarPage(pageId).find(d => d.id === id).events;

    if (!existingEvents.find(e => e.text === text && e.text)) {
      const newEvent = { id: uuid(), text, onChangeText, isReadOnly };
      setCalendarPagesPerMonth([
        ...calendarPagesPerMonth,
        existingEvents.push(newEvent),
      ]);
    }

  };

  const updateEvent = (id, eventId, updatedText, pageId) => {
    currentCalendarPage(pageId).forEach(d => {
      if (d.id === id) {
        d.events = d.events.map(event => event.id === eventId ? { ...event, text: updatedText } : event);
      }
      return d;
    });

    setCalendarPagesPerMonth([
      ...calendarPagesPerMonth,
    ]);
  };

  return <CalendarContext.Provider value={{
    createNewCalendarPage,
    calendarPagesPerMonth,
    currentCalendarPage,
    updateEvent,
    createEvent,
  }}>
    {props.children}
  </CalendarContext.Provider>;
};