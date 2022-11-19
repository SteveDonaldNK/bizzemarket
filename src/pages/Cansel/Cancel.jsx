import CancelIcon from '@mui/icons-material/Cancel'
import { Container, Typography } from '@mui/material'
import React from 'react'
import './Cancel.css'

export default function Cancel() {
  return (
    <div className='Cancel'>
        <Container className='container' sx={{borderRadius: 4, boxShadow: 3}}>
            <CancelIcon sx={{fontSize: "4rem", color: '#FF0000'}} />
            <Typography sx={{fontWeight: "bold", color: '#FF0000'}} variant='h5'>Transaction incomplète</Typography>
            <Typography color="GrayText" variant='subtitle1'>Une erreur s'est produite lors de la transaction, veuillez vérifier votre courrier électronique pour toute notification et réessayer</Typography>
        </Container>
    </div>
  )
}
