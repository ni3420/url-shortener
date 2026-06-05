import { useState } from "react";
import { HiOutlineArrowLeft, HiOutlineLink, HiOutlinePlus } from "react-icons/hi2";
import SearchInput from "@/components/SearchInput";
import FilterBar from "@/components/FilterBar";
import LinkList from "@/components/LinkList";
import { useNavigate} from "react-router-dom";

const LinkDashboard = () => {
  const navigate=useNavigate()
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("latest");

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8 text-base-content antialiased">
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-base-300 pb-6 mt-auto md:mt-0">
        <div className="flex flex-col gap-2">
          <div className="self-start">
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-ghost btn-sm gap-2 pl-1 h-8 min-h-0 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-xl font-medium text-xs normal-case transition-colors"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3.5 mt-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-violet-600/10 border border-indigo-500/20 text-indigo-500 shadow-sm">
              <HiOutlineLink className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
                My Shortened Links
              </h1>
              <p className="text-xs sm:text-sm text-base-content/50 font-medium mt-0.5">
                Manage, filter, and track performance of your custom links.
              </p>
            </div>
          </div>
        </div>

        <div className="self-stretch sm:self-auto flex">
          <button onClick={()=>{navigate("/home")}} className="btn btn-primary w-full sm:w-auto h-11 min-h-[2.75rem] px-5 bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white font-medium normal-case rounded-xl shadow-lg shadow-indigo-500/10 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] transition-all gap-2">
            <HiOutlinePlus className="h-4 w-4" />
            <span>Create New Link</span>
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-4 bg-base-200/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-base-300 shadow-sm">
        <div className="w-full">
          <SearchInput value={search} onChange={setSearch} />
        </div>
        
        <div className="w-full pt-1 border-t border-base-300/60">
          <FilterBar 
            status={status} 
            onStatusChange={setStatus} 
            sort={sort} 
            onSortChange={setSort} 
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <LinkList search={search} status={status} sort={sort} />
      </div>

    </div>
  );
};

export default LinkDashboard;