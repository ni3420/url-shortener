import { useState, useEffect } from "react";
import { HiOutlineBars3, HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import UserButton from "./userButton";

interface NavBarProps {
  onMobileMenuToggle: () => void;
}

const NavBar = ({ onMobileMenuToggle }: NavBarProps) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="w-full h-16 bg-base-100 dark:bg-zinc-950 border-b border-base-300 dark:border-zinc-900 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden btn btn-ghost btn-square btn-sm border border-base-300 dark:border-zinc-800 shadow-sm rounded-xl text-base-content dark:text-zinc-400"
          aria-label="Toggle navigation menu"
        >
          <HiOutlineBars3 className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 font-bold tracking-tight">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
            <span className="text-lg font-black text-white tracking-tighter">S</span>
          </div>
          <span className="text-lg bg-gradient-to-r from-base-content to-base-content/70 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
            Shortly
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle btn-sm border border-base-300 dark:border-zinc-800 rounded-xl text-base-content dark:text-zinc-400 hover:bg-base-200 dark:hover:bg-zinc-900 transition-all"
          aria-label="Toggle visual theme configuration"
        >
          {theme === "light" ? (
            <HiOutlineMoon className="h-4 w-4" />
          ) : (
            <HiOutlineSun className="h-4 w-4 text-amber-500" />
          )}
        </button>
        <UserButton />
      </div>
    </nav>
  );
};

export default NavBar;