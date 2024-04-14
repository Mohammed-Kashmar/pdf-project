import facebook from "../../images/Vector (2).png"
import instagram from "../../images/Layer 2 (7).png"
import logo from "../../images/Group 594.png"
import { useEffect, useState } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";

export const Navbar = () => {
  const [adminDetails , setAdminDetails] = useState([])
  const { name } = useParams();
  console.log(name)

  useEffect(() => {
    const showadmin = async () => {
      const respons = await axios.get(
        `https://api-rating.watanyia.com/user_api/show_admin_by_name?name=${name}`
      );
      console.log(respons);
      setAdminDetails(respons.data.data.admin_detail)
      console.log(respons.data.data.admin_detail)
      localStorage.setItem('admin_id',respons.data.data.admin_detail.admin_id);
    };
    showadmin();
  }, []);

  return (
    <div className="imagenavbar">
        <img src={`https://api-rating.watanyia.com/storage/${adminDetails.cover}`} alt="" />
        <div className="socialmedia">
        <Link to={adminDetails.instagram_url}>
            <div className="facebook"><img src={instagram} alt="" /></div>
        </Link>
        <Link to={adminDetails.facebook_url} target="_blank">
        <div className="instagram"><img src={facebook} alt="" /></div>
    </Link>
        </div>
        <div className="logo"><img src={logo} alt="" /></div>
        <div className="textlogo"><img src={`https://api-rating.watanyia.com/storage/${adminDetails.logo}`} alt="" /></div>
    </div>
  )
}
