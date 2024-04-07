import { Col, Row } from "react-bootstrap";
import "./Header.css";

const AdminHeader = ({ text, btnText, onButtonClick }) => {
  return (
    <Row className="header">
      {btnText ? (
        <Col>
          <button className="btn_add" onClick={onButtonClick}>
            {btnText}
          </button>
        </Col>
      ) : null}
      <Col>
        <h4 className="">{text}</h4>
      </Col>
    </Row>
  );
};

export default AdminHeader;
