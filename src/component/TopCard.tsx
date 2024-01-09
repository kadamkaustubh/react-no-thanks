import { Button, Card, CardContent } from "@mui/material";
import { actionType, } from "./GameStateManager";
import { TopCardProps } from "./Props";

export default function TopCard(props: TopCardProps) {

  const cardStyle = {
    margin: '10px',
    textAlign: 'center',
  }
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'left',
    gap: '5%'
  }
  const handleGameStart = () => {
      if (props.currentCard===0) {
        props.setShowEndScreen(true)
      } else {
        props.setGameState({type: actionType.startGame})
      }
  }



  return (
    <Card sx={cardStyle} >
      <CardContent sx={buttonContainerStyle} >
        <Button
          name="startGame"
          variant="contained"
          onClick={handleGameStart}
          disabled={props.isGameStarted}>
          {props.currentCard===0 ? "Show Results": "Start Game"}
        </Button>
        <Button
          name="endGame"
          variant="contained"
          onClick={() =>props.setGameState({type: actionType.resetGame})}
          // disabled={!props.isGameStarted}
          color="error" >
          Reset Game
        </Button>
      </CardContent>
    </Card>
  )
}