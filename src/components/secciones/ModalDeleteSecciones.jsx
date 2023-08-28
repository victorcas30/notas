import "../../ModalDelete.css";
import { useContext, useEffect, useState } from "react";
import notasContext from "../../notasContext";

const ModalDeleteSecciones = ({ isOpen, onClose, seccionEliminar }) => {
  if (!isOpen) return null;
  const data = useContext(notasContext);
  const {deleteSeccionBtn } = data;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿Desea eliminar esta seccion definitivamente?</h3>
        <div className="modal-buttons">
          <button className="modal-button accept-button" onClick={() => deleteSeccionBtn(seccionEliminar,onClose)} >
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

export default ModalDeleteSecciones;
