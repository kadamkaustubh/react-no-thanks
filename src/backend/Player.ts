import _ from "underscore"
import { GameState, PlayerNames } from "./GameState"

export default class Player {
  name: PlayerNames
  tokenCount: number
  cardStack: number[]
  constructor(name: PlayerNames, cardStack: number[] = [], tokenCount: number = 9) {
    this.name = name
    this.tokenCount = tokenCount
    this.cardStack = cardStack
  }

  makeDecision(gameState: GameState): boolean {
    const currentScore = this.calculateScore()
    const newScore = this.calculateScore(gameState.currentCard, gameState.currentTokenCount)
    if (this.tokenCount === 0) {
      return true
    }
    if (newScore-currentScore <10) {
      return true
    }
    if (newScore-currentScore <20) {
      return Math.floor(Math.random()*10)<gameState.currentTokenCount
    }
    return false
  }

  consecutiveStack(stack: number[] = [...this.cardStack]): number[][] {
    const consecutiveCards: number[][] = []
    // Handle empty array
    if (stack.length === 0) {
      return [];
    }
    let currentConsecutiveCards: number[] = [];
    for (let i = 0; i < stack.length; i++) {
      // Check if the current number is consecutive to the previous one
      currentConsecutiveCards.push(stack[i]);
      if (i === stack.length -1 || stack[i] !== stack[i + 1] - 1) {
        consecutiveCards.push(currentConsecutiveCards);
        currentConsecutiveCards = [];
      } 
    }
    return consecutiveCards
  }

  calculateScore(newCard: number=0, newTokens: number=0): number {
    const newStack = [...this.cardStack, newCard].sort((a,b) => a-b)
    const newTokenCount = this.tokenCount + newTokens
    const consecutiveCards = this.consecutiveStack(newStack)
    return consecutiveCards.map((arr) => arr[0]).reduce((a,b) => a+b,0) - newTokenCount
  }

  takeCard(newCard: number, newTokens: number) {
    this.cardStack = [...this.cardStack, newCard].sort((a,b) => a-b)
    this.tokenCount = this.tokenCount + newTokens
    // return new Player(this.name, newStack, newTokenCount)
  }

  noThanks() {
    this.tokenCount = this.tokenCount-1
    // return new Player(this.name, [...this.cardStack], this.tokenCount - 1)
  }


}