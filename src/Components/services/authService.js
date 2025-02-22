import axios from "axios";

const API_URL = "http://localhost:9999/api/cms/login"; 

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post("http://localhost:9999/api/cms/login/post/userslogin", credentials);
        
        if (response.status === 200) {
            console.log("Login successful:", response.data);
            return response.data; 
        }
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw new Error(error.response?.data || "Login failed");
    }
};

export const registerUser = async (userData) => {
    console.log("Sending registration data:", userData); 
    try {
        const response = await axios.post("http://localhost:9999/api/cms/login/post/register", userData); 
        console.log("Registration response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data);
        throw new Error(error.response?.data?.message || "Registration failed");
    }
};

export const resetPassword = async (userData) => {
    try {
        const response = await axios.post("http://localhost:9999/api/cms/login/post/reset-password", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
};
