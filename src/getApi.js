const login = async(user) => {
    const headers = {"Content-Type":"application/json"};
    const options = {
        method:'POST',
        headers:headers,    
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/users/login",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const getUsuarios = async(token) => {
    const headers = {"Authorization":"Bearer "+token};
    const options = {method:'GET',headers:headers};
    try{
        const respuesta = await fetch("http://localhost:8000/api/usuarios",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const crearUsuario = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'POST',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/users",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const editarUsuario = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/users",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const getAlumnos = async(token) => {
    const headers = {"Authorization":"Bearer "+token};
    const options = {method:'GET',headers:headers};
    try{
        const respuesta = await fetch("http://localhost:8000/api/alumnos",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const crearAlumno = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'POST',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/alumnos",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const editarAlum = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/alumnos",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const getMaterias = async(token) => {
    const headers = {"Authorization":"Bearer "+token};
    const options = {method:'GET',headers:headers};
    try{
        const respuesta = await fetch("http://localhost:8000/api/materias",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const crearMateria = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'POST',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/materias",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const editarMat = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/materias",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const eliminarMateria = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/materias/delete",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const getValores = async(token) => {
    const headers = {"Authorization":"Bearer "+token};
    const options = {method:'GET',headers:headers};
    try{
        const respuesta = await fetch("http://localhost:8000/api/valores",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}


const crearValor = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'POST',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/valores",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const editarValor = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/valores",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const eliminarValor = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/valores/delete",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const getInasistencias = async(token) => {
    const headers = {"Authorization":"Bearer "+token};
    const options = {method:'GET',headers:headers};
    try{
        const respuesta = await fetch("http://localhost:8000/api/inasistencias",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}


const crearInasistencia = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'POST',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/inasistencias",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const editarInasistencia = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/inasistencias",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const eliminarInasistencia = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/inasistencias/delete",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    login,
    getUsuarios,
    crearUsuario,
    editarUsuario,
    getAlumnos,
    crearAlumno,
    editarAlum,
    getMaterias,
    crearMateria,
    editarMat,
    eliminarMateria,
    getValores,
    crearValor,
    editarValor,
    eliminarValor,
    getInasistencias,
    crearInasistencia,
    editarInasistencia,
    eliminarInasistencia
}