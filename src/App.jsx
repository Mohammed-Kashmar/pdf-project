import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Homepage } from './pages/Homepage'
import { LoginPage } from './pages/Admin/Auth/LoginPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
