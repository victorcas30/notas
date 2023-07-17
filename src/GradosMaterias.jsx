import { useContext, useEffect, useState } from "react";
import notasContext from "./notasContext";
import { crearGradoMaterias, getGrados, getMaterias } from "./getApi";
import Alerts from "./Alerts";
import { IconoDanger, IconoInfo, IconoSuccess } from "./iconos";

const GradosMaterias = () => {
  const data = useContext(notasContext);
  const { grados, setGrados, materias, setMaterias, guardado, editado } = data;
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

  const selectOnChange = e => {
    setGradoSeleccionado(e.target.value);
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
    setMateriaSelect(materiasSeleccionadas)
    console.log(materiasSeleccionadas);

    const dataGradoMateria = { idgrado: gradoSeleccionado, materias: materiasSeleccionadas };
    console.log(dataGradoMateria);
    const userLogueado = localStorage.getItem("userLogueadoNotas");
    const userLogin = JSON.parse(userLogueado);
    const { token } = userLogin;
    crearGradoMaterias(dataGradoMateria, token).then((respuesta) => {
      console.log(JSON.stringify(respuesta));
    });
  };

  return (
    <>
      <div className="container">
        {guardado && <Alerts mensaje="Usuario registrado exitosamente" tipo="success" icono={<IconoSuccess />} />}
        {editado && <Alerts mensaje="Usuario editado exitosamente" tipo="info" icono={<IconoInfo />} />}
      </div>
      <div className="container">
        <h1 className="display-4">Asignar Materias a Grado</h1>
        <hr />
        <h3 className="display-6">Seleccionar Grado</h3>
        <select className="form-select" aria-label="Default select example" onChange={selectOnChange}>
          <option defaultValue>Seleccionar Grado</option>
          {
            grados.map(grado => (
              <option key={grado.idgrado} value={grado.idgrado}>{grado.descripcion}</option>
            ))
          }
        </select>
        <br />
        <br />
        <h3 className="display-6">Seleccionar las Materias</h3>
        <button className="btn btn-secondary" onClick={handleSelectAll}>Seleccionar Todos</button>
        <br />
        <br />
        <div className="form-check form-switch">
          {
            materias.map((mat) => {
              const { idmateria, materia } = mat;
              const isChecked = checkedItems[`flexSwitchCheckDefault-${idmateria}`] || false;

              return (
                <div key={idmateria}>
                  <input className="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault-${idmateria}`} checked={isChecked} onChange={handleCheckboxChange} />
                  <label className="form-check-label" htmlFor={`flexSwitchCheckDefault-${idmateria}`}>{materia}</label>
                </div>
              );
            })
          }
        </div>
        <br />
        <button className="btn btn-primary" onClick={crearGradoMateriasBtn}>Obtener Materias Seleccionadas</button>
      </div>
    </>
  );
};

export default GradosMaterias;
