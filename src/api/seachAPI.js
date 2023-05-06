import { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

const searchKeyword = async (keyword) => {
  try {
    const response = await axiosInstance.get("/search-conditions", {
      params: { name: keyword },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

const searchApi = {
  searchKeyword,
};

export default searchApi;
