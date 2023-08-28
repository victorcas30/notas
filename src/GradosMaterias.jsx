import { useContext, useEffect, useState } from "react";
import notasContext from "./notasContext";
import { crearGradoMaterias, getGrados, getMaterias, getGradoMaterias } from "./getApi";
import Alerts from "./Alerts";
import { IconoDanger, IconoInfo, IconoSuccess, IconoX } from "./iconos";

const GradosMaterias = () => {
  const data = useContext(notasContext);
  const { grados, setGrados, materias, setMaterias, guardado, editado, vacio, setVacio, gradoMaterias, setGradoMaterias, cambiosGradoMateria, setCambiosGradoMateria, setGuardado } = data;
  const [gradoSeleccionado, setGradoSeleccionado] = useState('');
  const [materiaSelect, setMateriaSelect] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

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
    const { token } = userLogin;
    getMaterias(token).then((allMaterias) => {
      const { materias } = allMaterias;
      setMaterias(materias);
    });
  }, []);

  useEffect(() => {
    if (!gradoSeleccionado) {
      console.log("Debe seleccionar un grado");
    }
  
    const userLogueado = localStorage.getItem("userLogueadoNotas");
    const userLogin = JSON.parse(userLogueado);
    const { token } = userLogin;
    
    getGradoMaterias(token, gradoSeleccionado).then((allGradoMaterias) => {
      console.log(allGradoMaterias);
      const { materias } = allGradoMaterias;
      setGradoMaterias(materias);
    });
  }, [gradoSeleccionado]);

  useEffect(() => {
    const initialCheckedItems = {};
    gradoMaterias.forEach((mat) => {
      const { idmateria, activo } = mat;
      initialCheckedItems[`flexSwitchCheckDefault-${idmateria}`] = activo === 'true';
    });
    setCheckedItems(initialCheckedItems);
  }, [gradoMaterias]);
  
  const selectGrado = e => {
    setGradoSeleccionado(e.target.value);
    console.log(gradoSeleccionado);
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: checked,
    }));
  };

  const handleSelectAll = () => {
    const allChecked = Object.values(checkedItems).every((item) => item);

    const newCheckedItems = {};
    materias.forEach((mat) => {
      newCheckedItems[`flexSwitchCheckDefault-${mat.idmateria}`] = !allChecked;
    });

    setCheckedItems(newCheckedItems);
  };

  const crearGradoMateriasBtn = () => {
    //Materia
    const materiasSeleccionadas = [];
    for (const id in checkedItems) {
        if (checkedItems[id]) {
            const idmateria = parseInt(id.replace("flexSwitchCheckDefault-", ""));
            materiasSeleccionadas.push(idmateria);
        }
    }
    if (!gradoSeleccionado || materiasSeleccionadas.length === 0) {
        console.log("Debe seleccionar un grado y materias.");
            setVacio(true);
                setTimeout(() => {
                setVacio(false);
            }, 5000);
        return;
    }
    setMateriaSelect(materiasSeleccionadas)
    const dataGradoMateria = { idgrado: gradoSeleccionado, materias: materiasSeleccionadas };
    console.log(dataGradoMateria);
    const userLogueado = localStorage.getItem("userLogueadoNotas");
    const userLogin = JSON.parse(userLogueado);
    const { token } = userLogin;
    crearGradoMaterias(dataGradoMateria, token).then((respuesta) => {
      console.log(JSON.stringify(respuesta));
      setGuardado(true);
                setTimeout(() => {
                setGuardado(false);
            }, 5000);
    });
  };

  return (
    <>
      <div className="container">
        {guardado && <Alerts mensaje="Materias registradas exitosamente" tipo="success" icono={<IconoSuccess />} />}
        {editado && <Alerts mensaje="Usuario editado exitosamente" tipo="info" icono={<IconoInfo />} />}
        {vacio && <Alerts mensaje="Debe seleccionar un grado y materias" tipo="danger" icono={<IconoX/>}  /> }
      </div>
      <div className="container">
        <h1 className="display-4">Asignar Materias a Grado</h1>
        <hr />
        <h3 className="display-6">Seleccionar Grado</h3>

        <div className="row row-cols-3 g-3">
            {grados.map((grado) => (
                <div key={grado.idgrado} className="col">
                <div className="d-grid gap-2">
                    <input
                    type="radio"
                    className="btn-check"
                    name="options-outlined"
                    id={`grado-${grado.idgrado}`}
                    value={grado.idgrado}
                    autoComplete="off"
                    onChange={selectGrado}
                    />
                    <label className="btn btn-outline-primary btn-block" htmlFor={`grado-${grado.idgrado}`}>
                    {grado.descripcion}
                    </label>
                </div>
                </div>
            ))}
        </div>

        <br />
        <br />

        <h3 className="display-6">Seleccionar las Materiaas</h3>
        <button className="btn btn-secondary" onClick={handleSelectAll}>Seleccionar Todos</button>
        <br />
        <br />
        <div className="form-check form-switch">
        {
          gradoMaterias.map((mat) => {
            const { idmateria, materia } = mat;
            const isChecked = checkedItems[`flexSwitchCheckDefault-${idmateria}`] || false;

            return (
              <div key={idmateria}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheckDefault-${idmateria}`}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={`flexSwitchCheckDefault-${idmateria}`}>
                  {materia}
                </label>
              </div>
            );
          })
        }
        </div>
        <br />
        <button className="btn btn-primary" style={{ backgroundColor: '#00477A' }} onClick={crearGradoMateriasBtn}>Guardar Materias</button>
      </div>
    </>
  );
};

export default GradosMaterias;
