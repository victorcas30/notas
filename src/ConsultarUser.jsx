import { useContext, useEffect, useState } from "react";
import notasContext from "./notasContext";
import { getUsuarios } from "./getApi";
import ModalUser from "./ModalUser";

const ConsultarUser = () => {

    const data = useContext(notasContext);
    const {users, setUsers, isEdit, setIsEdit, user, setUser, cambiosUser, setCambiosUser } = data;
    const [modalUserAbierto, setModalUserAbierto] = useState(false);
    const [userModal, setUserModal] = useState({});
    
    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const {token} = userLogin;
        getUsuarios(token).then(usuarios=>{
            const {users} = usuarios;
            setUsers(users);
        });
    },[]);

    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const {token} = userLogin;
        if(cambiosUser){
            getUsuarios(token).then(usuarios=>{
                const {users} = usuarios;
                setUsers(users);
            });
            setCambiosUser(false);
        }
    },[cambiosUser]);

    const abrirModalUser = () => {
        setModalUserAbierto(true);
      };
      
      const cerrarModalUser = () => {
        setModalUserAbierto(false);
      };

    const editarUser = id => {
        setIsEdit(true);
        setModalUserAbierto(true);
        const userEditar = users.find(user => user.idusuario === id);
        setUser({});
        setUserModal(userEditar);
    }

    return(
        <>
        <ModalUser isOpen={modalUserAbierto} onClose={cerrarModalUser} userModal={userModal}  />
        <div className="container">
        <h1 className="display-4">Consultar User</h1>
        <hr/>
        <button type="button" className="btn btn-primary" style={{ marginLeft: "auto" }}  onClick={abrirModalUser}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"></path>
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
                    <th>Usuario</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
            users.map(user => {
                const { idusuario, nombre, apellido, usuario } = user;
                return (
                <tr key={idusuario}>
                    <td>{idusuario}</td>
                    <td>{nombre}</td>
                    <td>{apellido}</td>
                    <td>{usuario}</td>
                    <td>
                    <button type="button" className="btn btn-secondary" onClick={() => editarUser(idusuario)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </button>
                    </td>
                </tr>
                );
            })
        }
            </tbody>
        </table>

        </div>
        </>
    )
}

export default ConsultarUser;