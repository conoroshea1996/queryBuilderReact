import axios from "axios";
import { BackendQuery } from "../types";

export const saveRules = async (payload: BackendQuery) => {
  try {
    const response = await axios.post('/api/save-rules', payload);
    return response.data; 
    
  } catch (err: any) {

    const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
    throw errorMessage;
  }
};