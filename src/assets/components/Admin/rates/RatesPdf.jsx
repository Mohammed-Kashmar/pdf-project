import { Col, Modal, Row, Spinner } from "react-bootstrap";
import useFetchData from "../../../../hooks/useFetchData";
import AdminHeader from "../utility/Header/Header";
import NavBarRed from "../utility/NabBarRed/NavBarRed";
import ReactStars from "react-rating-stars-component";
import { Fragment, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useGetData } from "../../../../hooks/useGetData";
import "./RatesPdf.css";
import { Link, useParams } from "react-router-dom";
import Pagination from "../utility/pagination/Pagination";

export default function RatesPdf() {
  const [show, setShow] = useState(false);
  const [filterParams, setFilterParams] = useState({
    from_date: "2024-01-10",
    to_date: "2024-05-14",
    gender: "male",
    rate: 0,
    from_age: "",
    to_age: "",
    page: "",
  });
  const { pdfId } = useParams();
  let query = `/admin_api/show_pdf_rates?pdfId=${pdfId}&from_date=${filterParams.from_date}&to_date=${filterParams.to_date}&gender=${filterParams.gender}`;

  query += filterParams.page ? `&page=${filterParams.page}` : "";
  query += filterParams.rate !== 0 ? `&rate=${filterParams.rate}` : "";
  query += filterParams.from_age ? `&from_age=${filterParams.from_age}` : "";
  query += filterParams.to_age ? `&to_age=${filterParams.to_age}` : "";
  const {
    data: ratesPdf,
    isPending,
    error,
  } = useFetchData(
    // `/admin_api/show_pdf_rates?pdfId=${pdfId}&from_date=2024-01-10&to_date=2024-05-14`
    query
  );

  console.log(ratesPdf);
  const handleClose = () => setShow(false);
  const handleShow = async (id) => {
    const res = await useGetData(`/admin_api/show_rate?rateId=${id}`);
    setShow(res.data.data);
  };

  const handleCancelFilter = () => {
    setFilterParams({
      from_date: "2024-01-10",
      to_date: "2024-05-14",
      gender: "male",
      // rate: "",
      rate: 0,
      from_age: "",
      to_age: "",
      page: "",
    });
  };

  const onPress = async (page) => {
    setFilterParams({ ...filterParams, page: page });
  };

  return (
    <div>
      <NavBarRed />
      <Link style={{textDecoration: 'none', color: 'black'}} to="/admin/rates"><AdminHeader text=" كل التقييمات / تقييم ملف معين" /></Link>
      

      <Row className="px-4 pb-4" style={{ flexDirection: "row-reverse" }}>
        <Col className="col-12 col-lg-3">
          <div className="form_filter">
            <input
              type="date"
              id="from_date"
              value={filterParams.from_date}
              onChange={(e) =>
                setFilterParams({ ...filterParams, from_date: e.target.value })
              }
              className="w-50"
            />
            <label htmlFor="from_date">من تاريخ</label>
          </div>

          <div className="form_filter">
            <input
              type="date"
              id="to_date"
              value={filterParams.to_date}
              onChange={(e) =>
                setFilterParams({ ...filterParams, to_date: e.target.value })
              }
              className="w-50"
            />
            <label htmlFor="to_date">الى تاريخ</label>
          </div>
        </Col>
        <Col className="col-12 col-lg-3">
          <div className="form_filter">
            <input
              type="number"
              id="from_age"
              value={filterParams.from_age}
              onChange={(e) =>
                setFilterParams({ ...filterParams, from_age: e.target.value })
              }
              className="w-50"
            />
            <label htmlFor="from_age">من العمر</label>
          </div>

          <div className="form_filter">
            <input
              type="number"
              id="to_age"
              value={filterParams.to_age}
              onChange={(e) =>
                setFilterParams({ ...filterParams, to_age: e.target.value })
              }
              className="w-50"
            />
            <label htmlFor="to_age">الى العمر</label>
          </div>
        </Col>
        <Col className="col-4 col-lg-2">
          <div className="form-check">
            <label className="form-check-label" htmlFor="male">
              ذكر
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={filterParams.gender === "male"}
              onChange={(e) =>
                setFilterParams({ ...filterParams, gender: e.target.value })
              }
            />
          </div>
          <div className="form-check">
            <label className="form-check-label" htmlFor="female">
              انثى
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={filterParams.gender === "female"}
              onChange={(e) =>
                setFilterParams({ ...filterParams, gender: e.target.value })
              }
            />
          </div>
        </Col>
        <Col className="col-8 col-lg-2 d-flex flex-column align-items-center justify-content-start">
          <label htmlFor="">التقييم</label>
          <ReactStars
            count={5}
            onChange={(newRating) =>
              setFilterParams({ ...filterParams, rate: newRating })
            }
            size={25}
            activeColor="#ffd700"
            value={filterParams.rate}
          />
        </Col>
        <Col className="d-flex align-items-start justify-content-center ">
          <button className="btn_save" onClick={handleCancelFilter}>
            الغاء الفلترة
          </button>
        </Col>
      </Row>
      <div className="table-responsive table_container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> الاسم </th>
              <th scope="col">التقييم</th>
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
                  {ratesPdf && ratesPdf.data && ratesPdf.data.length > 0 ? (
                    ratesPdf.data.map((rate) => (
                      <tr key={rate.id}>
                        <td>{rate.name}</td>
                        <td className="d-flex justify-content-center">
                          <ReactStars
                            count={5}
                            value={rate.rate}
                            size={25}
                            activeColor="#ffd700"
                            edit={false}
                          />
                        </td>
                        <td className="">
                          <FaEye onClick={() => handleShow(rate.id)} />
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

      {ratesPdf && ratesPdf.last_page > 1 ? (
        <Pagination onPress={onPress} pageCount={ratesPdf.last_page} />
      ) : null}

      <Modal show={show} onHide={handleClose} centered dir="rtl">
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>معلومات التقييم</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container show_rate_details">
            <div className="row">
              <div className="col p-4">
                <p>
                  <strong>الاسم:</strong> {show.name}
                </p>
                <p>
                  <strong>تاريخ الميلاد:</strong> {show.birthday}
                </p>
                <p>
                  <strong>الجنس:</strong> {show.gender}
                </p>
                <p>
                  <strong>الهاتف:</strong> {show.phone}
                </p>
              </div>
              <div className="col p-4 ">
                <p>
                  <strong>ملاحظة:</strong> {show.note}
                </p>
                <p className="d-flex justify-content-start align-items-center">
                  <strong> التقييم:</strong>
                  <ReactStars
                    count={5}
                    value={show.rate}
                    size={25}
                    activeColor="#ffd700"
                    edit={false}
                  />
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
