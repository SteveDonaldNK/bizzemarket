import { Box, Grid, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import useStyles from "./styles";
import Cart from "../../assets/cart.png"
import main from "../../assets/main.png"
import { Fade, Zoom} from "react-reveal"
import { Link } from 'react-router-dom';

export default function Banner() {
  const theme = useTheme();
  let heading = 'h2' ;
  let subtitle = 'h3';
  let imgStyling = {};
  let boxStyling = {mt: "10%"};
  let reverse = {};
  let bannerStyle = {height: "90vh"};
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  useMediaQuery(theme.breakpoints.down(1073)) && (heading = 'h3');
  useMediaQuery(theme.breakpoints.down("sm")) && (heading = 'h4');
  useMediaQuery(theme.breakpoints.down(1073)) && (subtitle = 'h4');
  useMediaQuery(theme.breakpoints.down("sm")) && (subtitle = 'h5');
  if (useMediaQuery(theme.breakpoints.down("md"))) {
    reverse = {flexDirection: "column-reverse"};
    bannerStyle = {height: "95vh"}
  }
  isMatch && (imgStyling = {margin: "auto"});
  isMatch && (boxStyling = {mt: "2%"})

    const classes = useStyles();
  return (
    <div style={bannerStyle} className={classes.container}>
      <Box position="relative" elevation={2} className={classes.container}>
        <Grid sx={reverse} container>
          <Grid position="relative" item sm={12} md={7} lg={8}>
            <Box sx={boxStyling} >
              <Fade duration={1500} delay={500} bottom cascade><Typography className={classes.text} variant={heading}>Le <span className={classes.span} >boss</span> des <span className={classes.span} >annonces</span> en ligne au <span className={classes.span} >Cameroun</span></Typography></Fade>   
              <Fade duration={2000} delay={500} bottom cascade><Typography variant = {subtitle} color="GrayText">Ventes et Achats facile</Typography></Fade>
              <Fade duration={2000} delay={1000} bottom cascade><Button component={Link} to="/annonces" disableElevation sx={{borderRadius: "0", mt: 5, padding: "10px 15px"}} variant='contained' >voir les annonces</Button></Fade>
            </Box>
          </Grid>
          <Grid sx={imgStyling} item position="relative" xs={9} sm={6} md={5} lg={4}>
            <Zoom duration={2000}><img className={classes.img} src={Cart} alt="" /></Zoom>
            <Zoom duration={2000}><img className={classes.Circle} src={main} alt="" /></Zoom>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
