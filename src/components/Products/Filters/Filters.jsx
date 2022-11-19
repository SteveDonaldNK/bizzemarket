import React, {useState} from 'react';
import useStyles from './styles';
import {Grid, Card, CardContent, Typography, Button, FormControl, Box, TextField, RadioGroup, FormLabel, FormControlLabel, Radio, IconButton, Stack, Popper, ClickAwayListener, Accordion, AccordionSummary, AccordionDetails, Tooltip} from "@mui/material"
import { Close, Delete, ExpandMore } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { useLocation, Link } from 'react-router-dom';
import { categories, towns } from '../../../categories';
import {secondaryColor} from '../../../params';
import _ from 'lodash';

export default function Filters({setFilterValue, handleClose, filterValue, bp, onFilterValueSelected, setSelectedLocation, setFilterPrice, handleDelete}) {
    const classes = useStyles();
    const location = useLocation().pathname;
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [filteredTowns, setFilteredTowns] = useState([]);
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(true),
      clickAwayHandler = () => setIsOpen(false),
      clickHandler = () => setIsOpen(true)
    
  const handleSelectedValue = (event) => {
    onFilterValueSelected(event.target.value);
  }
  const handleTownChange = (event) => {
    const value = event.target.value;
    setValue(value);
    clickHandler();
    const townArr = towns.filter(town => {
      return town.includes(_.capitalize(value));
    });
    setFilteredTowns(townArr);
    setAnchorEl(event.target);
  };
  const handleMinChange = (event) => {
    let value = event.target.value
    if(value < 0) {
      value = value * -1;
    }
    setMinPrice(value);
  };
  const handleMaxChange = (event) => {
    let value = event.target.value
    if(value < 0) {
      value = value * -1;
    }
    setMaxPrice(value);
  };
  const handlePrice = () => {
    const priceArr = [Number(minPrice), Number(maxPrice)]
    setFilterPrice(priceArr);
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleReset = () => {
    setFilterValue('recent');
    setMinPrice('');
    setMaxPrice('');
    setValue('');
    setFilteredTowns('');
    handleDelete();
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Grid item sx={{width: "225px", height: "min-content", overflow: "auto"}}>
        <Card variant='outlined' >
            <CardContent >
                <FormControl sx={{width: "100%"}}>
                    <Stack direction="row" justifyContent='space-between' sx={{width: "100%"}} >
                        <Typography variant='h6' color="GrayText" sx={{mb: "30px", padding: "0"}}>Filtres</Typography>
                        <IconButton sx={{width: "min-content", height: "min-content"}} >
                          <Tooltip title="retirer les filtres">
                            <Delete onClick={handleReset} sx={{fontSize: "1.4rem", '&:hover': {color: red[500]}}} />
                          </Tooltip>
                        </IconButton>
                        {bp && <IconButton onClick={handleClose} sx={{width: "min-content", height: "min-content"}}>
                          <Tooltip title="fermer">
                            <Close />
                          </Tooltip>
                        </IconButton>}
                    </Stack>
                    <FormLabel id="sort">Trier</FormLabel>
                    <RadioGroup
                        aria-labelledby="sort"
                        value={filterValue}
                        name="order"
                    >
                        <FormControlLabel onChange={(e) => (handleSelectedValue(e))} value="recent" control={<Radio size="small" />} label="Plus recent" />
                        <FormControlLabel onChange={(e) => (handleSelectedValue(e))} value="premium" control={<Radio size="small" />} label="Premium" />
                        <FormControlLabel onChange={(e) => (handleSelectedValue(e))} value="lowest" control={<Radio size="small" />} label="Prix Croissants" />
                        <FormControlLabel onChange={(e) => (handleSelectedValue(e))} value="highest" control={<Radio size="small" />} label="Prix decroissants" />
                    </RadioGroup>
                </FormControl>
                <Typography mt={4}>Localisation</Typography>
                <FormControl sx={{mt: 1, mb: 3, minWidth: 150 }} size="small">
                    <TextField
                      size='small'
                      value={value}
                      onChange={e => handleTownChange(e, isOpen)}
                      InputProps={{
                        className: classes.searchBar,
                        placeholder: "ville"
                      }}/>
                </FormControl>

                {location === '/annonces' && <>
                    {categories.map((category, index) => (
                          <Accordion className={classes.accordion}  key={index} expanded={expanded === category.category} onChange={handleChange(category.category)} elevation={0}>
                            <AccordionSummary
                              sx={{padding: "0", border: "0 !important", '&:hover': {color: secondaryColor}}}
                              classes={{ content: classes.content, expanded: classes.expanded }}
                              expandIcon={<ExpandMore />}
                              aria-controls={category.category}
                              id={category.category}
                            >
                              <Typography sx={{ width: '70%', flexShrink: 0}}>
                                {category.category}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{p: 0}}>
                              {category.subcategories.map((subCategory) => (
                                <Typography className={classes.link} component={Link} to={`/annonces/${category.category}/${subCategory}`}>
                                  {subCategory}
                                </Typography>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                      ))}
                </>}
                    <Typography sx={{mt: 3}}>Prix</Typography>
                    <FormControl sx={{mt: 1, minWidth: 150 }} size="small">
                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { mb: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <TextField value={minPrice} className={classes.input} type='number' name='minPrice' onChange={handleMinChange} sx={{width: "150px !important"}} size="small" id="outlined-basic" label="min" variant="outlined" />
                        <TextField value={maxPrice} className={classes.input} type='number' name='maxPrice' onChange={handleMaxChange} sx={{width: "150px !important"}} size="small" id="outlined-basic" label="max" variant="outlined" />
                    </Box>
                    </FormControl>
                    <Button onClick={handlePrice} sx={{mt: 2, mb: 2, minWidth: 150}} variant='outlined' color='primary' >Valider le prix</Button>
                {
                  (isOpen && filteredTowns.length !== 0) && <ClickAwayListener onClickAway={clickAwayHandler}>
                  <Popper sx={{zIndex: "10000"}} id={id} open={isOpen} anchorEl={anchorEl}>
                    <Box sx={{background: "#FFF", boxShadow: 1, zIndex: "1", overflowY: "scroll", height: 150}}>
                      {filteredTowns.map((town, index) => (
                          <Typography className={classes.town} onClick={() => {setSelectedLocation(town); setIsOpen(false)}} key={index} >{town}</Typography>
                      ))}
                    </Box>
                  </Popper>
                </ClickAwayListener>
                }
            </CardContent>    
        </Card>   
    </Grid>
  )
}
