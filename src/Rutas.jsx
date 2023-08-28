import { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import Login from "./Login";
import ConsultarUser from "./components/user/ConsultarUser";
import RutasProtegidas from "./RutasProtegidas";
import notasContext from "./notasContext";
import ConsultarAlumnos from "./components/alumnos/ConsultarAlumnos";
import ConsultarMaterias from "./components/materias/ConsultarMaterias";
import ConsultarValores from "./components/valores/ConsultarValores";
import ConsultarInasistencias from "./components/inasistencias/ConsultarInasistencias";
import ConsultarTrimestres from "./components/trimestres/ConsultarTrimestres";
import ConsultarGrado from "./components/grados/ConsultarGrado";
import GradosMaterias from "./components/gradosmaterias/GradosMaterias";
import ConsultarSeccion from "./components/secciones/ConsultarSeccion";

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
                <Route path="/consultargrado" element={ <ConsultarGrado/> } />
                <Route path="/gradosmaterias" element={ <GradosMaterias/> } />
                <Route path="/consultarseccion" element={ <ConsultarSeccion/> } />
            </Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default Rutas;

