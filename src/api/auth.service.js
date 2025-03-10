import axios from 'axios';

const API_URL = 'https://sandbox-api.xcelapp.com/upsa/v1';

const login = async (username, password) => {

    try {
        
        const response = await axios.post(API_URL + '/auth/login', {
            username,
            password,
        });
    
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
    
        return response.data;
    } catch (error) {
        throw new Error(error.message)
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    login,
    logout,
};

export default authService;