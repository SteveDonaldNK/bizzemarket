import { makeStyles } from "@mui/styles";
import { primaryColor, textColor } from "../../params";

export default makeStyles((theme) => ({
    toolbar: {
        backgroundColor: primaryColor,
        color: textColor,
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    },
    searchIcon: {
        color: "#AAA"
    },
    searchBar: {
        width: "400px",
        height: "40px",
        borderRadius: "30px !important",
        padding: "0 !important"
    },
    logo: {
        height: "50px",
        zIndex: "1000 !important"
    },
    linkContainer: {
        display: "flex",
        alignItems: "center",
        gap: "80px"
    },
    links: {
        textDecoration: "none !important",
        transition: "0.4s ease-in-out",
        '&:hover': {
            color: "GrayText"
        }
    }
}));