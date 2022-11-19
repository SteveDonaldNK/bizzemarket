import { Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import useStyles from "./styles"
import {Zoom, Fade} from "react-reveal"
import { Link } from 'react-router-dom'

export default function Cta() {
    const classes = useStyles();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    let heading = 'h2';
    isMatch && (heading = 'h3');
    useMediaQuery(theme.breakpoints.down('sm')) && (heading = 'h4')

  return (
    <div className={classes.container}>
        <Zoom delay={500} duration={1500} cascade><Typography sx={{fontWeight: "bold !important"}} variant={heading}>Qu'attendez vous? Publiez votre annonce maintenant et faites des ventes!</Typography></Zoom>
        <Fade delay={700} bottom cascade><Button component={Link} to="/post" sx={{mt: 5, borderRadius: "0"}} variant='contained'>Publier une annonce</Button></Fade>
    </div>
  )
}
