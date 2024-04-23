import { Col, Row } from "react-bootstrap";
import SuperAdminSms from "../../../assets/components/SuperAdmin/sms/SuperAdminSms";
import SuperAdminSideBar from "../../../assets/components/SuperAdmin/utility/superAdminSideBar/SuperAdminSideBar";

export default function SuperAdminSmsPage() {
  return<div style={{ height: "100vh" }}>
  <Row className="" style={{ flexDirection: "row-reverse" }}>
    <Col className="col-2 col-md-3 col-lg-2">
      <SuperAdminSideBar />
    </Col>

    <Col className=" col-10 col-md-9 col-lg-10 backgorund_admin">
      <SuperAdminSms />
    </Col>
  </Row>
</div>;
}
