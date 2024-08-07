
import axios from "axios";

const apiRequest = axios.create({
    withCredentials: true,
});

export default apiRequest;