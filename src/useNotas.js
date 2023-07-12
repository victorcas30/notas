import { useState, useEffect } from "react";
import { crearUsuario, editarUsuario, crearAlumno, editarAlum, eliminarAlumno, eliminarMateria, eliminarValor, eliminarInasistencia, eliminarTrimestre, getTrimestres, crearTrimestre } from "./getApi";

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
    const [materias,setMaterias] = useState([]);
    const [cambiosMateria, setCambiosMateria] = useState(false);
    const [valores,setValores] = useState([]);
    const [cambiosValor, setCambiosValor] = useState(false);
    const [inasistencias,setInasistencias] = useState([]);
    const [cambiosInasistencia, setCambiosInasistencia] = useState(false);
    const [trimestres,setTrimestres] = useState([]);
    const [cambiosTrimestre, setCambiosTrimestre] = useState(false);
    const [trimestreYear,setTrimestreYear] = useState(0);

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
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;

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
        delete copyUser.confirmarPassword;
        setUser([copyUser]);
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
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
        setAlumno([copyAlumno]);
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
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

    const eliminarAlumnoBtn = (id,onClose) => {
        const alumnoDelete = {"idalumno":id};
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        eliminarAlumno(alumnoDelete,token).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
        });
        setCambiosAlumno(true);
        onClose();
    }

    const deleteMateriaBtn = (id,onClose) => {
        const materiaDelete = {"idmateria":id};
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        eliminarMateria(materiaDelete,token).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
        });
        setCambiosMateria(true);
        onClose();
    }

    const deleteValorBtn = (id,onClose) => {
        const valorDelete = {"idvalor":id};
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        eliminarValor(valorDelete,token).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
        });
        setCambiosValor(true);
        onClose();
    }

    const deleteInasistenciaBtn = (id,onClose) => {
        const inasistenciaDelete = {"idinasistencia":id};
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        eliminarInasistencia(inasistenciaDelete,token).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
        });
        setCambiosInasistencia(true);
        onClose();
    }

    const deleteTrimestreBtn = (id,onClose) => {
        const trimestreDelete = {"idtrimestre":id};
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        eliminarTrimestre(trimestreDelete,token).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
        });
        setCambiosTrimestre(true);
        onClose();
    }

    const crearTrimestreAnual = (onClose) => {
        const userLogueado = localStorage.getItem("userLogueadoNotas");
        const userLogin = JSON.parse(userLogueado);
        const { token } = userLogin;
        getTrimestres(token).then((allTrimestres) => {
          const { trimestres } = allTrimestres;
          setTrimestres(trimestres);
        });
        const anioMasReciente = Math.max(...trimestres.map(trimestre => Number(trimestre.year)));
        const nuevoAnioTrimestre = anioMasReciente+1;
        setTrimestreYear(anioMasReciente)
        const nuevoTrimestre = [
            {
              "descripcion": "Primer Trimestre",
              "year": nuevoAnioTrimestre,
              "eliminado": "0"
            },
            {
              "descripcion": "Segundo Trimestre",
              "year": nuevoAnioTrimestre,
              "eliminado": "0"
            },
            {
              "descripcion": "Tercer Trimestre",
              "year": nuevoAnioTrimestre,
              "eliminado": "0"
            }
        ];
        for (let i = 0; i < nuevoTrimestre.length; i++) {
            const trimestre = nuevoTrimestre[i];
        
            crearTrimestre(trimestre, token).then((respuesta) => {
                console.log(JSON.stringify(respuesta));
            });
          }
        setCambiosTrimestre(true);
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
        eliminarAlumnoBtn,
        materias,
        setMaterias,
        cambiosMateria, 
        setCambiosMateria,
        deleteMateriaBtn,
        valores,
        setValores,
        cambiosValor, 
        setCambiosValor,
        deleteValorBtn,
        inasistencias,
        setInasistencias,
        cambiosInasistencia, 
        setCambiosInasistencia,
        deleteInasistenciaBtn,
        trimestres,
        setTrimestres,
        cambiosTrimestre,
        setCambiosTrimestre,
        deleteTrimestreBtn,
        crearTrimestreAnual,
        trimestreYear,
        setTrimestreYear
    };
}

export default useNotas;