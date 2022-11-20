import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Grid } from '@mui/material'
import Product from '../Products/Product/Product'
import './Denied.css'

export default function Denied() {
const [posts, setPosts] = useState([])

function fetchAcceptedPosts () {
    try {
       axios.get("/api/admin/denied", {withCredentials: true})
       .then(res => setPosts(res.data))
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    fetchAcceptedPosts();
}, [])

  return (
    <div className='denied'>
      <Grid container spacing={2}>
          {posts.map((product) => (
              <Grid sx={{}} key={product._id} item xs={12} sm={6} md={6} lg={4}>
                  <Product product = {product}/>
              </Grid>
          ))}
      </Grid>
    </div>
  )
}
