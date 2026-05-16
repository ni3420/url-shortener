import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface ApiResponse{
    
original_Url:string,
short_Url:string
}

const Home = () => {
    const [text,setText]=useState<string>("")
    const [url,setUrl]=useState<ApiResponse[]>([])
    const navigate=useNavigate()
    useEffect(()=>{
        const init=async()=>{
            const res=await axios.get("/api")
            if(res){    
            setUrl(res.data)
            
            }

        }
init()
    },[text])
    const handle=async(text:string)=>{
        const res=await axios.post("/api",{text})
        console.log(res)
        setText("")
    }
    return ( <>
   <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
  <div className="w-full max-w-4xl space-y-6">
    
    <div className="flex justify-center">
      <div className="flex w-full max-w-md items-center gap-2 rounded-2xl bg-white p-3 shadow-md border border-gray-100">
        <input 
          type="text" 
          placeholder="Enter link here..." 
          value={text} 
          className="w-full rounded-xl border border-gray-200 p-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
          onChange={(e) => setText(e.target.value)} 
        />
        <button 
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-all hover:bg-blue-700 active:scale-95"
          onClick={() => handle(text)}
        >
          Click
        </button>
      </div>
    </div>
<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
  <table className="w-full border-collapse text-left text-sm text-gray-600">
    <thead>
      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
        <th className="p-4 w-16 text-center">Sr. No.</th>
        <th className="p-4">Original URL</th>
        <th className="p-4">Short URL</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-100">
      {url && url.length > 0 ? (
        url.map((item, index) => (
          <tr key={index} className="transition-colors hover:bg-gray-50">
            <td className="p-4 text-center font-medium text-gray-400">{index + 1}</td>
            <td className="p-4 break-all max-w-xs md:max-w-md text-gray-700">{item.original_Url}</td>
            <td className="p-4">
              <button 
                className="font-medium text-blue-600 hover:underline break-all text-left" 
                onClick={() => navigate(`/${item.short_Url}`)}
              >
                {item.short_Url}
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td  className="p-8 text-center text-gray-400 italic">
            No URLs found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  </div>
</div>
    </> );
}
 
export default Home;