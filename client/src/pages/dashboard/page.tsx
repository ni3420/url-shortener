import { useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/Sidebar";

const DashBoardPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar setOpen={setOpen} />

      <div className="flex">
        <div
          className={`
            fixed top-0 left-0 z-50 h-full
            transform bg-base-100 transition-transform duration-300
            lg:static lg:translate-x-0
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <SideBar />
        </div>

        {open && (
          <div
            className="fixed inset-0 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="flex-1 p-6">
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h1 className="text-2xl font-bold">
              Children
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoardPage;