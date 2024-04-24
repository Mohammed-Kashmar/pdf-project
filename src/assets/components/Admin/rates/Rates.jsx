import { Col, Row, Spinner } from "react-bootstrap";
import NavBarRed from "../utility/NabBarRed/NavBarRed";
import AdminHeader from "../utility/Header/Header";
import { useEffect, useState } from "react";
import { useGetData } from "../../../../hooks/useGetData";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Pagination from "../utility/pagination/Pagination";
<<<<<<< HEAD
=======
import './Rates.css'
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7

function Rates() {
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [rates, setRates] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user"));
  const fetchData = async (page) => {
    setLoadingFirst(true);
    const res = await useGetData(
      `/admin_api/show_pdfs_rate?adminId=${userData.id}&page=${page}`
    );
    setLoadingFirst(false);
    // setRates(res);
    if (res.status === 200) {
      setRates(res.data);
    } else if (res.status === 404) {
      setRates([]);
    }
    console.log(res);
  };
  useEffect(() => {
<<<<<<< HEAD
    fetchData('');
  }, []);


=======
    fetchData("");
  }, []);

>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
  const onPress = async (page) => {
    fetchData(page);
  };
  // console.log(rates)

  return (
    <div>
      <NavBarRed />
<<<<<<< HEAD
      <AdminHeader text=" التقييمات" />
=======
      <AdminHeader text=" كل التقييمات" />
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7

      <div className="table-responsive table_container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> اسم ال PDF </th>
              <th scope="col">متوسط التقييمات</th>
            </tr>
          </thead>
          {loadingFirst === false ? (
            <tbody>
              {rates && rates.data && rates.data.length > 0 ? (
                rates.data.map((rate) => {
                  return (
<<<<<<< HEAD
                    <tr key={rate.id}>
                      <td>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/rates/${rate.id}`}
=======
                    <tr key={rate.id}  className=''>
                      <td style={{ textAlign: "center" }} className='clicked_td'>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            display: 'block',
                            
                          }}
                          
                          to={`/admin/rates/${rate.id}`}
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
                        >
                          {rate.title}
                        </Link>
                      </td>
<<<<<<< HEAD

                      <td className="d-flex justify-content-center">
=======
                      <td className="d-flex justify-content-center" >
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
                        <ReactStars
                          count={5}
                          value={rate.average_rate}
                          size={25}
                          activeColor="#ffd700"
                          edit={false}
                        />
                      </td>
                    </tr>
                  );
                })
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
<<<<<<< HEAD
          
=======

>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
      {rates.last_page > 1 ? (
        <Pagination onPress={onPress} pageCount={rates.last_page} />
      ) : null}
    </div>
  );
}

export default Rates;
