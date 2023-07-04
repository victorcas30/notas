import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import notasContext from "./notasContext";
import { login } from "./getApi";

const Login = () => {
    const navigate = useNavigate();
    const txtUser = useRef();
    const txtPassword = useRef();
    const data = useContext(notasContext);
    const {setIsLogged, setUserLogin, fechaAcceso } = data;

    const ingresarLogin = () => {
        const user = {
            "usuario": txtUser.current.value,
            "password": txtPassword.current.value
        }
        console.table(user)
        login(user).then(result=>{
            const {token,userInfo:{0:info}} = result;
            const {idusuario,usuario,nombre,apellido} = info;
            console.log(result)
            console.log(info)
            const fechaHoraFormateada = fechaAcceso();
            const userLogeado = {
                "idusuario": idusuario,
                "usuario": usuario,
                "nombre": nombre,
                "apellido": apellido,
                "fechaingreso": fechaHoraFormateada,
                "token": token
            }
            setUserLogin(userLogeado);
            localStorage.setItem("userLogueadoNotas",JSON.stringify(userLogeado));
            setIsLogged(true);
            console.log("Ingreso Exitoso");
            navigate("/consultaruser");
        });
    }


    return(
    <>
        <div className="container" style={{ width: "50%", maxWidth: "500px", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>   
            <div className="row">
                <div className="bg-white shadow rounded">
                    <div className="row">
                        <div className="col-md-0 pe-0">
                            <div className="form-left h-100 py-5 px-5">
                                <form action="" className="row g-4">
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <img src="./src/assets/img/SanLuis.png" alt="Imagen de usuario" style={{ height: "200px", width: "200px" }} />
                                    </div>
                                        <div className="col-12">
                                            <label>Username<span className="text-danger">*</span></label>
                                            <div className="input-group">
                                                <div className="input-group-text"><i className="bi bi-person-fill"></i></div>
                                                <input type="text" className="form-control" placeholder="Ingrese User" name="usuario" ref={txtUser} />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label>Password<span className="text-danger">*</span></label>
                                            <div className="input-group">
                                                <div className="input-group-text"><i className="bi bi-lock-fill"></i></div>
                                                <input type="password" className="form-control" placeholder="Ingrese Password" name="password" ref={txtPassword} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6">

                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-dark px-4 float-end mt-4" onClick={ingresarLogin} type="button">Ingresar</button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Login;
