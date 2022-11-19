import { makeStyles } from "@mui/styles";
import { primaryColor, textColor } from "../../params";

export default makeStyles((theme) => ({
    Container: {
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        padding: '10px 0px',
        overflow: "hidden !important",
        background: primaryColor
    },
    message: {
        fontFamily: '"Montez", "cursive"',
        color: textColor,
        fontSize: '1.5rem',
    }
}));