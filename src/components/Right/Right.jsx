import React from 'react'
import {Avatar, Box} from '@mui/material'
import './Right.css'
import { UpdatesData } from '../../params'

export default function Right({tab}) {
  if (tab === 'Analyses') {
    return (
      <div className='right'>
        <Box sx={{borderRadius: 2, background: "#FFF", padding: "10px 20px"}}>
          <h4>Utilisateurs Premium</h4>
          <div className="newUsers">
              {UpdatesData.map((user, key) => (
                <div className="newUser">
                  <span className='profile'><Avatar /><p>{user.name}</p></span>
                  <p>{user.time}</p>
                </div>
              ))}
          </div>
        </Box>
        <Box sx={{borderRadius: 2, background: "#FFF", padding: "10px 20px"}}>
          <h4>Nouveaux Abonnes</h4>
          <div className="newUsers">
              {UpdatesData.map((user, key) => (
                <div className="newUser">
                  <p>{user.name}</p>
                  <p>{user.time}</p>
                </div>
              ))}
          </div>
        </Box>
      </div>
    )
  }
}
