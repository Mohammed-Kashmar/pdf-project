import { Link, useLocation } from "react-router-dom";
import sidebar from "../../../../images/sidebar.png";
import "./SideBar.css";
import vector_home from "../../../../images/vector_home.png";
import vector_setting from "../../../../images/vector_setting.png";
import vector_news from "../../../../images/vector_news.png";
import vector_rate from "../../../../images/vector_rate.png";
import vector_pdf from "../../../../images/vector_pdf.png";
import vector_logout from "../../../../images/vector_logout.png";
import { useState } from "react";
import { FaCommentSms } from "react-icons/fa6";

const SideBar = () => {
  const location = useLocation();

  // const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // const toggleSidebar = () => {
  //   setIsSidebarVisible(!isSidebarVisible);
  // };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  
  };

  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={`sidebar `}>
      <div className="header_sidebar">
        <img src={sidebar} alt="sidebar" />
      </div>
      <div className="all_links">
<<<<<<< HEAD
        <Link to="">
          <p className=""> الصفحة الرئيسية </p>
          <img src={vector_home} alt="" />
        </Link>
        <Link
          to="/profile_setting"
          className={`${
            location.pathname === "/profile_setting" ? "clicked" : ""
=======
      {
        // <Link to="">
        //   <p className=""> الصفحة الرئيسية </p>
        //   <img src={vector_home} alt="" />
        // </Link>
      }
        <Link
          to="/admin/profile_setting"
          className={`${
            location.pathname === "/admin/profile_setting" ? "clicked" : ""
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
          }`}
        >
          <p className=""> الإعدادات الشخصية </p>
          <img src={vector_setting} alt="" />
        </Link>
        <Link
<<<<<<< HEAD
          to="/news"
          className={`${location.pathname === "/news" ? "clicked" : ""}`}
=======
          to="/admin/news"
          className={`${location.pathname === "/admin/news" ? "clicked" : ""}`}
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
        >
          <p className=""> آخر الأخبار </p>
          <img src={vector_news} alt="" />
        </Link>
        <Link
<<<<<<< HEAD
          to="/rates"
          className={`${location.pathname === "/rates" || location.pathname.startsWith("/rates") ? "clicked" : ""}`}
=======
          to="/admin/rates"
          className={`${location.pathname === "/admin/rates" || location.pathname.startsWith("/admin/rates") ? "clicked" : ""}`}
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
        >
          <p className=""> التقييمات </p>
          <img src={vector_rate} alt="" />
        </Link>
        <Link
<<<<<<< HEAD
          to="/pdfs"
          className={`${location.pathname === "/pdfs" ? "clicked" : ""}`}
=======
          to="/admin/pdfs"
          className={`${location.pathname === "/admin/pdfs" ? "clicked" : ""}`}
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
        >
          <p className=""> PDF إضافة </p>
          <img src={vector_pdf} alt="" />
        </Link>
        {userData.is_sms === 1 && (
<<<<<<< HEAD
          <Link to="/sms">
=======
          <Link to="/admin/sms">
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
            <p className=""> الرسائل </p>
            <FaCommentSms />
          </Link>
        )}

<<<<<<< HEAD
        <Link to="/login" onClick={handleLogout}>
=======
        <Link to="/admin/login" onClick={handleLogout}>
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
          <p className=" text-danger"> تسجيل الخروج </p>
          <img src={vector_logout} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
