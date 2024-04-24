import baseURL from "../Api/baseURL";

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
  }
  // console.log(res)
  return res;
};

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
