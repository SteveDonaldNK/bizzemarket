import { Typography } from '@mui/material'
import React from 'react'
import notfound from '../../assets/notfound.gif'
import './Notfound.css'

export default function Notfound() {
  return (
    <div className='notfound'>
        <Typography sx={{fontWeight: "bold !important", mt: 5}} variant='h2'>404</Typography>
        <img src={notfound} alt="" />
        <Typography sx={{fontWeight: "bold !important"}} variant='h4'>Ooops. La page que vous recherchez est introuvable.</Typography>
    </div>
  )
}
