import { Box, Typography, Button, Avatar, Tab, Tabs, Grid, ToggleButtonGroup, ToggleButton, CircularProgress } from '@mui/material'
import { Settings } from '@mui/icons-material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react'
import useStyles from "./styles"
import EmptyBox from "../../assets/empty.gif";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Product from '../../components/Products/Product/Product'
import { useState } from 'react';
import { Stack } from '@mui/system';
import _ from 'lodash';
import storeBanner from "../../assets/storeBanner.jpg"

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [userData, setUserData] = useState();
  const [favorites, setFavorites] = useState([]);
  const [sold, setSold] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [btn, setBtn] = useState('all');
  const [loading, setLoading] = useState(true);

  function fetchUser() {
    try {
       axios.get("/api/userdata",{withCredentials: true}) 
       .then((res) => {
        setUserData(res.data);
        setUserProducts(res.data.posts);
        const fav = res.data.fav.map(({_id}) => _id)
        const soldItem = res.data.posts.filter(item => item.sold === true);
        setSold(soldItem);
        setFavorites(fav); 
        setLoading(false);
      })
    } catch (error) {
        console.log(error)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSoldOut = () => {
    try {
      axios.get("/api/soldOut", {withCredentials: true})
      .then(res => {
        setUserProducts(res.data)
        setLoading(false);
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handlePending = () => {
    try {
      axios.get("/api/pending", {withCredentials: true})
      .then(res => {
        setUserProducts(res.data)
        setLoading(false);
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleRefused = () => {
    try {
      axios.get("/api/denied", {withCredentials: true})
      .then(res => {
        setUserProducts(res.data)
        setLoading(false);
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonChange = (event, newBtn) => {
    if (newBtn !== null) {
      setBtn(newBtn);
      if (newBtn === 'all') {
        fetchUser();
      } else if (newBtn === 'sold') {
        handleSoldOut();
      } else if (newBtn === 'pending') {
        handlePending();
      } else {
        handleRefused();
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])


  if (userData === undefined) return <Box sx={{ height: "60vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
  <CircularProgress />
  <Typography variant="h6" sx={{marginLeft: "10px"}}>Loading...</Typography>
</Box>;

  return (
        <div className={classes.container}>
          <Box className={classes.box} >
              <img className={classes.boxImage} src={storeBanner} alt="Banner" />
          </Box>
          <Box sx={{padding: "120px 0 30px"}} textAlign="center">
              <Typography color="GrayText" variant='subtitle1' >{userData.town}, Cameroun</Typography>
              <Typography sx={{fontWeight: "bold !important"}} variant='h3' >{_.capitalize(userData.username)}</Typography>
              <Typography color="GrayText" variant='subtitle1' >Membre depuis le {userData.createdAt}</Typography>
              <Button sx={{mt: 2, mb: 5}} onClick={() => navigate('/account')} variant='outlined' startIcon={<Settings />}>modifier mon profil</Button>
          </Box>
          <Box sx={{ width: '90%', m: "auto" }}>
            <Grid spacing={2} justifyContent="center" container>
              <Grid xs={4} sm={4} md={3} lg={3} item>
                <Typography sx={{textAlign: "center"}}><span className={classes.span}>{userData.posts.length}</span><br /> annonces</Typography>
              </Grid>
              <Grid xs={4} sm={4} md={3} lg={3} item>
                <Typography sx={{textAlign: "center"}}><span className={classes.span}>{sold.length}</span><br /> vendu</Typography>
              </Grid>
              <Grid xs={4} sm={4} md={3} lg={3} item>
                <Typography sx={{textAlign: "center"}}><span className={classes.span}>{userData.fav.length}</span><br /> favories</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: '90%', m: "auto", mt: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Annonces" {...a11yProps(0)} />
                <Tab label="Favoris" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            <Stack direction="row" justifyContent="center" spacing={4} sx={{width: "100%", marginBottom: "25px"}}>
              <ToggleButtonGroup
                color="primary"
                value={btn}
                exclusive
                size="small"
                onChange={handleButtonChange}
              >
                <ToggleButton value="all">
                  <Typography sx={{fontWeight: "bold"}} variant='caption'>Tout</Typography>
                </ToggleButton>
                <ToggleButton value="sold">
                  <Typography sx={{fontWeight: "bold"}} variant='caption'>Vendu</Typography>
                </ToggleButton>
                <ToggleButton value="pending">
                  <Typography sx={{fontWeight: "bold"}} variant='caption'>attente</Typography>
                </ToggleButton>
                <ToggleButton value="denied">
                  <Typography sx={{fontWeight: "bold"}} variant='caption'>Refuse</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            {loading ?
            <Box sx={{ height: "30vh", width: "100%",display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <CircularProgress size="1.7rem" />
          </Box>
            :(userProducts.length === 0) ? <><Box textAlign="center">
                <img src={EmptyBox} className={classes.emptyBox} alt="" />
              </Box>
              <Typography variant='h5' textAlign='center'>Aucune annonce en vente</Typography>
              <Box textAlign="center">
              <Button sx={{float: "center", mt: 2}} variant='contained'>Publier une annonce</Button>
            </Box></> : 
              <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} xl={12}>
                {userProducts.map((product) => (
                      <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                        {product.status === 'accepted'} {product.status === 'accepted'} {product.status === 'accepted'}
                            <Product product = {product}/>
                      </Grid>
                  ))}
              </Grid>
              }
            </TabPanel>
            <TabPanel value={value} index={1}>
              {userData.fav.length === 0 ?
              <><Box textAlign="center">
              <img src={EmptyBox} className={classes.emptyBox} alt="" />
            </Box>
            <Typography variant='h5' textAlign='center'>Aucune annonce en Favoris</Typography>
            <Box textAlign="center">
              <Button sx={{float: "center", mt: 2}} variant='contained'>Publier une annonce</Button>
            </Box></> :
              <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} xl={12}>
              {userData.fav.map((product) => (
                  <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                      <Product fav={true} product = {product}/>
                  </Grid>
              ))}
            </Grid>
            }
            </TabPanel>
          </Box>
        </div>
    )
  }
