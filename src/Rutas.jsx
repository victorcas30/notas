import { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import Login from "./Login";
import ConsultarUser from "./ConsultarUser";
import RutasProtegidas from "./RutasProtegidas";
import notasContext from "./notasContext";

const Rutas = () => {
    const data = useContext(notasContext);
    const {isLogged} = data;

    return(
        <>
        <BrowserRouter>
        {isLogged &&  <Menu/>}
        <Routes>
            <Route path="/" element={ <Login/> } />
            <Route element={ <RutasProtegidas isLogged={isLogged} /> }>
                <Route path="/consultaruser" element={ <ConsultarUser/> } />
            </Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default Rutas;

