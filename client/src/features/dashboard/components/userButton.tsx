"use client";

import { useState, useRef, useEffect } from "react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { useLogout } from "@/features/auth/api/use-logout";
import { useCurrentUser } from "@/features/auth/api/use-currentuser"; 

const UserButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate: logout } = useLogout();
  const { data: userData } = useCurrentUser();

  const userEmail = userData?.data?.email || userData?.email || "user@example.com";
  const userInitial = userEmail.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-circle avatar bg-gradient-to-tr from-indigo-500/10 to-violet-600/10 border border-indigo-500/20 text-indigo-500 font-bold text-sm tracking-tight focus:outline-none hover:bg-base-200 dark:hover:bg-zinc-900"
      >
        {userInitial}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 dark:bg-zinc-900 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="px-3 py-2.5 border-b border-base-200 dark:border-zinc-800">
            <span className="text-[10px] font-black uppercase tracking-wider text-base-content/40 block">
              Active Account
            </span>
            <span className="text-xs font-semibold text-base-content dark:text-zinc-300 block truncate mt-0.5 select-all">
              {userEmail}
            </span>
          </div>

          <div className="pt-1.5">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 h-10 rounded-xl text-sm font-semibold text-error hover:bg-error/10 transition-all"
            >
              <HiOutlineArrowLeftOnRectangle className="h-4 w-4 shrink-0" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserButton;