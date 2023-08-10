import React from "react";
import {Box , Stack ,Text} from '@chakra-ui/react' ;
import { Event as EventType } from "./types";
import {Event} from "./Event";


type DateBoxProps = {
    
    date : number ; 
    gridColumn? : number;
    events?: EventType[];
}


export const DateBox = ({date,gridColumn , events} : DateBoxProps) => {
    const sortedEvents = events.sort(
        (a, b) => a.startTime.getHours() - b.startTime.getHours()
        );
    
    return (
    <Box w = "100%" minH = {20} bg="olive.50" 
    gridColumnStart = {gridColumn}
    boxShadow = "md" rounded = "md"> 
        <Stack m = {2} spacing = {1}>
            <Text fontSize = "xs" textAlign = "right">
                {date}
            </Text>
            {sortedEvents.map((event)=> (
            <Event key = {event.id} eventData= {event} />
            ))}
            
        </Stack>
    </Box>
    )
};


DateBox.defaultProps = {gridColumn : null, events: [] };


