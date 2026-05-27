import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link2, Trash2, ExternalLink, BarChart3, Copy, Check } from "lucide-react";

interface ApiResponse {
  original_Url: string;
  short_Url: string;
  TotalClicks: [{
    timeStamp: Date;
  }];
  QR_Code: string;
}

const Home = () => {
  const [text, setText] = useState<string>("");
  const [url, setUrl] = useState<ApiResponse[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const res=await axios.get("/api")
        if(res)
        {
          setUrl(res.data)
        }
        
      } catch (error) {
        console.log(error)
        
        
      }
    };
    init();
  }, []);

  const handle = async (text: string) => {
    if (!text.trim()) return;
    const res = await axios.post("/api", { text });
    console.log(res);
    setText("");
  };

  const DeleteUrl = async (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    e.stopPropagation();
    const res = await axios.delete("/api", { data: { text } });
    if (res) {
      const newUrl = url.filter((item) => item.short_Url !== text);
      setUrl(newUrl);
    }
  };

  const copyToClipboard = (shortUrl: string) => {
    const fullUrl = `${window.location.origin}/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(shortUrl);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const latestLink = url[url.length - 1];

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-[#f4f7fb] px-4 py-10 antialiased selection:bg-blue-500 selection:text-white sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Top Navbar Brand Simulation */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight">
            <Link2 size={24} className="stroke-[2.5]" />
            <span>Url Shortener</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="text-blue-600 cursor-pointer">Generate</span>
            {/* <span className="hover:text-slate-800 cursor-pointer transition-colors">History</span> */}
          </div>
        </div>

        {/* Shorten Input Card Container */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-cyan-50/60 p-8 border border-blue-100/50 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Shorten Your Link</h2>
          <div className="flex w-full items-center gap-3 rounded-2xl bg-white p-2 shadow-md shadow-slate-100 border border-slate-200/50 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-200">
            <div className="pl-3 text-slate-400">
              <Link2 size={18} />
            </div>
            <input
              type="text"
              placeholder="Paste your long URL here..."
              value={text}
              className="w-full bg-transparent p-2 text-slate-800 placeholder-slate-400 outline-none font-medium text-sm sm:text-base"
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
              onClick={() => handle(text)}
            >
              Shorten & Generate QR Code
            </button>
          </div>
        </div>

        {/* Big QR Code Display Box (Active generated Link) */}
        {latestLink && (
          <div className="rounded-3xl bg-white p-8 border border-slate-200/60 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Your Short Link & QR Code</h3>
            
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Massive Scan Center */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="p-3 bg-white border-2 border-blue-500/30 rounded-2xl shadow-xl shadow-blue-500/10 transition-transform hover:scale-105 duration-300">
                  <img
                    src={latestLink.QR_Code}
                    alt="Scan Target QR"
                    className="w-44 h-44 object-contain rounded-lg"
                  />
                </div>
                <span className="rounded-full bg-blue-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm shadow-blue-500/20">
                  Scan Me
                </span>
              </div>

              {/* URL Descriptions and Quick Actions */}
              <div className="flex-1 w-full space-y-5 text-center md:text-left">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Original link</span>
                  <p className="text-sm text-slate-600 font-medium break-all line-clamp-2" title={latestLink.original_Url}>
                    {latestLink.original_Url}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shortened link</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight break-all">
                    {window.location.hostname}/{latestLink.short_Url}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <button
                    onClick={() => copyToClipboard(latestLink.short_Url)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                  >
                    {copiedId === latestLink.short_Url ? (
                      <>
                        <Check size={16} className="text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="text-slate-500" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => navigate(`/${latestLink.short_Url}`)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50/50 px-5 py-2.5 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-100/70"
                  >
                    <span>Visit Link</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activities List view */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Recent Activities</h3>
          
          <div className="space-y-2">
            {url && url.length > 0 ? (
              url.slice(0).reverse().map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm hover:border-slate-300 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Link2 size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-700 truncate text-sm sm:text-base">
                        {item.short_Url}
                      </p>
                      <p className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-md">
                        {item.original_Url}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-100">
                      <BarChart3 size={12} />
                      {item.TotalClicks.length} clicks
                    </span>
                    
                    <button
                      className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 md:opacity-0 group-hover:opacity-100 focus:opacity-100"
                      onClick={(e) => DeleteUrl(e, item.short_Url)}
                      title="Delete activity"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-400">
                <p className="text-sm font-medium">No link conversions logged yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;