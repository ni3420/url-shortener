import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineCog6Tooth, HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

const UserButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = {
    name: "Kuldeep",
    email: "kuldeep@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-circle avatar online ring-2 ring-primary/20 hover:ring-primary/50 transition-all focus:outline-none"
      >
        <div className="w-10 rounded-full">
          <img src={user.avatar} alt={user.name} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-3 px-3 py-3 border-b border-base-200">
            <div className="avatar">
              <div className="w-11 rounded-xl">
                <img src={user.avatar} alt={user.name} />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate text-base-content">{user.name}</span>
              <span className="text-xs text-base-content/60 truncate">{user.email}</span>
            </div>
          </div>

          <div className="py-1.5 space-y-0.5">
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 h-10 rounded-xl text-sm font-medium text-base-content/80 hover:bg-base-200 hover:text-base-content transition-all group"
            >
              <HiOutlineUser className="h-4 w-4 text-base-content/60 group-hover:text-base-content" />
              <span>My Profile</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 h-10 rounded-xl text-sm font-medium text-base-content/80 hover:bg-base-200 hover:text-base-content transition-all group"
            >
              <HiOutlineCog6Tooth className="h-4 w-4 text-base-content/60 group-hover:text-base-content" />
              <span>Account Settings</span>
            </Link>
          </div>

          <div className="pt-1.5 border-t border-base-200">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 h-10 rounded-xl text-sm font-medium text-error hover:bg-error/10 transition-all"
            >
              <HiOutlineArrowLeftOnRectangle className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserButton;