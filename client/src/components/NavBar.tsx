import { Menu } from "lucide-react";

interface NavBarProps {
  setOpen: (open: boolean) => void;
}

const NavBar = ({ setOpen }: NavBarProps) => {
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

      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <details className="dropdown dropdown-end">
          <summary className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                alt="Profile"
              />
            </div>
          </summary>

          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default NavBar;