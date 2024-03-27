import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap"
import axios from "axios"

export const Pdf = ({viewPdf,setViewPdf}) => {
    const [pdf , setPdf] = useState([])
    console.log(viewPdf)
    useEffect(() => {
      const pdf = async () => {
        const respons = await axios.get(
          `https://api-rating.watanyia.com/user_api/show_pdfs?adminId=1`
        );
        console.log(respons.data.data);
        setPdf(respons.data.data)
      };
      pdf();
    }, []);
  
  return (
    <div className="pdf">
        <h1 className="pdfh1">PDF</h1>
        <Row className="justify-content-end">
        {
            pdf.map((item,index)=>{
                return(
                    <Col key={index} className="col-lg-4 col-6">
                    <div className="trip">
                        <div className="tripphoto">
                            <img src={`https://api-rating.watanyia.com/storage/${item.cover}`} alt="" />
                        </div>
                        <div className="triptext">
                            <h5>{item.title} </h5>
                            <span>{item.description}</span>
                        </div>
                    </div>
                </Col>
                )
            })
        }
            
        
        </Row>
    </div>
  )
}
