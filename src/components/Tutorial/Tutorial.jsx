import { Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import React from 'react'
import create from '../../assets/create.png'
import publish from '../../assets/publish.png'
import relax from '../../assets/relax.png'
import useStyles from "./styles"
import {Fade, Zoom} from "react-reveal"

export default function Features() {
    const classes = useStyles();
    const theme = useTheme();
    let reverse = {};
    let align = {};
    let heading = "h2";
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    useMediaQuery(theme.breakpoints.down('sm')) && (heading = "h3");
    isMatch && (reverse = {flexDirection: "column-reverse"});
    !isMatch && (align = {textAlign: "right"});

  return (
    <div className={classes.container}>
      <Fade duration={2000} bottom><Typography sx={{fontWeight: "bold !important", marginBottom: "50px"}} textAlign="center" color="GrayText" variant={heading}>Comment ça marche? </Typography></Fade>
      <Grid sx={reverse} alignItems="center" container>
        <Grid item md={7} lg={8}>
          <Fade delay={1000} bottom><Typography className={classes.text}>Créez une Compte</Typography></Fade>
          <Fade delay={1200} bottom><Typography sx={{mt: 1, fontSize: "1.2rem"}}>Créez un compte sur notre site web Bizze market. 
          Vous pouvez utiliser votre compte pour suivre vos activités d'achat et de vente, 
          enregistrer vos vendeurs favoris et suivre jusqu'à 300 objets que vous envisagez d'acheter.</Typography></Fade>
        </Grid>
        <Grid item sm={8} md={5} lg={4}>
          <Zoom duration={2000} delay={1200}><img className={classes.img} src={create} alt="creez une annonce" /></Zoom>
        </Grid>
      </Grid>
      <Grid sx={{margin: "50px 0"}} alignItems="center" container>
        <Grid item sm={9} md={5} lg={4}>
        <Zoom duration={2000} delay={1000}><img className={classes.img} src={publish} alt="publiez une annonce" /></Zoom>
        </Grid>
        <Grid item sx={align} md={7} lg={8}>
        <Fade delay={1000} bottom><Typography className={classes.text}>Publiez votre annonces</Typography></Fade>
          <Fade delay={1200} bottom><Typography sx={{mt: 1, fontSize: "1.2rem"}}>Donnez les informations nécessaires pour le suivi de votre annonce.
Votre annonce doit respecter nos règles (Une annonce sérieuse, pas d'arnaque,…)
Elle ne doit pas être un doublon : Votre annonce doit être unique par rapport à vos annonces. Nous tolérons jusqu'à 90% de ressemblance. Chaque annonce sera vérifiée et mise en ligne.</Typography>
        </Fade></Grid>
      </Grid>
      <Grid sx={reverse} alignItems="center" container>
        <Grid item md={7} lg={8}>
        <Fade delay={1000} bottom><Typography className={classes.text}>Détendez-vous</Typography></Fade>
        <Fade delay={1200} bottom><Typography sx={{mt: 1, fontSize: "1.2rem"}}>Ça y est vous avez terminé ! nous nous chargeons de mettre en valeur vos produits en attendant qu'un client vous contacte.
        Pour plus de visibilité et pour booster encore plus vos ventes, vous pouvez souscrire à nos offres premium.</Typography>
        </Fade></Grid>
        <Grid item sm={8} md={5} lg={4}>
        <Zoom duration={2000} delay={1000}><img className={classes.img} src={relax} alt="Relaxez" /></Zoom>
        </Grid>
      </Grid>
    </div>
  )
}
