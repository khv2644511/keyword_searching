import { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";
import { getCachedData, setCachedData } from "../utils/cache";

const searchKeyword = async (keyword) => {
  try {
    const cacheName = `cache_${keyword}`;
    const url = `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${keyword}`;

    let cachedData = await getCachedData(cacheName, url);

    if (cachedData) {
      return cachedData;
    }

    const response = await axiosInstance.get("/search-conditions", {
      params: { name: keyword },
    });

    await setCachedData(cacheName, url, response);

    console.info("calling api");
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    console.error("Error while searching for keyword:", error);
    return { data: [] }; // 빈 배열로 감싸서 반환
  }
};

const searchApi = {
  searchKeyword,
};

export default searchApi;
