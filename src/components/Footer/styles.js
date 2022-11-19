import { makeStyles } from "@mui/styles";
import { primaryColor } from "../../params";

export default makeStyles((theme) => ({
    Container: {
        padding: "50px 5% 20px",
        background: "#08192B",
        color: primaryColor
    },
    Links: {
        listStyle: "none",
        textDecoration: "none"
    },
    input: {
        padding: "5px !important",
        background: "#FFF"
    }
}));