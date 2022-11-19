import { CheckCircle } from '@mui/icons-material'
import { Container, Typography } from '@mui/material'
import React from 'react'
import './Success.css'

export default function Success() {
  return (
    <div className='Success'>
        <Container className='container' sx={{borderRadius: 4, boxShadow: 3}}>
            <CheckCircle sx={{fontSize: "4rem", color: '#20AF5C'}} />
            <Typography sx={{fontWeight: "bold", color: '#20AF5C'}} variant='h5'>Paiement réussi</Typography>
            <Typography color="GrayText" variant='subtitle1'>Votre forfait a été activé avec succès, toutes vos annonces seront publiées dans la section premium jusqu'à la date d'échéance du forfait</Typography>
        </Container>
    </div>
  )
}
