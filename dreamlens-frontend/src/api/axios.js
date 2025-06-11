// src/api/axios.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI backend URL

export const createDream = async (dreamData) => {
    const response = await axios.post(`${API_BASE_URL}/dreams`, dreamData);
    return response.data;
};

export const getDreams = async () => {
    try {
        console.log("axios.js: Making GET /dreams request...");
        const response = await axios.get(`${API_BASE_URL}/dreams`);
        console.log("axios.js: GET /dreams response object:", response); // Log the entire response object
        console.log("axios.js: GET /dreams response.data:", response.data); // Log response.data specifically
        return response.data; // CRITICAL: Ensure this is response.data
    } catch (error) {
        console.error("axios.js: Error fetching dreams from API:", error.response?.data || error.message);
        throw error;
    }
};

export const enhanceDream = async (dreamId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/dreams/${dreamId}/enhance`);
        return response.data;
    } catch (error) {
        console.error("axios.js: Error enhancing dream:", error.response?.data || error.message);
        throw error;
    }
};