import { Navbar } from "../assets/components/Navbar"
import { Content } from "../assets/components/Content"
import { useState , useEffect } from "react";
import { SidebarBottom } from "../assets/components/SidebarBottom";
import {useParams } from "react-router-dom";
import axios from "axios"
export const Homepage = () => {

  const [adminDetails, setAdminDetails] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const showadmin = async () => {
      const respons = await axios.get(
        `https://api-rating.watanyia.com/user_api/show_admin_by_name?name=${name}`
      );
      console.log(respons);
      setAdminDetails(respons.data.data.admin_detail);
      console.log(respons.data.data.admin_detail);
      localStorage.setItem("admin_id", respons.data.data.admin_detail.admin_id);
    };
    showadmin();
  }, []);


  const [viewPosts, setViewPosts] = useState(false);
  const [viewPdf, setViewPdf] = useState(true);
  console.log(viewPosts)
  console.log(viewPdf)
  const handleClickPosts = () => {
    setViewPdf(false);
    setViewPosts(true);
  };

  const handleClickPdf = () => {
    setViewPdf(true);
    setViewPosts(false);
  };

  const handleClickAnother = () => {
    setViewPosts(!viewPosts);
    setViewPdf(!viewPdf)
  };

  
  return (
    <div>
        <Navbar name={name} adminDetails={adminDetails} viewPdf={viewPdf} viewPosts={viewPosts} />
        <Content viewPdf={viewPdf} viewPosts={viewPosts} handleClickPosts={handleClickPosts} handleClickPdf={handleClickPdf} setViewPosts={setViewPosts} setViewPdf={setViewPdf}  />
        <SidebarBottom adminDetails={adminDetails} handleClickAnother={handleClickAnother} />
    </div>
  )
}
