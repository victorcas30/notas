import "../../Modal.css";
import { useContext, useEffect, useState } from "react";
import notasContext from "../../notasContext";
import { useForm } from "react-hook-form";

const ModalAlumnos = ({ isOpen, onClose, alumnoModal }) => {
    if (!isOpen) return null;
    
    const {register,handleSubmit,formState,watch,reset,setValue } = useForm({ resetOnSubmit: true });
    const {errors} = formState;
    const data = useContext(notasContext);
    const {saveAlumno, isEdit, setIsEdit, editarAlumno} = data;
    const [idAlum, setIdAlum] = useState(0);
    const [telefono, setTelefono] = useState(alumnoModal?.celular || '');

    useEffect(() => {
        if(isEdit && alumnoModal){
            const {idalumno, nombres, apellidos, celular, email, eliminado} = alumnoModal;
            setValue("nombres", nombres);
            setValue("apellidos", apellidos);
            setValue("celular", celular);
            setValue("email", email);
            setValue("eliminado", eliminado);
            setIdAlum(idalumno);
            setTelefono(celular);
        }else{
            reset();
            setTelefono('');
        }
    },[isEdit, alumnoModal, setValue, reset]);
        
    const handleCancelar = () => {
        setIsEdit(false)
        onClose();
    };

    const validarEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    } 
    const validarCelular = celular => {
        const celularRegex = /^\d{4}-\d{4}$/;
        return celularRegex.test(celular);
    } 

    const handleTelefonoChange = (e) => {
          let valor = e.target.value;
          valor = valor.replace(/-/g, '');
      
          if (valor.length > 4) {
            valor = valor.slice(0, 4) + '-' + valor.slice(4);
          }
          setTelefono(valor);
    };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      {isEdit ? <h3 className="bi bi-pencil-square" > Editar Alumno</h3> : <h3 className="bi bi-person-fill-add" > Crear Alumno</h3>}
        <div>
        <form onSubmit={handleSubmit(isEdit ? data => editarAlumno(data,reset,idAlum,onClose) : data => saveAlumno(data,reset,onClose))}>
            <table className="table table-light table-hover">
            <thead></thead>
            <tbody>
                <tr>
                    <td><h5>Nombre: </h5></td>
                    <td>
                        <input type="text" {...register("nombres",{validate:value => value.trim().length > 2})} className={`form-control w-50 ${errors.nombres ? "is-invalid" : ""} `}  />
                        {errors.nombres?.type === "validate" && <div className="invalid-feedback">Escriba un nombre valido *</div>}
                    </td>
                </tr>
                <tr>
                    <td><h5>Apellido: </h5></td>
                    <td>
                        <input type="text" {...register("apellidos",{validate:value => value.trim().length > 2})} className={`form-control w-50 ${errors.apellidos ? "is-invalid" : ""} `} />
                        {errors.apellidos?.type === "validate" && <div className="invalid-feedback">Escriba un apellido valido *</div>}
                    </td>
                </tr>
                <tr>
                    <td><h5>Celular: </h5></td>
                    <td>
                        <input type="text" {...register("celular",{validate:validarCelular})} onChange={handleTelefonoChange} maxLength="9" value={telefono} className={`form-control w-50 ${errors.celular ? "is-invalid" : ""} `}  />
                        {errors.celular?.type === "validate" && <div className="invalid-feedback">Escriba un celular valido ####-####*</div>}
                    </td>
                </tr>
                <tr>
                    <td><h5>Email: </h5></td>
                    <td>
                        <input type="text" {...register("email",{required:true,validate:validarEmail})} className={`form-control w-50 ${errors.email ? "is-invalid" : ""} `} />
                        {errors.email?.type === "required" && <div className="invalid-feedback">Ingrese un email *</div> }
                        {errors.email?.type === "validate" && <div className="invalid-feedback">Ingrese un email valido *</div> }
                    </td>
                </tr>
                <tr>

                </tr>
            </tbody>
        </table>
            <div className="modal-buttons">
            {
                isEdit 
                ?
                <button type="submit" className="modal-button edit-button" >Guardar Cambios</button>
                :
                <button type="submit" className="modal-button accept-button" >Guardar</button>

            }
            <button className="modal-button cancel-button" onClick={handleCancelar}>Cancelar</button>
            </div>
        </form> 
        </div>
      </div>
    </div>
  );
};

export default ModalAlumnos;
