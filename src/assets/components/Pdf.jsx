import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "./Admin/utility/pagination/Pagination";

export const Pdf = ({ viewPdf, setViewPdf }) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [pdf, setPdf] = useState([]);
  console.log(viewPdf);
  const adminId = localStorage.getItem("admin_id");

  const getAllPdf = async (page) => {
    const respons = await axios.get(
      `https://api-rating.watanyia.com/user_api/show_pdfs?adminId=${adminId}&page=${page}`
    );
    console.log(respons.data);
    setPdf(respons.data);
  };
  useEffect(() => {
    getAllPdf('');
  }, []);

  const handleClickPdf = (id) => {
    navigate(`/${name}/detailspdf/${id}`);
  };

  const onPress = async (page) => {
    getAllPdf(page);
  };
  return (
    <div className="pdf">
      <h1 className="pdfh1">PDF</h1>
      <Row className="justify-content-end" style={{ marginLeft: "auto" }}>
        {pdf &&
          pdf.data &&
          pdf.data.map((item, index) => {
            return (
              <Col key={index} className="col-lg-4 col-6">
                <div className="trip">
                  <div
                    className="tripphoto"
                    onClick={() => {
                      handleClickPdf(item.id);
                    }}
                  >
                    <img
                      src={`https://api-rating.watanyia.com/storage/${item.cover}`}
                      alt=""
                    />
                  </div>
                  <div className="triptext">
                    <h5>{item.title} </h5>
                    <span>{item.description}</span>
                  </div>
                </div>
              </Col>
            );
          })}
        {pdf && pdf.last_page > 1 ? (
          <Pagination onPress={onPress} pageCount={pdf.last_page} />
        ) : null}
      </Row>
    </div>
  );
};
