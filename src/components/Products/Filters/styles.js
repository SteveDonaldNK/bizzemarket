import { makeStyles } from '@mui/styles';
import {secondaryColor} from '../../../params'

export default makeStyles((theme) => ({
  input: {
    '& input[type=number]': {
        '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    },
    zIndex: "0"
  },
  searchBar: {
      borderRadius: "30px !important",
      padding: "0 !important"
  },
  town: {
    padding: "20px 20px 0",
    cursor: "pointer"
  },
  accordion: {
    width: "100%",
    '&:before': {
      display: 'none',
    }
  },
  expanded: {},
  content: {
    '&$expanded': {
      margin: "0 !important"
    }
  },
  link: {
    display: "block",
    textDecoration: "none",
    color: "#000",
    margin: "5px 0 5px 10px !important",
    transition: "0.3s",
    "&:hover": {
      color: `${secondaryColor} !important`
    }
  }
}));