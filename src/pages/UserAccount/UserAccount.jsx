import { Box, CircularProgress, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VerticalTab from '../../components/VerticalTab/VerticalTab'
import useStyles from "./styles";

export default function UserAccount() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

    useEffect (() => {
      try {
        axios.get("/api/userdata",{withCredentials: true}).then(res => {
          setUserData(res.data);
          setLoading(false);
        })
      } catch(error) {
        console.log(error)
      }
    }, [])

    const classes = useStyles();

    return ( 
      <div className={classes.container}>
        {loading ? <Box sx={{ height: "60vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{marginLeft: "10px"}}>Loading...</Typography>
                  </Box> :<>
          <Typography className={classes.heading} variant='h5'>Paramètres du compte</Typography>
          <VerticalTab userData={userData} /></> }
      </div>
    )
}