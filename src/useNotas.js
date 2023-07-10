import { useState, useEffect } from "react";
import { crearUsuario, editarUsuario, crearAlumno, editarAlum } from "./getApi";

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
    const [cambiosUser, setCambiosUser] = useState(false);
    const [userLogin, setUserLogin] = useState(userLoginDefault);
    const [isLogged,setIsLogged] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [alumnos,setAlumnos] = useState([]);
    const [alumno,setAlumno] = useState();
    const [cambiosAlumno, setCambiosAlumno] = useState(false);

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

    const saveUser = (data,reset,onClose) => {
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
        setCambiosUser(true);
        //setGuardado(true);
        setTimeout(() => {
            //setGuardado(false);
        }, 5000);
        reset();
        onClose();
    }

    const editarUser = (data,reset,idUser,onClose) => {
        const copyUser = {...data}
        copyUser.idusuario = idUser;
        console.log(idUser);
        delete copyUser.confirmarPassword;
        console.log(copyUser)
        setUser([copyUser]);
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        console.log(token);
        editarUsuario(copyUser, token).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
        });
        setCambiosUser(true);
        setIsEdit(false);
        //setEditado(true);
        setTimeout(() => {
            //setEditado(false);
        }, 5000);
        reset();
        onClose();
    }

    const saveAlumno = (data,reset,onClose) => {
        const copyAlumno = {...data,eliminado:"0"};
        setAlumno([copyAlumno]);
        console.log(copyAlumno);
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        crearAlumno(copyAlumno, token).then(res=>{
            console.log(JSON.stringify(res));
        })
        setCambiosAlumno(true);
        //setGuardado(true);
        setTimeout(() => {
            //setGuardado(false);
        }, 5000);
        reset();
        onClose();
    }

    const editarAlumno = (data,reset,idAlum,onClose) => {
        const copyAlumno = {...data}
        copyAlumno.idalumno = idAlum;
        console.log(idAlum);
        console.log(copyAlumno)
        setAlumno([copyAlumno]);
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        console.log(token);
        editarAlum(copyAlumno, token).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
        });
        setCambiosAlumno(true);
        setIsEdit(false);
        //setEditado(true);
        setTimeout(() => {
            //setEditado(false);
        }, 5000);
        reset();
        onClose();
    }

    const eliminarAlumno = (alumno,onClose) => {
        const copyAlumno = {...alumno}
        copyAlumno.eliminado = "1";
        console.log(copyAlumno)
        setAlumno([copyAlumno]);
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        console.log(token);
        editarAlum(copyAlumno, token).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
        });
        setCambiosAlumno(true);
        setIsEdit(false);
        //setEditado(true);
        setTimeout(() => {
            //setEditado(false);
        }, 5000);
        onClose();
    }



    return {
        user,
        setUser,
        users,
        setUsers,
        cambiosUser, 
        setCambiosUser,
        isLogged,
        setIsLogged,
        userLogin,
        setUserLogin,
        fechaAcceso,
        salirSesion,
        saveUser,
        isEdit,
        setIsEdit,
        editarUser,
        alumnos,
        setAlumnos,
        alumno,
        setAlumno,
        cambiosAlumno, 
        setCambiosAlumno,
        saveAlumno,
        editarAlumno,
        eliminarAlumno
    };
}

export default useNotas;