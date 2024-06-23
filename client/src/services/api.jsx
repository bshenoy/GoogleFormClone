import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

export const getUserData = async () => {
    try {
        const response = await api.get('/users/me');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

export const saveFormResponse = async (formData) => {
    try {
        const response = await api.post('/forms', formData);
        return response.data;
    } catch (error) {
        console.error('Error saving form response:', error);
    }
};
