import { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import Login from "./Login";
import ConsultarUser from "./ConsultarUser";
import RutasProtegidas from "./RutasProtegidas";
import notasContext from "./notasContext";
import ConsultarAlumnos from "./ConsultarAlumnos";
import ConsultarMaterias from "./ConsultarMaterias";
import ConsultarValores from "./ConsultarValores";
import ConsultarInasistencias from "./ConsultarInasistencias";
import ConsultarTrimestres from "./ConsultarTrimestres";

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
                <Route path="/consultaralumnos" element={ <ConsultarAlumnos/> } />
                <Route path="/consultarmaterias" element={ <ConsultarMaterias/> } />
                <Route path="/consultarvalores" element={ <ConsultarValores/> } />
                <Route path="/consultarinasistencias" element={ <ConsultarInasistencias/> } />
                <Route path="/consultartrimestres" element={ <ConsultarTrimestres/> } />
            </Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default Rutas;

