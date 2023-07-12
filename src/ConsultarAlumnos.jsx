import { useContext, useEffect, useState } from "react";
import notasContext from "./notasContext";
import { getAlumnos } from "./getApi";
import ModalAlumnos from "./ModalAlumnos";
import ModalDelete from "./ModalDeleteAlumno";

const ConsultarAlumnos = () => {
    const data = useContext(notasContext);
    const {alumnos, setAlumnos, isEdit, setIsEdit, cambiosAlumno, setCambiosAlumno, setAlumno } = data;
    const [modalAbierto, setModalAbierto] = useState(false);
    const [alumnoModal, setAlumnoModal] = useState({});
    const [modalDeleteAbierto, setModalDeleteAbierto] = useState(false);
    const [alumnoEliminar, setAlumnoEliminar] = useState({});


    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const {token} = userLogin;
        getAlumnos(token).then(alum=>{
            const {alumnos} = alum;
            setAlumnos(alumnos);
        });
    },[]);

    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const {token} = userLogin;
        if(cambiosAlumno){
            getAlumnos(token).then(alum=>{
                const {alumnos} = alum;
                setAlumnos(alumnos);
            });
            setCambiosAlumno(false);
        }
    },[cambiosAlumno]);

    const abrirModalAlumno = () => {
        setModalAbierto(true);
    };
      
    const cerrarModalAlumno = () => {
        setModalAbierto(false);
    };
    
    const editarAlumno = id => {
        setIsEdit(true);
        setModalAbierto(true);
        const alumnoEditar = alumnos.find(alumno => alumno.idalumno === id);
        setAlumno({});
        setAlumnoModal(alumnoEditar);
    }

    const abrirModalDelete = (alumno) => {
        setAlumnoEliminar(alumno);
        setModalDeleteAbierto(true);
    };
    
    const cerrarModalDelete = () => {
        setModalDeleteAbierto(false);
    };

    return(
        <>
        <ModalDelete isOpen={modalDeleteAbierto} onClose={cerrarModalDelete} alumnoEliminar={alumnoEliminar}  />
        <ModalAlumnos isOpen={modalAbierto} onClose={cerrarModalAlumno} alumnoModal={alumnoModal}  />
        <div className="container">
        <h1 className="display-4">Consultar Alumnos</h1>
        <hr/>
        <button type="button" className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={abrirModalAlumno}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
            </svg>
            &nbsp;Agregar
        </button>
        <br />
        <br />
        <table className="table table-secondary table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Celular</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                alumnos.map(alumno => {
                    const {idalumno, nombres, apellidos, celular, email, eliminado} = alumno
                    return(
                    <tr key={idalumno}>
                        <td> {idalumno} </td>
                        <td> {nombres} </td>
                        <td> {apellidos} </td>
                        <td> {celular} </td>
                        <td> {email} </td>
                        <td>
                        <button type="button" className="btn btn-secondary" onClick={() => editarAlumno(idalumno)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                        </button>
                        <button type="button" className="btn btn-danger ms-4" onClick={() => abrirModalDelete(idalumno)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                            </svg>
                        </button>
                        </td>
                    </tr>
                    )
                })
            }
            </tbody>
        </table>

        </div>
        
        </>
    )
}

export default ConsultarAlumnos;