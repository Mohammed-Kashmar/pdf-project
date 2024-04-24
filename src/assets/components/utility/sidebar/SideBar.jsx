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
          }`}
        >
          <p className=""> الإعدادات الشخصية </p>
          <img src={vector_setting} alt="" />
        </Link>
        <Link
          to="/admin/news"
          className={`${location.pathname === "/admin/news" ? "clicked" : ""}`}
        >
          <p className=""> آخر الأخبار </p>
          <img src={vector_news} alt="" />
        </Link>
        <Link
          to="/admin/rates"
          className={`${location.pathname === "/admin/rates" || location.pathname.startsWith("/admin/rates") ? "clicked" : ""}`}
        >
          <p className=""> التقييمات </p>
          <img src={vector_rate} alt="" />
        </Link>
        <Link
          to="/admin/pdfs"
          className={`${location.pathname === "/admin/pdfs" ? "clicked" : ""}`}
        >
          <p className=""> PDF إضافة </p>
          <img src={vector_pdf} alt="" />
        </Link>
        {userData.is_sms === 1 && (
          <Link to="/admin/sms">
            <p className=""> الرسائل </p>
            <FaCommentSms />
          </Link>
        )}

        <Link to="/admin/login" onClick={handleLogout}>
          <p className=" text-danger"> تسجيل الخروج </p>
          <img src={vector_logout} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
