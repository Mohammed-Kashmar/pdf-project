import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Homepage } from './pages/Homepage'
import { DetailsPdf } from './pages/DetailsPdf';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
// import { Homepage } from './pages/Homepage'
import { LoginPage } from './pages/Admin/Auth/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path='/detailspdf/:id' element={<DetailsPdf/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
