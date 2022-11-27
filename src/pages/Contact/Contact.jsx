import { Box, Button, Container, InputLabel, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Fade, Zoom } from 'react-reveal';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import './styles.css';

export default function Contact() {
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const Data = {
            username: username,
            surname: surname,
            userEmail: email,
            tel: tel,
            message: message
        }

        try {
            axios.post("http://54.197.36.149:4000/api/contact", Data)
            .then(res => console.log(res.data));
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (value, setter) => {
        setter(value);
    }

  return (
    <div className='main-contact'>
        <Container className="main-contact-container" >
            <Container className='left-form' >
                <form onSubmit={handleSubmit}>
                    <Box className="contact-title-container">
                    <Fade delay={500} bottom><Typography className="contact-us-title" variant='h2'>Contactez-nous</Typography></Fade>
                    <Fade delay={800} bottom><Typography className="contact-us-subtitle" variant='subtitle1'>Des questions, Des préoccupations ? écrivez-nous</Typography></Fade>
                    </Box>
                    <Stack direction="column">
                        <Stack className='inputContainers' direction="row" justifyContent="space-between">
                            <Box className="nameContainer">
                                <Fade delay={800} bottom><InputLabel className='input-label' htmlFor="username" >Nom</InputLabel></Fade>
                                <Fade delay={1000} bottom><TextField fullWidth value={username} onChange={(e) => handleChange(e.target.value, setUsername)} className="input-field" id="username" name='userName' label="Nom" size='small' variant="outlined" /></Fade>
                            </Box>
                            <Box className="nameContainer">
                                <Fade delay={800} bottom><InputLabel className='input-label' htmlFor="surname" >Prenom</InputLabel></Fade>
                                <Fade delay={1000} bottom><TextField fullWidth value={surname} onChange={(e) => handleChange(e.target.value, setSurname)} className="input-field" id="surname" name='surname' label="Prenom" size='small' variant="outlined" /></Fade>
                            </Box>
                        </Stack>
                        <Box className='inputContainers'>
                            <Fade delay={1200} bottom><InputLabel className='input-label' htmlFor="email" >Email</InputLabel></Fade>
                            <Fade delay={1400} bottom><TextField value={email} onChange={(e) => handleChange(e.target.value, setEmail)} name="email" className="input-field" id="email" label="Email" size='small' fullWidth variant="outlined" /></Fade>
                        </Box>
                        <Box className='inputContainers'>
                            <Fade delay={1600} bottom><InputLabel className='input-label' htmlFor="phone" >Tel</InputLabel></Fade>
                            <Fade delay={1800} bottom><TextField value={tel} onChange={(e) => handleChange(e.target.value, setTel)} name="tel" className="input-field" id="phone" label="Telephone" size='small' fullWidth variant="outlined" /></Fade>
                        </Box>
                        <Box className='inputContainers'>
                            <Fade delay={2000} bottom><InputLabel className='input-label' htmlFor='message'>Votre Message</InputLabel></Fade>
                            <Fade delay={2200} bottom><TextareaAutosize
                            className='message-area'
                            name='message'
                            maxRows={4}
                            aria-label="maximum height"
                            maxLength={3000}
                            value={message}
                            onChange = {
                                (e) => handleChange(e.target.value, setMessage)
                            }
                            required
                            /></Fade>
                        </Box>
                        <Fade delay={2400} bottom><Button fullWidth className='submitBtn' type='submit' variant="contained">Envoyer</Button></Fade>
                    </Stack>
                </form>
            </Container>

            <Container className='right-image'>
                
            </Container>
           
            
        </Container>
    </div>
  )
}
