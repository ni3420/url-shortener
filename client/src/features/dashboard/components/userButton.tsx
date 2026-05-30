import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';

interface UserButtonProps {
  user?: {
    name: string;
    email: string;
    image?: string;
  } | null;
  onLogout?: () => void;
  onLoginClick?: () => void;
}

const UserButton = ({ user, onLogout, onLoginClick }: UserButtonProps) => {
  if (!user) {
    return (
      <button 
        onClick={onLoginClick}
        className="btn btn-primary btn-sm px-5 text-white font-medium rounded-xl normal-case shadow-md shadow-primary/20"
      >
        Sign In
      </button>
    );
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <details className="dropdown dropdown-end">
      <summary className="btn btn-ghost btn-circle avatar placeholder focus:outline-none list-none [&::-webkit-details-marker]:hidden">
        <div className="bg-neutral text-neutral-content w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          {user.image ? (
            <img 
              src={user.image} 
              alt={user.name} 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <span className="text-sm font-semibold tracking-wider">{initial}</span>
          )}
        </div>
      </summary>
      
      <ul className="menu dropdown-content p-2 shadow-2xl bg-base-100 rounded-2xl w-60 border border-base-200/60 mt-2 z-50">
        <li className="px-4 py-3 border-b border-base-200 mb-1 pointer-events-none">
          <p className="font-bold text-base-content tracking-tight truncate max-w-full">
            {user.name}
          </p>
          <p className="text-xs text-base-content/50 truncate max-w-full font-medium">
            {user.email}
          </p>
        </li>

        <li>
          <a className="py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 active:bg-primary/10 active:text-primary">
            <LayoutDashboard size={16} className="text-base-content/60" />
            Dashboard
          </a>
        </li>
        <li>
          <a className="py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 active:bg-primary/10 active:text-primary">
            <Settings size={16} className="text-base-content/60" />
            Account Settings
          </a>
        </li>

        <div className="divider my-1 before:bg-base-200 after:bg-base-200" />

        <li>
          <button 
            onClick={onLogout}
            className="py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 text-error hover:bg-error/10 active:bg-error/20"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </li>
      </ul>
    </details>
  );
};

export default UserButton;