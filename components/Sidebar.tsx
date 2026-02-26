import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Calendar, BookOpen, Award, Settings, 
  MessageSquare, Users, FileText, CreditCard, BarChart2,
  GraduationCap, LogOut, User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  role: 'student' | 'teacher' | 'admin';
}

export default function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentLinks = [
    { name: 'Главная', path: '/', icon: Home },
    { name: 'Расписание', path: '/schedule', icon: Calendar },
    { name: 'Курсы', path: '/courses', icon: BookOpen },
    { name: 'Оценки', path: '/grades', icon: Award },
    { name: 'Чат', path: '/chat', icon: MessageSquare },
  ];

  const teacherLinks = [
    { name: 'Дашборд', path: '/teacher', icon: Home },
    { name: 'Мои курсы', path: '/teacher/courses', icon: BookOpen },
    { name: 'Расписание', path: '/teacher/schedule', icon: Calendar },
    { name: 'Студенты', path: '/teacher/students', icon: Users },
    { name: 'Журнал', path: '/teacher/grades', icon: Award },
    { name: 'Чат', path: '/chat', icon: MessageSquare },
    { name: 'Мой профиль', path: '/teacher/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Дашборд', path: '/admin', icon: Home },
    { name: 'Студенты', path: '/admin/students', icon: Users },
    { name: 'Преподаватели', path: '/admin/teachers', icon: GraduationCap },
    { name: 'Группы', path: '/admin/groups', icon: Users },
    { name: 'Расписание', path: '/admin/schedule', icon: Calendar },
    { name: 'Заявления', path: '/admin/applications', icon: FileText },
    { name: 'Финансы', path: '/admin/finance', icon: CreditCard },
    { name: 'Отчёты', path: '/admin/reports', icon: BarChart2 },
  ];

  const links = role === 'student' ? studentLinks : role === 'teacher' ? teacherLinks : adminLinks;

  return (
    <aside className={cn(
      "w-64 flex flex-col shrink-0 fixed h-full z-20",
      role === 'admin' ? "bg-[#8B0000] text-white" : "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800"
    )}>
      <div className="p-6 flex items-center gap-3">
        <div className={cn(
          "size-10 rounded-xl flex items-center justify-center shadow-sm",
          role === 'admin' ? "bg-white text-[#8B0000]" : "bg-[#8B0000] text-white"
        )}>
          <GraduationCap size={24} />
        </div>
        <div>
          <h1 className={cn("font-bold text-lg leading-tight tracking-tight", role === 'admin' ? "text-white" : "text-slate-900 dark:text-white")}>
            IITU Digital
          </h1>
          <p className={cn("text-[10px] font-bold uppercase tracking-[0.1em]", role === 'admin' ? "text-brand-200" : "text-slate-400")}>
            {role === 'student' ? 'Студент' : role === 'teacher' ? 'Преподаватель' : 'Admin Portal'}
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                role !== 'admin' 
                  ? isActive 
                    ? "bg-[#8B0000]/5 text-[#8B0000] font-bold" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  : isActive
                    ? "bg-white/20 text-white font-bold border-l-4 border-white"
                    : "text-brand-100 hover:bg-white/10 hover:text-white"
              )}
            >
              <link.icon size={18} className={cn(
                "transition-transform duration-200 group-hover:scale-110",
                role !== 'admin' && isActive ? "text-[#8B0000]" : ""
              )} />
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className={cn("p-4 mt-auto border-t", role === 'admin' ? "border-white/10" : "border-slate-100 dark:border-slate-800")}>
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
            role !== 'admin'
              ? "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              : "text-brand-100 hover:bg-white/10 hover:text-white"
          )}
        >
          <Settings size={18} />
          <span className="text-sm font-bold">Настройки</span>
        </Link>
        
        {role !== 'admin' && (
          <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100 dark:border-slate-800">
            <div className="size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-700">
              <img src={role === 'student' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Almat" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1"} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-slate-900 dark:text-white">{role === 'student' ? 'Иванов Алмат' : 'Абдикерим Н. Б.'}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">{role === 'student' ? 'ID: 29402' : 'Преподаватель'}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={cn(
            "w-full mt-4 flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all active:scale-95",
            role === 'student' || role === 'teacher'
              ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold"
              : "text-red-300 hover:bg-white/10 hover:text-red-200"
          )}
        >
          <LogOut size={18} />
          <span className="text-sm font-bold">Выйти</span>
        </button>
      </div>
    </aside>
  );
}
