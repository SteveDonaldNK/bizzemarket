import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import './Pending.css'
import { Grid } from '@mui/material'
import Product from '../Products/Product/Product'

export default function Pending() {
const [posts, setPosts] = useState([])

function fetchPendingPosts () {
    try {
       axios.get("http://54.197.36.149/api/admin/pending", {withCredentials: true})
       .then(res => setPosts(res.data))
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    fetchPendingPosts();
}, [])

  return (
    <div className='pending'>
      <Grid container spacing={2}>
          {posts.map((product) => (
              <Grid sx={{}} key={product._id} item xs={12} sm={6} md={4} lg={3}>
                  <Product product = {product}/>
              </Grid>
          ))}
      </Grid>
    </div>
  )
}
