import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer } from "react-toastify";
import { useInsertData } from "../../../hooks/useInsertData";
import notify from "../../../assets/components/utility/useNotification";
import logo from "../../../images/logo.png";
import pdf from "../../../images/PDF.png";
import "./LoginPage.css";

const LoginPage = () => {
  const [language, setLanguage] = useState("ar");
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const [resLogin, setResLogin] = useState([]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (user_name === "") {
      notify("Please Enter username", "error");
      return;
    } else if (password === "") {
      notify("Please Enter Password", "error");
      return;
    }

    setloading(true);
    setIsPress(true);

    const response = await useInsertData(`/admin_api/login?model=Admin`, {
      user_name,
      password,
    });
    // console.log(response.data);
    setResLogin(response.data);
    setloading(false);
    setIsPress(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (resLogin && resLogin.success === true) {
        localStorage.setItem("token", resLogin.data.token);
        localStorage.setItem("name", resLogin.data.name);
        localStorage.setItem("user",  JSON.stringify(resLogin.data));
        notify(resLogin.message, "success");
        setUsername("");
        setPassword("");
        setTimeout(() => {
          window.location.href = "/admin/news";
        }, 1500);
      } else {
        notify(resLogin.message, "error");
      }
    }
  }, [loading]);

  return (
    <div className=" login_container container-fluid">
      <Row className="h-100">
        <Col
          sm={12}
          lg={6}
          className="d-flex align-items-center justify-content-center"
        >
          <img src={logo} alt="logo" className="logo_left" />
        </Col>
        <Col
          sm={12}
          lg={6}
          className="d-flex align-items-center justify-content-around"
        >
          <Form className="form_login" onSubmit={onSubmit}>
            <img src={pdf} alt="" className="mb-5" />
            <h3 className="mb-5">
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </h3>
            <Form.Group as={Row} className="mb-3 justify-content-center w-100">
              <Col>
                <Form.Control
                  type="text"
                  placeholder={language === "ar" ? "اسم المستخدم" : "username"}
                  value={user_name}
                  onChange={onChangeUsername}
                  dir={language === "ar" ? "rtl" : "ltr"}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 justify-content-center w-100">
              <Col>
                <Form.Control
                  type="password"
                  placeholder={language === "ar" ? "كلمة المرور" : "password"}
                  value={password}
                  onChange={onChangePassword}
                  lang="ar"
                  dir={language === "ar" ? "rtl" : "ltr"}
                />
              </Col>
            </Form.Group>
            {isPress ? (
              <button className="mt-5" type='button'>
                <Spinner
                  className="m-auto"
                  animation="border"
                  role="status"
                ></Spinner>
              </button>
            ) : (
              <button className="mt-5" type="submit">
                {" "}
                {language === "ar" ? "تسجيل الدخول" : "Login"}
              </button>
            )}
          </Form>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
