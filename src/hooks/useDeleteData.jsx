import baseURL from "../Api/baseURL";

<<<<<<< HEAD
const useDeleteData = async (url) => {
  let res = [];
  try{
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    };
    res = await baseURL.delete(url, config);
  }catch(e){
    res = e.response;
    console.log(e.response)
=======
export const useDeleteData = async (url) => {
  let res = [];
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    res = await baseURL.delete(url, config);
  } catch (e) {
    res = e.response;
    console.log(e.response);
>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7
  }
  // console.log(res)
  return res;
};

<<<<<<< HEAD

export default useDeleteData;
=======
const userData = JSON.parse(localStorage.getItem("superAdmin"));

export const useDeleteDataSuperAdmin = async (url) => {
  let res = [];
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    res = await baseURL.delete(url, config);
  } catch (e) {
    res = e.response;
    console.log(e.response);
  }
  // console.log(res)
  return res;
};

>>>>>>> 3f12f8fce59fac6b2a69993ea5b8d5085ab235a7

// Custom hook to delete data
// import { useState } from 'react';
// import baseURL from '../Api/baseURL';

// const useDeleteData = async (url) => {
//   const [response, setResponse] = useState(null);

//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       },
//     };
//     const res = await baseURL.delete(url, config);
//     setResponse(res);
//   } catch (error) {
//     setResponse(error.response);
//     console.log(error.response);
//   }

//   return response;
// };

// export default useDeleteData;
