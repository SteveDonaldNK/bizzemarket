import { makeStyles } from "@mui/styles";
import { primaryColor, secondaryColor } from "../../params";

export default makeStyles((theme) => ({
    container: {
        backgroundColor: primaryColor
    },
    box: {
        height: "40vh",
        width: "100%",
    },
    boxImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    avatar: {
        position: "absolute",
        left: "50%",
        top: "0%",
        transform: "translate(-50%, -65%)",
    },
    span: {
        fontWeight: "bold !important",
        fontSize: "2rem !important",
        color: "GrayText"
    },
    emptyBox: {
        width: "200px"  // change to height: "300px" for devices larger than md.
    }
}));