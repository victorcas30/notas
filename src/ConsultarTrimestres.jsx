import { useContext, useEffect, useRef, useState } from "react";
import notasContext from "./notasContext";
import { getTrimestres, crearTrimestre, editarTrimestre} from "./getApi";
import ModalDeleteTrimestre from "./ModalDeleteTrimestre";

const ConsultarTrimestres = () => {
    const data = useContext(notasContext);
    const { trimestres, setTrimestres, cambiosTrimestre, setCambiosTrimestre } = data;
    const txtTrimestre = useRef();
    const txtAnio = useRef();
    const [trimestreEditando, setTrimestreEditando] = useState(null);
    const [modalDeleteAbierto, setModalDeleteAbierto] = useState(false);
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
        } else {
          console.log("Por favor, llene todos los campos");
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
    };

    const abrirModalDelete = (trimestre) => {
        setTrimestreEliminar(trimestre);
        setModalDeleteAbierto(true);
    };
    
    const cerrarModalDelete = () => {
        setModalDeleteAbierto(false);
    };

    return(
        <>
        <ModalDeleteTrimestre isOpen={modalDeleteAbierto} onClose={cerrarModalDelete} trimestreEliminar={trimestreEliminar}  />
        <div className="container">
            <h1 className="display-4">Crear Trimestre</h1>
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
                        <input type="text" className="form-control w-50" name="trimestre" ref={txtTrimestre} maxLength="25" required  />
                    </td>
                    <td>
                        <button type="button" className="btn btn-primary" style={{ marginLeft: "auto" }}  onClick={agregarTrimestre} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.058.501a.501.501 0 0 0-.5-.501h-2.98c-.276 0-.5.225-.5.501A.499.499 0 0 1 5.582 1a.497.497 0 0 0-.497.497V2a.5.5 0 0 0 .5.5h4.968a.5.5 0 0 0 .5-.5v-.503A.497.497 0 0 0 10.555 1a.499.499 0 0 1-.497-.499Z"/>
                        <path fillRule="evenodd" d="M4.174 1h-.57a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5h-.642c.055.156.085.325.085.5V2c0 .828-.668 1.5-1.492 1.5H5.581A1.496 1.496 0 0 1 4.09 2v-.5c0-.175.03-.344.085-.5Zm3.894 5.482c1.656-1.673 5.795 1.254 0 5.018-5.795-3.764-1.656-6.69 0-5.018Z"/>
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