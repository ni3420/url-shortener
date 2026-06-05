"use client";
import { 
  HiOutlineFolderPlus, 
  HiOutlineSparkles, 
  HiOutlineArrowTrendingUp, 
  HiOutlineShieldCheck,
  HiOutlinePlus
} from "react-icons/hi2";

interface FirstLookCampaignProps {
  onCreateClick?: () => void;
}

const FirstLookCampaign = ({ onCreateClick }: FirstLookCampaignProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-20 text-base-content antialiased flex flex-col items-center justify-center min-h-[75vh]">
      
      <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-35 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-violet-600/10 rounded-3xl border border-indigo-500/20 shadow-sm animate-pulse" />
        <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 border border-indigo-400/30 text-white shadow-xl shadow-indigo-500/20">
          <HiOutlineFolderPlus className="h-8 w-8 sm:h-10 sm:w-10 transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="absolute -top-1 -right-1 p-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-amber-400 shadow-md">
          <HiOutlineSparkles className="h-4 w-4 animate-bounce" />
        </div>
      </div>

      {/* TYPOGRAPHY ANCHOR */}
      <div className="text-center max-w-xl space-y-2.5">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-base-content via-base-content to-base-content/60 bg-clip-text text-transparent">
          Deploy Your First Marketing Campaign
        </h1>
        <p className="text-xs sm:text-sm text-base-content/50 dark:text-zinc-400 font-medium leading-relaxed">
          Welcome to your tracking command center. Group multiple localized links under clean workspace envelopes, capture sub-route parameters, and evaluate click velocities inside a single, low-latency dashboard shell.
        </p>
      </div>

      <div className="mt-8 self-stretch sm:self-auto">
        <button 
          onClick={onCreateClick}
          className="btn btn-primary w-full sm:w-auto h-12 min-h-[3rem] px-6 bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white font-bold tracking-tight normal-case rounded-xl shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] transition-all gap-2"
        >
          <HiOutlinePlus className="h-5 w-5" />
          <span>Create New Campaign Instance</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-16 max-w-3xl border-t border-base-200 dark:border-zinc-900/60 pt-10">
        
        <div className="p-4 bg-base-200/30 dark:bg-zinc-900/40 border border-base-300/50 dark:border-zinc-800/50 rounded-xl flex items-start gap-3">
          <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg shrink-0">
            <HiOutlineSparkles className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-base-content dark:text-zinc-200">Unified Grouping</h4>
            <p className="text-[11px] text-base-content/40 dark:text-zinc-500 font-semibold leading-normal">
              Bundle separate target routes underneath specific tracking names seamlessly.
            </p>
          </div>
        </div>

        <div className="p-4 bg-base-200/30 dark:bg-zinc-900/40 border border-base-300/50 dark:border-zinc-800/50 rounded-xl flex items-start gap-3">
          <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg shrink-0">
            <HiOutlineArrowTrendingUp className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-base-content dark:text-zinc-200">Real-time Telemetry</h4>
            <p className="text-[11px] text-base-content/40 dark:text-zinc-500 font-semibold leading-normal">
              Monitor browser versions, geolocation metrics, and exact click timestamps live.
            </p>
          </div>
        </div>

        <div className="p-4 bg-base-200/30 dark:bg-zinc-900/40 border border-base-300/50 dark:border-zinc-800/50 rounded-xl flex items-start gap-3">
          <div className="p-2 bg-pink-500/10 text-pink-500 rounded-lg shrink-0">
            <HiOutlineShieldCheck className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-base-content dark:text-zinc-200">Asset Validation</h4>
            <p className="text-[11px] text-base-content/40 dark:text-zinc-500 font-semibold leading-normal">
              Automated system cleaning for routing pointers that hit safety expiry frames.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default FirstLookCampaign;