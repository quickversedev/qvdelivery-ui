import axios from "axios";
import { API_BASE_URLS } from "./config";

// Utility function to get token from AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@AuthData");
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
      }`
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
export const apiRequest = async (method, endpoint, payload = null) => {
  try {
    const token = await getToken();

    if (!API_BASE_URLS) {
      throw new Error(`Invalid module: ${module}`);
    }

    const config = {
      method,
      url: `${API_BASE_URLS}${endpoint}`,
      headers: {
        // authorization: token,
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

// Verify the token stored in AsyncStorage
export const verifyToken = async () => {
  try {
    const token = await getToken(); // Get the token from AsyncStorage

    console.log("STOREDTOKEN_____:", token);

    // Make the API call using axios directly for token verification
    const response = await axios.get(`${API_BASE_URLS}/token`, {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
        // Cookie: `accessToken=${token}`,
      },
      // responseType: 'arraybuffer',
    });

    // Check the success response from the API
    if (response?.data?.status === "OK") {
      console.log("Token is valid");
      return true;
    } else {
      console.error("Token verification failed.");
      throw new Error("Invalid token.");
    }
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error(`Error verifying token: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error verifying token: No response received");
    } else {
      // Something went wrong in setting up the request
      console.error(`Error verifying token: ${error.message}`);
    }

    // Clear invalid token from AsyncStorage
    await AsyncStorage.removeItem("userToken");
    throw error; // Rethrow the error to handle it in the caller function
  }
};

// getOTP
export const getOTP = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URLS}/auth/login-phone`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    const errorResponse = handleApiError(error);
    throw new Error(errorResponse.message);
  }
};

// OTP_login
export const loginWithOTP = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URLS}/auth/login-phone`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Store the token and user details locally using AsyncStorage
    await AsyncStorage.setItem(
      "userName",
      `${response?.data?.data?.user?.name}`
    );
    await AsyncStorage.setItem("userToken", response?.data?.data?.token);
    await AsyncStorage.setItem("userID", `${response?.data?.data?.user?.id}`);
    await AsyncStorage.setItem(
      "userRole",
      response?.data?.data?.user?.role?.name
    );
    await AsyncStorage.setItem(
      "userDesignation",
      response?.data?.data?.user?.designation?.name
    );
    await AsyncStorage.setItem(
      "companyID",
      `${response?.data?.data?.user?.userCompanyMapping?.[0]?.company_id}`
    );

    return response?.data?.data;
  } catch (error) {
    const errorResponse = handleApiError(error);
    throw new Error(errorResponse.message);
  }
};

// statusChange
export const statusChange = async (payload) => {
  return apiRequest("post/put", "/status", payload);
};

// getAllCampus
export const getAllCampus = async () => {
  return apiRequest("get", "/campus");
};

// getAllorders
export const getAllorders = async () => {
  return apiRequest("get", "/orders");
};

// orderStatusChange
export const orderStatusChange = async (payload) => {
  return apiRequest("post/put", "/orders", payload);
};
