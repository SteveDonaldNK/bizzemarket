import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Box, Tab, Typography, Avatar, Badge, Divider, Grid, IconButton, TextField, Button, FormControl, Select, MenuItem, InputLabel, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import {Edit} from "@mui/icons-material";
import useStyles from "./styles"
import axios from 'axios';
import { green } from '@mui/material/colors';
import { towns } from '../../categories';
import _ from 'lodash';

const logOut = () => {
  localStorage.clear();
  axios.get("/api/logout", {withCredentials: true})
  .then(res => {
    if (res.status === 200) {
      window.location.href = "/";
    }
  });
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

export default function VerticalTab({userData}) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [success, setSuccess] = useState(false);
    const [reset, setReset] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [picture, setPicture] = useState({});
    
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const mobileMatch = useMediaQuery(theme.breakpoints.down('md'));
    const btnAlign = useMediaQuery(theme.breakpoints.down('sm'));
    let placement = 'vertical';
    let customWidth = '20%';
    let btnPlacement = {float: "right"};
    let inputWidth = '40%'
    mobileMatch && (inputWidth = '100%');
    isMatch && (placement = 'horizontal');
    isMatch && (customWidth = '100%');
    btnAlign && (btnPlacement = {width: "100%", textAlign: "center"})
    
    const buttonSx = {
      ...(success && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
      padding: "10px 30px"
    };
    const inputRef = React.useRef(null);

    const handleButtonClick = () => {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
      }
    };

  const infoValidation = (e) => {
    e.preventDefault();
    handleButtonClick();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("avatar", picture);
    console.log([...formData]);
    try {
      axios.put("/api/updateuser", formData, {
      headers: {
        'Content-Type':'multipart/form-data'
      }, 
      withCredentials: true})
      .then(res => {
        if (res.status === 200) {
          setLoading(false);
          setReset(true);
        }
      }).catch(res => console.log(res))
    } catch (error) {
      console.log(error.response)
    }
  }


  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    } else {
      setPicture(fileObj);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    const obj = Object.fromEntries([...formData])

    if ( obj.confirm !== obj.newPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      setError(true);
    } else {
      const {confirm, ...credentials} = obj;
      try {
        axios.patch("/api/resetpassword", credentials, {
          headers: {
            "Content-Type":"application/json"
          },
          withCredentials: true,
        }).then(res => {
          if (res.status === 200) {
            setReset(true);
            setMessage(res.data);
          }
        }).catch((error) => {setError(true); setMessage(error.response.data)})
      } catch (error) {
        console.log(error)
      }
    }
  }

  const DisplayTab = ({bord}) => (
    <>
    <Tabs
            orientation={placement}
            variant='scrollable'
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: Number(bord), borderColor: 'divider', width: customWidth}}
            justifyContent="space-between"
        >
            <Tab label="Mon compte" {...a11yProps(0)} />
            <Tab label="Mot de passe" {...a11yProps(1)} />
            <Button onClick={logOut} color='error' >Deconnecter</Button>
    </Tabs>
    </>
  )

  if (Object.entries(userData).length !== 0) {
    return (
      <div >
          {isMatch && <DisplayTab bord = "0" />}
          <Box
          sx={{ borderRadius: '10px', flexGrow: 1, bgcolor: 'background.paper', display: 'flex', width: "100%", boxShadow: 2, padding: "25px 0 50px" }}
          >
          {!isMatch && <DisplayTab bord = "1" /> }
          <TabPanel style={{width: "100%"}} value={value} index={0}>
             <Box position="relative">
                  <form onSubmit={infoValidation}>
                      <Typography component={'span'} className={classes.boldText} variant='h6' >Mon Compte</Typography>
                      <Typography component={'span'} className={classes.boldText} variant='subtitle1' sx={{mt: 2}} >{_.capitalize(userData.username)}</Typography>
                      <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                          <IconButton onClick={handleClick} sx={{background: "#FFF", border: "1px solid #AAA", '&:hover': {background: "#FFF"}}}><Edit sx={{fontSize: "1rem !important"}} /></IconButton>
                      }
                      >
                      <Avatar src={`/api/${userData.avatarImg}`} sx={{height: 80, width: 80}} />
                      </Badge>
                      <input
                          style={{display: 'none'}}
                          ref={inputRef}
                          type="file"
                          accept='image/png, image/jpeg, image/webp'
                          onChange={handleFileChange}
                      />
                      <Divider sx={{mt: 4, mb: 4}} />
                          <Grid spacing={2} justifyContent="space-between" container>
                              <Grid item xs={12} sm={5.5} lg={3.5}>
                                  <Typography component={'span'} className={classes.boldText} variant='subtitle1' >Nom</Typography>
                                  <TextField sx={{width: "100%"}} defaultValue={userData.username} name='username' size='small' id="outlined-basic" placeholder='le nom ici' variant="outlined" />
                              </Grid>
                              <Grid item xs={12} sm={5.5} lg={3.5}>
                                  <Typography component={'span'} className={classes.boldText} variant='subtitle1' >Prenom</Typography>
                                  <TextField defaultValue={userData.surname} sx={{width: "100%"}} name='surname' size='small' id="outlined-basic" placeholder='le prenom ici' variant="outlined" />
                              </Grid>
                              <Grid item xs={12} sm={5.5} lg={3.5}>
                                  <Typography component={'span'} className={classes.boldText} variant='subtitle1' >Date de naissance</Typography>
                                  <TextField defaultValue={userData.birthDate} sx={{width: "100%"}} type='date' name='birthDate' size='small' id="outlined-basic" placeholder='le jour de naissance ici' variant="outlined" />
                              </Grid>
                          </Grid>
                      <Divider sx={{mt: 4, mb: 4}} />
                      <Grid spacing={2} justifyContent="space-between" container>
                              <Grid item xs={12} sm={5.5} lg={3.5}>
                                  <Typography component={'span'} className={classes.boldText} variant='subtitle1' >Email</Typography>
                                  <TextField type='email' defaultValue={userData.email} sx={{width: "100%"}} name='email' size='small' id="outlined-basic" placeholder='Email' variant="outlined" />
                              </Grid>
                              <Grid item xs={12} sm={5.5} lg={3.5}>
                                  <Typography component={'span'} className={classes.boldText} variant='subtitle1' >Telephone</Typography>
                                  <TextField type='tel'  defaultValue={userData.phone} sx={{width: "100%"}} name='phone' size='small' id="outlined-basic" placeholder='Telephone' variant="outlined" />
                              </Grid>
                              <Grid item xs={12} sm={5.5} lg={3.5}>
                                  <Typography component={'span'} className={classes.boldText} variant='subtitle1' >Whatsapp</Typography>
                                  <TextField type='tel' defaultValue={userData.whatsapp} sx={{width: "100%"}} name='whatsapp' size='small' id="outlined-basic" placeholder='Whatsapp' variant="outlined" />
                              </Grid>
                          </Grid>
                      <Divider sx={{mt: 4, mb: 2}} />
                      <Grid justifyContent="center" container>
                          <Grid sm={12} md={12} lg={12} item>
                              <Typography component={'span'} className={classes.boldText} variant='subtitle1' >Localisation</Typography>
                              <FormControl variant="filled" sx={{ m: 1, minWidth: 222 }}>
                                  <InputLabel id="demo-simple-select-filled-label">ville</InputLabel>
                                  <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  name='town'
                                  defaultValue={userData.town}
                                  size='small'
                                  >
                                  <MenuItem value="">
                                      <em>None</em>
                                  </MenuItem>
                                  {towns.map(town => (
                                    <MenuItem value={town}>{town}</MenuItem>
                                  ))}
                                  </Select>
                              </FormControl>
                          </Grid>
                      </Grid>
                      <Box sx={{...btnPlacement, mt: 3, position: 'relative' }}>
                        <Button
                          variant="contained"
                          sx={buttonSx}
                          disabled={loading}
                          type='submit'
                        >
                          Enregistrer
                        </Button>
                        {loading && (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: green[500],
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              marginTop: '-12px',
                              marginLeft: '-12px',
                            }}
                          />
                        )}
                      </Box>
                    </form>
             </Box>
          </TabPanel>
          <TabPanel style={{width: "100%"}} value={value} index={1}>
              <Typography component={'span'} className={classes.boldText} variant='h6' >Changer de mot de passe</Typography>
              {reset && <Typography color='#20AF5C' variant='body1' >{message}</Typography>}
              <form style={{width: inputWidth, marginTop: "15px"}} onSubmit={(e) => handleSubmit(e)}>
                  <Typography color='GrayText' className={classes.boldText} variant='body1' >Mot de passe actuel </Typography>
                  <TextField onClick={() => {setError(false); setReset(false)}} name="actual" fullWidth size='small' id="outlined-basic" variant="outlined" required/>
                  <Typography color='GrayText' sx={{mt: 4}} className={classes.boldText} variant='body1' >Nouveau mot de passe</Typography>
                  <TextField onClick={() => {setError(false); setReset(false)}} name="newPassword" fullWidth size='small' id="outlined-basic" variant="outlined" required/>
                  <Typography component={'span'} color='GrayText' sx={{mt: 4}} className={classes.boldText} variant='body1' >Confirmer le mot de passe</Typography>
                  <TextField onClick={() => {setError(false); setReset(false)}} name="confirm" fullWidth size='small' id="outlined-basic" variant="outlined" required/>
                  {error && <Typography color='error' sx={{mt: 4}} className={classes.boldText} variant='body1' >{message}</Typography>}
                  <br />
                  <Button type='submit' disableElevation sx={{mt: 5}} variant='contained'>Reinitialiser...</Button>
              </form>
          </TabPanel>
          </Box>
      </div>
    )
  }
}
