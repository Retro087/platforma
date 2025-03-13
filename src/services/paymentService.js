import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";

const createPayment = async (paymentData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_URL}/`, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const capturePayment = async (paymentId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_URL}/capture-payment/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export default {
  createPayment,
  capturePayment,
};
