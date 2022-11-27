import React, {useState, useEffect} from 'react';
import {Breadcrumbs, Divider, Link, Typography} from '@mui/material';
import Products from '../../components/Products/Products';
import {useTheme} from "@mui/material";
import useStyles from './styles'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grain, Home } from '@mui/icons-material';
import Slider from '../../components/Slider/Slider';

const BreadCrumb = ({category}) => (
    <div style={{margin: "0 5% 20px"}} role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="primary"
          href="/"
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Accueil
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <Grain sx={{ mr: 0.5 }} fontSize="inherit" />
          {category}
        </Typography>
      </Breadcrumbs>
    </div>
)

export default function App() {
  const theme = useTheme();
  const category = useParams().category;
  const title = `Annonces ${category}`
  const [products, setProducts] = useState([]);
  const classes = useStyles();

  const fetchProducts = () => {
    try {
        axios.get(`http://54.197.36.149/api/products/${category}`)
        .then((res) => setProducts(res.data))
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    fetchProducts();
}, []);

  return (
    <div style={{overflow: "hidden"}} className={classes.Container}>
        <BreadCrumb category={category} />
        <Divider theme={theme} />
        <Slider />
        <Divider theme={theme} />
        <Products title={title} theme={theme} subProducts={products} setSubProducts={setProducts}/>
    </div>
  )
}
