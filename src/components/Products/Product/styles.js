import { makeStyles } from "@mui/styles";
import { primaryColor, secondaryColor } from "../../../params";

export default makeStyles((theme) => ({
    Card: {
        position: "relative",
        '&:hover': {
            '& $icon': {
                right: "5% !important"
            },
            '& $icon2': {
                right: "5% !important"
            },
            '& $icon3': {
                left: "5% !important"
            },

            '& $btn': {
                background: `${secondaryColor} !important`,
                color: primaryColor
            }
        },
        cursor: "pointer"
    },
    btn: {
        transition: "0.4s ease-in-out !important"
    },
    icon: {
        position: "absolute !important",
        top: "5%",
        right: "-100%",
        background: `${primaryColor} !important`,
        border: "1px solid #E8E8E8 !important",
        transition: "0.4s ease-in-out !important"
    },
    icon2: {
        position: "absolute !important",
        top: "20%",
        right: "-100%",
        background: `${primaryColor} !important`,
        border: "1px solid #E8E8E8 !important",
        transition: "0.4s ease-in-out !important"
    },
    icon3: {
        position: "absolute !important",
        top: "5%",
        left: "-100%",
        background: `${primaryColor} !important`,
        border: "1px solid #E8E8E8 !important",
        transition: "0.4s ease-in-out !important",
        color: "red"
    },
    Box: {
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}));