import React, {useContext, useState} from 'react';
import { Drawer, IconButton, InputAdornment, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Menu, Close, Search } from "@mui/icons-material";
import LoginDialog from '../LoginDialog/LoginDialog';
import facebookIcon from "../../../assets/facebook.png"
import googleIcon from "../../../assets/google.png"
import appleIcon from "../../../assets/apple.png";
import { context } from '../../../pages/Context';
import { useLocation, useNavigate } from 'react-router-dom';
import useStyles from "./styles"

const LoginMethod = [{
    account: "Facebook",
    icon: facebookIcon
  }, {
    account: "Google",
    icon: googleIcon
  }, {
    account: "Apple",
    icon: appleIcon
  }];

export default function Offcanvas() {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const foldDevice = useMediaQuery(theme.breakpoints.down(304));
    const [DrawerValue, setDrawerValue] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');
    const [search, setSearch] = useState('');
    const ctx = useContext(context)
  
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
        setDrawerValue(false);
        navigate(`/annonces/search?keyword=${search}`);
    }
  
    const handlePostClickOpen = () => {
      if (ctx.connected) {
        setDrawerValue(false);
        navigate("/post");
      } else {
        setOpen(true);
      }
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
    
    return (
    <div>
        <Drawer PaperProps={{sx: {width: "50%", padding: "10%", display: "flex", flexDirection: "column", gap: "25px", position: "relative"}}} open={DrawerValue} onClose={() => setDrawerValue(false)}> 
            <IconButton id='close' onClick={() => setDrawerValue(!DrawerValue)} sx={{width: "min-content", position: "absolute", top: "1%", right: "5%"}}><Close /></IconButton>
            {
              location.pathname !== '/' 
              && 
              <form onSubmit={handleSubmit} >
                <TextField
                  size='small'
                  name='keyword'
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    className: classes.searchBar,
                    placeholder: "Chercher...",
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton type='submit'>
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </form>
            }
            <Link underline="none" href='/'><Typography variant='h6'>Accueil</Typography></Link>
            <Link underline="none" className={classes.links} href='/annonces'><Typography variant="h6">Annonces</Typography></Link>
            {ctx.connected ? <Link underline="none" href='/account'><Typography variant='h6'>Mon compte</Typography></Link>:
            <Link sx={{cursor: "pointer"}} underline="none" onClick={handleClickOpen}><Typography variant='h6'>Connexion</Typography></Link>}
            {ctx.connected && <Link underline="none" href='/dashboard'><Typography variant='h6'>Mon profil</Typography></Link>}
            {foldDevice && <Link sx={{cursor: "pointer"}} underline="none" onClick={handlePostClickOpen}><Typography variant='h6'>Poster une annonce</Typography></Link>}
            <Link underline="none" href='/offres'><Typography variant='h6'>Premium</Typography></Link>
            <Link underline="none" href='/contact'><Typography variant='h6'>Nous Contacter</Typography></Link>
            <LoginDialog
              LoginMethod = {LoginMethod}
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
        </Drawer>
        <IconButton id="open" onClick={() => setDrawerValue(!DrawerValue)}>
            <Menu/>
        </IconButton>
    </div>
  )
}




