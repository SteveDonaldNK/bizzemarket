import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material'
import Logo from '../../assets/logo-main.png';
import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Login.css'

export default function Login() {
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });
    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const payload = [...formData];
        const data = {email: payload[0][1], password: payload[1][1]}
        try {
          axios.post("http://localhost:4000/login", data, {
            headers:{
              'Content-Type':'application/json'
          },
          withCredentials: true
          }).then((res) => {
              window.location.href = location.pathname;
          }).catch(function (error) {
            setMessage(error.response.data)
            setError(true);
          });
        } catch (error) {
          console.log(error.response);
        }
      }

  return (
    <div className='loginPage'>
        <Box sx={{width: "55%", background: "#FFF", p: "50px", borderRadius: 2, boxShadow: 2}}>
            <Box textAlign="center">
                <Link href='/'><img style={{height: "80px"}} src={Logo} alt="Bizze market" /></Link>
                <Typography variant='h5' sx={{ fontWeight: "700", mb: 2 }}>Connectez vous a votre compte</Typography>
            </Box>
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
        </Box>
    </div>
  )
}
