import baseURL from "../Api/baseURL";

export const useGetDataSuperAdmin = async (url) => {
  const superAdminData = JSON.parse(localStorage.getItem("superAdmin"));
  let res = [];
  try{
    const config = {
      headers: {
        Authorization: `Bearer ${superAdminData.token}`
      },
    };
    res = await baseURL.get(url, config);
  }catch(e){
    res = e.response;
    console.log(e.response)
  }
  // console.log(res)
  return res;
};
