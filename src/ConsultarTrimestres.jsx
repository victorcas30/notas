import { useContext, useEffect, useRef, useState } from "react";
import notasContext from "./notasContext";
import { getTrimestres, crearTrimestre, editarTrimestre} from "./getApi";
import ModalDeleteTrimestre from "./ModalDeleteTrimestre";
import ModalInsertTrimestre from "./ModalInsertTrimestre";
import Alerts from "./Alerts";
import { IconoDanger, IconoInfo, IconoSuccess, IconoText } from "./iconos";

const ConsultarTrimestres = () => {
    const data = useContext(notasContext);
    const { trimestres, setTrimestres, cambiosTrimestre, setCambiosTrimestre, guardado, setGuardado, editado, setEditado, eliminado, vacio, setVacio } = data;
    const txtTrimestre = useRef();
    const txtAnio = useRef();
    const [trimestreEditando, setTrimestreEditando] = useState(null);
    const [modalDeleteAbierto, setModalDeleteAbierto] = useState(false);
    const [modalInsertAbierto, setModalInsertAbierto] = useState(false);
    const [trimestreEliminar, setTrimestreEliminar] = useState({});

    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        getTrimestres(token).then((allTrimestres) => {
          const { trimestres } = allTrimestres;
          setTrimestres(trimestres);
        });
    }, []);

    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const {token} = userLogin;
        if(cambiosTrimestre){
            getTrimestres(token).then((allTrimestres) => {
                const { trimestres } = allTrimestres;
                setTrimestres(trimestres);
              });
              setCambiosTrimestre(false);
        }
    },[cambiosTrimestre]); 

    const agregarTrimestre = () => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        const nombreTrimestre = txtTrimestre.current.value.trim();
        const anioTrimestre = txtAnio.current.value.trim();

        if (nombreTrimestre !== "" && anioTrimestre !== "" ) {
          const trimestreData = { descripcion: nombreTrimestre, year: anioTrimestre };
          crearTrimestre(trimestreData, token).then((respuesta) => {
            console.log(JSON.stringify(respuesta));
          });
          setCambiosTrimestre(true);
          txtTrimestre.current.value = "";
          txtAnio.current.value = "";
          setGuardado(true);
            setTimeout(() => {
                setGuardado(false);
            }, 5000);
        } else {
          console.log("Por favor, llene todos los campos");
          setVacio(true);
          setTimeout(() => {
            setVacio(false);
        }, 5000);
        }
    };

    const editTrimestre = (id) => {
        setTrimestreEditando(id);
    };

    const updateTrimestreBtn = (idtrimestreEditado) => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        const trimestreEditado = trimestres.find((trimestre) => trimestre.idtrimestre === idtrimestreEditado);
        const {descripcion, year, idtrimestre} = trimestreEditado;
        const tri = {idtrimestre:idtrimestre,descripcion:descripcion,year:year,eliminado:"0"};
        console.log(tri)
            editarTrimestre(tri,token).then(respuesta=>{
                console.log(JSON.stringify(respuesta));
            });
        setTrimestreEditando(null);
        setEditado(true);
        setTimeout(() => {
            setEditado(false);
        }, 5000);
    };

    const abrirModalDelete = (trimestre) => {
        setTrimestreEliminar(trimestre);
        setModalDeleteAbierto(true);
    };
    
    const cerrarModalDelete = () => {
        setModalDeleteAbierto(false);
    };
    
    const abrirModalInsert = (trimestre) => {
        setTrimestreEliminar(trimestre);
        setModalInsertAbierto(true);
    };
    
    const cerrarModalInsert = () => {
        setModalInsertAbierto(false);
    };

    return(
        <>
        <ModalDeleteTrimestre isOpen={modalDeleteAbierto} onClose={cerrarModalDelete} trimestreEliminar={trimestreEliminar}  />
        <ModalInsertTrimestre isOpen={modalInsertAbierto} onClose={cerrarModalInsert} />
        <div className="container">
        {guardado &&  <Alerts mensaje="Trimestre registrado exitosamente" tipo="success" icono={<IconoSuccess/>} />}
        {editado &&  <Alerts mensaje="Trimestre editado exitosamente" tipo="info" icono={<IconoInfo/>}  />}
        {eliminado &&  <Alerts mensaje="Trimestre eliminado exitosamente" tipo="danger" icono={<IconoDanger/>}  /> }
        {vacio && <Alerts mensaje="Por favor, ingresa un nombre de Trimestre" tipo="danger" icono={<IconoText/>}  /> }
            <h1 className="display-4">Crear Trimestre</h1>
            <hr />
                <button type="button" className="btn btn-primary" style={{ marginLeft: "auto" }}  onClick={abrirModalInsert} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                    <path d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"/>
                    </svg>
                    &nbsp;Trimestre Anual
                </button>
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
                        <input type="text" className="form-control w-50" name="trimestre" ref={txtTrimestre} maxLength="25" required  />
                    </td>
                    <td>
                        <button type="button" className="btn btn-primary" style={{ marginLeft: "auto" }}  onClick={agregarTrimestre} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                            <path d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"/>
                        </svg>
                            &nbsp;Agregar Trimestre
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5>Año:</h5>
                    </td>
                    <td>
                        <input type="text" className="form-control w-50" name="year" ref={txtAnio} maxLength="4" required  />
                    </td>
                    <td></td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className="container">
            <h1 className="display-4">Trimestre</h1>
            <hr />
            <table className="table table-secondary table-hover">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Trimestre</th>
                    <th>Año</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trimestres.map(tri => {
                            const { idtrimestre, descripcion, year } = tri;
                            return(
                                <tr key={idtrimestre}>
                                    <td>{idtrimestre}</td>
                                    {
                                        trimestreEditando === idtrimestre ? (
                                            <>
                                            <td>
                                                <input type="text" className="form-control w-50" name="descripcion" value={descripcion}
                                                onChange={(e) =>
                                                    setTrimestres((trimestres) =>
                                                    trimestres.map((tri) =>
                                                        tri.idtrimestre === idtrimestre ? { ...tri, descripcion: e.target.value } : tri
                                                    )
                                                    )
                                                }
                                                />
                                            </td>
                                            
                                            <td>
                                                <input type="text" className="form-control w-50" name="year" value={year} maxLength="4"
                                                onChange={(e) =>
                                                    setTrimestres((trimestres) =>
                                                    trimestres.map((tri) =>
                                                        tri.idtrimestre === idtrimestre ? { ...tri, year: e.target.value } : tri
                                                    )
                                                    )
                                                }
                                                />
                                            </td>
                                            </>
                                        ) : (
                                            <>
                                            <td>{descripcion}</td>
                                            <td>{year}</td>
                                            </>
                                        )
                                        }
                                    {
                                        trimestreEditando === idtrimestre ? (
                                            <td>
                                                <button className="btn btn-success" onClick={() => updateTrimestreBtn(idtrimestre)}  >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                                    </svg>
                                                </button>

                                                <button type="button" className="btn btn-danger ms-4" onClick={() => abrirModalDelete(idtrimestre)} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                                                    </svg>
                                                </button>
                                            </td>
                                        ) : (
                                        <td>
                                            <button type="button" className="btn btn-secondary" onClick={() => editTrimestre(idtrimestre)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>
                                            </button>

                                            <button type="button" className="btn btn-danger ms-4" onClick={() => abrirModalDelete(idtrimestre)} >
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

export default ConsultarTrimestres;