import { useParams } from "react-router-dom";
import { Navbar } from "../assets/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import download from "../images/Group 589.png";
import { Button, Form, Modal } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  pdf_id: "",
  rate: "",
  name: "",
  phone: "",
  gender: "",
  birthday: "",
  note:""
};
export const DetailsPdf = () => {
  
  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  console.log(id);
  

  const [showrit, setShowrit] = useState(false);
  const handleCloseRit = () => setShowrit(false);
  const handleShowRit = () => setShowrit(true);

  const [personalInformation, setPersonalInformation] = useState(false);
  const handleClosePersonalInformationt = () => setPersonalInformation(false);
  const handleShowPersonalInformation = () => setPersonalInformation(true);

  const handleClickFirst = () => {
    if (formData.note === "" || formData.rate ==="") {
      toast.warn("Enter All Inputs");
      return;
    }else  if(formData.phone.length !== 9){
      toast.warn("The phone must be 9 number");
      return;
    } 
    
    else {
      handleShowPersonalInformation();
      handleCloseRit(false);
    }
  };

  useEffect(()=>{
    setFormData({
      ...formData,
      pdf_id: id,
    });
  },[])

  const handleClickSecond = async() => {
    if (formData.gender === "" || formData.birthday === "" || formData.name ==="") {
      toast.warn("Enter All Inputs");
      return;
    } 
    else{
      const respons = await axios.post(
        `https://api-rating.watanyia.com/user_api/add_rate`,formData
      );
      if(respons.data.code === 200){
        toast.success("Rate Add Successfully")
        setFormData(initialState)
        handleClosePersonalInformationt()

      }
      else{
        toast.error("error")
      }
      console.log(respons)
      console.log(formData)
    }
    }




  const [detailsPdf, setDetailsPdf] = useState();

  useEffect(() => {
    const pdf = async () => {
      const respons = await axios.get(
        `https://api-rating.watanyia.com/user_api/show_one_pdf?pdfId=${id}`
      );
      console.log(respons.data.data);
      setDetailsPdf(respons.data.data);
    };
    pdf();
  }, []);

  // const downloadFile = (location) => {
  //   const url =
  //     `https://api-rating.watanyia.com/storage/${location}`;
  //   fetch(url, { mode: "no-cors" })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const fileName = url.split("/").pop();
  //       const blobUrl = URL.createObjectURL(blob); // Create a URL object from the blob data
  //       const aTag = document.createElement("a");
  //       aTag.href = blobUrl; // Set the URL object as the href
  //       aTag.setAttribute("download", fileName);
  //       document.body.appendChild(aTag);
  //       aTag.click();
  //       aTag.remove();
  //     });
  // };


const downloadFile = (location) => {
  const url = `https://api-rating.watanyia.com/storage/${location}`;

  axios({
    url: url,
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*', 
    },
    responseType: 'blob', 
  })
    .then((response) => {
      const blob = new Blob([response.data]);
      const fileName = url.split('/').pop();
      const blobUrl = URL.createObjectURL(blob);
      const aTag = document.createElement('a');
      aTag.href = blobUrl;
      aTag.setAttribute('download', fileName);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
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
    <div>
      <Navbar />
      {detailsPdf ? (
        <div className="detailspdf">
          <div>
            <div className="trip">
              <div
                className="tripphoto"
                onClick={() =>
                  window.open(
                    `https://api-rating.watanyia.com/storage/${detailsPdf.location}`,
                    "_blank"
                  )
                }
              >
                <img
                  src={`https://api-rating.watanyia.com/storage/${detailsPdf.cover}`}
                  alt=""
                />
              </div>

              <div
                className="triptext"
                style={{ marginTop: "-20px" }}
                onClick={()=>{downloadFile(detailsPdf.location)}}
              >
                <img style={{ width: "40px" }} src={download} alt="" />
              </div>
            </div>
          </div>{" "}
          <div style={{ textAlign: "end" }}>
            <h1 className="detailstitle">{detailsPdf.title}</h1>
            <p className="detailsdescription">{detailsPdf.description}</p>
            <Button className="button-modal rit mt-4" onClick={handleShowRit}>تقييم الملف</Button>
          </div>
        </div>
      ) : (
        ""
      )}

      <Modal show={showrit} onHide={handleCloseRit} centered>
        <Modal.Header className="update">
          <Modal.Title className="update"> PDF تقييم </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                className="input"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              style={{ position: "relative" }}
              controlId="exampleForm.ControlInput1"
            >
              <div className="numbersyria">+936</div>
              <Form.Control
                type="text"
                placeholder=" الرقم "
                className="input"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          <div className="bb">
            <Button className="button-modal mt-4" onClick={handleCloseRit}>تجاهل</Button>
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
          <Modal.Title className="update"> المعلومات الشخصية </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="  mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="الاسم"
                autoFocus
                className="input"
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
                className="input"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </Form.Group>
            <div style={{ display: "flex", alignItems: "center" , justifyContent:"end" , marginRight:"30px" }}>
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
              <div className="form-check" style={{marginLeft:"10px"}}>
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
              <div style={{marginLeft:"50px"}}>الجنس</div>
            </div>
          </Form>
          <div className="bb">
            <Button className="button-modal mt-4" onClick={handleClosePersonalInformationt} >تجاهل</Button>
            <Button className="button-modal mt-4" onClick={handleClickSecond}>
              تأكيد
            </Button>
          </div>

          <br />
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};
