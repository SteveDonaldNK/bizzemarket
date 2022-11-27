import { Grid, Typography, useMediaQuery, Link, Button, TextField, InputAdornment } from '@mui/material';
import axios from 'axios';
import React from 'react'
import logo from "../../assets/logo.png"
import useStyles from "./styles"
import FBlogo from "../../assets/fb.png"
import './styles.css'

export default function Footer({theme}) {
    const classes = useStyles();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    let styling = {};
    isMatch && (styling = {flexDirection: "column-reverse", textAlign: "center"})

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const obj = Object.fromEntries([...formData])
      
      try {
        axios.post("http://54.197.36.149:4000/api/subscribe", obj, {
          Headers: {
            "Content-Type":"application/json"
          }
        })
        .then(res => console.log(res))
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className={classes.Container}>
      <Grid className="grid-container" sx={styling} container spacing={5} justifyContent="space-between" >
        <Grid sx={styling} container item lg={12} spacing={5} >
          <Grid item md={4} lg={3}>
            <img style={{width: "100px", marginBottom: "10px"}} src={logo} alt="logo" />
            <Typography>Le boss des annonces en ligne</Typography>
          </Grid>
          <Grid item md={4} lg={3}>
            <Typography className="footer-links" sx={{fontWeight: "700"}} variant='h6'>INFORMATIONS</Typography>
            <Link className="footer-link" underline="none" href='/about'>À propos de nous</Link>
            <Link className="footer-link" underline="none" href='#'>Confidentialité</Link>
            <Link className="footer-link" underline="none" href='/contact'>Nous contacter</Link>
          </Grid>
          <Grid item md={4} lg={3}>
            <Typography variant='h6' style={{fontWeight: "700"}}>SUIVEZ-NOUS</Typography>
            <Link className="footer-link" underline="none" color="ivory" href='#'><img className='footer-socialLogo' src={FBlogo} alt="" /></Link>
          </Grid>
          <Grid item md={12} lg={3}>
            <form onSubmit={handleSubmit}>
              <Typography sx={{fontWeight: "700"}} variant='h6'>NEWSLETTER</Typography>
              <Typography variant='body2'>Restez informer des actualités et des meilleures annonces en Afrique en vous inscrivant à la newsletter !</Typography>
              <TextField
                size='small'
                name='email'
                sx={{border: "2px solid transparent", marginTop: "10px"}}
                InputProps={{
                  className: classes.input,
                  placeholder: "S'abonner...",
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Button type='submit' variant='contained'>S'abonner</Button>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant='subtitle2' style={{marginTop: "50px", textAlign: "center"}}>© Copyright Bizze market</Typography>
    </div>
  )
}
