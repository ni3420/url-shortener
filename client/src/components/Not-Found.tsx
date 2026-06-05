import { Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineExclamationTriangle } from "react-icons/hi2";

const Not_Found = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-base-100 dark:bg-zinc-950 text-base-content antialiased relative overflow-hidden px-4 selection:bg-indigo-500/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-violet-600/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shadow-xl shadow-amber-500/5">
          <HiOutlineExclamationTriangle className="h-6 w-6" />
        </div>

        <div className="space-y-3">
          <h1 className="text-7xl sm:text-8xl font-black tracking-tighter bg-gradient-to-b from-base-content via-base-content to-base-content/40 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Lost in the database architecture
          </h2>
          <p className="text-sm text-base-content/60 max-w-xs mx-auto font-medium leading-relaxed">
            The destination target pointer you are looking for does not exist or was shifted permanently.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/home"
            className="btn btn-primary inline-flex items-center gap-2 h-11 min-h-[2.75rem] px-6 bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white text-sm font-semibold rounded-xl shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all normal-case group"
          >
            <HiOutlineArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 duration-200" />
            <span>Return to Core Dashboard</span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-mono tracking-wider text-base-content/30 uppercase font-semibold">
        System Node Status: ERR_ROUTE_RESOLVE
      </div>
    </div>
  );
};

export default Not_Found;