import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useReducer, useState } from 'react';
import Header from './component/Header';
import { initializeGame } from './backend/GameState';
import { actionType, eventLogReducer, gameStateReducer } from './component/GameStateManager';
import PlayArea from './component/PlayArea';
import EndScreen from './component/EndScreen';
import TopCard from './component/TopCard';
import EventLog from './component/EventLog';
import { getSessionValue, storeSessionValue } from './component/SessionStore';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#EDEDE9',
      paper:'#F5EBE0'
    }
  },
});

export default function App() {
  const [isLight, setIsLight] = useState(getSessionValue('isLight',false))
  const [gameState, setGameState] = useReducer(gameStateReducer,getSessionValue('isLight',initializeGame()))
  const [showEndScreen, setShowEndScreen] = useState(getSessionValue('isLight',false))
  const [eventLog,dispatchEventLog] = useReducer(eventLogReducer,getSessionValue('isLight',[]))

  useEffect(() => {
    if (gameState.currentCard === 0){
      setShowEndScreen(true)
      setGameState({type: actionType.endGame})
    }
  },[gameState.currentCard])

  storeSessionValue('isLight', isLight)
  storeSessionValue('gameState', gameState)
  storeSessionValue('showEndScreen',showEndScreen)
  storeSessionValue('eventLog',eventLog)

  return (
    <ThemeProvider theme={isLight? lightTheme: darkTheme}>
      <CssBaseline />
      <Header themeState={isLight} toggleTheme={() => setIsLight(!isLight)}/>
      <TopCard {...gameState} setGameState={setGameState} setShowEndScreen={setShowEndScreen}/>
      <PlayArea {...gameState} setGameState={setGameState} dispatchEventLog={dispatchEventLog}/>
      <EndScreen {...gameState} showEndScreen={showEndScreen} setShowEndScreen={setShowEndScreen} />
      <EventLog eventLog={eventLog}/>
    </ThemeProvider>
  );
}

