import "../../ModalDelete.css";
import { useContext, useEffect, useState } from "react";
import notasContext from "../../notasContext";

const ModalDeleteTrimestre = ({ isOpen, onClose, trimestreEliminar }) => {
  if (!isOpen) return null;
  const data = useContext(notasContext);
  const {deleteTrimestreBtn } = data;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿Desea eliminar este Trimestre definitivamente?</h3>
        <div className="modal-buttons">
          <button className="modal-button accept-button" onClick={() => deleteTrimestreBtn(trimestreEliminar,onClose)} >
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

export default ModalDeleteTrimestre;
