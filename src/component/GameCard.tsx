import _ from "underscore";
import { GameProps } from "./Props";
import { Box, Button, Card, CardContent, Divider, Grid, Paper, Typography, styled } from "@mui/material";
import { Stars } from "@mui/icons-material";
import { PlayerNames } from "../backend/GameState";
import { actionType } from "./GameStateManager";



function CurrentCard(props: { cardValue: number }) {
  let cardColor: string
  switch (true) {
    case props.cardValue >= 3 && props.cardValue <= 10:
      cardColor = 'primary'
      break
    case props.cardValue >= 11 && props.cardValue <= 20:
      cardColor = 'secondary'
      break
    case props.cardValue >= 21 && props.cardValue <= 30:
      cardColor = 'warning'
      break
    default:
      cardColor = 'error'
  }
  const StyledCard = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    height: 150,
    lineHeight: '60px',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#EBE3E1',
    // borderColor: `${cardColor}.main`,
    minWidth: 150
  }));
  return (
    <Box
      width={150}
      height={150}
      borderRadius={4}
      position="relative"
      border={'20px hidden'}
    >
      <StyledCard>
        <Box
          width={100}
          height={100}
          borderRadius={4}
          color={`${cardColor}.main`} // Outer box with red border
          border={10}
          position="absolute"
          top={25}
          left={25}
          justifyContent={'center'}
          alignItems={'center'}
          // display={'flex'}
        >
          <Typography variant="h3" textAlign={'center'} >{props.cardValue}</Typography>
        </Box>
      </StyledCard>
    </Box>
  )
}


export default function GameCard(props: GameProps) {
  const takeCardAction = () => {
    props.dispatchEventLog({type: 'add', value: `For ${props.currentCard}, ${props.currentPlayer} decided to takeCard`})

    props.currentPlayer === PlayerNames.Player && props.setGameState({type: actionType.takeCard})
  }

  const noThanksAction = () => {
    props.dispatchEventLog({type: 'add', value: `For ${props.currentCard}, ${props.currentPlayer} decided to noThanks`})
    props.currentPlayer === PlayerNames.Player && props.setGameState({type: actionType.noThanks})
  }

  return (
    <>
      <Card >
        <CardContent>
          <Typography variant="h6" textAlign={'center'} >{`Current Player: ${props.currentPlayer}`}</Typography>
            <CurrentCard cardValue={props.currentCard} />
            <Divider sx={{ marginTop: "20px", marginBottom: "20px" }}  variant="fullWidth"/>
            <Typography>Tokens:</Typography>
            <Grid container 
              gap={'5%'}
              >
              {_.range(props.currentTokenCount).map((_key,index) => <Grid item key={index}><Stars color="primary" /> </Grid>)}
            </Grid>
            <Divider sx={{ marginTop: "20px", marginBottom: "20px" }}  variant="fullWidth"/>
            {props.isGameStarted && <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'2%'} padding={'5px'}>
              <Button variant="contained" onClick={takeCardAction} disabled={props.currentCard === 0}>Take Card</Button>
              <Button variant="contained" onClick={noThanksAction} disabled={props.currentCard === 0 || props.Player.tokenCount<=0} color="secondary">No thanks</Button>
            </Box>}
        </CardContent>
      </Card>
    </>
  )
}