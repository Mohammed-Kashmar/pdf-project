import { Fragment, useEffect, useState } from "react";
import "./pdf.css";
import NavBarRed from "../utility/NabBarRed/NavBarRed";
import AdminHeader from "../utility/Header/Header";
import { useGetData } from "../../../../hooks/useGetData";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { LuPlus } from "react-icons/lu";
import notify from "../../utility/useNotification";
import { ToastContainer } from "react-toastify";
import { useInsertDataWithImage } from "../../../../hooks/useInsertData";
import { useDeleteData } from "../../../../hooks/useDeleteData";
import Pagination from "../utility/pagination/Pagination";

const initialState = {
  admin_id: "",
  title: "",
  description: "",
  cover: null,
  location: null,
  is_lock: "0",
  password: "",
};
const Pdf = () => {
  const [formData, setFormData] = useState(initialState);
  const [addPdf, setAddPdf] = useState(false);
  const [editPdf, setEditPdf] = useState(false);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [imgs, setImgs] = useState([]);

  const [pdfs, setPdfs] = useState([]);
  const [isPress, setIsPress] = useState(false);
  const [img, setImg] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (pdf) => {
    console.log(pdf);
    setShow(pdf);
  };
  const handleCloseDelete = () => setShowDelete(null);
  const handleShowDelete = (id) => setShowDelete(id);

  const handleCloseAddPdf = () => setAddPdf(false);
  const handleShowAddPdf = () => setAddPdf(true);

  const handleCloseEditPdf = () => setEditPdf(false);
  const handleShowEditPdf = async (pdf) => {
    setEditPdf(pdf);
    setImg("");
    const res = await useGetData(`/admin_api/show_one_pdf?pdfId=${pdf.id}`);
    console.log(res);
    setFormData({
      title: res.data.data.title || initialState.title,
      description: res.data.data.description || initialState.description,
      cover: null,
    });
    setImg(`https://api-rating.watanyia.com/storage/${res.data.data.cover}`);
  };

  const userData = JSON.parse(localStorage.getItem("user"));
  const fetchData = async (page) => {
    setLoadingFirst(true);
    const res = await useGetData(
      `/admin_api/show_pdfs?adminId=${userData.id}&page=${page}`
    );
    setLoadingFirst(false);
    // setPdfs(res);
    if (res.status === 200) {
      setPdfs(res.data);
    } else if (res.status === 404) {
      setPdfs([]);
    }
    console.log(res);
  };
  useEffect(() => {
    fetchData("");
  }, []);

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
  };

  const handleSubmitAddPdf = async (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user"));

    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.cover === null ||
      formData.location === null
    ) {
      notify("Please Enter Data", "error");
      return;
    }

    if (formData.is_lock === "1") {
      if (formData.password.length < 4 ) {
        notify("The password must be 4 charachter", "error");
        return;
      }
    }

    let updatedFormData = { ...formData };
    updatedFormData = {
      ...updatedFormData,
      admin_id: userData.id,
    };
    setIsPress(true);
    const response = await useInsertDataWithImage(
      `/admin_api/add_pdf`,
      updatedFormData
    );
    console.log(response.data);
    if (response.data.success === true) {
      notify(response.data.message, "success");
      setFormData(initialState);
      handleCloseAddPdf();
      setImg("");
      fetchData("");
    } else {
      notify(response.data.message, "error");
    }
    setIsPress(false);
  };

  const handleSubmitEditPdf = async (e) => {
    e.preventDefault();

    let form = { ...formData };
    console.log(formData);
    if (formData.cover === null) {
      delete form.cover;
    }

    setIsPress(true);

    const response = await useInsertDataWithImage(
      `/admin_api/update_pdf?pdfId=${editPdf.id}`,
      form
    );
    console.log(response.data);
    if (response.data.success === true) {
      notify(response.data.message, "success");
      handleCloseEditPdf();
      fetchData("");
    } else {
      notify(response.data.message, "error");
    }
    setIsPress(false);
  };

  const handleDeletePdf = async (id) => {
    setIsPress(true);
    const response = await useDeleteData(`/admin_api/delete_pdf?pdfId=${id}`);
    setIsPress(false);
    if (response.data.success === true) {
      notify(response.data.message, "success");
      handleCloseDelete();
      fetchData("");
    } else {
      notify(response.data.message, "error");
    }
  };
  const onPress = async (page) => {
    fetchData(page);
  };
  return (
    <Fragment>
      <NavBarRed />
      <AdminHeader
        text=" الملفات"
        btnText="PDF اضافة "
        onButtonClick={handleShowAddPdf}
      />

      <div className="table-responsive table_container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">اسم الملف </th>
              <th scope="col">الوصف</th>
              <th scope="col">الحدث</th>
            </tr>
          </thead>
          {loadingFirst === false ? (
            <tbody>
              {pdfs && pdfs.data && pdfs.data.length > 0 ? (
                pdfs.data.map((pdf) => (
                  <tr key={pdf.id}>
                    <td>{pdf.title}</td>
                    <td>{pdf.description}</td>
                    <td>
                      <FaEye onClick={() => handleShow(pdf)} />
                      <MdEdit onClick={() => handleShowEditPdf(pdf)} />
                      <MdDelete onClick={() => handleShowDelete(pdf.id)} />
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
          ) : (
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
          )}
        </table>
      </div>

      {pdfs && pdfs.last_page > 1 ? (
        <Pagination onPress={onPress} pageCount={pdfs.last_page} />
      ) : null}

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>تفاصيل العقد</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col p-4 d-flex flex-column justify-content-center align-items-center">
                <img
                  src={`https://api-rating.watanyia.com/storage/${show.cover}`}
                  alt=""
                  style={{ width: "300px" }}
                />
              </div>
              <div className="col p-4 d-flex flex-column justify-content-start align-items-center">
                <p className="py-1  d-flex flex-row-reverse">
                  <strong className="mx-1">:العنوان</strong>
                  {show.title}
                </p>
                <p className="py-1">
                  <strong className="mx-1">حجم الملف:</strong>
                  {show.size_of_file}
                </p>
                <div className=" py-1  d-flex flex-row-reverse">
                  <strong className="mx-1">:الوصف</strong> <p className="w-100 text-break">{show.description}</p>
                </div>
                <p className=" py-1">
                  <strong className="mx-1">الخصوصية:</strong> {show.is_lock === 0 ? 'عام' : "خاص"}
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={addPdf}
        onHide={handleCloseAddPdf}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title> Pdf أضافة </Modal.Title>
        </Modal.Header>
        <Form className="post_form" onSubmit={handleSubmitAddPdf}>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :اضافة ملف
              </Form.Label>
              <Col className="col-10 d-flex justify-content-center">
                <Form.Control
                  type="file"
                  name="location"
                  onChange={handleChange}
                  id="upload-file"
                  dir="rtl"
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :اسم الملف
              </Form.Label>
              <Col className="col-10">
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  dir="rtl"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :شرح عن الملف
              </Form.Label>
              <Col className="col-10">
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  dir="rtl"
                />
              </Col>
            </Form.Group>

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
                      className="img_label"
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

            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-3">
                :الخصوصية
              </Form.Label>
              <Col className="col-9 d-flex justify-content-end ">
                <div className="form-check form-check-inline mx-2 d-flex flex-row-reverse align-items-center">
                  <label className="form-check-label mx-2" htmlFor="no">
                    عام
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    id="no"
                    value={0}
                    name="is_lock"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check form-check-inline d-flex flex-row-reverse align-items-center">
                  <label className="form-check-label mx-2" htmlFor="yes">
                    خاص
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    id="yes"
                    value={1}
                    name="is_lock"
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Form.Group>

            {formData.is_lock === "1" && (
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
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    maxLength={4}
                  />
                </Col>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn_cancel" onClick={handleCloseAddPdf}>
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
        show={editPdf}
        onHide={handleCloseEditPdf}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title> Pdf تعديل </Modal.Title>
        </Modal.Header>
        <Form className="post_form" onSubmit={handleSubmitEditPdf}>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :اسم الملف
              </Form.Label>
              <Col className="col-10">
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  dir="rtl"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :شرح عن الملف
              </Form.Label>
              <Col className="col-10">
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  dir="rtl"
                />
              </Col>
            </Form.Group>

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
                      className="img_label"
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
          </Modal.Body>
          <Modal.Footer>
            <button className="btn_cancel" onClick={handleCloseEditPdf}>
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
          <Modal.Title> هل انت متأكد من حذف هذا الملف ؟</Modal.Title>
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
                onClick={() => handleDeletePdf(showDelete)}
                className="btn_save"
              >
                نعم
              </button>
            )}
          </div>

          <br />
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Fragment>
  );
};

export default Pdf;
