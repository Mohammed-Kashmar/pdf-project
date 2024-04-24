import { FaDownload } from "react-icons/fa6";
import "./SuperAdminSms.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGetData } from "../../../../hooks/useGetData";
import NavBarRed from "../../Admin/utility/NabBarRed/NavBarRed";
import AdminHeader from "../../Admin/utility/Header/Header";
import { useGetDataSuperAdmin } from "../../../../hooks/useGetDataSuperAdmin";
import notify from "../../utility/useNotification";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

function SuperAdminSms() {
  const [isPress, setIsPress] = useState(false);
  const [isPress1, setIsPress1] = useState(false);

  const handleSmsRecharge = async () => {
    setIsPress1(true);
    const res = await useGetDataSuperAdmin(`/superAdmin_api/show_recharges`);
    setIsPress1(false);
    console.log(res.data.data);
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

    saveAs(blob, "smsRecharges.xlsx");
  };

  const handleSmsWithdrawals = async () => {
    setIsPress(true);
    const res = await useGetDataSuperAdmin(`/superAdmin_api/show_withdrawals`);
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

    saveAs(blob, "smsWithdrawals.xlsx");
  };

  return (
    <div>
      <NavBarRed />
      <AdminHeader text=" الرسائل" />

      <div className="table-responsive table_container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> الرسائل </th>
              <th scope="col">الحدث</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>الرسائل المشحونة</td>
              <td className="d-flex justify-content-center">
                {isPress1 === true ? (
                  <p className="down_sms">
                    <Spinner
                      className="m-auto"
                      animation="border"
                      role="status"
                    ></Spinner>
                  </p>
                ) : (
                  <p className="down_sms" onClick={handleSmsRecharge}>
                    تنزيل كملف اكسل <FaDownload />
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td> عمليات السحب</td>
              <td className="d-flex justify-content-center">
                {isPress === true ? (
                  <p className="down_sms">
                    <Spinner
                      className="m-auto"
                      animation="border"
                      role="status"
                    ></Spinner>
                  </p>
                ) : (
                  <p className="down_sms" onClick={handleSmsWithdrawals}>
                    تنزيل كملف اكسل <FaDownload />
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SuperAdminSms;
