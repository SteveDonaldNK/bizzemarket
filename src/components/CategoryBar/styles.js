import { makeStyles } from "@mui/styles";
import { secondaryColor } from "../../params";

export default makeStyles((theme) => ({
    btnIcon: {
        fontSize: "2rem !important",
        backgroundColor: "ButtonFace",
        padding: "10px",
        borderRadius: "50%",
    }, 
    btn: {
        padding: "0 !important",
        flexDirection: "column",
        '&:hover': {
            backgroundColor: "transparent",
            '& $btnIcon': {
                backgroundColor: secondaryColor,
                transition: "0.3s ease-in-out",
                color: "#FFF"
            }
        }
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        gap: "5px",
        padding: "15px 5%",
        bgcolor: 'background.paper', 
        height: "min-content"
    }
}));