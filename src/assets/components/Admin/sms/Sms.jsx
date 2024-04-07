import NavBarRed from "../utility/NabBarRed/NavBarRed";
import AdminHeader from "../utility/Header/Header";
import { FaDownload } from "react-icons/fa6";
import "./sms.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


import { useGetData } from "../../../../hooks/useGetData";
function Sms() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const handleSmsRecharge = async()=>{
    const res = await useGetData(`/admin_api/show_recharges?adminId=${userData.id}`);
    console.log(res.data.data)

    const worksheet = XLSX.utils.json_to_sheet(res.data.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(blob, "smsRecharges.xlsx");
  }


  const handleSmsWithdrawals = async()=>{
    const res = await useGetData(`/admin_api/show_withdrawals?adminId=${userData.id}`);
    const worksheet = XLSX.utils.json_to_sheet(res.data.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(blob, "smsWithdrawals.xlsx");
  }


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
                {" "}
                <p className="down_sms" onClick={handleSmsRecharge}>
                  تنزيل كملف اكسل <FaDownload />
                </p>
              </td>
            </tr>
            <tr>
              <td> عمليات السحب</td>
              <td className="d-flex justify-content-center">
                {" "}
                <p className="down_sms" onClick={handleSmsWithdrawals}>
                  تنزيل كملف اكسل <FaDownload />
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sms;
