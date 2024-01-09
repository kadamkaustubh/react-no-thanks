import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { GameState, PlayerNames } from "../backend/GameState";

interface Props extends GameState {
  showEndScreen: boolean
  setShowEndScreen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EndScreen(props: Props) {
  const scores = Object.values(PlayerNames)
                       .map((name) => ({[name]:props[name].calculateScore()}))
                       .reduce((a,b) => ({...a,...b}))
  const winner = scores[PlayerNames.Player] < scores[PlayerNames.Alice] && scores[PlayerNames.Player] < scores[PlayerNames.Bob]
  return (
    <Dialog open={props.showEndScreen} onClose={() => props.setShowEndScreen(false)}>
      <DialogTitle>GameOver</DialogTitle>
      <DialogContent>
        <Typography variant="h4">{winner? "YOU WIN": "YOU LOSE"}</Typography>
        {Object.keys(scores).map((name,index) => (<Typography key={index}>{`${name}: ${scores[name]}`}</Typography>))}
      </DialogContent>
    </Dialog>
  )
}