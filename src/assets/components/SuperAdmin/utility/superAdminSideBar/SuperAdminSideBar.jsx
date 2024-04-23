import { Link, useLocation } from "react-router-dom";
import sidebar from "../../../../../images/sidebar.png";
import "./SuperAdminSideBar.css";
import vector_logout from "../../../../../images/vector_logout.png";
import { FaCommentSms } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiZendesk, SiZerply } from "react-icons/si";
import { LiaFileContractSolid } from "react-icons/lia";
import { useGetDataSuperAdmin } from "../../../../../hooks/useGetDataSuperAdmin";
import { Fragment, useState } from "react";
import notify from "../../../utility/useNotification";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const SuperAdminSideBar = () => {
  const [isPress, setIsPress] = useState(false);

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("superAdmin");
  };

  const handleContracts = async () => {
    setIsPress(true);
    const res = await useGetDataSuperAdmin(`/superAdmin_api/show_contracts`);
    setIsPress(false);
    if (res.data.success === true) {
      notify(res.data.message, "success");
    } else {
      notify(res.data.message, "error");
    }
    const worksheet = XLSX.utils.json_to_sheet(res.data.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "contracts.xlsx");
  };
  const userData = JSON.parse(localStorage.getItem("superAdmin"));
  return (
    <div className={`sidebar `}>
      <div className="header_sidebar">
        <img src={sidebar} alt="sidebar" />
      </div>
      <div className="all_links">
        <Link
          to="/super_admin/all_admins"
          className={`${
            location.pathname === "/super_admin/all_admins" ? "clicked" : ""
          }`}
        >
          <p className=""> Admins </p>
          <MdAdminPanelSettings />
        </Link>
        <Link
          to="/super_admin/sizes"
          className={`${
            location.pathname === "/super_admin/sizes" ? "clicked" : ""
          }`}
        >
          <p className=""> المساحات التخزينية </p>
          <SiZendesk />
        </Link>

        <Link
          to="/super_admin/sms"
          className={`${
            location.pathname === "/super_admin/sms" ? "clicked" : ""
          }`}
        >
          <p className=""> الرسائل </p>
          <FaCommentSms />
        </Link>
        <Link
          to=""
          onClick={() => {
            handleContracts()
          }}
        >
          {isPress ? (
            <Spinner
              className="m-auto"
              animation="border"
              role="status"
              variant="danger"
            ></Spinner>
          ) : null}
          <p className=""> العقود </p>
          <LiaFileContractSolid />
        </Link>

        <Link to="/super_admin/login" onClick={handleLogout}>
          <p className=" text-danger"> تسجيل الخروج </p>
          <img src={vector_logout} alt="" />
        </Link>
      </div>

      <ToastContainer/>
    </div>
  );
};

export default SuperAdminSideBar;
