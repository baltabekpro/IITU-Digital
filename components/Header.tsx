import { Bell, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  userName: string;
  userGroup?: string;
  userAvatar: string;
}

export default function Header({ userName, userGroup, userAvatar }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "h-16 flex items-center justify-between px-8 sticky top-0 z-30 transition-all duration-300",
      isScrolled 
        ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm" 
        : "bg-transparent border-b border-transparent"
    )}>
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B0000] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Поиск по курсам, документам..." 
            className="w-full pl-10 pr-4 py-2 bg-[#F3F4F6] dark:bg-slate-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000]/20 transition-all outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 size-2 bg-[#8B0000] rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none group-hover:text-[#8B0000] transition-colors">{userName}</p>
            {userGroup && <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1.5 leading-none">{userGroup}</p>}
          </div>
          <div className="size-10 rounded-full bg-white dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm p-0.5 overflow-hidden group-hover:border-[#8B0000]/30 transition-all">
            <img src={userAvatar} alt="User" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
