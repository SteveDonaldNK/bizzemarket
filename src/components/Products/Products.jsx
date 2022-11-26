import { Typography, Grid, useMediaQuery, ToggleButton, Popover, CircularProgress } from '@mui/material'
import { SettingsInputComponent } from '@mui/icons-material'
import React, {useState} from 'react'
import Product from './Product/Product'
import useStyles from "./styles"
import Filters from './Filters/Filters'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import PagePagination from '../PagePagination/PagePagination'
import { Box } from '@mui/system'

export default function Products({subProducts, title, theme}) {
    const classes = useStyles();
    const pageNumber = useSearchParams()
    const location = useLocation().pathname;
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(false);
    const [currentPage, setCurrentPage] = useState(Number(pageNumber[0].get("p")));
    const [filterPrice, setFilterPrice] = useState([]);
    const [filterValue, setFilterValue] = useState('recent');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [loading, setLoading] = useState(true);
    
    const fetchProducts = (filter) => {
      try {
        axios.post("http://localhost:4000/api/sort", {filterValue: filter}, {
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then((res) => {

            if(res.status === 200) {
                setLoading(false);
            }

            if(location === '/annonces') {
                setProducts(res.data);
            } else {
                const results = res.data.filter(({ _id: id1 }) => subProducts.some(({ _id: id2 }) => id2 === id1));
                setProducts(results);
            }
        });
      } catch (error) {
          console.log(error);
      }
    }
        useEffect(() => {
            if (location === '/annonces') {
                fetchProducts(filterValue);
            } else {
                setProducts(subProducts)
            }
        }, [filterValue])

        useEffect(() => {
            if (location !== '/annonces') {
                fetchProducts(filterValue)
            }
        }, [subProducts, filterValue])

        useEffect(() => {
            const newProducts = products.filter(product => product.town === selectedLocation)
            setProducts(newProducts)
        }, [selectedLocation])

        useEffect(() => {
           if (filterPrice[0] !== 0 && filterPrice[1] !== 0) {
                const newProducts = products.filter(product => (product.price >= filterPrice[0] && product.price <= filterPrice[1]));
                setProducts(newProducts)
           } else if(filterPrice[0] !== 0) {
                const newProducts = products.filter(product => product.price >= filterPrice[0])
                setProducts(newProducts)
           } else {
                const newProducts = products.filter(product => product.price <= filterPrice[1])
                setProducts(newProducts)
           }
        }, [filterPrice])

    const productPerPage = 4;
    if (currentPage === null || currentPage === undefined) {
        setCurrentPage(1);
    }
    const lastProductIndex = currentPage * productPerPage;
    const firstProductIndex = lastProductIndex - productPerPage;
    const count = Math.ceil(products.length/productPerPage);
    const currentProducts = products.slice(firstProductIndex, lastProductIndex);

    const isMatch = useMediaQuery(theme.breakpoints.down(1473));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let bp=10;
    let font = "h6";
    isMatch && (bp = 12);
    useMediaQuery(theme.breakpoints.down('sm')) && (font = "subtitle1");

    const handleChange = (event) => {
        !selected && setAnchorEl(event.currentTarget);
        setSelected(!selected);
    }

    const handleClose = () => {
        setFilterValue(filterValue);
        setAnchorEl(null);
        setSelected(!selected);
    };

    const handlePageChange = (event, page) => {
       window.location.href = `/annonces?p=${page}`;
    }

    function onFilterValueSelected(filterValue) {
        setFilterValue(filterValue);
    }  

    function handleDelete () {
        fetchProducts(filterValue);
        setSelectedLocation('');
        setFilterPrice([]);
    }

  return (
    <div className={classes.Container}>
        {loading ? 
        <Box sx={{ height: "60vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
         </Box> 
      : <><Grid container spacing={2}>
        <Grid>
            {!isMatch ? <Filters filterValue={filterValue} setFilterValue={setFilterValue} handleDelete={handleDelete} setFilterPrice={setFilterPrice} setSelectedLocation={setSelectedLocation} onFilterValueSelected={onFilterValueSelected} /> : null}
        </Grid>
        <Grid container sx={{display: "inline"}} spacing={4} item sm={12} md={12} lg={bp}>
            <Grid item display="flex" justifyContent="space-between" xs={12} sm={12} md={12} lg={12}>
                <Typography sx={{width: "50%", ml: "20px"}}variant={font} color="GrayText">{title}</Typography>
                {isMatch && <Typography color="GrayText">Filtres: 
                <ToggleButton value="check" selected={selected} onChange={handleChange}> <SettingsInputComponent /></ToggleButton></Typography>}
            </Grid>
            <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} xl={12}>
                {currentProducts.map((product) => (
                    <Grid sx={{}} key={product._id} item xs={12} sm={6} md={4} lg={3}>
                        <Product product = {product}/>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </Grid>
    <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    disableScrollLock
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
    }}
    >
        <Filters setFilterValue={setFilterValue} handleDelete={handleDelete} setFilterPrice={setFilterPrice} setSelectedLocation={setSelectedLocation} onFilterValueSelected={onFilterValueSelected} filterValue={filterValue} handleClose={handleClose} bp={isMatch} />
    </Popover>
    <PagePagination handlePageChange={handlePageChange} count={count} currentPage={currentPage} /></>
        }
    </div>
  )
}
