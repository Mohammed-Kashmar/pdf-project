import { Col, Row } from "react-bootstrap";
import SideBar from "../../../assets/components/utility/sidebar/SideBar";
import LastNews from "../../../assets/components/Admin/lastNews/LastNews";

const LastNewsPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Row className="" style={{ flexDirection: "row-reverse" }}>
        <Col className="col-2 col-md-3 col-lg-2">
          <SideBar />
        </Col>

        <Col className=" col-10 col-md-9 col-lg-10 backgorund_admin">
          <LastNews />
        </Col>
      </Row>
    </div>
  );
};

export default LastNewsPage;
