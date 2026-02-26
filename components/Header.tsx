import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  userName: string;
  userGroup?: string;
  userAvatar: string;
}

export default function Header({ userName, userGroup, userAvatar }: HeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Поиск по курсам, документам..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-brand-500/50 transition-all outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-none">{userName}</p>
            {userGroup && <p className="text-xs text-slate-500 mt-1 leading-none">{userGroup}</p>}
          </div>
          <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-brand-500/20 p-0.5">
            <img src={userAvatar} alt="User" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
