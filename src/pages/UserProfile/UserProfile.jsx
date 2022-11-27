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
  const [sold, setSold] = useState([]);
  const [btn, setBtn] = useState('all');
  const [value, setValue] = useState(0);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [userProducts, setUserProducts] = useState([]);
  const [productsPerSet, setProductsPerSet] = useState(4);
  const [hasReached, setHasReached] = useState(false);

  const lastProductIndex = productsPerSet;
  const firstProductIndex = 0;
  const currentProducts = userProducts.slice(firstProductIndex, lastProductIndex);
  

  function fetchUser() {
    try {
       axios.get("http://54.197.36.149/api/userdata",{withCredentials: true}) 
       .then((res) => {
        const soldItem = res.data.posts.filter(item => item.sold === true);
        setUserData(res.data);
        setUserProducts(res.data.posts);
        setSold(soldItem);
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
      fetch("http://54.197.36.149/api/soldOut", {method: 'GET' ,credentials: 'include'})
      .then(async res => {
        const data = await res.json();
        setUserProducts(data);
        setLoading(false);
      }).catch(err => {
        console.log(err)
      })
  }

  const handlePending = () => {
    try {
      axios.get("http://54.197.36.149/api/pending", {withCredentials: true})
      .then(res => {
        setUserProducts(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleRefused = () => {
    try {
      axios.get("http://54.197.36.149/api/denied", {withCredentials: true})
      .then(res => {
        setUserProducts(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonChange = (event, newBtn) => {
    setProductsPerSet(4);
    checkLimit();
    if (newBtn !== null) {
      if (newBtn === 'all') {
        setBtn('all');
        fetchUser();
      } else if (newBtn === 'sold') {
        setBtn('sold');
        handleSoldOut();
      } else if (newBtn === 'pending') {
        setBtn('pending');
        handlePending();
      } else {
        setBtn('denied');
        handleRefused();
      }
    }
  }

  const checkLimit = () => {
    if (userProducts.length >= productsPerSet) {
      setHasReached(true);
    } else {
      setHasReached(false);
    }
  }

  useEffect(() => {
    fetchUser()
  }, []);

  useEffect(() => {
    checkLimit();
  }, [productsPerSet]);

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
            :(currentProducts.length === 0) ? <><Box textAlign="center">
                <img src={EmptyBox} className={classes.emptyBox} alt="" />
              </Box>
              <Typography variant='h5' textAlign='center'>Aucune annonce en vente</Typography>
              <Box textAlign="center">
              <Button onClick={() => window.location.href = "/annonces"} sx={{float: "center", mt: 2}} variant='contained'>Publier une annonce</Button>
            </Box></> : <>
              <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} xl={12}>
                {currentProducts.map((product) => (
                      <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                        {product.status === 'accepted'} {product.status === 'accepted'} {product.status === 'accepted'}
                            <Product product = {product}/>
                      </Grid>
                  ))}
              </Grid>
              <Button disabled={hasReached} onClick={() => setProductsPerSet(8)} sx={{margin: "25px auto 0", display: "block"}} variant="contained">voir plus</Button>
              </>
              }
            </TabPanel>
            <TabPanel value={value} index={1}>
              {userData.fav.length === 0 ?
              <><Box textAlign="center">
              <img src={EmptyBox} className={classes.emptyBox} alt="" />
            </Box>
            <Typography variant='h5' textAlign='center'>Aucune annonce en Favoris</Typography>
            <Box textAlign="center">
              <Button onClick={() => window.location.href = "/annonces"} sx={{float: "center", mt: 2}} variant='contained'>Publier une annonce</Button>
            </Box></> :
              <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} xl={12}>
              {userData.fav.map((product) => (
                  <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                      <Product product = {product}/>
                  </Grid>
              ))}
            </Grid>
            }
            </TabPanel>
          </Box>
        </div>
    )
  }
