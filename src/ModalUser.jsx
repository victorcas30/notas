import "./Modal.css";
import { useContext, useEffect, useState } from "react";
import notasContext from "./notasContext";
import { useForm } from "react-hook-form";

const ModalUser = ({ isOpen, onClose, userModal }) => {
  if (!isOpen) return null;
  
  const {register,handleSubmit,formState,watch,reset,setValue } = useForm({ resetOnSubmit: true });
  const password = watch("password");
  const {errors} = formState;
  const data = useContext(notasContext);
  const {saveUser, isEdit, setIsEdit, editarUser} = data;
  const [idUser, setIdUser] = useState(0);

  useEffect(() => {
    if(isEdit && userModal){
        const {idusuario, nombre, apellido, usuario} = userModal;
        console.log(userModal);
        setValue("nombre", nombre);
        setValue("apellido", apellido);
        setValue("usuario", usuario);
        setValue("password", "");
        setValue("confirmarPassword", "");
        setIdUser(idusuario);
    }else{
        reset();
    }
  },[isEdit, userModal, setValue, reset]);
    
  const handleCancelar = () => {
    setIsEdit(false)
    onClose();
  };



  return (
    <div className="modal-overlay">
      <div className="modal-content">
      {isEdit ? <h3 className="bi bi-pencil-square" > Editar User</h3> : <h3 className="bi bi-person-fill-add" > Crear User</h3>}
        <div>
        <form onSubmit={handleSubmit(isEdit ? data => editarUser(data,reset,idUser,onClose) : data => saveUser(data,reset,onClose))}>
            <table className="table table-light table-hover">
            <thead></thead>
            <tbody>
                <tr>
                    <td><h5>Nombre: </h5></td>
                    <td>
                        <input type="text" {...register("nombre",{validate:value => value.trim().length > 2})} className={`form-control w-50 ${errors.nombre ? "is-invalid" : ""} `}  />
                        {errors.nombre?.type === "validate" && <div className="invalid-feedback">Escriba un nombre valido *</div>}
                    </td>
                </tr>
                <tr>
                    <td><h5>Apellido: </h5></td>
                    <td>
                        <input type="text" {...register("apellido",{validate:value => value.trim().length > 2})} className={`form-control w-50 ${errors.apellido ? "is-invalid" : ""} `} />
                        {errors.apellido?.type === "validate" && <div className="invalid-feedback">Escriba un apellido valido *</div>}
                    </td>
                </tr>
                <tr>
                    <td><h5>Usuario: </h5></td>
                    <td>
                        <input type="text" {...register("usuario",{validate:value => value.trim().length > 2})} className={`form-control w-50 ${errors.usuario ? "is-invalid" : ""} `}  />
                        {errors.usuario?.type === "validate" && <div className="invalid-feedback">Escriba un usuario valido *</div>}
                    </td>
                </tr>
                {
                    isEdit ? <></> :
                    <>
                    <tr>
                        <td><h5>Contraseña: </h5></td>
                        <td>
                            <input type="password" {...register("password",{required:true})} className={`form-control w-50 ${errors.password ? "is-invalid" : ""}`} />
                            {errors.password?.type === "required" && <div className="invalid-feedback">Ingrese una contraseña</div> }
                        </td>
                    </tr>
                    <tr>
                        <td><h5>Contraseña: </h5></td>
                        <td>
                            <input type="password" {...register("confirmarPassword",{validate:value => value===password})} className={`form-control w-50 ${errors.confirmarPassword ? "is-invalid" : ""}`} />
                            {errors.confirmarPassword?.type === "validate" && <div className="invalid-feedback">La contraseñas son diferentes</div> }
                        </td>
                    </tr>
                    </>
                }
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

export default ModalUser;
