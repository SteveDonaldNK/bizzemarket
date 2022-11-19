import { Box, Typography, Button, Avatar, Tab, Tabs, Grid, Dialog, DialogContent, DialogContentText } from '@mui/material'
import { ArrowForward, Call, Mail, WhatsApp } from '@mui/icons-material';
import PropTypes from 'prop-types';
import React, {useState} from 'react'
import useStyles from "./styles"
import EmptyBox from "../../assets/empty.gif";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { Stack } from '@mui/system';
import Product from '../../components/Products/Product/Product'

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
    const [value, setValue] = useState(0);
    const [sellerData, setSellerData] = useState({});
    const sellerId = useParams().id;
    const [sold, setSold] = useState([]);
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };


    function fetchSeller() {
      try {
        axios.get(`http://localhost:4000/getseller/${sellerId}`)
        .then((res) => {
          setSellerData(res.data)
          const soldItem = res.data.posts.filter(item => item.sold === true);
          setSold(soldItem)
          setProducts(res.data.posts)
        })
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchSeller()
    }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (Object.entries(sellerData).length !== 0) {
    return (
      <div className={classes.container}>
          <Box className={classes.box} >
              <Avatar src={`http://localhost:4000/${sellerData.image}`} className={classes.avatar} sx={{height: 200, width: 200}} />
          </Box>
          <Box sx={{padding: "120px 0 30px"}} textAlign="center">
              <Typography color="GrayText" variant='subtitle1' >{sellerData.town}, Cameroun</Typography>
              <Typography sx={{fontWeight: "bold !important"}} variant='h3' >{sellerData.name}</Typography>
              <Typography color="GrayText" variant='subtitle1' >Membre depuis le {sellerData.creationDate}</Typography>
              <Stack justifyContent='center' sx={{m: 5}} direction='row' spacing={5}>
                <Button onClick={handleClickOpen} variant='outlined' endIcon={<ArrowForward />}>CONTACTER</Button>
              </Stack>
          </Box>
          <Box sx={{ width: '90%', m: "auto" }}>
            <Grid spacing={2} justifyContent="center" container>
              <Grid xs={4} sm={4} md={3} lg={3} item>
                <Typography sx={{textAlign: "center"}}><span className={classes.span}>{sellerData.posts.length}</span><br /> annonces</Typography>
              </Grid>
              <Grid xs={4} sm={4} md={3} lg={3} item>
                <Typography sx={{textAlign: "center"}}><span className={classes.span}>{sold.length}</span><br /> vendu</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: '90%', m: "auto", mt: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Annonces" {...a11yProps(0)} />
                <Tab label="Vendu" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            {(sellerData.posts.length === 0) ? <><Box textAlign="center">
                <img src={EmptyBox} className={classes.emptyBox} alt="" />
              </Box>
              <Typography variant='h5' textAlign='center'>Aucune annonce en vente</Typography></> : 
              <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} xl={12}>
                {products.map((product) => (
                    <Grid sx={{}} key={product._id} item xs={12} sm={6} md={4} lg={3}>
                        <Product product = {product}/>
                    </Grid>
                ))}
              </Grid>
              }
            </TabPanel>
            <TabPanel value={value} index={1}>
              {(sold.length === 0) ? <><Box textAlign="center">
                <img src={EmptyBox} className={classes.emptyBox} alt="" />
              </Box>
              <Typography variant='h5' textAlign='center'>Aucune annonce dans vendu</Typography></> :
              <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} xl={12}>
              {sold.map((product) => (
                  <Grid sx={{}} key={product._id} item xs={12} sm={6} md={4} lg={3}>
                      <Product product = {product}/>
                  </Grid>
              ))}
            </Grid>
              }
            </TabPanel>
          </Box>

          <Dialog
            open={open}
            padding="50px"
            onClose={handleClose}
            aria-labelledby="contact-title"
          >
            <DialogContent>
              <DialogContentText m={3} id="contact-body">
                <Stack direction='row' spacing={2}>
                  <Call sx={{fontSize: "2rem !important", color: "#007ACC"}} />
                  <Typography variant= "h6">{sellerData.phone}</Typography>
                </Stack>
                <Stack mt={3} direction='row' spacing={2}>
                  <WhatsApp sx={{fontSize: "2rem !important", color: "#44B700"}} />
                  <Typography variant= "h6">{sellerData.whatsapp}</Typography>
                </Stack>
                <Stack mt={3} direction='row' spacing={2}>
                  <Mail sx={{fontSize: "2rem !important", color: "#F2A616"}} />
                  <Typography variant= "h6">{sellerData.email}</Typography>
                </Stack>
              </DialogContentText>
            </DialogContent>
          </Dialog>
      </div>
    )
  }
}
