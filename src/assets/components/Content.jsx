import { Col, Row } from "react-bootstrap";
import { Pdf } from "./Pdf";
import { Posts } from "./Posts";
import { useMediaQuery } from "@uidotdev/usehooks";

export const Content = ({viewPdf,viewPosts,handleClickPosts,handleClickPdf,setViewPosts,setViewPdf}) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  return (
    <div className="pb-5">
      <Row className="postsandpdf">
        {isSmallDevice ? (
          viewPosts ? (
            <Col className="col-lg-5 col-12 px-3">
              {" "}
              <Posts viewPosts={viewPosts} setViewPosts={setViewPosts} />
            </Col>
          ) : (
            ""
          )
        ) : (
          <Col className="col-lg-5 col-12 px-3">
            {" "}
            <Posts viewPosts={viewPosts} setViewPosts={setViewPosts} />
          </Col>
        )}
        {isSmallDevice ? (
          viewPdf ? (
            <Col className="col-lg-7 col-12 px-3">
              {" "}
              <Pdf viewPdf={viewPdf} setViewPdf={setViewPdf} />
            </Col>
          ) : (
            ""
          )
        ) : (
          <Col className="col-lg-7 col-12 px-3">
            {" "}
            <Pdf viewPdf={viewPdf} setViewPdf={setViewPdf} />
          </Col>
        )}
      </Row>
    </div>
  );
};
