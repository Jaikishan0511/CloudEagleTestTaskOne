import axios from "axios";
export const fetchDataFromAPI = async () => {
  try {
    const responseData = await axios.get(
      "https://mockfast.io/backend/apitemplate/get/0SUX1W07DV"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log(responseData, "data");
    // const data = responseData;
    return responseData | [];
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};
