import { Box } from "@mui/system";
import { useContext } from "react"
import { Outlet } from "react-router-dom";
import { context } from "./pages/Context"
import Login from "./pages/Login/Login";

const useAuth = () => {
    const ctx = useContext(context);

    return ctx.connected;
}

export default function ProtectedRoutes() {
    const isAuth = useAuth();
    var component;

    if (isAuth === true) {
        component = <Outlet /> 
    } else if (isAuth === false) {
       component = <Login />;
    } else {
        component = <Box sx={{height: "100vh"}} />
    }

  return component
    
}
