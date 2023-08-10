import { Box, Grid, Heading, HStack, IconButton } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

import { DateBox } from "./DateBox";
import { EventsDateMap } from "./types";
import { fetchEvents } from "./utilities/fetchEvents";
import { getMonthYearDetails, getNewMonthYear } from "./utilities/monthYear";
 // se define la cuadricula para los 20 días
 // se recorre haciendo en cada 1 de los espacios un DateBox

export const Calendar = () => {
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [events, setEvents] = useState<EventsDateMap>({});

  const fetchData = async (newMonthYear) => {
    const response = await fetchEvents(newMonthYear);
    setEvents(response);
  };
  useEffect(() => {
    fetchData(monthYear);
  }, []);

  const incrementMonthYear = async (monthIncrement: number): Promise<void> => {
    const nextMonthYear = getNewMonthYear(monthYear, monthIncrement);
    await fetchData(nextMonthYear);
    setMonthYear(nextMonthYear);
  };

  return (
    <Box>
      <Heading
        size="2xl"
        py={5}
        bgGradient="linear(to-b, olive.50, olive.200)"
        textAlign="center"
      >
        Orinoco Events
      </Heading>
      <Box id="calendar-grid" py={10} bgColor="olive.300">
        <HStack spacing={8} justify="center">
          <IconButton
            aria-label="previous month"
            onClick={() => incrementMonthYear(-1)}
            icon={<TiArrowLeftThick />}
            isDisabled={monthYear.startDate <= currentMonthYear.startDate}
          />{" "}
          <Heading
            size="xl"
            bg="olive.200"
            minW="40%"
            rounded="lg"
            textAlign="center"
          >
            {monthYear.monthName} {monthYear.year}
          </Heading>
          <IconButton
            aria-label="next month"
            onClick={() => incrementMonthYear(1)}
            icon={<TiArrowRightThick />}
          />
        </HStack>
        <Grid
          templateColumns="repeat(7, minmax(0, 1fr))"
          gap={4}
          my={5}
          mx={10}
        >
          <DateBox
            date={1}
            gridColumn={monthYear.firstDOW + 1}
            events={events[1]}
          />
          {[...Array(monthYear.lastDate)].map((_, i) =>
            i > 0 ? (
              <DateBox key={i} date={i + 1} events={events[i + 1]} />
            ) : null
          )}
        </Grid>
      </Box>
    </Box>
  );
};
