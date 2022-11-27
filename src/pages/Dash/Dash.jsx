import React, { useContext } from 'react'
import Side from '../../components/Side/Side'
import Main from '../../components/Main/Main'
import './Dash.css'
import Right from '../../components/Right/Right'
import { Avatar, Box, IconButton, Link, Popover, Stack, Typography } from '@mui/material'
import { AccountCircle, AdminPanelSettings, Close, KeyboardArrowDown, Menu, Settings } from '@mui/icons-material'
import { useState } from 'react'
import { context } from '../Context'
import { secondaryColor } from '../../params'
import { useEffect } from 'react'
import axios from 'axios'

export default function Dash() {
  const ctx = useContext(context)
  const [expanded, setExpanded] = useState(false)
  const [tab, setTab] = useState('Analyses');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    function fetchUser() {
      try {
         axios.get("http://54.197.36.149/api/userdata",{withCredentials: true}) 
         .then((res) => {
          setUser(res.data);   
         })
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    fetchUser();
  }, [])

    const popoverOpen = Boolean(anchorEl);
    const id = popoverOpen ? 'simple-popover' : undefined;

  if (user !== undefined) {
    return (
      <div className='Dash'>
          <Side setTab={setTab} expanded={expanded} />
        <div className='main'>
          <div className='navbar'>
            <IconButton onClick={() => setExpanded(!expanded)} className='hidden' >
              {expanded ? <Close sx={{height: "2rem", position: "fixed !important", top: "2%", left: "12rem", zIndex: "20", color: "#FFF"}}  /> : <Menu sx={{height: "2rem"}}  />}
            </IconButton>
            <div onClick={handleClick} className="user"><Avatar sx={{marginRight: 1}} /> <span>{user.username}</span> <KeyboardArrowDown /></div>
          </div>
          <div className="content">
            <Main tab={tab} />
            <Right tab={tab}/>
          </div>
        </div>
  
        <Popover
                id={id}
                open={popoverOpen}
                anchorEl={anchorEl}
                elevation = {1}
                disableScrollLock
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Box sx={{ border: 1, borderRadius: "5px", p: 2, borderColor: "#DFDFDF"}}>
                  {ctx.isAdmin && <Link href="/admin" underline="none" sx={{color: "#818181",'&:hover': {color: secondaryColor}}}><Stack direction="row" sx={{margin: "8px 0"}} spacing={1}><AdminPanelSettings sx={{height: "1.3rem"}} className='icon' color='c9c9c9 !important' /><Typography sx={{fontSize: "0.9rem !important"}}>Admin</Typography></Stack></Link>}
                  <Link href="/dashboard" underline="none" sx={{color: "#818181",'&:hover': {color: secondaryColor}}}><Stack direction="row" sx={{margin: "8px 0"}} spacing={1}><AccountCircle sx={{height: "1.3rem"}} className='icon' color='c9c9c9 !important' /><Typography sx={{fontSize: "0.9rem !important"}}>Voir mon profil</Typography></Stack></Link>
                  <Link href="/account" underline="none" sx={{color: "#818181",'&:hover': {color: secondaryColor}}}><Stack direction="row" sx={{margin: "8px 0"}} spacing={1}><Settings sx={{height: "1.3rem"}} className='icon' color='c9c9c9 !important' /><Typography sx={{fontSize: "0.9rem !important"}}>Paramètres</Typography></Stack></Link>
                </Box>
              </Popover>
      </div>
    )
  }
}
