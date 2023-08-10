/* eslint-disable no-param-reassign */
import dayjs from "dayjs";

import { EventsDateMap, MonthYear } from "../types";

// adapted from https://stackoverflow.com/a/9481478
// dayNum = number for day of the week
const getDatesForDayNum = (
  year: number,
  month: number,
  dayNum: number
): number[] => {
  const d = new Date(year, month);
  const relevantDates = [];

  d.setDate(dayNum);

  // Get the first day in the month that has dayNum day of the week
  while (d.getDay() !== dayNum) {
    d.setDate(d.getDate() + 1);
  }

  // Get all the other dayNum days in the month
  while (d.getMonth() === month) {
    relevantDates.push(d.getDate());
    d.setDate(d.getDate() + 7);
  }

  return relevantDates;
};

const addTownHall = (year: number, month: number, events: EventsDateMap) => {
  const relevantDates = getDatesForDayNum(year, month, 3);
  const day = relevantDates[0];
  if (!(day in events)) {
    events[day] = [];
  }
  events[day].push({
    id: 12345,
    startTime: new Date(year, month, day, 14, 0),
    endTime: new Date(year, month, day, 14, 45),
    eventName: "CEO Town Hall",
    eventDescription:
      "Our monthly town hall with CEO Sandra Williams. Submit questions in advance!",
    location: "online",
    category: "town hall",
  });
};

const addWebinars = (year: number, month: number, events: EventsDateMap) => {
  const relevantDates = getDatesForDayNum(year, month, 2);
  relevantDates.forEach((day) => {
    if (!(day in events)) {
      events[day] = [];
    }
    events[day].push({
      id: 123 + day,
      startTime: new Date(year, month, day, 10, 0),
      endTime: new Date(year, month, day, 11, 30),
      eventName: "New User Webinar",
      eventDescription:
        "Come learn more about using our products, and get tips from the experts!",
      location: "online",
      category: "webinar",
    });
  });
};

const createEventsWithConf = (
  year: number,
  month: number,
  startDate: number,
  confName: string,
  location: string
): EventsDateMap => {
  const events: EventsDateMap = {};
  [startDate, startDate + 1, startDate + 2].forEach((day) => {
    events[day] = [
      {
        id: 54321 + day,
        startTime: new Date(year, month, 1, 8, 0),
        endTime: new Date(year, month, 1, 18, 0),
        eventName: confName,
        eventDescription: `Come visit our booth at ${confName}!`,
        location,
        category: "conference",
      },
    ];
  });
  return events;
};

// Fake data to be returned instead of getting data from a server
// Returns a promise to simulate effect of fetching from a server
export const fetchEvents = (monthYear: MonthYear): Promise<EventsDateMap> => {
  // MonthYear properties are 1 indexed; new Date requires 0 index
  const monthInQuestion = Number(monthYear.month) - 1;
  const yearInQuestion = Number(monthYear.year) - 1;

  const todayDate = dayjs();
  const dateInQuestion = dayjs(new Date(yearInQuestion, monthInQuestion));

  // set events for this month
  if (todayDate.month() === dateInQuestion.month()) {
    const events = createEventsWithConf(
      yearInQuestion,
      monthInQuestion,
      14,
      "DevOpsConf",
      "San Francisco, USA"
    );
    addTownHall(yearInQuestion, monthInQuestion, events);
    addWebinars(yearInQuestion, monthInQuestion, events);

    return Promise.resolve(events);
  }

  // set events for next month
  if (dateInQuestion.month() === todayDate.add(1, "month").month()) {
    const events = createEventsWithConf(
      yearInQuestion,
      monthInQuestion,
      2,
      "World of DevOps",
      "Sydney, Australia"
    );
    addTownHall(yearInQuestion, monthInQuestion, events);
    addWebinars(yearInQuestion, monthInQuestion, events);
    return Promise.resolve(events);
  }

  // set events for two months hence
  if (dateInQuestion.month() === todayDate.add(2, "month").month()) {
    const events = createEventsWithConf(
      yearInQuestion,
      monthInQuestion,
      22,
      "Future of DevOps",
      "Sao Paulo, Brazil"
    );
    addTownHall(yearInQuestion, monthInQuestion, events);
    addWebinars(yearInQuestion, monthInQuestion, events);
    return Promise.resolve(events);
  }

  // default
  const events = {};
  addTownHall(yearInQuestion, monthInQuestion, events);
  addWebinars(yearInQuestion, monthInQuestion, events);
  return Promise.resolve(events);
};
