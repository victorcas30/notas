import { useContext, useEffect, useRef, useState } from "react";
import notasContext from "../../notasContext";
import { crearGrado, getGrados, editarGrado } from "../../getApi";
import ModalDeleteGrados from "./ModalDeleteGrados";
import Alerts from "../../Alerts";
import { IconoSuccess, IconoInfo, IconoDanger, IconoText } from "../../iconos";

const ConsultarGrado = () => {
    const data = useContext(notasContext);
    const { grados, setGrados, cambiosGrado,setCambiosGrado, guardado, setGuardado, editado, setEditado, eliminado, setEliminado, vacio, setVacio } = data;
    const txtGrado = useRef();
    const [gradoEditando, setGradoEditando] = useState(null);
    const [modalDeleteAbierto, setModalDeleteAbierto] = useState(false);
    const [gradoEliminar, setGradoEliminar] = useState({});

    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        getGrados(token).then((allGrados) => {
            const { grados } = allGrados;
          setGrados(grados);
        });
    }, []);

    useEffect(() => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const {token} = userLogin;
        if(cambiosGrado){
            getGrados(token).then((allGrados) => {
                const { grados } = allGrados;
              setGrados(grados);
            });
            setCambiosGrado(false);
        }
    },[cambiosGrado]); 
    
    const agregarGrado = () => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        const nombreGrado = txtGrado.current.value.trim();
      
        if (nombreGrado !== "") {
          const gradoData = { descripcion: nombreGrado };
          
          crearGrado(gradoData, token).then((respuesta) => {
            console.log(JSON.stringify(respuesta));
          });
          setCambiosGrado(true)
          txtGrado.current.value = "";
          setGuardado(true);
          setTimeout(() => {
              setGuardado(false);
          }, 5000);
        } else {
          console.log("Por favor, ingresa un nombre de Grado");
          setVacio(true);
          setTimeout(() => {
            setVacio(false);
        }, 5000);
        }
    };

    const editGrado = (id) => {
        setGradoEditando(id);
    };

    const updateGradoBtn = (idgradoEditado) => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        const gradoEditando = grados.find((grado) => grado.idgrado === idgradoEditado);
        const {descripcion, idgrado} = gradoEditando;
        const gra = {idgrado:idgrado,descripcion:descripcion,eliminado:"0"};
            editarGrado(gra,token).then(respuesta=>{
                console.log(JSON.stringify(respuesta));
            });
        setGradoEditando(null);
        setEditado(true);
        setTimeout(() => {
            setEditado(false);
        }, 5000);
    };

    const abrirModalDelete = (inasistencia) => {
        setGradoEliminar(inasistencia);
        setModalDeleteAbierto(true);
    };
    
    const cerrarModalDelete = () => {
        setModalDeleteAbierto(false);
    };


    return(
        <>
        <div className="container">
        <ModalDeleteGrados isOpen={modalDeleteAbierto} onClose={cerrarModalDelete} gradoEliminar={gradoEliminar}  />
        {guardado &&  <Alerts mensaje="Grado registrado exitosamente" tipo="success" icono={<IconoSuccess/>} />}
        {editado &&  <Alerts mensaje="Grado editado exitosamente" tipo="info" icono={<IconoInfo/>}  />}
        {eliminado &&  <Alerts mensaje="Grado eliminado exitosamente" tipo="danger" icono={<IconoDanger/>}  /> }
        {vacio && <Alerts mensaje="Por favor, ingresa un nombre de Grado" tipo="danger" icono={<IconoText/>}  /> }
            <h1 className="display-4">Crear Grado</h1>
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
                    <input type="text" className="form-control w-50" name="descripcion" ref={txtGrado} maxLength="25" required  />
                </td>
                <td>
                    <button type="button" className="btn btn-primary" style={{ marginLeft: "auto" }}  onClick={agregarGrado} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
                    </svg>
                        &nbsp;Agregar Grado
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>

        <div className="container">
            <h1 className="display-4">Grados</h1>
            <hr />
            <table className="table table-secondary table-hover">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Grados</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        grados.map(gra => {
                            const { idgrado, descripcion } = gra;
                            return(
                                <tr key={idgrado}>
                                    <td>{idgrado}</td>
                                    {
                                        gradoEditando === idgrado ? (
                                            <td>
                                                <input type="text" className="form-control w-50" name="descripcion" value={descripcion}
                                                onChange={(e) =>
                                                    setGrados((grados) =>
                                                    grados.map((gra) =>
                                                    gra.idgrado === idgrado ? { ...gra, descripcion: e.target.value } : gra
                                                    )
                                                    )
                                                }
                                                />
                                            </td>
                                        ) : (
                                            <td>{descripcion}</td>
                                        )
                                        }
                                    {
                                        gradoEditando === idgrado ? (
                                            <td>
                                                <button className="btn btn-success" onClick={() => updateGradoBtn(idgrado)}  >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                                    </svg>
                                                </button>

                                                <button type="button" className="btn btn-danger ms-4" onClick={() => abrirModalDelete(idgrado)} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                                                    </svg>
                                                </button>
                                            </td>
                                        ) : (
                                        <td>
                                            <button type="button" className="btn btn-secondary" onClick={() => editGrado(idgrado)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>
                                            </button>

                                            <button type="button" className="btn btn-danger ms-4" onClick={() => abrirModalDelete(idgrado)} >
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

export default ConsultarGrado;