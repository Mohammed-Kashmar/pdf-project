import { Col, Row } from "react-bootstrap";
import AllAdmins from "../../../assets/components/SuperAdmin/AllAdmins/AllAdmins";
import SuperAdminSideBar from "../../../assets/components/SuperAdmin/utility/superAdminSideBar/SuperAdminSideBar";

const AllAdminsPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Row className="" style={{ flexDirection: "row-reverse" }}>
        <Col className="col-2 col-md-3 col-lg-2">
          <SuperAdminSideBar />
        </Col>

        <Col className=" col-10 col-md-9 col-lg-10 backgorund_admin">
          <AllAdmins />
        </Col>
      </Row>
    </div>
  );
};

export default AllAdminsPage;
