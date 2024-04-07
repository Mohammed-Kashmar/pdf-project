import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Homepage } from './pages/Homepage'
import { DetailsPdf } from './pages/DetailsPdf';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Homepage } from './pages/Homepage'
import LoginPage from './pages/Admin/Auth/LoginPage'
import ProfileSettingPage from './pages/Admin/profileSetting/ProfileSettingPage'
import LastNewsPage from './pages/Admin/lastNews/LastNewsPage'
import PdfPage from './pages/Admin/pdf/PdfPage'
import RatesPage from './pages/Admin/rate/RatesPage'
import { RatesPdfPage } from './pages/Admin/rate/RatesPdfPage'
import SmsPage from './pages/Admin/sms/SmsPage'
// import { Homepage } from './pages/Homepage'
import { LoginPage } from './pages/Admin/Auth/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path='/detailspdf/:id' element={<DetailsPdf/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/profile_setting' element={<ProfileSettingPage/>}/>
        <Route path='/news' element={<LastNewsPage/>}/>
        <Route path='/pdfs' element={<PdfPage/>}/>
        <Route path='/rates' element={<RatesPage/>}/>
        <Route path='/rates/:pdfId' element={<RatesPdfPage/>}/>
        <Route path='/sms' element={<SmsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
