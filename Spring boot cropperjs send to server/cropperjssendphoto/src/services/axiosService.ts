import axios from "axios";
import { CarData } from "../components/Admin/Main";


const axiosCreate = axios.create({
    baseURL: 'http://localhost:8800/',
    headers: {
        'Content-Type':'application/json'
    }
});


class AxiosService 
{
    add = async (data: CarData) => 
    {
        await axiosCreate.post("/api/car/add", data);
    }
}

export default new AxiosService();