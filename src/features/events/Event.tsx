
import { Event as EventType, EventCategory } from "./types";
import dayjs from "dayjs";
import {Box,HStack , Text } from "@chakra-ui/react";

type EventProps = { 
    eventData:EventType;
};

export const Event = ({ eventData }: EventProps) => {
    const evenStart = dayjs(eventData.startTime).format("HH:mm");
    
    return (<Box borderRadius = "lg" 
    px = {2}
    bg = {getColorByCategory(eventData.category)} 
    color = "white">
    <HStack> 
        <Text as = "span" fonstsize = "xs"> {evenStart}</Text>
        
        <Text as = "span" fonstsize = "xs" isTruncated> {eventData.eventName} </Text>
    </HStack>
    </Box>);
    };  


const getColorByCategory = (category: EventCategory): string => {
    const coloByCategory = {
        webinar: "blue.700",
        conference : "red.700",
        "town hall": "green.700",
    };
    
    return coloByCategory[category]?? "black";
};

