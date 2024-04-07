import baseURL from "../Api/baseURL";

export const useGetData = async (url) => {
  let res = [];
  try{
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
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
