import * as React from 'react';
import './Plan.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Stack, useMediaQuery } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import axios from 'axios';
import Orange from '../../assets/OMlogo.jpg'
import MTN from '../../assets/MOMO.png'
import Master from '../../assets/master.png'
import American from '../../assets/american.png'
import Visa from '../../assets/visa.jpg'
import Credit from '../../assets/creditcard.png'

const methods =[Orange, MTN, Master, American, Visa]

const cardInfo = [
    {
        price: "10,000 FCFA",
        type: "Basic",
        variant: "outlined",
        description: 'Offre Valable pour 1 mois',
        id: "price_1LvK8nGHq7jCF2bw2l4ozGku"
    },
    {
        price: "15,000 FCFA",
        type: "Standard",
        variant: "contained",
        description: 'Offre Valable pour 6 mois',
        id: "price_1LvK9oGHq7jCF2bw4WN9wMzD"
    },
    {
        price: "20,000 FCFA",
        type: "Premium",
        variant: "outlined",
        description: 'Offre Valable pour 12 mois',
        id: "price_1LvKANGHq7jCF2bwhSWZltaI",
    },
]

const handleCheckout = (price) => {

    const data = {
        price: price,
        quantity: 1
    }

    try {
        axios.post("/api/checkout",data, {
            Headers: {
                "Content-Type":"application/json"
            },
            withCredentials: true
        }).then(res => window.open(res.data.url))
    } catch (error) {
        console.log(error)
    }
}

export default function Plan() {
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down(335))

    const handleClickOpen = (id) => {
        setId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let btnLabel = '';
    isMatch ? btnLabel = 'Payer' : btnLabel = 'Passer au paiement'

  return (
    <div className='plan'>
        <Box sx={{width: "80%", textAlign: "center"}}>
        <Typography className='title'>Annonces Pro</Typography>
        <Typography>Votre annonce apparaîtra dans un emplacement privilégié, une section "Premium" a été spécialement dédiée aux annonces premium.</Typography>
        </Box>
        <div className="plans">
            <Grid container spacing={4} justifyContent='center'>
                    {cardInfo.map((info, index) => (
                        <Grid item xs sm={12} md={12} lg={4} xl={4}>
                            <Card key={index} className='card' sx={{margin: "auto", borderRadius: "15px", padding: "5px 10px 15px"}} variant="outlined">
                            <CardContent>
                            <Typography variant="h5" component="div">
                                <span className='price'>{info.price}</span>
                            </Typography>
                            <Typography variant='h6' sx={{fontWeight: "bold"}}>
                                {info.type}
                            </Typography>
                            <Typography variant="body1" sx={{mt: 2, mb: 1}}>
                                {info.description}
                            </Typography>
                            </CardContent>
                            <CardActions >
                            <Button onClick={() => handleClickOpen(info.id)} className='btn' disableElevation sx={{borderRadius: "30px", padding: "10px 45px", margin: "auto"}} variant={info.variant}>{btnLabel}</Button>
                            </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </div>
        <div className='payment' >
            <Typography className='title'>Moyens De Paiement</Typography>
            <Grid pt={2} alignItems="center" justifyContent="space-around" container>
                {methods.map((method, key) => (
                    <Grid mt={4} key={key} item xs={12} sm={4} md={4} lg={2} xl={2}>
                        <img className='methods' src={method} alt={method} />
                    </Grid>
                ))}
            </Grid>
        </div>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{padding: "30px !important", textAlign: "center"}} id="responsive-dialog-title">
          {"Veuillez choisir votre moyen de paiement"}
        </DialogTitle>
        <DialogContent sx={{padding: "0 30px 50px !important"}}>
          <DialogContentText>
            <Stack direction="row" justifyContent="space-around" flexWrap="wrap">
                <img className='checkoutIcon' src={Orange} alt="" />
                <img className='checkoutIcon' src={MTN} alt="" />
                <img onClick={() => handleCheckout(id)} className='checkoutIcon' src={Credit} alt="" />
            </Stack>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
