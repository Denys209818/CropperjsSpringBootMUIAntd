import axios from "axios";
import { CarData } from "../components/Admin/Main/types";


const axiosCreate = axios.create({
    baseURL: 'http://localhost:8808/',
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