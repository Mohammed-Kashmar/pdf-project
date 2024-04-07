import { Col, Form, Row, Spinner } from "react-bootstrap";
import "./profileSetting.css";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useGetData } from "../../../../hooks/useGetData";
import notify from "../../utility/useNotification";
import { ToastContainer } from "react-toastify";
import { useInsertDataWithImage } from "../../../../hooks/useInsertData";
import NavBarRed from "../utility/NabBarRed/NavBarRed";
import AdminHeader from "../utility/Header/Header";

const initialState = {
  name: "",
  phone: "",
  facebook_url: "",
  instagram_url: "",
  cover: null,
  logo: null,
  password: "",
};

export const ProfileSetting = () => {
  const [formData, setFormData] = useState(initialState);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [selectedFileLogo, setSelectedFileLogo] = useState(null);
  const [img, setImg] = useState("");
  const [imgLogo, setImgLogo] = useState("");
  const [adminDetails, setAdminDetails] = useState("");
  // const [password, setPassword] = useState("");
  const [isPress, setIsPress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await useGetData(
        `/admin_api/show_admin_by_name?name=samirkh`
      );
      setAdminDetails(res);
      console.log(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      adminDetails &&
      adminDetails.data &&
      adminDetails.data.success === true
    ) {
      setFormData({
        ...formData,
        name: adminDetails.data.data.name || initialState.name,
        phone: adminDetails.data.data.admin_detail.phone || initialState.phone,
        facebook_url:
          adminDetails.data.data.admin_detail.facebook_url ||
          initialState.facebook_url,
        instagram_url:
          adminDetails.data.data.admin_detail.instagram_url ||
          initialState.instagram_url,
      });

      setImg(
        `https://api-rating.watanyia.com/storage/${adminDetails.data.data.admin_detail.cover}`
      );
      setImgLogo(
        `https://api-rating.watanyia.com/storage/${adminDetails.data.data.admin_detail.logo}`
      );
      // setSelectedFile(adminDetails.data.data.admin_detail.cover)
      // setSelectedFileLogo(adminDetails.data.data.admin_detail.logo)
    }
  }, [adminDetails]);

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImg(URL.createObjectURL(event.target.files[0]));
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };
  // const onLogoChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImgLogo(URL.createObjectURL(event.target.files[0]));
  //     setSelectedFileLogo(event.target.files[0]);
  //   }
  // };
  // const handleChangePassword = (e) => {
  //   setPassword(e.target.value);
  // };

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
  // console.log(selectedFile);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name === "") {
      notify("Please Enter Name", "error");
      return;
    } else if (formData.phone === "") {
      notify("Please Enter Phone", "error");
      return;
    }
    let form = { ...formData };

    // if (formData.logo === null && formData.cover === null && formData.password === '') {
    //   const { logo, cover,password, ...formDataWithoutLogoAndCoverAndPassword } = formData;
    //   form = formDataWithoutLogoAndCoverAndPassword;
    // } else if (formData.logo === null && formData.cover === null && formData.password !== ''){
    //   const { logo, cover, ...formDataWithoutLogoAndCover } = formData;
    //   form = formDataWithoutLogoAndCover;
    // } else {
    //   const { logo, cover, ...formDataWithoutLogoAndCover } = formData;
    //   form = formDataWithoutLogoAndCover;
    // }

    // Removing logo and cover if they are null
    if (formData.logo === null) {
      delete form.logo;
    }
    if (formData.cover === null) {
      delete form.cover;
    }
    // Removing password if it is empty
    if (formData.password === "") {
      delete form.password;
    }

    // console.log(formData.logo)
    setIsPress(true);

    const response = await useInsertDataWithImage(
      `/admin_api/update_admin?adminId=1`,
      form
    );
    console.log(response.data);
    if (response.data.success === true) {
      notify(response.data.message, "success");
    } else {
      notify(response.data.message, "error");
    }
    setIsPress(false);
  };

  return (
    <div className="setting">
      <NavBarRed />
      <Row>
        <Col>
          <h4 className="header">إعدادات الملف الشخصي</h4>
        </Col>
      </Row>
      <div className="container">
        <Form
          className="form_setting"
          style={{ flexDirection: "row-reverse" }}
          onSubmit={handleSubmit}
        >
          <Row style={{ flexDirection: "row-reverse" }}>
            <Col className="col-12 col-md-6">
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
            </Col>
            <Col className="col-12 col-md-6">
              <Row>
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label
                    column
                    className="col-3 d-flex justify-content-end justify-content-lg-start"
                  >
                    :الغلاف
                  </Form.Label>
                  <Col className="col-9 d-flex justify-content-center">
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
              </Row>
              <Row>
                {" "}
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Form.Label
                    column
                    className="col-3 d-flex justify-content-end justify-content-lg-start"
                  >
                    :اللوغو
                  </Form.Label>
                  <Col className="col-9 d-flex justify-content-center">
                    <label htmlFor="upload-photo-logo">
                      {imgLogo ? (
                        <img
                          src={imgLogo}
                          alt="click"
                          height="100px"
                          width="150px"
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
              </Row>
            </Col>
          </Row>
          <Row style={{ flexDirection: "row-reverse" }}>
            <Col className="col-12 d-flex justify-content-center mt-2 mt-lg-5">
              <button className="btn_cancel">تجاهل</button>
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
            </Col>
          </Row>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};
