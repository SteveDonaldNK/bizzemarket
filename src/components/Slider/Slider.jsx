import { Box, Slide, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import useStyles from './styles'

export default function Slider() {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(true);
    const messages = [
        <p>Passer à <a style={{textDecoration: "none", color: "#E5BA0E"}} href='/'>Premium</a></p>,
        <p>Consultez les annonces premium  </p>
    ]

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);
        const intervalId = setInterval(() => {
            setIndex( i => (i + 1) % messages.length)
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3000)
        }, 4000);

        return () => {
            clearInterval(intervalId);
        }
    }, [])
  return (
        <Slide in={show} direction={show ? 'left' : 'right'} >
            <Box sx={{height: "2.5rem"}} className={classes.Container}>
                <Typography className={classes.message}>{messages[index]}</Typography>
            </Box>
        </Slide>
  )
}
