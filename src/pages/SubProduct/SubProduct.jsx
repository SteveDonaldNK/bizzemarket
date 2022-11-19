import React, {useEffect, useState} from 'react'
import { Breadcrumbs, Divider, Link, Typography } from '@mui/material';
import Products from "../../components/Products/Products"
import {useTheme} from "@mui/material";
import { useParams } from 'react-router-dom'
import { Grain, Home, Category } from '@mui/icons-material';
import axios from 'axios';
import Slider from '../../components/Slider/Slider';
import useStyles from './styles'

const BreadCrumb = ({category, subCategory}) => (
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
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="primary"
          href={`/annonces/${category}`}
        >
          <Category sx={{ mr: 0.5 }} fontSize="inherit" />
          {category}
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

export default function SubProduct() {
    const theme = useTheme();
    const params = useParams();
    const category = params.category;
    const subCategory = params.subCategory;
    const title = `Annonces ${subCategory}`
    const [products, setProducts] = useState([]);
    const classes = useStyles();

    const fetchProducts = () => {
        try {
            axios.get(`http://localhost:4000/subProducts/${subCategory}`)
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
        <BreadCrumb category={category} subCategory={subCategory} />
        <Divider theme={theme} />
        <Slider />
        <Divider theme={theme} />
        <Products title={title} theme={theme} subProducts={products} setSubProducts={setProducts}/>
      </div>
    )
}
