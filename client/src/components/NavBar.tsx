import { Menu } from "lucide-react";

const NavBar = ({ setOpen }) => {
  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4">
      <div className="flex-none lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="btn btn-square btn-ghost"
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-bold">
          Dashboard
        </h1>
      </div>
    </div>
  );
};

export default NavBar;