import axios from 'axios';

const API_URL = 'https://sandbox-api.xcelapp.com/upsa/v1/transactions';

const getTransactions = async (page, pageSize, token) => {

    try {
        
        const response = await axios.get(API_URL, {
            "headers": {
                "Authorization":   `Bearer ${token}`
            }
        });
    
        return response.data;
    } catch (error) {
        throw new Error("An error occured")
    }
};

const authService = {
    getTransactions
};

export default authService;