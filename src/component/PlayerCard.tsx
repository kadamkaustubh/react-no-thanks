import { Box, Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { PlayerProps } from "./Props";
import { PlayerNames } from "../backend/GameState";
import _ from "underscore";
import { Stars } from "@mui/icons-material";


// const Item = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   border: '1px solid',
//   borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
//   padding: theme.spacing(1),
//   borderRadius: '4px',
//   textAlign: 'center',
// }));

function ListItemCards(props: { list: number[] }) {
  const { main, rest } = { main: props.list[0], rest: props.list.slice(1) }
  return (
    <ListItem>
      <ListItemText >
        <Box display="flex" alignItems="flex-end" gap={'5%'}>
          <Typography variant="h6" lineHeight={1.6} >{main} </Typography>
          <Typography variant='h6' lineHeight={1.6}>{rest.join(',')}</Typography>
        </Box>
      </ListItemText>
    </ListItem>
  )
}

function Tokens(props: {count: number}) {
  return (
    <>
      <Divider light sx={{ marginTop: "10px", marginBottom: "10px" }} />
      {_.range(props.count).map((_, index) => <Stars key={index} />) }
    </>
  )
}


export default function PlayerCard(props: PlayerProps) {
  // const listItems = [[0],[2,3,4],[6,20]]
  const listItems = props[props.name].consecutiveStack()


  return (
    <Card sx={props.currentPlayer === props.name ? { border: `1px solid #90caf9` } : {}}>
      <CardContent>
        <Typography>{props.name}</Typography>
        {props.name == PlayerNames.Player && <Tokens count={props.Player.tokenCount} />}
        <Divider light sx={{ marginTop: "10px", marginBottom: "10px" }} />
        <Typography >Cards</Typography>
        {listItems &&
          <List dense>
            {listItems.map((list, index) => <Box key={index}><Divider /><ListItemCards list={list} /></Box>)}
          </List>}
      </CardContent>
    </Card>
  )
}