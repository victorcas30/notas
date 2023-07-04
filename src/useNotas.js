import { useState, useEffect } from "react";
import { crearUsuario } from "./getApi";

const userLoginDefault = {
    "idusuario": 0,
    "usuario": "",
    "nombre": "",
    "apellido": "",
    "fechaingreso": "",
    "token": ""
}

const useNotas = () => {
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState();
    const [userLogin, setUserLogin] = useState(userLoginDefault);
    const [isLogged,setIsLogged] = useState(false);
    const [roles,setRoles] = useState([]);

    const fechaAcceso = () => {
        const fechaHoraActual = new Date();
        const dia = fechaHoraActual.getDate().toString().padStart(2, '0');
        const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaHoraActual.getFullYear().toString();
        const horas = fechaHoraActual.getHours().toString().padStart(2, '0');
        const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
        const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');
        const fechaHoraFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
        return fechaHoraFormateada;
    }

    const salirSesion = () => {
        setIsLogged(false);
        localStorage.removeItem("userLogueadoNotas");
        //setIngresado(false);
        setUserLogin(userLoginDefault);
    }

    useEffect(() => {
        const storedUserLogin = localStorage.getItem("userLogueadoNotas");
        if (storedUserLogin) {
          setUserLogin(JSON.parse(storedUserLogin));
          setIsLogged(true);
        }
      }, []);
    
    useEffect(() => {
        localStorage.setItem("userLogueadoNotas", JSON.stringify(userLogin));
    }, [userLogin]);

    const saveUser = (data,reset) => {
        const copyUser = {...data};
        setUser([copyUser]);
        console.log(copyUser);
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        console.log(token);

        crearUsuario(copyUser, token).then(res=>{
            console.log(JSON.stringify(res));
        })

        //setGuardado(true);
        setTimeout(() => {
            //setGuardado(false);
        }, 5000);
        reset();
    }

    return {
        user,
        setUser,
        users,
        setUsers,
        isLogged,
        setIsLogged,
        userLogin,
        setUserLogin,
        fechaAcceso,
        salirSesion,
        roles,
        setRoles,
        saveUser
    };
}

export default useNotas;