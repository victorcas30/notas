import "./ModalDelete.css";
import { useContext, useEffect, useState } from "react";
import notasContext from "./notasContext";

const ModalDeleteGrados = ({ isOpen, onClose, gradoEliminar }) => {
  if (!isOpen) return null;
  const data = useContext(notasContext);
  const {deleteGradoBtn } = data;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿Desea eliminar este grado definitivamente?</h3>
        <div className="modal-buttons">
          <button className="modal-button accept-button" onClick={() => deleteGradoBtn(gradoEliminar,onClose)} >
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

export default ModalDeleteGrados;
