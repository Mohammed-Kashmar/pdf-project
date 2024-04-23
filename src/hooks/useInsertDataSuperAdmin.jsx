import baseURL from "../Api/baseURL";

export const useInsertDataSuperAdmin = async (url, params) => {
  const SuperAdminData = JSON.parse(localStorage.getItem("superAdmin"));
  let res = [];
  try {
    const config = {
      headers: { Authorization: `Bearer ${SuperAdminData.token}` },
    };

    res = await baseURL.post(url, params, config);
  } catch (e) {
    res = e.response;
    // console.log(e.response)
  }
  return res;
};

export const useInsertDataWithImageSuperAdmin = async (url, params) => {
  const SuperAdminData = JSON.parse(localStorage.getItem("superAdmin"));
  let res = [];
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${SuperAdminData.token}`,
      },
    };

    res = await baseURL.post(url, params, config);
  } catch (e) {
    res = e.response;
    // console.log(e.response)
  }
  return res;
};
