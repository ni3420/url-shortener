import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import FilterBar from "@/components/FilterBar";
import { ArrowLeft, Link2 } from "lucide-react";
import LinkList from "@/components/LinkList";

const LinkDashboard = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("latest");

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-base-200 pb-5">
        <div className="flex flex-col gap-2">
          <div className="self-start">
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-ghost btn-sm gap-2 pl-1 h-8 min-h-0 text-base-content/60 hover:text-base-content rounded-lg"
            >
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center gap-2.5 mt-1">
            <div className="p-2 bg-primary/10 text-primary rounded-xl hidden sm:block">
              <Link2 size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-base-content">My Shortened Links</h1>
              <p className="text-xs text-base-content/50 mt-0.5">Manage, filter, and track performance of your custom links.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-4">
        <div className="w-full">
          <SearchInput value={search} onChange={setSearch} />
        </div>
        
        <div className="border-t border-base-100 pt-1">
          <FilterBar 
            status={status} 
            onStatusChange={setStatus} 
            sort={sort} 
            onSortChange={setSort} 
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <LinkList search={search} status={status} sort={sort} />
      </div>

    </div>
  );
};

export default LinkDashboard;