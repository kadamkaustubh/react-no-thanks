
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid";
import PlayerCard from "./PlayerCard";
import { PlayerNames } from "../backend/GameState";
import { GameProps } from "./Props";
import GameCard from "./GameCard";
import { useEffect } from "react";
import { actionType } from "./GameStateManager";

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))




export default function PlayArea(props: GameProps) {
  
  useEffect(() => {
    const simulate = async () => {
      await sleep(1500)
      if (props.currentPlayer !== PlayerNames.Player) {
        const decision = props[props.currentPlayer].makeDecision(props)
        props.dispatchEventLog({type:'add',value:`For ${props.currentCard}, ${props.currentPlayer} decided to ${decision? 'takeCard': 'noThanks'}`})
          if (decision) {
              props.setGameState({type: actionType.takeCard})
          } else {
              props.setGameState({type: actionType.noThanks})
          }
        }
    }
    if (props.currentCard>0){
      simulate ()
    }
    
  }, [props])


  return (
    <Box sx={{ flexGrow: 1, margin: '10px' }}>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6} md={3}>
          <GameCard {...props} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PlayerCard {...props} name={PlayerNames.Player} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PlayerCard {...props} name={PlayerNames.Alice} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PlayerCard {...props} name={PlayerNames.Bob} />
        </Grid>
      </Grid>
    </Box>
  );
}