import { GameState, PlayerNames } from "../backend/GameState";
import { EventLogType, actionType } from "./GameStateManager";

export interface GameProps extends GameState {
  setGameState: React.Dispatch<{type: actionType}>
  dispatchEventLog: React.Dispatch<EventLogType>
}

export interface TopCardProps extends GameState {
  setGameState: React.Dispatch<{type: actionType}>
  setShowEndScreen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PlayerProps extends GameProps {
  name: PlayerNames
}