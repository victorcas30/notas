import React from "react";
import "./Alerts.css";

const Alerts = ({ mensaje, tipo, icono }) => {

  const alertClass = `alert alert-${tipo}`;
  const iconClass = `iconoEstilo icono-${tipo}`;
  const cuadroClass = `cuadroEstilo cuadroEstilo-${tipo}`;

  return (
    <>
      <div className={alertClass} role="alert">
        <div className={cuadroClass}>
          <div className={iconClass}>{icono}</div>
        </div>
        <div className="mensajeEstilo">{mensaje}</div>
      </div>
    </>
  );
};

export default Alerts;
