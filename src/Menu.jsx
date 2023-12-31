import { NavLink } from "react-router-dom";
import { useContext } from "react";
import notasContext from "./notasContext";
import style from "./style.css"

const Menu = () =>{
    const data = useContext(notasContext);
    const {userLogin,salirSesion,isLogged} = data;
    const {usuario} = userLogin;

    return(
        <>
            <nav className="navbar navbar-expand-lg bg-darkblue" data-bs-theme="dark" >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Sistema Notas</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/">Login</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/consultaruser">Usuarios</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/consultaralumnos">Alumnos</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/consultarmaterias">Materias</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/consultarvalores">Valores</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/consultarinasistencias">Inasistencias</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/consultartrimestres">Trimestres</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/consultargrado">Grados</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/gradosmaterias">Grados Materias</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/consultarseccion">Secciones</NavLink>
                    </li>
                </ul>
                </div>
                { isLogged &&(
                <>
                    <label><span  className="text-light fw-bold">User: {usuario}</span></label>
                    <button className="btn btn-primary ms-4" onClick={salirSesion} >Salir</button>
                </>
                )}
            </div>
            </nav>
        </>
    )
}

export default Menu;