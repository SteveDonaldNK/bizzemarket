import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const context = createContext({})

export default function Context(props) {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/loggedIn", {withCredentials: true})
    .then(res => {
      setUser(res.data.connected)
      setAdmin(res.data.isAdmin)
    })
  })

  const userStatus = {
    connected: user,
    isAdmin: admin
  }

  return (
    <context.Provider value={userStatus}>{props.children}</context.Provider>
  )
}
