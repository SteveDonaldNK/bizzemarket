import React, {useEffect, useState} from 'react'
import { Divider, useTheme } from '@mui/material';
import Products from "../../components/Products/Products"
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import Slider from '../../components/Slider/Slider';

export default function Search() {
  const theme = useTheme();
  const navigate = useNavigate();
  const search = useLocation().search;
  const title = `Résultats de la recherche pour "${search.substring(9)}"`;
  const titleEmpty = `Aucune annonce pour "${search.substring(9)}"`;
  
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      axios.get(`http://localhost:4000/api/search${search}`)
      .then((res) => {
        setProducts(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])
  
  if (products.length === undefined) {
    navigate("/annonces");
  } else {
    return (
      <div style={{marginTop: "10px", overflow: "hidden"}}>
        <Divider />
        <Slider />
        <Divider />
        {products.length === 0 ? <Products theme={theme} title={titleEmpty} products={products}/> : <Products subProducts={products} theme={theme} title={title} products={products}/>}
      </div>
    )
  }
}
