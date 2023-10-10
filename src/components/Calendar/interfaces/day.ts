import { IHoliday } from './holiday';
export interface IDay {
  id: string;
  date: Date;
  day: number;
  year: number;
  month: number;
  dayOfWeek: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isLastDayOfMonth: boolean;
  isFirstDayOfMonth: boolean;
  events: IEvent[];
  pageId: string;
  holidays: IHoliday[];
}

export interface IEvent {
  id: string;
  isReadOnly: boolean;
  onChangeText: (prev) => string;
  text: string;
}