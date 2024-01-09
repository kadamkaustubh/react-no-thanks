import { ExpandMore } from "@mui/icons-material";
import { AccordionDetails, List, ListItem, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";


export default function EventLog(props: {eventLog: string[]}) {
  const summary = props.eventLog.length === 0? "" : props.eventLog[props.eventLog.length-1]
  const [isExpanded, setExpanded] = useState(false)

  return (
    <Accordion expanded={isExpanded} onChange={() => setExpanded(!isExpanded)}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ width: '33%', flexShrink: 0 }}>Event Log</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails> 
        <List dense>
          {[...props.eventLog].reverse().map((log,index) => <ListItem key={index}><Typography variant='body2'>{log}</Typography></ListItem>)}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

