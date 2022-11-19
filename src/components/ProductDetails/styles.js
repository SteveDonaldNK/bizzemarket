import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    Container: {
        marginBottom: "50px"
    },
    box: {
        width: "100%",
        height: "50vh",
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        cursor: "pointer"
    }, 
    mainImg: {
        height: "100%",
        width: "100%",
        objectFit: "cover",
        cursor: "pointer"
    },
    headerTitle: {
        fontWeight: "bold !important"
    }
}));