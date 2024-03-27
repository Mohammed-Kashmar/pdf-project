import { Col, Row } from "react-bootstrap"
import { Pdf } from "./Pdf"
import { Posts } from "./Posts"
import { useState } from "react"
import { useMediaQuery } from "@uidotdev/usehooks";

export const Content = () => {

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );

  const [viewPosts,setViewPosts] = useState(false)
  const [viewPdf,setViewPdf] = useState(true)

  const handleClickPosts = () =>{
    setViewPdf(false)
    setViewPosts(true)
  }

  const handleClickPdf = () =>{
    setViewPdf(true)
    setViewPosts(false)
  }

  return (
    <div>
      <div className="buttonformobile"> 
        <div onClick={handleClickPosts}>أخر الاخبار</div>
        <div onClick={handleClickPdf}> Pdf </div>
      </div>
      <Row className="postsandpdf">
      {
        isSmallDevice ? viewPosts ? (
          <Col className="col-lg-5 col-12"> <Posts viewPosts={viewPosts} setViewPosts={setViewPosts}/></Col>
        ) : ("") :(
          <Col className="col-lg-5 col-12"> <Posts viewPosts={viewPosts} setViewPosts={setViewPosts}/></Col>
        )
      }
      {
        isSmallDevice ? viewPdf ? (
          <Col className="col-lg-7 col-12"> <Pdf viewPdf={viewPdf} setViewPdf={setViewPdf}/></Col>
        ) : ("") : (
          <Col className="col-lg-7 col-12"> <Pdf viewPdf={viewPdf} setViewPdf={setViewPdf}/></Col>
        )
      }
      </Row>
    </div>
  )
}
