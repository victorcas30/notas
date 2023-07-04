import { Navigate, Outlet } from "react-router-dom";

const RutasProtegidas = ({children,isLogged,redirectTo="/"}) =>{
    if(!isLogged){
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet/>;
 }
 
 export default RutasProtegidas;