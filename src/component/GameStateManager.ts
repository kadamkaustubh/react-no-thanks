import lodash from "lodash"
import { GameState, initializeGame, nextPlayer } from "../backend/GameState"


export enum actionType {
  takeCard,
  noThanks,
  startGame,
  endGame,
  resetGame
}

export function gameStateReducer (state: GameState, action: {type: actionType}) {
  const newState =   lodash.cloneDeep(state)

  switch (action.type) {
    case actionType.startGame:
      return {...newState,isGameStarted: true}
    
    case actionType.endGame: 
      return {...newState,isGameStarted: false}
    
    case actionType.takeCard: {
      newState[state.currentPlayer].takeCard(state.currentCard,state.currentTokenCount)
      const newCard = newState.cardStack.pop()
      newState.currentCard = newCard ? newCard: 0
      newState.currentTokenCount = 0
      return newState
    }
    
    case actionType.noThanks: {
      newState[state.currentPlayer].tokenCount = state[state.currentPlayer].tokenCount-1
      newState.currentTokenCount = state.currentTokenCount +1
      newState.currentPlayer = nextPlayer(state.currentPlayer)

      return newState
    }

    case actionType.resetGame: {
      return {...initializeGame(),isGameStarted: true}
    }
  }
}


export interface EventLogType {
  type: 'add' | 'remove'
  value: string
}

export function eventLogReducer(state: string[], action: EventLogType) {
  const newState = [...state]
  switch (action.type) {
    case "add":
      newState.push(action.value)
      return newState
    default:
      return newState
  }
}