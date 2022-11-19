import React, {useState, useEffect} from 'react'
import { Box, Breadcrumbs, CircularProgress, Link, Typography} from '@mui/material'
import { Home, Category, Grain } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import ProductDetails from '../../components/ProductDetails/ProductDetails'
import axios from 'axios';
import './styles.css'


const BreadCrumb = ({category, subCategory}) => (
    <div style={{marginBottom: "20px"}} role="presentation">
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
          {subCategory}
        </Typography>
      </Breadcrumbs>
    </div>
)

export default function Item() {
  const productID = useParams().productID;
  const productCategory = useParams().category;
  const [currentProduct, setCurrentProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [sellerData, setSellerData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
        const {data} = await axios.get(`http://localhost:4000/products/${productCategory}/${productID}`);
        setCurrentProduct(data);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
}

const fetchSimilarProducts = async () => {
  try {
    let {data} = await axios.get(`http://localhost:4000/products/${productCategory}`);
    data = data.slice(0, 6);
    setSimilarProducts(data);
  } catch (error) {
    console.log(error);
  }
}

const fetchSeller= async () => {
  try {
    axios.get(`http://localhost:4000/seller/${productID}`)
    .then((res) => {
      setSellerData(res.data);
    })
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
    fetchProduct();
    fetchSimilarProducts();
    fetchSeller();
}, []);

    return (
      <div style={{padding: "20px 5%"}}>
          {Object.keys(currentProduct).length === 0 || loading ? 
          <Box sx={{ height: "60vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
          </Box>
          :<><BreadCrumb category={currentProduct.category} subCategory={currentProduct.subcategory} />
          <ProductDetails sellerData={sellerData} similarProducts={similarProducts} currentProduct={currentProduct} /></>}
      </div>
    )
}
