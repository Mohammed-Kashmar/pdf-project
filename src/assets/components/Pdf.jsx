import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "./Admin/utility/pagination/Pagination";
import download from "../../images/Group 589.png";
import { Dropdown } from "react-bootstrap";
import vector from "../../images/Vector.png";
import { Button, Form, Modal } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import { IoIosStar } from "react-icons/io";
import { MdDownload } from "react-icons/md";
import mime from 'mime-types';
import ReactPlayer from 'react-player';

const initialState = {
  pdf_id: "",
  rate: "",
  name: "",
  phone: "",
  gender: "",
  birthday: "",
  note: "",
  country_id:""
};

export const Pdf = ({ viewPdf, setViewPdf }) => {
  const currentDate = new Date().toISOString().split('T')[0];

  const pdfUrl =
    "https://api-rating.watanyia.com/user_api/show_one_pdf?pdfId=8";

  const navigate = useNavigate();
  const [isPress, setIsPress] = useState(false);

  const { name } = useParams();
  const [downloadOrView, setDownloadOrView] = useState(0);
  const [countries, setCountries] = useState([]);

  const [pdf, setPdf] = useState([]);
  const [viewpdf, setviewpdf] = useState([]);
  const [itemClicked, setItemClicked] = useState([]);
  // console.log(formData.country_id);
  const adminId = localStorage.getItem("admin_id");

  const getAllPdf = async (page) => {
    const respons = await axios.get(
      `https://api-rating.watanyia.com/user_api/show_pdfs?adminId=${adminId}&page=${page}`
    );
    console.log(respons.data);
    setPdf(respons.data);
  };

  const getAllCountries = async () => {
    const respons = await axios.get(
      `https://api-rating.watanyia.com/user_api/show_countries`
    );
    console.log(respons);
    setCountries(respons.data.data);
  };
  useEffect(() => {
    getAllPdf("");
    getAllCountries();
  }, []);

  const onPress = async (page) => {
    getAllPdf(page);
  };

  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [showInterPassword, setShowInterPassword] = useState(false);
  const handleShowInterPassword = () => setShowInterPassword(true);
  const handleCloseInterPassword = () => setShowInterPassword(false);
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleShowSuccessPassword = async () => {
    try {
      const respons = await axios.get(
        `https://api-rating.watanyia.com/user_api/show_one_pdf?pdfId=${itemClicked.id}&password=${password}`
      );
      if (respons.data.code === 200) {
        handleCloseInterPassword();
        if (downloadOrView === 1) handleShowPdf();
        else if (downloadOrView === 2) {
          if((`https://api-rating.watanyia.com/storage/${itemClicked.location}`).slice(-3) === 'pdf'){
            toast.promise(
              new Promise((resolve, reject) => {
              const localFilePath = ` https://api-rating.watanyia.com/storage/${itemClicked.location}`;
          axios
            .get(localFilePath, {
              responseType: "blob",
            })
            .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", itemClicked.title + ".pdf"); // Set desired filename
              document.body.appendChild(link);
              link.click();
              resolve();
            }).catch(reject);
          }),
          {
            pending: "Downloading. Please wait minutes...", // رسالة ال toast عند بدء التنزيل
            success: "Download completed successfully.", // رسالة ال toast عند نجاح التنزيل
            error: "Download failed." // رسالة ال toast عند فشل التنزيل
          },
          {
            closeOnClick: false // تعيين خيارات الـToast الإضافية
          })
            .catch((error) => {
              console.error("Error downloading PDF:", error);
              toast.error("Download Failed")
            });
          }else{
            const getExtension = (url) => {
              return url.split('.').pop().toLowerCase();
          };
          toast.promise(
            new Promise((resolve, reject) => {
            const localFilePath = `https://api-rating.watanyia.com/storage/${itemClicked.location}`;
      axios
          .get(localFilePath, {
              responseType: "blob",
          })
          .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              
              // Get the extension from the URL
              const extension = getExtension(localFilePath);              
              if (extension === 'mp4' || extension === 'mov' || extension === 'avi' || extension === 'mkv' || extension === 'wmv') {
                // console.log(item.name+"."+"extension")
                  link.setAttribute("download", itemClicked.title + "." + extension);
                  document.body.appendChild(link);
                  link.click();
                 resolve()
              } else {
                reject(new Error('Unsupported file format'));
              }
          }) .catch(reject);
        }),
        {
          pending: "Downloading. Please wait minutes...", // رسالة ال toast عند بدء التنزيل
          success: "Download completed successfully.", // رسالة ال toast عند نجاح التنزيل
          error: "Download failed." // رسالة ال toast عند فشل التنزيل
        },
        {
          closeOnClick: false // تعيين خيارات الـToast الإضافية
        })
          .catch((error) => {
              console.error("Error downloading video:", error);
              toast.error("Failed to download video.");
          });
          }
        }
      }
    } catch (e) {
      toast.error("Password Wrong");
    }
  };
  const [showrit, setShowrit] = useState(false);
  const handleCloseRit = () => setShowrit(false);
  const handleShowRit = (id) => {
    setFormData({
      ...formData,
      pdf_id: id,
    });
    setShowrit(true);
  };
  const [personalInformation, setPersonalInformation] = useState(false);
  const handleClosePersonalInformationt = () => setPersonalInformation(false);
  const handleShowPersonalInformation = () => setPersonalInformation(true);
  const [showPdf, setShowPdf] = useState(false);
  const handleClosePdf = () => {
    setShowPdf(false);
    setItemClicked([]);
    setPassword("");
    setDownloadOrView(0);
  };
  const handleShowPdf = () => setShowPdf(true);
  const handleClickPdf = (item) => {
    setDownloadOrView(1);
    if (item.is_lock === 0) {
      setItemClicked(item);
      handleShowPdf();
    } else if (item.is_lock === 1) {
      setItemClicked(item);
      console.log("password");
      setShowInterPassword(true);
    }
  };

  const handleClickFirst = () => {
    if (formData.note === "" || formData.rate === "" || formData.country_id ==="") {
      toast.warn("Enter All Inputs");
      return;
    } else if (formData.phone.length !== 9) {
      toast.warn("The phone must be 9 number");
      return;
    } else {
      handleShowPersonalInformation();
      handleCloseRit(false);
    }
  };

  const handleClickSecond = async () => {
    if (
      formData.name === ""
    ) {
      toast.warn("Enter Name Please");
      return;
    } else {
      try{
        setIsPress(true);
        const respons = await axios.post(
          `https://api-rating.watanyia.com/user_api/add_rate`,
          formData
        );
        setIsPress(false);
        if (respons.data.code === 200) {
          setFormData(initialState)
          toast.success("Rate Add Successfully");
          setFormData(initialState);
          handleClosePersonalInformationt();
        } else {
          toast.error("error");
        }
        console.log(respons);
        console.log(formData);
      }catch(e){
        setIsPress(false)
        toast.error("error")
        // console.log(error)
      }
    }
  };

  const downloadFile = async (item) => {
    if((`https://api-rating.watanyia.com/storage/${item.location}`).slice(-3) === 'pdf'){
      if (item.is_lock === 0) {
        toast.promise(
          new Promise((resolve, reject) => {  
          const localFilePath = ` https://api-rating.watanyia.com/storage/${item.location}`;
        axios
          .get(localFilePath, {
            responseType: "blob",
          })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", item.title + ".pdf"); // Set desired filename
            document.body.appendChild(link);
            link.click();
            resolve();
          }).catch(reject);
        }),
        {
          pending: "Downloading. Please wait minutes...", // رسالة ال toast عند بدء التنزيل
          success: "Download completed successfully.", // رسالة ال toast عند نجاح التنزيل
          error: "Download failed." // رسالة ال toast عند فشل التنزيل
        },
        {
          closeOnClick: false // تعيين خيارات الـToast الإضافية
        })
          .catch((error) => {
            console.error("Error downloading PDF:", error);
            toast.error("Download Failed")
          });
      } else if (item.is_lock === 1) {
        setDownloadOrView(2);
        setItemClicked(item);
        setShowInterPassword(true);
      }
    }else{
      const getExtension = (url) => {
        return url.split('.').pop().toLowerCase();
    };
    if (item.is_lock === 0) {
      toast.promise(
        new Promise((resolve, reject) => {
        const localFilePath = `https://api-rating.watanyia.com/storage/${item.location}`;
      axios
          .get(localFilePath, {
              responseType: "blob",
          })
          .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              
              // Get the extension from the URL
              const extension = getExtension(localFilePath);              
              if (extension === 'mp4' || extension === 'mov' || extension === 'avi' || extension === 'mkv' || extension === 'wmv') {
                // console.log(item.name+"."+"extension")
                  link.setAttribute("download", item.title + "." + extension);
                  document.body.appendChild(link);
                  link.click();
                  resolve()
              } else {
                reject(new Error('Unsupported file format')); // إنهاء الوعد بخطأ
              }
          }).catch(reject);}),
          {
            pending: "Downloading. Please wait minutes...", // رسالة ال toast عند بدء التنزيل
            success: "Download completed successfully.", // رسالة ال toast عند نجاح التنزيل
            error: "Download failed." // رسالة ال toast عند فشل التنزيل
          },
          {
            closeOnClick: false // تعيين خيارات الـToast الإضافية
          })
          .catch((error) => {
              console.error("Error downloading video:", error);
              toast.error("Failed to download video.");
          });
  } else if (item.is_lock === 1) {
      setDownloadOrView(2);
      setItemClicked(item);
      setShowInterPassword(true);
  }
    }
  };

  const ratingChanged = (newRating) => {
    // setRate(newRating);
    setFormData({
      ...formData,
      rate: newRating,
    });
    console.log(newRating);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <div className="pdf">
      {/* <h1 className="pdfh1">PDF</h1> */}
      {}
      <Row className="justify-content-end" style={{ marginLeft: "auto" }}>
        {pdf &&
          pdf.data &&
          pdf.data.map((item, index) => {
            return (
              <Col key={index} className="col-lg-4 col-md-4 col-6 mb-5">
                <div className="trip">
                  <div className="triptext">
                    <h5>{item.title} </h5>
                    <span>{item.description}</span>
                  </div>
                  <div
                    className="tripphoto"
                    onClick={() => {
                      handleClickPdf(item);
                    }}
                  >
                    <img
                      src={`https://api-rating.watanyia.com/storage/${item.cover}`}
                      alt=""
                    />
                  </div>

                  <div className="rating">
                    <IoIosStar
                      className="R p-1"
                      onClick={() => handleShowRit(item.id)}
                    />
                    {/* <h5 className="R" onClick={() => handleShowRit(item.id)}>R</h5> */}
                    {/* <img
                            style={{ width: "35px", height: "35px" }}
                            src={download}
                            alt=""
                            className="p-1"
                    /> */}
                    {
                      
                    }
                    <div>
                    <MdDownload
                      onClick={() => {
                        downloadFile(item);
                      }}
                      className="R p-1"
                    />
                    </div>
                  </div>

                  {/* <div className="rating">
                     <Dropdown className="wasem">
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                        <img className="wasemimg" src={vector} alt="" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="drop_down drop">
                        <Dropdown.Item
                          target="_blank"
                          className="dorp_down_item"
                          onClick={() => {
                            downloadFile(item.location, item.name);
                          }}
                        >
                          <img
                            style={{ width: "35px", height: "35px" }}
                            src={download}
                            alt=""
                          />
                        </Dropdown.Item>

                        <Dropdown.Item
                          target="_blank"
                          className="dorp_down_item"
                        >
                          <div
                            className="R"
                            onClick={() => handleShowRit(item.id)}
                          >
                            R
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> 
                  </div> */}
                </div>
              </Col>
            );
          })}
        {pdf && pdf.last_page > 1 ? (
          <Pagination onPress={onPress} pageCount={pdf.last_page} />
        ) : null}
      </Row>
      <Modal show={showrit} onHide={handleCloseRit} centered>
        <Modal.Header className="update p-3">
          <Modal.Title className="update"> PDF تقييم </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <div className="rating-container">
            <Rating
              count={5}
              onChange={ratingChanged}
              size={60}
              activeColor="#ffd700"
            />
          </div>
          <Form>
            <Form.Group
              className="  mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="سبب التقييم"
                autoFocus
                className="input p-2"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex align-items-center w-100"
              style={{ position: "relative" }}
              controlId="exampleForm.ControlInput1"
            >
              <div className="numbersyria">
                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  style={{ position: "relative" }}
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Select
                    className="selec w-100 p-2"
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleChange}
                  >
                    {countries.map((item, index) => {
                      return (
                        <option key={index} value={item.id} onChange={handleChange}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </div>

              <Form.Control
                type="text"
                placeholder=" الرقم "
                className="input p-2"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          <div className="bb">
            <Button className="button-modal mt-4" onClick={handleCloseRit}>
              تجاهل
            </Button>
            <Button className="button-modal mt-4" onClick={handleClickFirst}>
              تأكيد
            </Button>
          </div>

          <br />
        </Modal.Body>
      </Modal>

      <Modal
        show={personalInformation}
        onHide={handleClosePersonalInformationt}
        centered
      >
        <Modal.Header className="update">
          <Modal.Title className="update p-3"> المعلومات الشخصية </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <Form>
            <Form.Group
              className="  mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="الاسم"
                autoFocus
                className="input p-2"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              style={{ position: "relative" }}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="date"
                placeholder=" الميلاد "
                className="input p-2"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                max={currentDate}
              />
            </Form.Group>
            <div
              className="radioGender"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginRight: "30px",
              }}
            >
              <div className="form-check">
                <label className="form-check-label" htmlFor="exampleRadio1">
                  انثى
                </label>
                <input
                  className="form-check-input radio-input"
                  type="radio"
                  name="gender"
                  id="exampleRadio1"
                  value="female"
                  onChange={handleChange}
                />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="exampleRadio2">
                  ذكر
                </label>
                <input
                  className="form-check-input radio-input"
                  type="radio"
                  name="gender"
                  id="exampleRadio2"
                  value="male"
                  onChange={handleChange}
                />
              </div>
              <div className="gen">الجنس</div>
            </div>
          </Form>
          <div className="bb">
            <Button
              className="button-modal mt-4"
              onClick={handleClosePersonalInformationt}
            >
              تجاهل
            </Button>
            {isPress ? (
              <Button className="button-modal mt-4">
                <Spinner
                  className=""
                  animation="border"
                  role="status"
                ></Spinner>
              </Button>
            ) : (
              <Button className="button-modal mt-4" onClick={handleClickSecond}>
                تأكيد
              </Button>
            )}
          </div>

          <br />
        </Modal.Body>
      </Modal>

      <Modal show={showPdf} onHide={handleClosePdf} centered height={"100px"}>
  <Modal.Header className="update">
    {/* <Modal.Title className="update p-3"> المعلومات الشخصية </Modal.Title> */}
  </Modal.Header>
  <Modal.Body className="p-3">
    <div>
      {
        (`https://api-rating.watanyia.com/storage/${itemClicked.location}`).slice(-3) === 'pdf' ? (
          <iframe
            src={`https://api-rating.watanyia.com/storage/${itemClicked.location}`}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        ) : (
          <div>
            <ReactPlayer
              url={`https://api-rating.watanyia.com/storage/${itemClicked.location}`}
              controls={true}
              width="100%"
              height="100%"
              config={{
                            file: {
                              attributes: {
                                controlsList: "nodownload", // تعطيل خيار تنزيل الفيديو
                              },
                            },
                          }}
            />
          </div>
        )
      }
    </div>
  </Modal.Body>
</Modal>

      <Modal
        show={showInterPassword}
        onHide={handleCloseInterPassword}
        centered
      >
        <Modal.Header className="update p-3">
          <Modal.Title className="update"> أدخال كلمة المرور </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <Form>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              style={{ position: "relative" }}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="password"
                placeholder=" كلمة المرور "
                className="input p-2"
                autoFocus
                // name="phone"
                // value={formData.phone}
                onChange={handleChangePassword}
              />
            </Form.Group>
          </Form>
          <div className="bb">
            <Button
              className="button-modal mt-4"
              onClick={handleCloseInterPassword}
            >
              تجاهل
            </Button>
            <Button
              className="button-modal mt-4"
              onClick={handleShowSuccessPassword}
            >
              تأكيد
            </Button>
          </div>

          <br />
        </Modal.Body>
      </Modal>




      
      

      <ToastContainer autoClose={false}/>
    </div>
  );
};
