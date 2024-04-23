import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import { Homepage } from './pages/Homepage'
import { Homepage } from "./pages/Homepage";
import { DetailsPdf } from "./pages/DetailsPdf";
import "react-toastify/dist/ReactToastify.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./pages/Admin/Auth/LoginPage";
import ProfileSettingPage from "./pages/Admin/profileSetting/ProfileSettingPage";
import LastNewsPage from "./pages/Admin/lastNews/LastNewsPage";
import PdfPage from "./pages/Admin/pdf/PdfPage";
import RatesPage from "./pages/Admin/rate/RatesPage";
import { RatesPdfPage } from "./pages/Admin/rate/RatesPdfPage";
import SmsPage from "./pages/Admin/sms/SmsPage";
import SuperAdminLoginPage from "./pages/SuperAdmin/Auth/SuperAdminLoginPage";
import AllAdminsPage from "./pages/SuperAdmin/AllAdmins/AllAdminsPage";
import AllSizesPage from "./pages/SuperAdmin/AllSizesPage";
import SuperAdminSmsPage from "./pages/SuperAdmin/sms/SuperAdminSmsPage";
import { useEffect, useState } from "react";
import ProtectedRoute from "./assets/components/utility/ProtectedRoute";
import ProtectedRouteSuperAdmin from "./assets/components/utility/ProtectedRouteSuperAdmin";
// import { Homepage } from './pages/Homepage'
// import { LoginPage } from './pages/Admin/Auth/LoginPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );
  const [isSuperAdmin, setIsSuperAdmin] = useState(localStorage.getItem('superAdmin'));

  // useEffect(() => {
  //   // Retrieve the object from localStorage
  //   const superAdminObj = JSON.parse(localStorage.getItem('superAdmin'));

  //   // Extract the token from the object and set it in the state
  //   if (superAdminObj && superAdminObj.token) {
  //     setIsSuperAdmin(superAdminObj.token);
  //   }
  // }, []);

  console.log(isSuperAdmin)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:name" element={<Homepage />} />
        <Route path="/:name/detailspdf/:id" element={<DetailsPdf />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/admin/profile_setting"
            element={<ProfileSettingPage />}
          />
          <Route path="/admin/news" element={<LastNewsPage />} />
          <Route path="/admin/pdfs" element={<PdfPage />} />
          <Route path="/admin/rates" element={<RatesPage />} />
          <Route path="/admin/rates/:pdfId" element={<RatesPdfPage />} />
          <Route path="/admin/sms" element={<SmsPage />} />
        </Route>

        <Route path="/super_admin/login" element={<SuperAdminLoginPage />} />
        <Route element={<ProtectedRouteSuperAdmin isSuperAdmin={isSuperAdmin} />}>
          <Route path="/super_admin/all_admins" element={<AllAdminsPage />} />
          <Route path="/super_admin/sizes" element={<AllSizesPage />} />
          <Route path="/super_admin/sms" element={<SuperAdminSmsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
