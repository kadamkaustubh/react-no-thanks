import _ from "underscore"
import Player  from "./Player"

export enum PlayerNames {
  Alice = "Alice",
  Bob = 'Bob',
  Player = 'Player'
}

export function nextPlayer(name: PlayerNames): PlayerNames {
  switch(name) {
    case PlayerNames.Alice:
      return PlayerNames.Bob
    case PlayerNames.Bob:
      return PlayerNames.Player
    case PlayerNames.Player:
      return PlayerNames.Alice
  }
}

export interface GameState {
  isGameStarted: boolean
  cardStack: number[]
  currentCard: number
  currentTokenCount: number
  currentPlayer: PlayerNames
  Alice: Player
  Bob: Player
  Player: Player

}

export function initializeGame(): GameState {
  const cardStack = _.shuffle(_.range(3, 36)).slice(9)
  const currentCard = cardStack.pop()
  return {
    isGameStarted: false,
    cardStack: cardStack,
    currentCard: currentCard? currentCard: 0,
    currentTokenCount: 0,
    currentPlayer: PlayerNames.Player,
    Alice: new Player(PlayerNames.Alice),
    Bob: new Player(PlayerNames.Bob),
    Player: new Player(PlayerNames.Player)
  }
}