import { Col, Row } from "react-bootstrap";
import SideBar from "../../../assets/components/utility/sidebar/SideBar";
import RatesPdf from "../../../assets/components/Admin/rates/RatesPdf";

export const RatesPdfPage = () => {
  return   <div style={{ height: "100vh" }}>
  <Row className="" style={{ flexDirection: "row-reverse" }}>
    <Col className="col-2 col-md-3 col-lg-2">
      <SideBar />
    </Col>

    <Col className=" col-10 col-md-9 col-lg-10 backgorund_admin">
      <RatesPdf />
    </Col>
  </Row>
</div>
};
