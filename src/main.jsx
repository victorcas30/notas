import ReactDOM from 'react-dom/client'
import NotasProvider from './notasProvider'
import Rutas from './Rutas'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotasProvider>
      <Rutas />
    </NotasProvider>
)
