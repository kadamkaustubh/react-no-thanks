import { useEffect } from "react"



export function storeSessionValue<T>(key: string, value: T) {

  return (
    useEffect(() => {
      console.log(`${key} stored as ${JSON.stringify(value)}`)
      if (!value === undefined) {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    }, [value])
  )
}

export function getSessionValue<T>(key: string, defaultValue: T): T {
  const sessionValue = window.localStorage.getItem(key)
  console.log(`SessionValue for ${key}: ${sessionValue}`)
  switch(sessionValue) {
    case null:
    case undefined:
    case 'undefined':
      return defaultValue
    default:
      return JSON.parse(sessionValue)
  }
}