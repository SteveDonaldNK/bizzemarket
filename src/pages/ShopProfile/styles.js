import { makeStyles } from "@mui/styles";
import storeBanner from "../../assets/storeBanner.jpg"

export default makeStyles((theme) => ({
    container: {
    },
    box: {
        height: "40vh",
        widht: "100%",
        backgroundImage: `url(${storeBanner})`,
        backgroundPosition: "center",
        backgroundSize: 'cover',
        postion: "relative"
    },
    avatar: {
        position: "absolute",
        left: "50%",
        top: "100%",
        transform: "translate(-50%, -50%)",
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