import React from 'react';
import {Divider} from '@mui/material';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import Products from '../../components/Products/Products';
import {useTheme} from "@mui/material";
import Slider from '../../components/Slider/Slider';

export default function Annonces() {
  const theme = useTheme();
  const title = "Dernieres annonces au Cameroun";

  return (
    <div style={{overflow: "hidden"}}>
        <CategoryBar theme={theme} />
        <Divider theme={theme} />
        <Slider />
        <Divider theme={theme} />
        <Products title={title} theme={theme} /> 
    </div>
  )
}
