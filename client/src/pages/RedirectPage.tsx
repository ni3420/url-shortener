import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {

    const {id}=useParams()

    useEffect(()=>{
        const init=async()=>{
            const res=await axios.get(`/api/${id}`)
             window.location.replace(res.data.original_Url)
        
        }
        
        init()
    },[id])
}
 
export default Redirect;