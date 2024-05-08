import { useEffect, useState } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import vector from "../../images/Vector.png";
import whats from "../../images/واتس.png";
import facebook from "../../images/pngegg.png";
import instagram from "../../images/insta.png";
import pdf from "../../images/sidebar.png"

export const Navbar = ({name,adminDetails,viewPdf}) => {
  // const [adminDetails, setAdminDetails] = useState([]);
  // const { name } = useParams();

  // useEffect(() => {
  //   const showadmin = async () => {
  //     const respons = await axios.get(
  //       `https://pdfback.levantsy.com/user_api/show_admin_by_name?name=${name}`
  //     );
  //     console.log(respons);
  //     setAdminDetails(respons.data.data.admin_detail);
  //     console.log(respons.data.data.admin_detail);
  //     localStorage.setItem("admin_id", respons.data.data.admin_detail.admin_id);
  //   };
  //   showadmin();
  // }, []);
  return (
    <div>
      <div className="master">
        <div className="logo">
          <img
            src={`https://pdfback.levantsy.com/storage/${adminDetails.logo}`}
            alt=""
          />
        </div>

        <div className="name">
        {
          name
        }
        </div>

        <div className="logoo">
          <img
            src={pdf}
            alt=""
          />
        </div>
        {/* <Dropdown className="wasem">
          <Dropdown.Toggle variant="" id="dropdown-basic">
            <img className="wasemimg" src={vector} alt="" />
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="drop_down"
            style={{
              backgroundColor: `#${
                adminDetails.color && adminDetails?.color.substring(10, 16)
              } `,
            }}
          >
            {adminDetails?.facebook_url && (
              <Dropdown.Item
                href={adminDetails?.facebook_url}
                target="_blank"
                className="dorp_down_item"
              >
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={facebook}
                  alt=""
                />
              </Dropdown.Item>
            )}

            {adminDetails?.instagram_url && (
              <Dropdown.Item
                href={adminDetails?.instagram_url}
                target="_blank"
                className="dorp_down_item"
              >
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={instagram}
                  alt=""
                />
              </Dropdown.Item>
            )}

            {adminDetails?.instagram_url && (
              <Dropdown.Item
                href={adminDetails?.instagram_url}
                target="_blank"
                className="dorp_down_item"
              >
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={whats}
                  alt=""
                />
              </Dropdown.Item>
            )}

            <Dropdown.Item href="" target="_blank" className="dorp_down_item ">
              <p
                className="bg-white rounded-circle mx-2 p-1"
                onClick={() => {}}
              >
                moi
              </p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <div className="namepdfposts">
        {
          viewPdf ? (
            <p onClick={handleClickPosts}>POST</p>
          ) : (
            <p onClick={handleClickPdf}>PDF</p>
          )
        }
        </div> */}
      </div>
      {
        viewPdf ? (<div className="imagenavbar">
        <img
          src={`https://pdfback.levantsy.com/storage/${adminDetails.cover}`}
          alt=""
          
        />
        <div className="socialmedia"></div>
      </div>) : ("")
      }
      
    </div>
  );
};
