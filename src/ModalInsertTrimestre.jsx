import "./ModalDelete.css";
import { useContext, useEffect, useState } from "react";
import notasContext from "./notasContext";
import { getTrimestres } from "./getApi";

const ModalInsertTrimestre = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const data = useContext(notasContext);
  const {crearTrimestreAnual,trimestreYear,setTrimestreYear,trimestres,setTrimestres } = data;

  useEffect(() => {
    if (isOpen) {
      trimestreAnio();
    }
  }, [isOpen]);

  const trimestreAnio = () => {
    const userLogueado = localStorage.getItem("userLogueadoNotas");
    const userLogin = JSON.parse(userLogueado);
    const { token } = userLogin;
    getTrimestres(token).then((allTrimestres) => {
      const { trimestres } = allTrimestres;
      setTrimestres(trimestres);
    });
    const anioMasReciente = Math.max(...trimestres.map(trimestre => Number(trimestre.year)));
    const nuevoAnioTrimestre = anioMasReciente+1;
    setTrimestreYear(nuevoAnioTrimestre)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿Desea Insertar este nuevo Trimestre año {trimestreYear}?</h3>
        <div className="modal-buttons">
          <button className="modal-button accept-button" onClick={() => crearTrimestreAnual(onClose)} >
            Aceptar
          </button>
          <button className="modal-button cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInsertTrimestre;
