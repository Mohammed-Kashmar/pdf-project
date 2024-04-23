import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import whats from "../../images/واتس.png";
import facebook from "../../images/pngegg.png";
import instagram from "../../images/insta.png";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";

export const SidebarBottom = ({adminDetails,handleClickAnother,viewPdf}) => {
  

  const [showAddress, setshowAddress] = useState(false);
  const handleShowAddress = () => setshowAddress(true);
  const handlecloseAddress = () => setshowAddress(false);
  console.log(adminDetails)
      return (
        <nav className="navbar">
          <div className='icons'>
          <a href={adminDetails.facebook_url}>
            <img src={facebook}/>
          </a>
          <a href={adminDetails.instagram_url}>
            <img src={instagram}/>
          </a>
            <IoHomeOutline onClick={handleClickAnother} style={{color:"white" , fontSize:"30px"}} />
            <a href={`https://wa.me/${adminDetails.whatsapp}`}>
                <img src={whats}/>
            </a>
            <FaRegAddressCard onClick={handleShowAddress} style={{color:"white" , fontSize:"30px"}}/>
          </div>


          <Modal
        show={showAddress}
        onHide={handlecloseAddress}
        centered
      >
        <Modal.Header className="update p-3">
          <Modal.Title className="update"> العنوان </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
        <div className='d-flex align-items-center justify-content-end mb-5'>
          <div style={{color:"black" , fontSize:"25px" }}>{adminDetails.address }</div>
          <div style={{color:"black" , fontSize:"25px" , fontWeight:"bold"}}> :العنوان</div>
        </div>

        <div className='d-flex align-items-center justify-content-end'>
          <div style={{color:"black" , fontSize:"25px"}}>{adminDetails.phone }</div>
          <div style={{color:"black" , fontSize:"25px" , fontWeight:"bold"}}> :الرقم</div>
        </div>
            
        </Modal.Body>
      </Modal>

        </nav>
      );
}
