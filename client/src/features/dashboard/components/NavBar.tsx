import UserButton from "./userButton";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 px-4 md:px-6 h-16 w-full sticky top-0 z-30 transition-all duration-200">
      
      <div className="navbar-start">
        <label 
          htmlFor="sidebar-drawer" 
          className="btn btn-ghost btn-circle lg:hidden drawer-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
        
        <span className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
          Dashboard
        </span>
      </div>

      

      <div className="navbar-end gap-2 sm:gap-4">
        <button className="btn btn-ghost btn-circle btn-sm relative hover:bg-base-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="badge badge-primary badge-xs absolute top-1 right-1 ping-animation"></span>
        </button>

        <div className="divider divider-horizontal my-4 mx-0 hidden sm:flex"></div>

        <UserButton />
      </div>

    </div>
  );
};

export default NavBar;