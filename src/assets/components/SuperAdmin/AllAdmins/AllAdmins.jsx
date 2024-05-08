import { Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import AdminHeader from "../../Admin/utility/Header/Header";
import NavBarRed from "../../Admin/utility/NabBarRed/NavBarRed";
import "./AllAdmins.css";
import { Fragment, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import useFetchDataSuperAdmin from "../../../../hooks/useFetchDataSuperAdmin";
import Pagination from "../../Admin/utility/pagination/Pagination";
import { LuPlus } from "react-icons/lu";
import notify from "../../utility/useNotification";
import {
  useInsertDataSuperAdmin,
  useInsertDataWithImageSuperAdmin,
} from "../../../../hooks/useInsertDataSuperAdmin";
import { useGetData } from "../../../../hooks/useGetData";
import { useGetDataSuperAdmin } from "../../../../hooks/useGetDataSuperAdmin";
import { ToastContainer } from "react-toastify";
import { useDeleteDataSuperAdmin } from "../../../../hooks/useDeleteData";
import { FaCommentSms } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Switch from "react-switch";

const initialState = {
  name: "",
  user_name: "",
  phone: "",
  facebook_url: "",
  instagram_url: "",
  whatsapp: "",
  address: "",
  cover: null,
  logo: null,
  password: "",
  storage_id: "",
  is_sms: 0,
  end_date: "",
  sms_message: "",
  "sms_users[bad]": "",
  "sms_users[good]": "",
  "sms_users[perfect]": "",
};

export default function AllAdmins() {
  const [formData, setFormData] = useState(initialState);
  const [sizes, setSizes] = useState("");
  const [page, setPage] = useState(1);
  const [addAdmin, setAddAdmin] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const [img, setImg] = useState("");
  const [imgLogo, setImgLogo] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [showAddSms, setShowAddSms] = useState(false);
  const handleCloseAddSms = () => {
    setShowAddSms(false);
  };
  const handleShowAddSms = (id) => {
    setShowAddSms(id);
  };
  const handleClose = () => {
    setFormData(initialState);
    setImg("");
    setImgLogo("");
    setShow(false);
  };
  const handleShow = async (admin) => {
    setShow(true);
    const res = await useGetDataSuperAdmin(
      `/superAdmin_api/show_one_admin?adminId=${admin.id}`
    );
    console.log(res);
    setFormData({
      ...formData,
      name: res.data.data.name || initialState.name,
      user_name: res.data.data.user_name || "",
      phone: res.data.data.admin_detail.phone || initialState.phone,
      facebook_url:
        res.data.data.admin_detail.facebook_url || initialState.facebook_url,
      instagram_url:
        res.data.data.admin_detail.instagram_url || initialState.instagram_url,
      storage_id: res.data.data.storage_id || "",
      is_sms: res.data.data.is_sms || "0",
      end_date: res.data.data.end_date || "",
      sms_message: res.data.data.admin_detail.sms_message || "",
      storage_size: res.data.data.storage_size || "",
      sms_user: res.data.data.sms_user || "",
      // bad: res.data.data.sms_user?.bad || "",
      // good: res.data.data.sms_user?.good || "",
      // perfect: res.data.data.sms_user?.perfect || "",
      count_sms: res.data.data.admin_detail.count_sms || 0,
      whatsapp: res.data.data.admin_detail.whatsapp || "",
      address: res.data.data.admin_detail.address || "",
    });

    setImg(
      `https://pdfback.levantsy.com/storage/${res.data.data.admin_detail.cover}`
    );
    setImgLogo(
      `https://pdfback.levantsy.com/storage/${res.data.data.admin_detail.logo}`
    );
  };
  const handleCloseAddAdmin = () => setAddAdmin(false);
  const handleShowAddAdmin = () => {
    const fetchData = async () => {
      const res = await useGetDataSuperAdmin(`/superAdmin_api/show_all_sizes`);
      setSizes(res.data.data);
      // console.log(res.data.data);
    };
    fetchData();
    setAddAdmin(true);
  };
  const handleCloseEditAdmin = () => {
    setFormData(initialState);
    setImg("");
    setImgLogo("");
    setEditAdmin(false);
  };
  const handleShowEditAdmin = async (admin) => {
    const fetchData = async () => {
      const res = await useGetDataSuperAdmin(`/superAdmin_api/show_all_sizes`);
      setSizes(res.data.data);
      // console.log(res.data.data);
    };
    fetchData();
    setEditAdmin(admin);
    setImg("");
    const res = await useGetDataSuperAdmin(
      `/superAdmin_api/show_one_admin?adminId=${admin.id}`
    );
    // console.log(res.data.data)
    setFormData({
      ...formData,
      name: res.data.data.name || initialState.name,
      user_name: res.data.data.user_name || "",
      phone: res.data.data.admin_detail.phone || initialState.phone,
      facebook_url:
        res.data.data.admin_detail.facebook_url || initialState.facebook_url,
      instagram_url:
        res.data.data.admin_detail.instagram_url || initialState.instagram_url,
      storage_id: res.data.data.storage_id || "",
      is_sms: res.data.data.is_sms || "0",
      end_date: res.data.data.end_date || "",
      sms_message: res.data.data.admin_detail.sms_message || "",
      whatsapp: res.data.data.admin_detail.whatsapp || "",
      address: res.data.data.admin_detail.address || "",
      "sms_users[bad]": res.data.data.sms_user?.bad || 0,
      "sms_users[good]": res.data.data.sms_user?.good || 0,
      "sms_users[perfect]": res.data.data.sms_user?.perfect || 0,
    });

    setImg(
      `https://pdfback.levantsy.com/storage/${res.data.data.admin_detail.cover}`
    );
    setImgLogo(
      `https://pdfback.levantsy.com/storage/${res.data.data.admin_detail.logo}`
    );
  };

  const handleCloseDelete = () => setShowDelete(null);
  const handleShowDelete = (id) => setShowDelete(id);
  const {
    data: admins,
    isPending,
    error,
    setKey,
  } = useFetchDataSuperAdmin(`/superAdmin_api/show_admins?page=${page}`);

  const onPress = (page) => {
    setPage(page);
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
    if (name === "cover") {
      setImg(URL.createObjectURL(newValue));
    }
    if (name === "logo") {
      setImgLogo(URL.createObjectURL(newValue));
    }
  };
  const handleSubmitAddAdmin = async (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.user_name === "" ||
      formData.cover === null ||
      formData.logo === null ||
      formData.end_date === "" ||
      formData.password === "" ||
      formData.storage_id === ""
    ) {
      notify("Please Enter Data", "error");
      return;
    }

    if (formData.is_sms === "1") {
      if (
        formData.sms_message === "" ||
        formData["sms_users[bad]"] === "" ||
        formData["sms_users[good]"] === "" ||
        formData["sms_users[perfect]"] === ""
      ) {
        notify("Please Enter Sms", "error");
        return;
      }
    }

    let updatedFormData = { ...formData };
    if (updatedFormData.is_sms.toString() === "0") {
      delete updatedFormData.sms_message,
        delete updatedFormData["sms_users[bad]"],
        delete updatedFormData["sms_users[good]"],
        delete updatedFormData["sms_users[perfect]"];
    }
    setIsPress(true);
    const response = await useInsertDataWithImageSuperAdmin(
      `/superAdmin_api/add_admin`,
      updatedFormData
    );
    setIsPress(false);
    console.log(response.data);
    if (response.data.success === true) {
      notify(response.data.message, "success");
      setFormData(initialState);
      handleCloseAddAdmin();
      setKey((prevKey) => prevKey + 1);
      setImg("");
      setImgLogo("");
    } else {
      notify(response.data.message, "error");
    }
  };

  const handleSubmitEditAdmin = async (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.user_name === "" ||
      formData.end_date === "" ||
      formData.storage_id === ""
    ) {
      notify("Please Enter Data", "error");
      return;
    }

    if (formData.is_sms.toString() === "1") {
      if (
        formData.sms_message === "" ||
        formData["sms_users[bad]"] === "" ||
        formData["sms_users[good]"] === "" ||
        formData["sms_users[perfect]"] === ""
      ) {
        notify("Please Enter Sms", "error");
        return;
      }
    }
    let form = { ...formData };

    if (formData.logo === null) {
      delete form.logo;
    }
    if (formData.cover === null) {
      delete form.cover;
    }
    if (formData.password === "") {
      delete form.password;
    }
    if (formData.is_sms.toString() === "0") {
      delete form.sms_message,
        delete form["sms_users[bad]"],
        delete form["sms_users[good]"],
        delete form["sms_users[perfect]"];
    }

    // console.log(formData.logo)
    setIsPress(true);
    const response = await useInsertDataWithImageSuperAdmin(
      `/superAdmin_api/update_admin?adminId=${editAdmin.id}`,
      form
    );
    console.log(response.data);
    if (response.data.success === true) {
      notify(response.data.message, "success");
      setFormData(initialState);
      handleCloseEditAdmin();
      setImg("");
      setImgLogo("");
      setKey((prevKey) => prevKey + 1);
    } else {
      notify(response.data.message, "error");
    }
    setIsPress(false);
  };

  const handleDeleteAdmin = async (id) => {
    setIsPress(true);
    const response = await useDeleteDataSuperAdmin(
      `/superAdmin_api/delete_admin?adminId=${id}`
    );
    setIsPress(false);
    if (response.data.success === true) {
      notify(response.data.message, "success");
      handleCloseDelete();
      setKey((prevKey) => prevKey + 1);
    } else {
      notify(response.data.message, "error");
    }
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmitAddSms = async (e) => {
    e.preventDefault();
    if (quantity === "") {
      notify("Please Enter quantity", "error");
      return;
    }
    // console.log(formData.logo)
    setIsPress(true);
    const response = await useInsertDataSuperAdmin(
      `/superAdmin_api/add_recharge`,
      { quantity, admin_id: showAddSms }
    );
    setIsPress(false);
    console.log(response.data);
    if (response.data.success === true) {
      notify(response.data.message, "success");
      handleCloseAddSms();
      setKey((prevKey) => prevKey + 1);
      setQuantity("");
    } else {
      notify(response.data.message, "error");
    }
  };

  const handleChangeActive = async (id) => {
    const response = await useInsertDataSuperAdmin(
      `/superAdmin_api/active_or_not_admin?adminId=${id}`,
      {}
    );
    if (response.data.success === true) {
      notify(response.data.message, "success");
      setKey((prevKey) => prevKey + 1);
    } else {
      notify(response.data.message, "error");
    }
  };
  return (
    <div>
      <NavBarRed />
      <AdminHeader
        text="Admins"
        btnText=" اضافة ادمن"
        onButtonClick={handleShowAddAdmin}
      />

      <div className="table-responsive table_container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> الاسم </th>
              <th scope="col"> عدد الرسائل </th>
              <th scope="col">الحدث</th>
            </tr>
          </thead>
          {error ? (
            <tbody>
              <tr>
                <td colSpan="3">
                  <p className="my-4 text-danger">{error.data.message}</p>
                </td>
              </tr>
            </tbody>
          ) : (
            <Fragment>
              {isPending ? (
                <tbody>
                  <tr>
                    <td colSpan="3">
                      <div className="my-4 text-center">
                        <p className="mb-2">جار التحميل</p>
                        <Spinner
                          className="m-auto"
                          animation="border"
                          role="status"
                        ></Spinner>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {admins && admins.data && admins.data.length > 0 ? (
                    admins.data.map((admin) => (
                      <tr key={admin.id}>
                        <td>{admin.name}</td>
                        <td>{admin.count_sms}</td>

                        <td className="">
                          <FaEye size={18} onClick={() => handleShow(admin)} />
                          <MdEdit
                            size={18}
                            onClick={() => handleShowEditAdmin(admin)}
                          />
                          <MdDelete
                            size={18}
                            onClick={() => handleShowDelete(admin.id)}
                          />
                          <Switch
                            checked={admin.is_active}
                            onChange={() => handleChangeActive(admin.id)}
                            checkedIcon={"on"}
                            uncheckedIcon={"off"}
                            onHandleColor={"#FFF"}
                            offHandleColor={"#000"}
                            width={60}
                            className=""
                          />

                          <FaCommentSms
                            style={{
                              visibility: admin.is_sms === 0 ? "hidden" : "",
                            }}
                            size={18}
                            onClick={() => handleShowAddSms(admin.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">
                        <p className="my-5">لا توجد بيانات</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </Fragment>
          )}
        </table>
      </div>

      {admins && admins.last_page > 1 ? (
        <Pagination onPress={onPress} pageCount={admins.last_page} />
      ) : null}

      <Modal
        show={addAdmin}
        onHide={handleCloseAddAdmin}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title> إضافة أدمن</Modal.Title>
        </Modal.Header>
        <Form className="post_form" onSubmit={handleSubmitAddAdmin}>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :الاسم
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :اسم المستخدم
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :رابط الفيسبوك
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="facebook_url"
                  value={formData.facebook_url}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :رابط الانستغرام
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="instagram_url"
                  value={formData.instagram_url}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :الواتساب
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="number"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :العنوان
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :رقم الهاتف
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :تاريخ النهاية
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :الحجم
              </Form.Label>
              <Col className="col-9">
                <select
                  onChange={handleChange}
                  name="storage_id"
                  className="form-control  w-100"
                  value={formData.storage_id}
                  dir={"rtl"}
                >
                  <option value="0">اختيار الحجم</option>
                  {sizes &&
                    sizes.map((size, index) => {
                      return (
                        <option key={index} value={size.id}>
                          {size.size} mb
                        </option>
                      );
                    })}
                </select>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :كلمة السر
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :الرسائل
              </Form.Label>
              <Col className="col-9 d-flex justify-content-end ">
                <div className="form-check form-check-inline mx-2 d-flex flex-row-reverse align-items-center">
                  <label className="form-check-label mx-2" htmlFor="no">
                    لا
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    id="no"
                    value={0}
                    name="is_sms"
                    onChange={handleChange}
                    checked={formData.is_sms.toString() === "0" ? true : false}
                  />
                </div>
                <div className="form-check form-check-inline d-flex flex-row-reverse align-items-center">
                  <label className="form-check-label mx-2" htmlFor="yes">
                    نعم
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    id="yes"
                    value={1}
                    name="is_sms"
                    onChange={handleChange}
                    checked={formData.is_sms.toString() === "1" ? true : false}
                  />
                </div>
              </Col>
            </Form.Group>
            {formData.is_sms === "1" && (
              <Fragment>
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-3">
                    :محتوى الرسالة
                  </Form.Label>
                  <Col className="col-9">
                    <Form.Control
                      type="text"
                      name="sms_message"
                      value={formData.sms_message}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-3">
                    :رسائل للتقييم السيئ
                  </Form.Label>
                  <Col className="col-9 d-flex justify-content-end ">
                    <div className="form-check form-check-inline mx-2 d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="no1">
                        لا
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="no1"
                        value={0}
                        name="sms_users[bad]"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-check form-check-inline d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="yes1">
                        نعم
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="yes1"
                        value={1}
                        name="sms_users[bad]"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-3">
                    :رسائل للتقييم الجيد
                  </Form.Label>
                  <Col className="col-9 d-flex justify-content-end ">
                    <div className="form-check form-check-inline mx-2 d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="no11">
                        لا
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="no11"
                        value={0}
                        name="sms_users[good]"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-check form-check-inline d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="yes11">
                        نعم
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="yes11"
                        value={1}
                        name="sms_users[good]"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-3">
                    :رسائل للتقييم الممتاز
                  </Form.Label>
                  <Col className="col-9 d-flex justify-content-end ">
                    <div className="form-check form-check-inline mx-2 d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="no111">
                        لا
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="no111"
                        value={0}
                        name="sms_users[perfect]"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-check form-check-inline d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="yes111">
                        نعم
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="yes111"
                        value={1}
                        name="sms_users[perfect]"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Form.Group>
              </Fragment>
            )}

            <Row>
              <Col className="col-12 ">
                {" "}
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-2">
                    :الغلاف
                  </Form.Label>
                  <Col className="col-10 d-flex justify-content-center">
                    <label htmlFor="upload-photo">
                      {img ? (
                        <img
                          src={img}
                          alt="click"
                          height="100px"
                          width="300px"
                          className=""
                          style={{ cursor: "pointer" }}
                        ></img>
                      ) : (
                        <div className="upload_icon">
                          <LuPlus />
                        </div>
                      )}
                    </label>

                    <Form.Control
                      type="file"
                      name="cover"
                      onChange={handleChange}
                      id="upload-photo"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col className="col-12 ">
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-2 ">
                    :اللوغو
                  </Form.Label>
                  <Col className="col-10 d-flex justify-content-center">
                    <label htmlFor="upload-photo-logo">
                      {imgLogo ? (
                        <img
                          src={imgLogo}
                          alt="click"
                          height="100px"
                          width="100px"
                          style={{ cursor: "pointer" }}
                        ></img>
                      ) : (
                        <div className="upload_icon_logo">
                          <LuPlus />
                        </div>
                      )}
                    </label>

                    <Form.Control
                      type="file"
                      name="logo"
                      onChange={handleChange}
                      id="upload-photo-logo"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="mt-2">
            <button className="btn_cancel" onClick={handleCloseAddAdmin}>
              تجاهل
            </button>

            {isPress ? (
              <button className="btn_save" disabled>
                <Spinner
                  className="m-auto"
                  animation="border"
                  role="status"
                ></Spinner>
              </button>
            ) : (
              <button type="submit" className="btn_save">
                حفظ
              </button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={editAdmin}
        onHide={handleCloseEditAdmin}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title> تعديل أدمن</Modal.Title>
        </Modal.Header>
        <Form className="post_form" onSubmit={handleSubmitEditAdmin}>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :الاسم
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :اسم المستخدم
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :رابط الفيسبوك
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="facebook_url"
                  value={formData.facebook_url}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :رابط الانستغرام
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="instagram_url"
                  value={formData.instagram_url}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :الواتساب
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="number"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :العنوان
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :رقم الهاتف
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :تاريخ النهاية
              </Form.Label>
              <Col className="col-9">
                <Form.Control
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :الحجم
              </Form.Label>
              <Col className="col-9">
                <select
                  onChange={handleChange}
                  name="storage_id"
                  className="form-control  w-100"
                  value={formData.storage_id}
                  dir={"rtl"}
                >
                  <option value="0">اختيار الحجم</option>
                  {sizes &&
                    sizes.map((size, index) => {
                      return (
                        <option key={index} value={size.id}>
                          {size.size} mb
                        </option>
                      );
                    })}
                </select>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :الرسائل
              </Form.Label>
              <Col className="col-9 d-flex justify-content-end ">
                <div className="form-check form-check-inline mx-2 d-flex flex-row-reverse align-items-center">
                  <label className="form-check-label mx-2" htmlFor="no">
                    لا
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    id="no"
                    value={0}
                    name="is_sms"
                    onChange={handleChange}
                    checked={formData.is_sms.toString() === "0" ? true : false}
                  />
                </div>
                <div className="form-check form-check-inline d-flex flex-row-reverse align-items-center">
                  <label className="form-check-label mx-2" htmlFor="yes">
                    نعم
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    id="yes"
                    value={1}
                    name="is_sms"
                    onChange={handleChange}
                    checked={formData.is_sms.toString() === "1" ? true : false}
                  />
                </div>
              </Col>
            </Form.Group>
            {formData.is_sms.toString() === "1" && (
              <Fragment>
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-3">
                    :محتوى الرسالة
                  </Form.Label>
                  <Col className="col-9">
                    <Form.Control
                      type="text"
                      name="sms_message"
                      value={formData.sms_message}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-3">
                    :رسائل للتقييم السيئ
                  </Form.Label>
                  <Col className="col-9 d-flex justify-content-end ">
                    <div className="form-check form-check-inline mx-2 d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="no1">
                        لا
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="no1"
                        value={0}
                        name="sms_users[bad]"
                        onChange={handleChange}
                        checked={
                          formData["sms_users[bad]"].toString() === "0"
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="form-check form-check-inline d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="yes1">
                        نعم
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="yes1"
                        value={1}
                        name="sms_users[bad]"
                        onChange={handleChange}
                        checked={
                          formData["sms_users[bad]"].toString() === "1"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-3">
                    :رسائل للتقييم الجيد
                  </Form.Label>
                  <Col className="col-9 d-flex justify-content-end ">
                    <div className="form-check form-check-inline mx-2 d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="no11">
                        لا
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="no11"
                        value={0}
                        name="sms_users[good]"
                        onChange={handleChange}
                        checked={
                          formData["sms_users[good]"].toString() === "0"
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="form-check form-check-inline d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="yes11">
                        نعم
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="yes11"
                        value={1}
                        name="sms_users[good]"
                        onChange={handleChange}
                        checked={
                          formData["sms_users[good]"].toString() === "1"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-3">
                    :رسائل للتقييم الممتاز
                  </Form.Label>
                  <Col className="col-9 d-flex justify-content-end ">
                    <div className="form-check form-check-inline mx-2 d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="no111">
                        لا
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="no111"
                        value={0}
                        name="sms_users[perfect]"
                        onChange={handleChange}
                        checked={
                          formData["sms_users[perfect]"].toString() === "0"
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="form-check form-check-inline d-flex flex-row-reverse align-items-center">
                      <label className="form-check-label mx-2" htmlFor="yes111">
                        نعم
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="yes111"
                        value={1}
                        name="sms_users[perfect]"
                        onChange={handleChange}
                        checked={
                          formData["sms_users[perfect]"].toString() === "1"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </Col>
                </Form.Group>
              </Fragment>
            )}

            <Row>
              <Col className="col-12 ">
                {" "}
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-2">
                    :الغلاف
                  </Form.Label>
                  <Col className="col-10 d-flex justify-content-center">
                    <label htmlFor="upload-photo">
                      {img ? (
                        <img
                          src={img}
                          alt="click"
                          height="100px"
                          width="300px"
                          className=""
                          style={{ cursor: "pointer" }}
                        ></img>
                      ) : (
                        <div className="upload_icon">
                          <LuPlus />
                        </div>
                      )}
                    </label>

                    <Form.Control
                      type="file"
                      name="cover"
                      onChange={handleChange}
                      id="upload-photo"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col className="col-12 ">
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label column className="col-2 ">
                    :اللوغو
                  </Form.Label>
                  <Col className="col-10 d-flex justify-content-center">
                    <label htmlFor="upload-photo-logo">
                      {imgLogo ? (
                        <img
                          src={imgLogo}
                          alt="click"
                          height="100px"
                          width="100px"
                          style={{ cursor: "pointer" }}
                        ></img>
                      ) : (
                        <div className="upload_icon_logo">
                          <LuPlus />
                        </div>
                      )}
                    </label>

                    <Form.Control
                      type="file"
                      name="logo"
                      onChange={handleChange}
                      id="upload-photo-logo"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="mt-2">
            <button className="btn_cancel" onClick={handleCloseEditAdmin}>
              تجاهل
            </button>

            {isPress ? (
              <button className="btn_save" disabled>
                <Spinner
                  className="m-auto"
                  animation="border"
                  role="status"
                ></Spinner>
              </button>
            ) : (
              <button type="submit" className="btn_save">
                حفظ
              </button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header
          className="my-5 d-flex justify-content-center"
          style={{ paddingTop: "50px" }}
        >
          <Modal.Title> هل انت متأكد من حذف هذا الادمن ؟</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div className="mb-5">
            <button className="btn_cancel" onClick={handleCloseDelete}>
              تجاهل
            </button>

            {isPress ? (
              <button className="btn_save" disabled>
                <Spinner className="m-auto" animation="border" role="status">
                  `
                </Spinner>
              </button>
            ) : (
              <button
                onClick={() => handleDeleteAdmin(showDelete)}
                className="btn_save"
              >
                نعم
              </button>
            )}
          </div>

          <br />
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        size="lg"
        dir="rtl"
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title> معلومات الأدمن</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="admin_details">
            <p>
              <strong>الاسم: </strong>
              {formData.name}
            </p>
            <p>
              <strong>اسم المستخدم: </strong>
              {formData.user_name}
            </p>

            <p>
              <strong>رابط الفيسبوك: </strong>
              {formData.facebook_url}
            </p>

            <p>
              <strong>رابط الانستغرام: </strong>
              {formData.instagram_url}
            </p>
            <p>
              <strong>رقم الواتساب: </strong>
              {formData.whatsapp}
            </p>
            <p>
              <strong>العنوان: </strong>
              {formData.address}
            </p>
            <p>
              <strong>رقم الهاتف: </strong>
              {formData.phone}
            </p>
            <p>
              <strong>تاريخ النهاية: </strong>
              {formData.end_date}
            </p>
            <p>
              <strong>المساحة المتوفرة: </strong>
              {formData.storage_size}
            </p>
            <p>
              <strong>الرسائل: </strong>
              {formData.is_sms.toString() === "1" ? "نعم" : "لا"}
            </p>
            <p>
              <strong>الرابط: </strong>
              <Link
                to={`https://pdfapp.levantsy.com/${formData.name}`}
                target="_blank"
              >{`https://pdfapp.levantsy.com/${formData.name}`}</Link>
            </p>
            {formData.is_sms.toString() === "1" && (
              <div>
                <p>
                  <strong>عدد الرسائل: </strong>
                  {formData.count_sms}
                </p>
                <p>
                  <strong>محتوى الرسالة: </strong>
                  {formData.sms_message}
                </p>
                <p>
                  <strong>رسائل للتقييم السيئ: </strong>
                  {formData.sms_user && formData.sms_user.bad.toString() === "1"
                    ? "نعم"
                    : "لا"}
                </p>
                <p>
                  <strong>رسائل للتقييم الجيد: </strong>
                  {formData.sms_user &&
                  formData.sms_user.good.toString() === "1"
                    ? "نعم"
                    : "لا"}
                </p>
                <p>
                  <strong>رسائل للتقييم الممتاز: </strong>
                  {formData.sms_user &&
                  formData.sms_user.perfect.toString() === "1"
                    ? "نعم"
                    : "لا"}
                </p>
              </div>
            )}
            <p>
              <strong>الغلاف: </strong>

              <img
                src={img}
                alt=""
                height="100px"
                width="300px"
                className=""
                style={{ cursor: "pointer" }}
              ></img>
            </p>
            <p>
              <strong>اللوغو: </strong>
              <img
                src={imgLogo}
                alt=""
                height="100px"
                width="300px"
                className=""
                style={{ cursor: "pointer" }}
              ></img>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="my-3">
          <button className="btn_cancel" onClick={handleClose}>
            إغلاق
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddSms} onHide={handleCloseAddSms} centered>
        <Modal.Header className="mt-3 mb-5 d-flex justify-content-center">
          <Modal.Title> اضافة رسائل</Modal.Title>
        </Modal.Header>
        <Form className="w-75 mx-auto " onSubmit={handleSubmitAddSms}>
          <Modal.Body className="mb-5 d-flex flex-row-reverse align-items-center justify-content-between">
            <Form.Label className="mx-1 ">:الكمية</Form.Label>

            <Form.Control
              size="lg"
              className="px-1"
              type="number"
              value={quantity}
              onChange={handleChangeQuantity}
            />
          </Modal.Body>
          <Modal.Footer>
            <div className="mb-5">
              <button
                className="btn_cancel"
                type="button"
                onClick={handleCloseAddSms}
              >
                تجاهل
              </button>

              {isPress ? (
                <button className="btn_save" disabled>
                  <Spinner
                    className="m-auto"
                    animation="border"
                    role="status"
                  ></Spinner>
                </button>
              ) : (
                <button type="submit" className="btn_save">
                  حفظ
                </button>
              )}
            </div>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer />
    </div>
  );
}
