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
      role === 'admin' ? "bg-brand-700 text-white" : "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800"
    )}>
      <div className="p-6 flex items-center gap-3">
        <div className={cn(
          "size-10 rounded-lg flex items-center justify-center",
          role === 'admin' ? "bg-white text-brand-700" : "bg-brand-600 text-white"
        )}>
          <GraduationCap size={24} />
        </div>
        <div>
          <h1 className={cn("font-bold text-lg leading-tight", role === 'admin' ? "text-white" : "text-slate-900 dark:text-white")}>
            IITU Digital
          </h1>
          <p className={cn("text-xs font-medium uppercase tracking-wider", role === 'admin' ? "text-brand-200" : "text-slate-500")}>
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
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                role !== 'admin' 
                  ? isActive 
                    ? "bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400 font-semibold" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  : isActive
                    ? "bg-white/20 text-white font-semibold border-l-4 border-white"
                    : "text-brand-100 hover:bg-white/10 hover:text-white"
              )}
            >
              <link.icon size={20} className={cn(
                role !== 'admin' && isActive ? "text-brand-600 dark:text-brand-400" : ""
              )} />
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className={cn("p-4 mt-auto border-t", role === 'admin' ? "border-white/10" : "border-slate-200 dark:border-slate-800")}>
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
            role !== 'admin'
              ? "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              : "text-brand-100 hover:bg-white/10 hover:text-white"
          )}
        >
          <Settings size={20} />
          <span className="text-sm font-medium">Настройки</span>
        </Link>
        
        {role !== 'admin' && (
          <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center overflow-hidden">
              <img src={role === 'student' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Almat" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1"} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{role === 'student' ? 'Иванов Алмат' : 'Абдикерим Н. Б.'}</p>
              <p className="text-xs text-slate-500 truncate">{role === 'student' ? 'ID: 29402' : 'Преподаватель'}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={cn(
            "w-full mt-4 flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
            role === 'student'
              ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              : "text-red-300 hover:bg-white/10 hover:text-red-200"
          )}
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Выйти</span>
        </button>
      </div>
    </aside>
  );
}
