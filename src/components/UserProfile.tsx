import { LogOut, User } from 'lucide-react';

interface UserProfileProps {
  user: any;
  onLogout: () => void;
}

const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-3">
      {user.picture ? (
        <img 
          src={user.picture} 
          alt={user.name}
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center border-2 border-white shadow-lg">
          <User className="w-6 h-6 text-white" />
        </div>
      )}
      
      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-white">{user.name}</p>
        <p className="text-xs text-cyan-100">{user.email}</p>
      </div>

      <button
        onClick={onLogout}
        className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-all"
        title="Logout"
      >
        <LogOut className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default UserProfile;
