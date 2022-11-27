import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const context = createContext({})

export default function Context(props) {
  const [user, setUser] = useState(); // should be left empty or login dialog will flicker once when user is connected
  const [admin, setAdmin] = useState();

  useEffect(() => {
    try {
      axios.get("http://54.197.36.149:4000/api/loggedIn", {withCredentials: true})
      .then(res => {
        setUser(res.data.connected)
        setAdmin(res.data.isAdmin)
      })
    } catch (error) {
      console.log(error)
    }
  })

  const userStatus = {
    connected: user,
    isAdmin: admin
  }

  return (
    <context.Provider value={userStatus}>{props.children}</context.Provider>
  )
}
