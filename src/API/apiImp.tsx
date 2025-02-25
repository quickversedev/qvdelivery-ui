import axios from "axios";

const API_BASE_URLS = "sdfvsdjcnsjkn";

// Utility function to get token from AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      return token;
    }
    throw new Error("No authentication token found.");
  } catch (error) {
    console.error("Error fetching token: ", error.message);
    throw error;
  }
};

// Error handler utility for API errors handeling
export const handleApiError = (error) => {
  if (error.response) {
    // Handle server-side errors
    console.error(
      `Error: ${error.response.status} - ${
        error.response.data?.message || "No message provided"
      }`,
    );
  } else if (error.request) {
    // Handle network or no-response errors
    console.error("No response received from server.");
  } else {
    // Handle general request errors
    console.error("Request error: ", error.message);
  }
  throw error;
};

// Generic function to make API requests
export const apiRequest = async (module, method, endpoint, payload = null) => {
  try {
    const token = await getToken();
    const baseUrl = API_BASE_URLS[module];

    if (!baseUrl) {
      throw new Error(`Invalid module: ${module}`);
    }

    const config = {
      method,
      url: `${baseUrl}${endpoint}`,
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      ...(payload && { data: payload }),
    };

    console.log(`EndPoint(${method}): ${endpoint}`);

    const { data } = await axios(config);
    return data?.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ------------------------------ API utility_end ------------------------------
