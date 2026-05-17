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
 return ( <>
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
  <div className="w-full max-w-4xl space-y-6">
    
    <div className="flex justify-center">
      <div className="flex w-full max-w-md items-center gap-2 rounded-2xl bg-white p-3 shadow-md border border-gray-100">
        <h1 className="text-xl font-bold text-gray-700">Redirecting...</h1>
      </div>
    </div>
  </div>
</div>

 </>
 );
    
    
}
 
export default Redirect;