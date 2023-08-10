import dayjs from "dayjs";

export type EventCategory = "webinar" | "conference" | "town hall";

export type Event = {
  id: number;
  startTime: Date;
  endTime: Date;
  eventName: string;
  eventDescription: string;
  location: string;
  category: EventCategory;
};

export type EventsDateMap = Record<number, Event[]>;

export interface MonthYear {
  startDate: dayjs.Dayjs; // first day of the month
  firstDOW: number; // day of week; 0 === Sunday
  lastDate: number; // last date of the month
  monthName: string; // name of the month
  month: string; // two digit month number
  year: string; // four digit year
}
