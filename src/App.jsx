import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Homepage } from './pages/Homepage'
import { DetailsPdf } from './pages/DetailsPdf';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path='/detailspdf/:id' element={<DetailsPdf/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
