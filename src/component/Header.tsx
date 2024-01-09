import { AppBar, Switch, Toolbar, Typography } from "@mui/material"


interface Props {
  themeState: boolean
  toggleTheme: () => void
}

export default function Header(props:Props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>No Thanks - The Game</Typography>
        <Typography>Invented by THORSTEN GIMMLER</Typography>
        <Switch id="themeSwitch" onChange={props.toggleTheme} checked={props.themeState} color="default"/>
        <Typography>{props.themeState? "Light":"Dark"} Theme</Typography>
      </Toolbar>
    </AppBar>
  )
}