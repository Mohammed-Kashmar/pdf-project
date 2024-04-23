import baseURL from "../Api/baseURL";

export const useInsertData = async (url, params) => {
  let res = [];
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    res = await baseURL.post(url, params, config);
  } catch (e) {
    res = e.response;
    // console.log(e.response)
  }
  return res;
};

export const useInsertDataWithImage = async (url, params) => {
  let res = [];
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    res = await baseURL.post(url, params, config);
  } catch (e) {
    res = e.response;
    // console.log(e.response)
  }
  return res;
};
