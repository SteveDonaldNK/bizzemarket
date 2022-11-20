import React, {useState} from 'react';
import {AppBar, Toolbar, Button, IconButton, TextField, InputAdornment, useMediaQuery, Link, Typography, styled, Badge, Stack, Avatar, Popover, Divider} from "@mui/material";
import {Campaign, Login, Visibility, AccountCircle, Settings, AdminPanelSettings} from "@mui/icons-material";
import * as ReactRouter from "react-router-dom"
import LoginDialog from './LoginDialog/LoginDialog';
import useStyles from "./styles";
import SearchIcon from '@mui/icons-material/Search';
import OffCanvas from './offCanvas/offCanvas';
import logo from "../../assets/logo-main.png";
import { Box } from '@mui/system';
import facebookIcon from "../../assets/facebook.png"
import googleIcon from "../../assets/google.png"
import appleIcon from "../../assets/apple.png";
import { useContext } from 'react';
import { context } from '../../pages/Context';
import { secondaryColor } from '../../params';
import axios from 'axios';
import { useEffect } from 'react';
import _ from 'lodash';

const LoginMethod = [{
  account: "facebook",
  icon: facebookIcon
}, { 
  account: "google",
  icon: googleIcon
}, {
  account: "apple",
  icon: appleIcon
}];

export default function Navbar({theme}) {
    const ctx = useContext(context);
    const location = ReactRouter.useLocation().pathname;
    const navigate = ReactRouter.useNavigate();
    const classes = useStyles();
    const isMatch = useMediaQuery(theme.breakpoints.down(1250));
    const foldDevice = useMediaQuery(theme.breakpoints.down(304));
    let btnLabel = "Poster une annonce";
    let altBtnLabel = "Voir les annonces";
    useMediaQuery(theme.breakpoints.down(700)) && (btnLabel = "Poster");
    useMediaQuery(theme.breakpoints.down('sm')) && (altBtnLabel = "Annonces");

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [user, setUser] = useState('');
    const [search, setSearch] = useState('');
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    function fetchUser() {
      try {
         axios.get("/api/userdata",{withCredentials: true}) 
         .then((res) => {
          setUser(res.data);   
         })
      } catch (error) {
          console.log(error)
      }
  }

    useEffect(() => {
      if (ctx.connected) {
        fetchUser()
      }
    }, [ctx.connected])

    const popoverOpen = Boolean(anchorEl);
    const id = popoverOpen ? 'simple-popover' : undefined;

    const handleClickOpen = () => {
      setOpen(true);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: 'ripple 1.2s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""',
        },
      },
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(.8)',
          opacity: 1,
        },
        '100%': {
          transform: 'scale(2.4)',
          opacity: 0,
        },
      },
    }));

    const handleSubmit = (e) => {
      e.preventDefault();
      window.location.href=`/annonces/search?keyword=${search}`;
    }
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
    const handleAuth = () => {
      ctx.connected ? navigate("/post") : setOpen(true)
    }

    const handleLogout = () => {
      localStorage.clear();
      axios.get("/api/logout", {withCredentials: true})
      .then(res => {
        if (res.status === 200) {
          window.location.href = location;
        }
      });
    }

  return (
      <AppBar sx={{backgroundColor: "#FFF", padding: '0 5%'}} elevation={4} position="sticky">
        <Toolbar className={classes.toolbar} disableGutters>
          <a href="/"><img className={classes.logo} src={logo} alt="bizzemarket" /></a>
          {!isMatch && (location === '/' ? 
            <div className={classes.linkContainer}>
              <Link className={classes.links} href='/'><Typography variant="h6">Accueil</Typography></Link>
              <Link className={classes.links} href='/offres'><Typography variant="h6">Premium</Typography></Link>
              <Link className={classes.links} href='/about'><Typography variant="h6">Apropos</Typography></Link>
              <Link className={classes.links} href='/contact'><Typography variant="h6">Contactez nous</Typography></Link>
            </div> :
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
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
          </form>
          )}
        
          <Box>
            <LoginDialog
              LoginMethod = {LoginMethod}
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
            <Stack direction="row" spacing={5}>
              {
                !useMediaQuery(theme.breakpoints.down(550)) &&
                (ctx.connected ? 
                  <Box aria-describedby={id} onClick={handleClick} sx={{cursor: "pointer"}}>
                  <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  >
                    <Avatar />
                  </StyledBadge></Box>: 
                <Button sx={{borderRadius: "30px"}} variant='outlined' onClick={handleClickOpen} startIcon={<Login />} >Se connecter</Button>)
              }
              {!foldDevice && (location !== '/post' ? <Button sx={{borderRadius: "30px", marginLeft: "10px", cursor: "pointer"}} onClick={handleAuth} variant='contained' startIcon={<Campaign />} disableElevation>{btnLabel}</Button> :
              <Button sx={{borderRadius: "30px", marginLeft: "10px", cursor: "pointer"}} href="/annonces" variant='contained' startIcon={<Visibility />} disableElevation>{altBtnLabel}</Button>)}
              {isMatch && <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ padding: "0" }}
              >
                <OffCanvas />
              </IconButton>}
              <Popover
              id={id}
              open={popoverOpen}
              anchorEl={anchorEl}
              elevation = {1}
              disableScrollLock
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ border: 1, borderRadius: "5px", p: 2, borderColor: "#DFDFDF"}}>
                <Stack mb={1} alignItems='center' direction='row' spacing={2}>
                  <Avatar />
                  <Typography >{_.capitalize(user.username)}</Typography>
                </Stack>
                <Divider />
                {ctx.isAdmin && <Link href="/admin" underline="none" sx={{color: "#818181",'&:hover': {color: secondaryColor}}}><Stack direction="row" sx={{margin: "8px 0"}} spacing={1}><AdminPanelSettings sx={{height: "1.3rem"}} className='icon' color='c9c9c9 !important' /><Typography sx={{fontSize: "0.9rem !important"}}>Admin</Typography></Stack></Link>}
                <Link href="/dashboard" underline="none" sx={{color: "#818181",'&:hover': {color: secondaryColor}}}><Stack direction="row" sx={{margin: "8px 0"}} spacing={1}><AccountCircle sx={{height: "1.3rem"}} className='icon' color='c9c9c9 !important' /><Typography sx={{fontSize: "0.9rem !important"}}>Voir mon profil</Typography></Stack></Link>
                <Link href="/account" underline="none" sx={{color: "#818181",'&:hover': {color: secondaryColor}}}><Stack direction="row" sx={{margin: "8px 0"}} spacing={1}><Settings sx={{height: "1.3rem"}} className='icon' color='c9c9c9 !important' /><Typography sx={{fontSize: "0.9rem !important"}}>Paramètres</Typography></Stack></Link>
                <Divider />
                <Link underline='none' onClick={handleLogout} sx={{color: "#FF7777", cursor: "pointer"}}><Typography sx={{marginTop: "8px",fontSize: "1rem !important"}}>Déconnexion</Typography></Link>
              </Box>
            </Popover>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
