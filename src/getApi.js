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

const eliminarAlumno = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/alumnos/delete",options);
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

const getTrimestres = async(token) => {
    const headers = {"Authorization":"Bearer "+token};
    const options = {method:'GET',headers:headers};
    try{
        const respuesta = await fetch("http://localhost:8000/api/trimestres",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}


const crearTrimestre = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'POST',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/trimestres",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const editarTrimestre = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/trimestres",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const eliminarTrimestre = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/trimestres/delete",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const getGrados = async(token) => {
    const headers = {"Authorization":"Bearer "+token};
    const options = {method:'GET',headers:headers};
    try{
        const respuesta = await fetch("http://localhost:8000/api/grados",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}


const crearGrado = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'POST',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/grados",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const editarGrado = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/grados",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const eliminarGrado = async(user,token) => {
    const headers = {"Content-Type":"application/json","Authorization":"Bearer "+token};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(user)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/grados/delete",options);
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
    eliminarAlumno,
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
    eliminarInasistencia,
    getTrimestres,
    crearTrimestre,
    editarTrimestre,
    eliminarTrimestre,
    getGrados,
    crearGrado,
    editarGrado,
    eliminarGrado
}