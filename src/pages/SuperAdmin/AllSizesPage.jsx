import { Col, Row } from "react-bootstrap";
import SuperAdminSideBar from "../../assets/components/SuperAdmin/utility/superAdminSideBar/SuperAdminSideBar";
import AllSizes from "../../assets/components/SuperAdmin/AllSizes/AllSizes";

const AllSizesPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Row className="" style={{ flexDirection: "row-reverse" }}>
        <Col className="col-2 col-md-3 col-lg-2">
          <SuperAdminSideBar />
        </Col>

        <Col className=" col-10 col-md-9 col-lg-10 backgorund_admin">
          <AllSizes />
        </Col>
      </Row>
    </div>
  );
};

export default AllSizesPage;
