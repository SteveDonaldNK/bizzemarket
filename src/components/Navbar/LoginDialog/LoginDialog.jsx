import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../assets/logo-main.png';
import Avatar from '@mui/material/Avatar';
import {List, Link, ListItem, Typography, ListItemAvatar, ListItemText, DialogTitle, Dialog, DialogContent, DialogContentText, TextField, Button, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl} from '@mui/material';
import { Mail, Visibility, VisibilityOff } from '@mui/icons-material';
import * as Router from 'react-router-dom';
import axios from 'axios'

export default function LoginDialog(props) {
  const { onClose, selectedValue, open, LoginMethod } = props;
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const location = Router.useLocation();
  const [openLoginDialog, setLoginDialogOpen] = useState(false);
  const [openRegisterDialog, setRegisterDialogOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleLoginClickOpen = () => {
    openRegisterDialog && handleRegisterDialogClose();
    setLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setError(false);
    setLoginDialogOpen(false);
  };

  const handleRegisterClickOpen = () => {
    openLoginDialog && handleLoginDialogClose();
    setRegisterDialogOpen(true);
  };

  const handleRegisterDialogClose = () => {
    setError(false);
    setRegisterDialogOpen(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const payload = [...formData];
    const data = {email: payload[0][1], password: payload[1][1]}
    try {
      axios.post("http://localhost:4000/api/login", data, {
        headers:{
          'Content-Type':'application/json'
      },
      withCredentials: true
      }).then((res) => {
        if (res.status === 200) {
          handleLoginDialogClose();
          handleClose();
          window.location.href = location.pathname;
        }
      }).catch(function (error) {
        setMessage(error.response.data)
        setError(true);
      });
    } catch (error) {
      console.log(error.response);
    }
  }
  
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const payload = [...formData];
    try {
      axios.post("http://localhost:4000/api/register", {userName: payload[0][1], email: payload[1][1], password: payload[2][1]}, {
        headers:{
          'Content-Type':'application/json'
      },
      withCredentials: true
      }).then((res) => {
        if (res.status === 200) {
          handleRegisterDialogClose();
          handleLoginClickOpen();
        }
      }).catch(function (error) {
        console.log(error)
        setMessage(error.response.data);
        setError(true);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
      <DialogTitle textAlign="center">Se connecter a un compte</DialogTitle>
      <List sx={{ padding: "20px"}}>
        {LoginMethod.map((method) => (
          <a style={{textDecoration: "none", color: "#000"}} href={`http://localhost:4000/api/auth/${method.account}`}>
            <ListItem button key={method.account}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#FFF"}}>
                  <img style={{width: "80%"}} src={method.icon} alt={method.account}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={method.account.charAt(0).toUpperCase() + method.account.slice(1)} />
            </ListItem>
          </a>
        ))}

        <ListItem autoFocus button onClick={handleLoginClickOpen}>
          <ListItemAvatar>
              <Avatar >
                <Mail />
              </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Se connecter par email" />
        </ListItem>
        <ListItem>
          <Typography sx={{mt: 1}}>Vous n'avez pas de compte ? <Link underline='none' onClick={handleRegisterClickOpen} sx={{cursor: "pointer"}}>S'inscrire</Link></Typography>
        </ListItem>
      </List>
    </Dialog>

      <Dialog open={openLoginDialog} onClose={handleLoginDialogClose} sx={{textAlign: "center"}}>
        <DialogTitle>
          <Link href='/'><img style={{height: "80px"}} src={Logo} alt="Bizze market" /></Link>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant='h5' sx={{ fontWeight: "700", mb: 2 }}>Connectez vous a votre compte</Typography>
          </DialogContentText>
          <form onSubmit={handleLoginSubmit}>
            {error && <Typography color="error">{message}</Typography>}
            <TextField
              required
              margin="dense"
              name="name"
              id="loginName"
              label="Adresse Email"
              type="text"
              fullWidth
              onClick={() => setError(false)}
            />
             <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="loginPassword"
                fullWidth
                name="password"
                type={values.showPassword ? 'text' : 'password'}
                label="Password"
                onClick={() => setError(false)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button type='submit' size='large' fullWidth sx={{p: 1.7}} disableElevation color='error' variant='contained'>Connexion</Button>
          </form>
          <Typography sx={{mt: 5}}><Link underline='none' href=''>Mot de passe oublié ?</Link></Typography>
          <Typography sx={{mt: 1}}>Vous n'avez pas de compte ? <Link underline='none' onClick={handleRegisterClickOpen} sx={{cursor: "pointer"}}>S'inscrire</Link></Typography>
        </DialogContent>
      </Dialog>

      <Dialog open={openRegisterDialog} onClose={handleRegisterDialogClose} sx={{textAlign: "center"}}>
        <DialogTitle>
          <Link href='/'><img style={{height: "80px"}} src={Logo} alt="Bizze market" /></Link>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant='h5' sx={{ fontWeight: "700", mb: 2 }}>Creer un compte</Typography>
          </DialogContentText>
          <form onSubmit={handleRegisterSubmit}>
          {error && <Typography color="error">{message}</Typography>}
            <TextField
              required
              name="userName"
              margin="dense"
              id="name"
              label="Nom d'utilisateur"
              type="text"
              fullWidth
            />
            <TextField
              required
              name="email"
              margin="dense"
              id="email"
              label="Adresse Email"
              type="email"
              fullWidth
            />
            <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="loginPassword"
                fullWidth
                name="password"
                type={values.showPassword ? 'text' : 'password'}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button type='submit' size='large' fullWidth sx={{mt: 1, p: 1.7}} disableElevation color='error' variant='contained'>Inscription</Button>
          </form>
          <Typography sx={{mt: 1}}>Vous n'avez pas deja un compte ? <Link underline='none' sx={{cursor: "pointer"}} onClick={handleLoginClickOpen}>Se connecter</Link></Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

LoginDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
