import { useContext, useEffect, useRef, useState } from "react";
import notasContext from "./notasContext";
import { crearMateria, getMaterias, editarMat } from "./getApi";
import ModalDeleteMateria from "./ModalDeleteMaterias";

const ConsultarMaterias = () => {
    const data = useContext(notasContext);
    const { materias, setMaterias, cambiosMateria, setCambiosMateria } = data;
    const txtMateria = useRef();
    const [materiaEditando, setMateriaEditando] = useState(null);
    const [modalDeleteAbierto, setModalDeleteAbierto] = useState(false);
    const [materiaEliminar, setMateriaEliminar] = useState({});

    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        getMaterias(token).then((allMaterias) => {
          const { materias } = allMaterias;
          setMaterias(materias);
        });
      }, []);

    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const {token} = userLogin;
        if(cambiosMateria){
            getMaterias(token).then(allMaterias=>{
                const { materias } = allMaterias;
                setMaterias(materias);
            });
            setCambiosMateria(false);
        }
    },[cambiosMateria]);  

    const agregarMateria = () => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        const nombreMateria = txtMateria.current.value.trim();
      
        if (nombreMateria !== "") {
          const materiaData = { materia: nombreMateria };
          
          crearMateria(materiaData, token).then((respuesta) => {
            console.log(JSON.stringify(respuesta));
          });
          setCambiosMateria(true)
          txtMateria.current.value = "";
        } else {
          console.log("Por favor, ingresa un nombre de materia");
        }
      };

      const editMateria = (id) => {
        setMateriaEditando(id);
      };
    
    const updateMateriaBtn = (idmateriaEditado) => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        const materiaEditado = materias.find((materia) => materia.idmateria === idmateriaEditado);
        const {materia, idmateria} = materiaEditado;
        const mat = {idmateria:idmateria,materia:materia,eliminado:"0"};
        console.log(mat)
            editarMat(mat,token).then(respuesta=>{
                console.log(JSON.stringify(respuesta));
            });
        setMateriaEditando(null);
    };

    const abrirModalDelete = (materia) => {
        setMateriaEliminar(materia);
        setModalDeleteAbierto(true);
    };
    
    const cerrarModalDelete = () => {
        setModalDeleteAbierto(false);
    };

    return(
        <>
        <ModalDeleteMateria isOpen={modalDeleteAbierto} onClose={cerrarModalDelete} materiaEliminar={materiaEliminar}  />
        <div className="container">
            <h1 className="display-4">Crear Materia</h1>
            <hr />
            <table className="table table-light table-hover">
            <thead>
                <tr>
                <th></th>
                <th></th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                    <h5>Nombre:</h5>
                </td>
                <td>
                    <input type="text" className="form-control w-50" name="materia" ref={txtMateria} maxLength="25" required  />
                </td>
                <td>
                    <button type="button" className="btn btn-primary" style={{ marginLeft: "auto" }}  onClick={agregarMateria} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-plus" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                        </svg>
                        &nbsp;Agregar Materia
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className="container">
            <h1 className="display-4">Materias</h1>
            <hr />
            <table className="table table-secondary table-hover">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Materia</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        materias.map(mat => {
                            const { idmateria, materia } = mat;
                            return(
                                <tr key={idmateria}>
                                    <td>{idmateria}</td>
                                    {
                                        materiaEditando === idmateria ? (
                                            <td>
                                                <input type="text" className="form-control w-50" name="materia" value={materia}
                                                onChange={(e) =>
                                                    setMaterias((materias) =>
                                                    materias.map((mat) =>
                                                        mat.idmateria === idmateria ? { ...mat, materia: e.target.value } : mat
                                                    )
                                                    )
                                                }
                                                />
                                            </td>
                                        ) : (
                                            <td>{materia}</td>
                                        )
                                    }
                                    {
                                        materiaEditando === idmateria ? (
                                            <td>
                                                <button className="btn btn-success" onClick={() => updateMateriaBtn(idmateria)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                                    </svg>
                                                </button>

                                                <button type="button" className="btn btn-danger ms-4" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                                                    </svg>
                                                </button>
                                            </td>
                                        ) : (
                                        <td>
                                            <button type="button" className="btn btn-secondary" onClick={() => editMateria(idmateria)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>
                                            </button>

                                            <button type="button" className="btn btn-danger ms-4" onClick={() => abrirModalDelete(idmateria)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                                                </svg>
                                            </button>
                                        </td>
                                    )
                                    }
                                    
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

export default ConsultarMaterias;