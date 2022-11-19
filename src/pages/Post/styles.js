import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    container: {
        padding: "20px 5% 80px"
    },
    label: {
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px dotted #000",
        borderRadius: "20px", 
        width: "100%",
        height: "100%",
        cursor: "pointer",
        fontSize: "large"
    },
    span: {
        fontWeight: "lighter",
        fontSize: "small",
        paddingTop: "0.5rem"
    },
    input: {
        display: "none"
    },
    images: {
        marginTop: "20px"
    },
    image: {
        height: "200px",
        width: "100%",
        position: "relative !important",
        cursor: "pointer",
        transition: "0.3s",
        '&:hover': {
            opacity: "0.7",
            '& $deleteBtn': {
                transition: "0.3s",
                right: "5%"
            }
        }
    },
    img: {
        height: "100%",
        width: "100%",
        objectFit: "cover !important"
    },
    deleteBtn: {
        position: "absolute !important",
        fontSize: "2rem !important",
        top: "5%",
        right: "-50%",
        color: "red !important",
        background: "#FFF !important",
    },
    grid: {
        overflow: "hidden"
    }
}));