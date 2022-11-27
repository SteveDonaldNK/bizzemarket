import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {Card, CardMedia, CardContent, Typography, IconButton, Button, Tooltip} from "@mui/material";
import {Close, Favorite, ShareOutlined} from "@mui/icons-material"
import useStyles from "./styles";
import moment from "moment";
import { Box } from '@mui/system';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom'
import { context } from '../../../pages/Context';
import axios from 'axios';

export default function Product({product}) {
    const classes = useStyles();
    const ctx = useContext(context);
    const location = useLocation().pathname;
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'XAF'
    })

    const starts = moment(product.createdAt);
    const ends = moment();
    const current = moment.duration(ends.diff(starts))._data
    const [favorites, setFavorites] = useState();
    const [iconColor, setIconColor] = useState({});

    function getFav() {
        try {
            axios.get('http://54.197.36.149/api/favorite', {withCredentials: true})
            .then(res => setFavorites(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (ctx.connected) {
            getFav();
        }
    }, [])

    useEffect(() => {
        if (ctx.connected) {
            checkFav();
        }
    }, [favorites])

    function getDuration() {
        
        if (current.minutes === 0 &&current.hours === 0 && current.days === 0 && current.months === 0 && current.years === 0) {
            return `À l'instant`
        } else if (current.hours === 0 && current.days === 0 && current.months === 0 && current.years === 0) {
            return `Il y a environ ${current.minutes} minute(s)`
        } else if (current.days === 0 && current.months === 0 && current.years === 0) {
            return `Il y a environ ${current.hours} heure(s)`
        } else if (current.months === 0 && current.years === 0) {
            return `Il y a environ ${current.days} jour(s)`
        } else if (current.years === 0) {
            return `Il y a environ ${current.months} mois`
        } 
        return `Il y a environ ${current.months} An(s)`
    }

    function addToFav () {
        try {
            axios.patch("http://54.197.36.149/api/user/fav", {favorite: product._id}, {
                headers: {
                    'Content-Type':'application/json'
                },
                withCredentials: true,
            })
            .then(res => {
                if (res.data === 'added') {
                    setIconColor({color: '#E94A88'});
                } else {
                    setIconColor({});
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    function deletePost () {
        try {
            axios.delete(`http://54.197.36.149/api/delete/${product._id}`,{
                headers: {
                    'Content-Type':'application/json'
                },
                withCredentials: true,
            })
            .then(res => {
                if (res.status === 200) {
                    window.location.href = location;
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    function checkFav() { 
        if (favorites !== undefined) {
            if (favorites.includes(product._id)) {
                setIconColor({color: '#E94A88'});
            }
        }
    }

    const handleDelete = () => {
        deletePost();
    }

    const handleShareClick = () => {
        console.log(`http://54.197.36.149:3000/annonces/${product.category}/product/${product._id}`)
    }

    const handleFavClick = () => {
        if (ctx.connected) {
            addToFav();
        } else {
            alert('login first')
        }
    }
    
    return (
        <Card className={classes.Card} sx={{ boxShadow: "none", textDecoration: "none"}}>  
                    <CardMedia
                        component="img"
                        height="250"
                        image= {`http://54.197.36.149/api/images/${product.img[0]}`}
                        alt={product.title}
                    />
                <CardContent sx={{height: "145px"}} >
                    <Typography variant="body2" color="text.secondary"> {getDuration()} </Typography>
                    <Typography sx={{fontWeight: "700", color: "#000"}} variant="subtitle1" >{_.truncate(product.title, {length: 57})}</Typography>
                    <Typography mt={1} variant="body2" color="text.secondary"> {product.town}, {product.country} </Typography>
                    {location === '/dashboard' && <Typography> vue(s): {product.views} </Typography>}
                    <Box className={classes.Box}>
                        <Button href={`/annonces/${product.category}/product/${product._id}`} className={classes.btn} variant='outlined'>Details</Button>
                        {location === '/dashboard' ? <Button href={`/edit/${product._id}`} variant='outlined'>Modifier</Button> : <Typography sx={{fontWeight: "700", color: "GrayText", borderRadius: "30px", textAlign: "center"}} variant='subtitle1'> {formatter.format(product.price)}</Typography>}
                    </Box>
                </CardContent>
                    <IconButton onClick={handleFavClick} className={classes.icon} aria-label="add to favorites">
                        <Favorite sx={iconColor} />
                    </IconButton>
                    <IconButton onClick={handleShareClick} className={classes.icon2} aria-label="share">
                        <ShareOutlined />
                    </IconButton>
                    {
                        location === "/dashboard" && <Tooltip arrow title="Supprimer"><IconButton onClick={handleDelete} className={classes.icon3} aria-label="add to favorites">
                        <Close />
                    </IconButton></Tooltip>
                    }
            </Card>  
        
  )
}
