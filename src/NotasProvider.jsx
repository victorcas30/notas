import notasContext from "./notasContext";
import useNotas from "./useNotas";

const NotasProvider = ({children}) => {
    return <notasContext.Provider value={useNotas()}>
        {children}
    </notasContext.Provider>
    
}

export default NotasProvider;