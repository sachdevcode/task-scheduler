import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

interface ApiCallParams {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: any;
  params?: any;
  headers?: any;
}

const request = async ({
  method,
  url,
  data = {},
  params = {},
  headers = {},
}: ApiCallParams): Promise<any> => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error making ${method} request to ${url}:`, error);
    throw error;
  }
};

export default request;
