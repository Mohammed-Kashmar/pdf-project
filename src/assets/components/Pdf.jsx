import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const Pdf = ({viewPdf,setViewPdf}) => {
  const navigate = useNavigate()
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

    const handleClickPdf = (id) =>{
      navigate(`/detailspdf/${id}`)
    }
  
  return (
    <div className="pdf">
        <h1 className="pdfh1">PDF</h1>
        <Row className="justify-content-end" style={{marginLeft:"auto"}}>
        {
            pdf.map((item,index)=>{
                return(
                    <Col key={index} className="col-lg-4 col-6">
                    <div className="trip">
                        <div className="tripphoto" onClick={()=>{handleClickPdf(item.id)}}>
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
