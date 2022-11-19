import React from 'react';
import useStyles from "./styles";
import { Box, Tabs, IconButton, Typography, useMediaQuery } from "@mui/material";
import {DirectionsCar, Devices, Face2, House, Kitchen, Chair, Work, Handshake, ChildCare, SportsBasketball, DinnerDining, Pets, Construction} from "@mui/icons-material";
import { primaryColor } from '../../params';
import { Link } from 'react-router-dom';

export default function CategoryBar({theme}) {
  const classes = useStyles();
  const isMatch = useMediaQuery(theme.breakpoints.down(1050));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {!isMatch ? <Box className={classes.container}>
        <IconButton component={Link} to="/annonces/Véhicules" disableRipple className={classes.btn}><DirectionsCar className={classes.btnIcon} /><Typography variant='subtitle2'>Véhicules</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Électronique" disableRipple className={classes.btn}><Devices className={classes.btnIcon} /><Typography variant='subtitle2'>Électronique</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Mode" disableRipple className={classes.btn}><Face2 className={classes.btnIcon} /><Typography variant='subtitle2'>Mode</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Immobilier" disableRipple className={classes.btn}><House className={classes.btnIcon} /><Typography variant='subtitle2'>Immobilier</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Electroménager" disableRipple className={classes.btn}><Kitchen className={classes.btnIcon} /><Typography variant='subtitle2'>Electroménager</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Interieur" disableRipple className={classes.btn}><Chair className={classes.btnIcon} /><Typography variant='subtitle2'>Interieur</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Emplois" disableRipple className={classes.btn}><Work className={classes.btnIcon} /><Typography variant='subtitle2'>Emplois</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Services" disableRipple className={classes.btn}><Handshake className={classes.btnIcon} /><Typography variant='subtitle2'>Services</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Enfants" disableRipple className={classes.btn}><ChildCare className={classes.btnIcon} /><Typography variant='subtitle2'>Enfants</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Loisirs" disableRipple className={classes.btn}><SportsBasketball className={classes.btnIcon} /><Typography variant='subtitle2'>Sports et Loisirs</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Alimentation" disableRipple className={classes.btn}><DinnerDining className={classes.btnIcon} /><Typography variant='subtitle2'>Alimentation</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Animaux" disableRipple className={classes.btn}><Pets className={classes.btnIcon} /><Typography variant='subtitle2'>Animaux</Typography></IconButton>
        <IconButton component={Link} to="/annonces/Matériel Pro" disableRipple className={classes.btn}><Construction className={classes.btnIcon} /><Typography variant='subtitle2'>Equipements Pro</Typography></IconButton>
      </Box> :
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ sx: { display: 'none' } }}
          TabScrollButtonProps={{ sx: {height: "50px", width: "50px", borderRadius: "50%", background: `${primaryColor} !important`} }}
          sx={{padding: "15px 5%"}}
        >
          <IconButton component={Link} to="/annonces/Véhicules" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><DirectionsCar className={classes.btnIcon} /><Typography variant='subtitle2'>Véhicules</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Électronique" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><Devices className={classes.btnIcon} /><Typography variant='subtitle2'>Électronique</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Mode" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><Face2 className={classes.btnIcon} /><Typography variant='subtitle2'>Mode</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Immobilier" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><House className={classes.btnIcon} /><Typography variant='subtitle2'>Immobilier</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Electroménager" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><Kitchen className={classes.btnIcon} /><Typography variant='subtitle2'>Electroménager</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Interieur" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><Chair className={classes.btnIcon} /><Typography variant='subtitle2'>Interieur</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Emplois" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><Work className={classes.btnIcon} /><Typography variant='subtitle2'>Emplois</Typography></IconButton>
          <IconButton component={Link} to="/annonces/sInterieurervices" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><Handshake className={classes.btnIcon} /><Typography variant='subtitle2'>Services</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Enfants" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><ChildCare className={classes.btnIcon} /><Typography variant='subtitle2'>Enfants</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Loisirs" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><SportsBasketball className={classes.btnIcon} /><Typography variant='subtitle2'>Sports et Loisirs</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Alimentation" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><DinnerDining className={classes.btnIcon} /><Typography variant='subtitle2'>Alimentation</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Animaux" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><Pets className={classes.btnIcon} /><Typography variant='subtitle2'>Animaux</Typography></IconButton>
          <IconButton component={Link} to="/annonces/Matériel Pro" sx={{margin: "0 15px !important"}} disableRipple className={classes.btn}><Construction className={classes.btnIcon} /><Typography variant='subtitle2'>Equipements Pro</Typography></IconButton>
        </Tabs>}
    </>
  )
}
