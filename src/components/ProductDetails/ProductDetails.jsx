import React, { useEffect, useState } from 'react';
import useStyles from "./styles";
import Product from '../Products/Product/Product';
import { Grid, Box, Card, CardHeader, CardActions, Avatar, IconButton, Divider, Tooltip, Typography, Popover, useTheme, useMediaQuery, Button } from '@mui/material';
import { Call, FavoriteBorderOutlined, ShareOutlined, Mail, WhatsApp, RoomOutlined, ChevronRight } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import { useContext } from 'react';
import { context } from '../../pages/Context';

const Body = ({currentProduct}) => (
    <Grid xs={12} sm={12} md={12} lg={12}>
        <Typography variant='h4' sx={{fontWeight: "bold !important", mt: 4, mb: 2}} >Description de l'annonce</Typography>
        <Typography variant='subtitle1' >{currentProduct.description}</Typography>
    </Grid>
)

export default function ProductDetails({ similarProducts, currentProduct, sellerData}) {
    const navigate = useNavigate();
    const ctx = useContext(context)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [contact, setContact] = useState('');
    const [choice, setChoice] = useState('');
    const [currentImage, setCurrentImage] = useState(currentProduct.img[0]);
    const [popperText, setPopperText] = useState("Partager le lien")
    const theme = useTheme();
    let iconSize = {fontSize: "2rem !important"};
    let imgSize = {height: 200}
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const imgMatch = useMediaQuery(theme.breakpoints.down('sm'));
    const iconMatch = useMediaQuery(theme.breakpoints.down(320));
    imgMatch && (imgSize = {height: 120});
    iconMatch && (iconSize = {fontSize: "1.5rem !important"});
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'XAF'
    })

  const handleClick = (event) => {
    const target = event.currentTarget;
    setAnchorEl(target);
    if (target.id === 'phone') { setContact(currentProduct.contact[0]); }
    if (target.id === 'whatsapp') { setContact(currentProduct.contact[1]); }
    if (target.id === 'email') { setContact(sellerData.email); }
  };

  const handleImageClick = (link) => {
    setCurrentImage(link);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setPopperText("Partager le lien");
  };


  const handleChoice = () => {
    if (choice !== '') {
        try {
            axios.patch("http://54.197.36.149/api/pending", {choice: choice, productId: currentProduct._id}, {
                headers: {
                    "Content-Type":"application/json"
                },
                withCredentials: true
            }).then((res) => console.log(res));
        } catch (err) {
            console.log(err);
        }
    }
  }

  const handleShare = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        setPopperText("Lien Copié");
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
  }

  const increment = () => {
    try {
        axios.get(`http://54.197.36.149/api/incrementView/${currentProduct._id}`);
    } catch (err) {
        console.log("An error occured");
    }
  }

  useEffect(() => {
    handleChoice();
  }, [choice])

  useEffect(() => {
    increment();
  }, [])

  const open = Boolean(anchorEl);
  const id = open ? contact : undefined;

  return (
    <div className={classes.Container} >
        <Grid justifyContent="space-between" container>
            <Grid sx={{height: "min-content"}} item xs={12} sm={12} md={7} lg={7}>
                <Box className={classes.box}>
                    <img className={classes.mainImg} src={`http://54.197.36.149/api/images/${currentImage}`} alt={currentProduct.title} />
                </Box>
                <Grid spacing={1} sx={{mt: 0, mb: 2}} container>
                    {currentProduct.img.map((link) => (
                        <Grid onClick={() => handleImageClick(link)} sx={imgSize} item xs={4} sm={4} md={4} lg={4}>
                            <img className={classes.img} src={`http://54.197.36.149/api/images/${link}`} alt={link.title} />
                        </Grid>
                    ))}
                </Grid>
                {!isMatch && <Body currentProduct={currentProduct} />}
            </Grid>
            <Grid sx={{height: "min-content"}} item xs={12} sm={12} md={4.5} lg={4}>
                <Card sx={{p: 2, borderRadius: 2}} elevation={3}>
                    <CardHeader
                        onClick={() => navigate(`/profile/${sellerData.id}`)}
                        sx={{cursor: 'pointer'}}
                        avatar={
                        <Avatar sx={{ bgcolor: red[500], width: "4rem", height: "4rem", fontWeight: "bold" }} aria-label="recipe">
                            D
                        </Avatar>
                        }
                        action={
                        <IconButton id='see' onClick={() => navigate(`/profile/${sellerData.id}`)} aria-label="settings">
                            <ChevronRight />
                        </IconButton>
                        }
                        classes={{
                            title: classes.headerTitle
                        }}
                        title={sellerData.name}
                        titleTypographyProps={{variant:'h5' }}
                        subheader={`Membre depuis le ${sellerData.creationDate}`}
                    />
                    <Divider />
                    {(ctx.connected && ctx.isAdmin) && <Box display='flex' justifyContent='space-around'>
                        <Button onClick={() => setChoice('accepted')} color='success' variant='contained'>Accepter</Button>
                        <Button onClick={() => setChoice('denied')} color='error' variant='contained'>Refuser</Button>
                    </Box>}
                    <CardActions sx={{justifyContent: "space-around"}}>
                        <Tooltip arrow placement="top" title='Contacter par telephone'><IconButton aria-describedby='call' id='phone' onClick={handleClick} ><Call sx={iconSize} color='primary'/></IconButton></Tooltip>
                        <Tooltip arrow placement="top" title='Contacter par Whatsapp'><IconButton aria-describedby='whatsapp' id='whatsapp' onClick={handleClick}><WhatsApp sx={iconSize} color='success'/></IconButton></Tooltip>
                        <Tooltip arrow placement="top" title='Contacter par Mail'><IconButton aria-describedby='mail' id='email' onClick={handleClick}><Mail sx={{...iconSize, color: "#F2A616"}} /></IconButton></Tooltip>
                        <Tooltip arrow placement="top" title='Ajouter aux favoris'><IconButton ><FavoriteBorderOutlined sx={iconSize} /></IconButton></Tooltip>
                        <Tooltip arrow placement="top" title={popperText}><IconButton onClick={handleShare} ><ShareOutlined sx={iconSize} /></IconButton></Tooltip>
                    </CardActions>
                </Card>
                <Grid sx={{mt: 4}} item sm={12} md={12} lg={12}>
                    <Box>
                        <Typography variant='h4' sx={{fontWeight: "bold !important"}}>{_.capitalize(currentProduct.title)}</Typography>
                        <Typography variant='h5' sx={{fontWeight: "bold !important"}}>{formatter.format(currentProduct.price)}</Typography>
                        <Typography sx={{display: "flex", alignItems: "center"}} variant='subtitle1'><RoomOutlined /> {currentProduct.town}, Cameroun</Typography>
                        <Divider sx={{mt: 1, mb: 2}} />
                        <Typography color='GrayText'>Publié le : <span style={{fontWeight: "bold"}}>{currentProduct.publishedDate}</span> | Catégorie : <span style={{fontWeight: "bold"}}>{currentProduct.category}</span></Typography>
                        <Divider sx={{mt: 2, mb: 2}} />
                        <div style={{height: "20em"}}>
                            <iframe title="map" width="100%" height="100%" id="gmap_canvas" src={`https://maps.google.com/maps?q=${currentProduct.town}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                        </div>
                    </Box>
                </Grid>
                {isMatch && <Body currentProduct={currentProduct} />}
            </Grid>
        </Grid>
        <Box>
            <Divider sx={{mt: 5}}/>
            <Typography variant='h4' sx={{fontWeight: "bold !important", mt: 2, mb: 4}}>Autres annonces dans {currentProduct.category}</Typography>
            <Grid container>
                <Grid container spacing={2} item lg={8}>
                    {similarProducts.map((product) => (
                        <Grid sx={{overflowX: "hidden"}} key={product.key} item xs={12} sm={6} md={4} lg={4}>
                            <Product theme={theme} product = {product}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{id}</Typography>
      </Popover>
    </div>
  )
}