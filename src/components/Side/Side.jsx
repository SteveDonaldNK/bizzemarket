import React, { useState } from 'react'
import { sidebarData } from '../../params'
import './Side.css'
import { Logout } from '@mui/icons-material'
import axios from 'axios'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useEffect } from 'react'

export default function Side({expanded, setTab}) {
    const [selected, setSelected] = useState(0)
    const [logout, setLogout] = useState(false);
    const [open, setOpen] =   useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      if (localStorage.getItem('tabLabel')) {
        setSelected(Number(localStorage.getItem('activeTab')));
        setTab(localStorage.getItem('tabLabel'))
      } else {
        localStorage.setItem('activeTab', 0);
        localStorage.setItem('tabLabel', 'Analyses');
      }
    }, [])
    
    const handleLogout = () => {
      localStorage.clear();
      axios.get("http://54.197.36.149:4000/api/logout", {withCredentials: true})
      .then(res => {
        if (res.status === 200) {
          window.location.href = '/';
        }
      });
    }
    const handleTab = (data, index) => {
      localStorage.setItem('activeTab', index);
      localStorage.setItem('tabLabel', data.heading);
      setSelected(index); 
      setTab(data.heading);
    }

    return (
    <div className={expanded ? "expanded" : "side"} >
          <div className="menu">
            <h4>Management</h4>
            {sidebarData.map((data, index) => (
              <div className={selected===index?"menuItem active":'menuItem'}
              key={index}
              onClick = {() => handleTab(data, index)} >
                  <data.icon />
                  <span>{data.heading}</span>                  
              </div>
            ))}
            <div className={logout ? "menuItem logout active" : "menuItem logout"} onClick={() => {setLogout(true); setSelected(null); handleClickOpen()}}>
              <Logout />
              <span>Déconnection</span>
            </div>
          </div>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Déconnection?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              En cliquant sur "oui", vous serez déconnecté de ce compte
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>Non</Button>
              <Button onClick={() => {handleClose(); handleLogout()}}>
                Oui
              </Button>
            </DialogActions>
          </Dialog>
    </div>
  )
}
