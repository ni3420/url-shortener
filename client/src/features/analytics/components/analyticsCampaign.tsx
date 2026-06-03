import { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  HiOutlinePresentationChartLine, 
  HiOutlineGlobeAlt, 
  HiOutlineArrowUpRight,
  HiOutlineCircleStack
} from "react-icons/hi2";
import { HiOutlineCursorClick } from "react-icons/hi";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";
import { 
  useGetCampaignOverview, 
  useGetCampaignBreakdown, 
  useGetCampaignTimeline 
} from "@/features/analytics";

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#3b82f6", "#14b8a6"];

const AnalyticsCampaign = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [timeRange, setTimeRange] = useState("7d");

  const { data: overview, isLoading: isOverviewLoading, error: overviewError } = useGetCampaignOverview(campaignId);
  const { data: breakdown, isLoading: isBreakdownLoading, error: breakdownError } = useGetCampaignBreakdown(campaignId);
  const { data: timeline, isLoading: isTimelineLoading, error: timelineError } = useGetCampaignTimeline(campaignId);

  if (isOverviewLoading || isBreakdownLoading || isTimelineLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (overviewError || breakdownError || timelineError) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="alert alert-error max-w-xl mx-auto rounded-xl shadow-lg text-white">
          <span>Failed to sync database records. Please try reloading the analytics view.</span>
        </div>
      </div>
    );
  }

  const chartTimelineData = timeline?.map((item) => {
    const rawDate = item._id ? new Date(item._id) : new Date();
    const formattedDate = !isNaN(rawDate.getTime())
      ? rawDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : item._id;

    return {
      date: formattedDate,
      clicks: item.clicks || 0,
    };
  }) || [];

  const devicePieData = breakdown?.devices?.map((item) => ({
    name: item._id || "Unknown",
    value: item.count || 0,
  })) || [];

  const locationBarData = breakdown?.countries?.map((item) => ({
    name: item._id || "Unknown",
    clicks: item.count || 0,
  })) || [];

  const browserBarData = breakdown?.browsers?.map((item) => ({
    name: item._id || "Unknown",
    clicks: item.count || 0,
  })) || [];

  const topCountry = locationBarData[0]?.name || "N/A";
  const totalClicksCount = overview?.totalClicks || 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 text-base-content antialiased">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-base-300 dark:border-zinc-900 pb-6 mt-6 md:mt-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-violet-600/10 border border-indigo-500/20 text-indigo-500 shadow-sm">
              <HiOutlinePresentationChartLine className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
                Campaign Performance
              </h1>
              <p className="text-xs sm:text-sm text-base-content/50 font-medium mt-0.5">
                Real-time tracking diagnostics, audience demographics, and conversion metrics for this campaign.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-base-200 dark:bg-zinc-900/50 border border-base-300 dark:border-zinc-800 p-1 rounded-xl self-start sm:self-auto shadow-inner">
          {["24h", "7d", "30d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === range
                  ? "bg-base-100 dark:bg-zinc-800 text-primary dark:text-indigo-400 shadow-sm"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Total Engagements</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl"><HiOutlineCursorClick className="h-5 w-5" /></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">{totalClicksCount}</span>
            <span className="badge badge-success gap-1 text-white text-xs font-semibold py-2 bg-emerald-500 border-none">
              <HiOutlineArrowUpRight className="h-3 w-3" /> Live
            </span>
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Deployed Links</span>
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl"><HiOutlineCircleStack className="h-5 w-5" /></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">{overview?.totalLinks || 0}</span>
            <span className="badge badge-success gap-1 text-white text-xs font-semibold py-2 bg-emerald-500 border-none">
              <HiOutlineArrowUpRight className="h-3 w-3" /> Active
            </span>
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Analytics Status</span>
            <div className="p-2 bg-pink-500/10 text-pink-500 rounded-xl"><HiOutlinePresentationChartLine className="h-5 w-5" /></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">Healthy</span>
            <span className="text-xs font-semibold text-base-content/40 dark:text-zinc-500">100% Tracking</span>
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Top Geo Region</span>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl"><HiOutlineGlobeAlt className="h-5 w-5" /></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight truncate max-w-[150px]">{topCountry}</span>
            <span className="text-xs font-semibold text-base-content/40 dark:text-zinc-500">Highest hits</span>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl shadow-base-content/5">
        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-lg font-bold tracking-tight">Traffic Breakdown over Time</h3>
          <p className="text-xs text-base-content/50 font-medium">Chronological distribution graph showing click velocities across tracking nodes.</p>
        </div>
        <div className="w-full h-[320px]">
          {chartTimelineData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(120,120,120,0.15)" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(30, 30, 40, 0.9)", 
                    border: "1px solid rgba(120,120,120,0.2)",
                    borderRadius: "12px",
                    color: "#fff"
                  }} 
                />
                <Area type="monotone" dataKey="clicks" name="Total Clicks" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-base-content/40 border border-dashed border-base-300 dark:border-zinc-800 rounded-xl">
              No timeline redirect logs recorded for this campaign window.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-base font-bold tracking-tight">Device Classification</h3>
            <p className="text-xs text-base-content/50 font-medium">Target platform client distribution metrics.</p>
          </div>
          <div className="w-full h-[220px] flex items-center justify-center">
            {devicePieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={devicePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {devicePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <span className="text-xs text-base-content/40">No device context captured</span>
            )}
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-base font-bold tracking-tight">Geographic Locations</h3>
            <p className="text-xs text-base-content/50 font-medium">Top high-density visitor regions.</p>
          </div>
          <div className="w-full h-[220px]">
            {locationBarData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationBarData} layout="vertical" margin={{ top: 5, right: 10, left: 15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(120,120,120,0.15)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.8 }} />
                  <Tooltip />
                  <Bar dataKey="clicks" name="Clicks" fill="#a855f7" radius={[0, 6, 6, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-base-content/40">No region tracking assets logged</div>
            )}
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-base font-bold tracking-tight">System Browsers</h3>
            <p className="text-xs text-base-content/50 font-medium">User agent identity metrics.</p>
          </div>
          <div className="w-full h-[220px]">
            {browserBarData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={browserBarData} margin={{ top: 10, right: 5, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(120,120,120,0.15)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.8 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                  <Tooltip />
                  <Bar dataKey="clicks" name="Clicks" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-base-content/40">No client signatures cached</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCampaign;