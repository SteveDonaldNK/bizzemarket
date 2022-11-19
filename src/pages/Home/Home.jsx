import React from 'react';
import Banner from "../../components/Banner/Banner"
import {useMediaQuery, useTheme} from "@mui/material";
import Tutorial from '../../components/Tutorial/Tutorial';
import Cta from '../../components/Cta/Cta';

export default function Home() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  let styling = {};
  isMatch && (styling = {textAlign: "center"});
  return (
      <div style={styling}>
          <Banner />
          <Tutorial />
          <Cta />
      </div>
  )
}
