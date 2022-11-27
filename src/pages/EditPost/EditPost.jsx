import React, {useEffect, useState} from 'react';
import { Box, Stack, Button, InputAdornment,TextareaAutosize, TextField, Grid, Typography, MenuItem, FormControl, InputLabel, Select, IconButton, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Warning, Check, Clear, AddAPhoto, WhatsApp, Smartphone } from '@mui/icons-material';
import useStyles from "../Post/styles";
import axios from "axios";
import { categories, towns } from '../../categories';
import { useNavigate, useParams } from 'react-router-dom';
const uploadedImages = [];


export default function EditPost() {
    const classes = useStyles();
    const productId = useParams().productId;
    const theme = useTheme();
    const Towns = towns.sort();
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down('lg'));
    let align = {};
    isMatch && (align = {alignItems: "center"});

    const [selectedImage1, setSelectedImage1] = useState('');
    const [selectedImage2, setSelectedImage2] = useState('');
    const [selectedImage3, setSelectedImage3] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [town, setTown] = useState('');
    const [letterLimit, setLetterLimit] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit (e) {
        e.preventDefault();
        if (uploadedImages.length !== 0) {
            const form = e.target;
            const formData = new FormData(form);
            uploadedImages.map((image, index) => (
                formData.append(`file${index+1}`, image)
            ));
            console.log([...formData])      
            // try {
            //     setSelectedImage1('');
            //     setSelectedImage2('');
            //     setSelectedImage3('');
            //     axios.put("http://54.197.36.149/api/products", formData , {
            //         headers: {
            //           'Content-Type': 'multipart/form-data'
            //         },
            //         withCredentials: true,
            //     }).then((res) => {
            //         if (res.status === 201) {
            //             window.location.href = "/dashboard";
            //         } else {
            //             window.location.href = "/post";
            //         }
            //     });
            // } catch (error) {
            //    console.log(error); 
            // }
        } else {
            setOpen(true);
        }
    }

    const onSelectFile = (setSelectedImage, event) => {
        const selectedFiles = event.target.files;
        uploadedImages.push(selectedFiles[0]);
        let selectedFilesArray = Array.from(selectedFiles);
        const imagesArray = selectedFilesArray.map((file) => {
            console.log(file);
            return URL.createObjectURL(file)
        })
        console.log(imagesArray[0])
        setSelectedImage(imagesArray);
    }

    const onDeleteFile = (setter, index) => {
        uploadedImages.splice(index, 1);
        setter([]);
    }

    const handleLetterLimit = (event) => {
        setLetterLimit(event.target.value.length);
    }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubCategory('');
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleTownChange = (event) => {
    setTown(event.target.value);
  };

  function insertSubcategory (e) {
    setSelectedSubCategory(e.subcategories)
  }

    function handleClear() {
        navigate("/annonces");
    }

  async function fetchData() {
    try {
        await axios.get(`http://54.197.36.149/api/productData/${productId}`, { withCredentials: true })
        .then(res => {
            const imgArr = [setSelectedImage1, setSelectedImage2, setSelectedImage3]
            setData(res.data);
            setLetterLimit(res.data.description.length);
            setCategory(res.data.category);
            setTown(res.data.town);
            const [categoryObj] = categories.filter(cat => res.data.category === cat.category);
            insertSubcategory(categoryObj);
            setSubCategory(res.data.subcategory)
            imgArr.forEach((picture, index) => {
                if (res.data.images[index] !== undefined ) {
                    picture(res.data.images[index]);
                }
            })
        });
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  const Selector = ({setter, image, index}) => (
    image.length !== 0 ? 
            <Grid className={classes.grid} xs={10} sm={8} md={4} lg={4} item key={image} >
                <Box className={classes.image}>
                    <img className={classes.img} src={image} alt="" />
                    <IconButton className={classes.deleteBtn} onClick={() => onDeleteFile(setter, index)}><Clear /></IconButton>
                    <input style={{display: "none"}} type="file" name="" id="" />
                </Box>
            </Grid> : 
            <Grid xs={9} sm={5} md={3.5} lg={4} item className={classes.image}>
                <label className={classes.label}>
                    <Typography sx={{color: "GrayText"}}>Ajouter une image</Typography>
                    <AddAPhoto sx={{fontSize: "3rem !important", color: "GrayText"}} />
                    <input className={classes.input} type="file" onChange={(event) => onSelectFile(setter, event)} accept='image/png, image/jpeg, image/webp'/>
                </label>
            </Grid>
    )

    if (data.title === undefined) { return null }

  return (
    <div className={classes.container}>
        <Typography sx={{fontWeight: "Bold !important", fontSize: "2rem !important", ml: "20px", mb: "15px"}}>Publier une annonce</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>   
            <Grid container flexDirection="row-reverse" justifyContent="space-between">
                <Grid mb={3} item sm={12} md={12} lg={3.5}>
                    <Box sx={{ borderRadius: '10px', boxShadow: 4, padding: "20px 20px 30px"}}>
                        <Typography textAlign="center" ><Warning color='error' sx={{height: "100%"}}/></Typography>
                        <Typography sx={{fontWeight: "Bold !important", display: "flex", alignItems: "center"}} variant='subtitle1'> 4 règles pour publier votre annonce:</Typography>
                        <ul>
                            <li><Typography variant='body2'>N'écrivez pas le prix dans le titre</Typography></li>
                            <li><Typography variant='body2'>N'indiquez pas vos coordonnées (téléphone, e-mail...) dans la description.</Typography></li>
                            <li><Typography variant='body2'>Ne publiez pas la même annonce plusieurs fois.</Typography></li>
                            <li><Typography variant='body2'>Ne vendez pas d'objets ou de services illégaux.</Typography></li>
                        </ul>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                    <Box sx={{ borderRadius: '10px', boxShadow: 4, padding: "20px 20px 30px" }}>
                        <Typography sx={{fontWeight: "Bold !important", mb: 2}} variant='h6'>Ajoutez des photos</Typography>
                        <Grid container spacing={2} justifyContent="space-around" className={classes.images}>
                            <Selector index={0} setter = {setSelectedImage1} image = {selectedImage1} />
                            <Selector index={1} setter = {setSelectedImage2} image = {selectedImage2} />
                            <Selector index={2} setter = {setSelectedImage3} image = {selectedImage3} />
                        </Grid>
                    </Box>
                    <Box sx={{ borderRadius: '10px', boxShadow: 4, padding: "20px 20px 30px", mt: 3 }}>
                        <Typography sx={{fontWeight: "Bold !important"}} variant='h6'>Description de l'annonce</Typography>
                        <Typography sx={{fontWeight: "Bold !important", mt: 3}} variant='subtitle1'>Titre de l'annonce</Typography>
                        <TextField defaultValue={data.title} name='title' size='small' fullWidth id="outlined-basic" placeholder="Titre" variant="outlined" required/>
                        <Typography sx={{fontWeight: "Bold !important", mt: 3}} variant='subtitle1'>Description</Typography>
                        <TextareaAutosize
                        onChange={handleLetterLimit}
                        name='description'
                        maxRows={4}
                        defaultValue={data.description}
                        aria-label="maximum height"
                        style={{ width: "100%", height: "150px", borderRadius: "5px", }}
                        maxLength={3000}
                        required
                        /> <span style={{float: "right"}}><Typography variant='body2' >{letterLimit}/3000</Typography></span>
                        <Typography sx={{fontWeight: "Bold !important", mt: 4}} variant='subtitle1'>Prix (FCFA)</Typography>
                        <TextField defaultValue={data.price} size='small' id="outlined-basic" type="number" placeholder='Donner un Prix' variant="outlined" name='price' /><br />
                        <Typography sx={{fontWeight: "Bold !important", mt: 4}} variant='subtitle1'>Categorie</Typography>
                        <FormControl sx={{mt: 1, minWidth: 222}} size='small'>
                            <InputLabel id="category-label">Categories</InputLabel>
                            <Select
                            labelId="category-label"
                            id="category"
                            value={category}
                            label="Categorie"
                            onChange={handleCategoryChange}
                            required
                            name='category'
                            >
                            {categories.map((category, key) => (
                                <MenuItem onClick={e => insertSubcategory(categories[key])} key={key} value={category.category}>{category.category}</MenuItem>
                            ))}
                            </Select>
                        </FormControl> <br />
                        <Typography sx={{fontWeight: "Bold !important", mt: 4}} variant='subtitle1'>Sous-Categorie</Typography>
                        <FormControl sx={{mt: 1, minWidth: 222}} size='small'>
                            <InputLabel id="subCategory-label">Sous-Categories</InputLabel>
                            <Select
                            labelId="subCategory-label"
                            id="subCategory"
                            value={subCategory}
                            label="subCategorie"
                            onChange={handleSubCategoryChange}
                            required
                            name='subCategory'
                            >
                            {selectedSubCategory.map((sub, key) => (
                                <MenuItem key={key} value={sub}>{sub}</MenuItem>
                            ))}
                            </Select>
                        </FormControl> <br />
                        <Typography sx={{fontWeight: "Bold !important", mt: 4}} variant='subtitle1'>Localisation</Typography>
                        <FormControl sx={{mt: 1, minWidth: 222}} size='small'>
                            <InputLabel id="town-label">Ville</InputLabel>
                            <Select
                            labelId="town-label"
                            id="town"
                            value={town}
                            label="town"
                            name='town'
                            onChange={handleTownChange}
                            required
                            >
                                {Towns.map((town, key) => (
                                    <MenuItem key={key} value={town}>{town}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ borderRadius: '10px', boxShadow: 4, padding: "20px 20px 30px", mt: 3 }}>
                        <Typography sx={{fontWeight: "Bold !important"}} variant='h6'>Coordonnees du vendeur</Typography>
                        <TextField 
                            required
                            defaultValue={data.contact[0]}
                            name='phoneNumber'
                            sx={{mt: 2, minWidth: 222}} 
                            type="tel" size='small' id="outlined-basic" 
                            placeholder="Telephone" variant="outlined" 
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Smartphone color='primary' />
                                  </InputAdornment>
                                )
                              }}/> <br />
                        <TextField 
                        defaultValue={data.contact[1]}
                        sx={{mt: 2, minWidth: 222}} 
                        name='whatsappNumber'
                        type="tel" size='small' id="outlined-basic" 
                        placeholder="Whatsapp" variant="outlined" 
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <WhatsApp color='success' />
                              </InputAdornment>
                            )
                          }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Stack sx={{mt: 3, ...align}}>
                <Stack direction="row" spacing={1}>
                    <Button type='submit' variant='outlined' color='success'><Check /> Publier l'annonce</Button>
                    <Button onClick={handleClear} variant='contained' color='error'><Clear /> Annuler</Button>
                </Stack>
            </Stack>
        </form>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Oups avez-vous oublié d'ajouter une image?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Veuillez ajouter au moins une image pour publier votre annonce
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} autoFocus>
                ok
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}
