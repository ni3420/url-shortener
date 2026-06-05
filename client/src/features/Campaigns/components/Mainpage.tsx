"use client";

import { useState } from "react";
import { HiOutlineFolder, HiOutlinePlus } from "react-icons/hi2";
import { useGetAllCampaigns } from "@/features/Campaigns/api/use-getAllCampaign";
import OverViewPage from "@/features/analytics/components/OverView";
import CreateCampaign from "./createCampaignForm";
import FirstLookCampaign from "./firstLook";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  
  const { data: response, isLoading, error } = useGetAllCampaigns();
  
  const campaigns = response?.data || [];
  const isFirstTimeUser = campaigns.length === 0;

  const tabs = [
    { id: "list" as const, name: "Campaign Directory", icon: HiOutlineFolder },
    { id: "create" as const, name: "Launch Campaign", icon: HiOutlinePlus },
  ];

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-base-100 dark:bg-zinc-950">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="alert alert-error max-w-xl mx-auto rounded-xl shadow-lg text-white">
          <span>Failed to load campaign structures. Verify workspace data streams.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-base-100 dark:bg-zinc-950 text-base-content dark:text-zinc-50 antialiased selection:bg-primary/20 transition-colors duration-300">
      
      <div className="top-0 z-30 w-full bg-base-100/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-base-300 dark:border-zinc-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 gap-2">
          
          <div className="flex-1 max-w-md md:max-w-none flex justify-start">
            <div className="flex items-center w-full sm:w-auto gap-1 bg-base-200 dark:bg-zinc-900/60 p-1 rounded-xl border border-base-300 dark:border-zinc-800 shadow-inner overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isDisabled = isFirstTimeUser && tab.id !== "create";

                return (
                  <button
                    key={tab.id}
                    onClick={() => !isDisabled && setActiveTab(tab.id)}
                    disabled={isDisabled}
                    className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-1 sm:flex-none ${
                      isDisabled ? "opacity-30 cursor-not-allowed" : ""
                    } ${
                      isActive && !isDisabled
                        ? "bg-base-100 dark:bg-zinc-800 text-primary dark:text-indigo-400 shadow-sm border border-base-300/30 dark:border-zinc-700/50"
                        : "text-base-content/60 dark:text-zinc-400 hover:text-base-content dark:hover:text-zinc-100"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive && !isDisabled ? "text-primary dark:text-indigo-400" : "opacity-70"} hidden sm:flex`} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeTab !== "create" && !isFirstTimeUser && (
            <button
              onClick={() => setActiveTab("create")}
              className="btn btn-primary hidden md:flex btn-sm h-10 min-h-[2.5rem] px-4 bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white font-medium normal-case rounded-xl shadow-md shadow-indigo-500/10 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] transition-all gap-1.5 text-xs shrink-0"
            >
              <HiOutlinePlus className="h-4 w-4" />
              <span>New Campaign</span>
            </button>
          )}
          
        </div>
      </div>

      <div className="w-full animate-in fade-in slide-in-from-top-4 duration-300">
        {isFirstTimeUser && activeTab !== "create" ? (
          <FirstLookCampaign onCreateClick={() => setActiveTab("create")} />
        ) : (
          <>
            {activeTab === "list" && <OverViewPage />}
            {activeTab === "create" && (
              <CreateCampaign onSuccessLaunch={() => setActiveTab("list")} />
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default MainPage;