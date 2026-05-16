import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {

    const {id}=useParams()
    useEffect(()=>{
if(id)
{
    window.location.href=`/api/${id}`
    
}
    },[id])
    return ( 
    <></> );
}
 
export default Redirect;