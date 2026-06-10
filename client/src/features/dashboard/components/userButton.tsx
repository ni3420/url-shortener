import { useState, useRef, useEffect } from "react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const userEmail = user?.primaryEmailAddress?.emailAddress || "";
  const userAvatar = user?.imageUrl;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
      >
        {userAvatar ? (
          <img src={userAvatar} alt="Profile" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-indigo-500 text-white font-bold text-sm">
            {userEmail?.[0]?.toUpperCase() || "U"}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl z-50 p-1.5 animation-fade-in">
          <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800/60 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500">
              Active Account
            </span>
            <span className="text-xs block truncate mt-0.5 text-neutral-600 dark:text-neutral-300 font-medium select-all">
              {userEmail}
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 h-10 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 rounded-lg transition-colors"
          >
            <HiOutlineArrowLeftOnRectangle className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}