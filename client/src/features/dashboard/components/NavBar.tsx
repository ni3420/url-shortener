import UserButton from "./userButton";

const NavBar = () => {
  return (
    <header className="w-full h-16 bg-base-100 border-b border-base-300 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2.5 font-bold tracking-tight">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
          <span className="text-lg font-black text-white tracking-tighter">S</span>
        </div>
        <span className="text-lg bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
          Shortly
        </span>
      </div>

      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </header>
  );
};

export default NavBar;