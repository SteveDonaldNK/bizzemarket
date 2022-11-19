import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    container: {
        width: "95%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Circle: {
        width: "100%",
    },
    text: {
        fontWeight: "700 !important",
    },
    span: {
        color: "#07BDFC"
    },
    img: {
        width: "80%",
        position: "absolute",
        bottom: "10%",
        right: "12%",
        zIndex: "100"
    }
}));