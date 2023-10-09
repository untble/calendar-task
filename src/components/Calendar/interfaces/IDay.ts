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
  events: Array;
  pageId: string;
}