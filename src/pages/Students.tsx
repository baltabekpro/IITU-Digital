import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MessageSquare, 
  BookOpen, 
  UserCog, 
  ChevronDown, 
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  AlertCircle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Student {
  id: string;
  name: string;
  avatar: string;
  group: string;
  stream: string;
  performance: number;
  status: 'Active' | 'Academic Leave';
  isOnline: boolean;
  gradesHistory: { value: number }[];
}

const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Александр Петров',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    group: 'CS-2104K',
    stream: 'Computer Science',
    performance: 92,
    status: 'Active',
    isOnline: true,
    gradesHistory: [{ value: 85 }, { value: 88 }, { value: 92 }, { value: 90 }, { value: 95 }]
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    group: 'CS-2104K',
    stream: 'Computer Science',
    performance: 78,
    status: 'Active',
    isOnline: false,
    gradesHistory: [{ value: 70 }, { value: 75 }, { value: 72 }, { value: 80 }, { value: 78 }]
  },
  {
    id: '3',
    name: 'Дмитрий Иванов',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
    group: 'IS-2102B',
    stream: 'Information Systems',
    performance: 85,
    status: 'Active',
    isOnline: true,
    gradesHistory: [{ value: 80 }, { value: 82 }, { value: 85 }, { value: 84 }, { value: 88 }]
  },
  {
    id: '4',
    name: 'Елена Козлова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    group: 'CS-2104K',
    stream: 'Computer Science',
    performance: 65,
    status: 'Academic Leave',
    isOnline: false,
    gradesHistory: [{ value: 60 }, { value: 62 }, { value: 65 }, { value: 63 }, { value: 65 }]
  },
  {
    id: '5',
    name: 'Артем Смирнов',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Artem',
    group: 'IS-2102B',
    stream: 'Information Systems',
    performance: 98,
    status: 'Active',
    isOnline: true,
    gradesHistory: [{ value: 95 }, { value: 96 }, { value: 98 }, { value: 97 }, { value: 99 }]
  }
];

export default function Students() {
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'from-emerald-500 to-teal-600';
    if (score >= 75) return 'from-amber-400 to-orange-500';
    return 'from-rose-500 to-crimson-600';
  };

  const stats = [
    { label: 'Всего студентов', value: '1,248', icon: Users, color: 'text-blue-600' },
    { label: 'Средняя успеваемость', value: '84.2%', icon: GraduationCap, color: 'text-emerald-600' },
    { label: 'Пропуски за неделю', value: '12%', icon: AlertCircle, color: 'text-rose-600', trend: '-2.4%', negative: true },
    { label: 'Отличники', value: '312', icon: Star, color: 'text-amber-500' }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FB] dark:bg-slate-950">
      <Header 
        userName={role === 'teacher' ? "Абдикерим Н. Б." : "Администратор"} 
        userGroup={role === 'teacher' ? "Преподаватель" : "Система управления"} 
        userAvatar={role === 'teacher' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} 
      />

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <div className="max-w-[1400px] mx-auto space-y-8">
          
          {/* Bento Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-2 rounded-xl bg-slate-50 dark:bg-slate-800", stat.color)}>
                    <stat.icon size={20} />
                  </div>
                  {stat.trend && (
                    <div className={cn(
                      "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full",
                      stat.negative ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                    )}>
                      {stat.negative ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                      {stat.trend}
                    </div>
                  )}
                </div>
                <p className="text-[12px] font-light text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">
                  {stat.label}
                </p>
                <h3 className="text-24px font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Advanced Filter Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Поиск по имени, группе или ID..." 
                className="pl-11 h-12 bg-slate-50/50 dark:bg-slate-800/50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-slate-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-12 px-5 rounded-xl border-slate-100 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300 gap-2">
                <Filter size={18} />
                Фильтры
              </Button>
              <Button variant="ghost" className="h-12 px-5 rounded-xl font-bold text-slate-600 dark:text-slate-300 gap-2">
                <Download size={18} />
                Экспорт
              </Button>
            </div>
          </div>

          {/* Students Smart Table */}
          <div className="space-y-2">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 skeleton w-full" />
              ))
            ) : (
              MOCK_STUDENTS.map((student, i) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <div 
                    onClick={() => setExpandedId(expandedId === student.id ? null : student.id)}
                    className={cn(
                      "soft-ui-card p-4 flex items-center gap-6 cursor-pointer hover:translate-x-1 hover:shadow-md",
                      expandedId === student.id && "border-slate-300 dark:border-slate-600 shadow-md"
                    )}
                  >
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-4 w-[300px]">
                      <div className="relative">
                        <img src={student.avatar} alt={student.name} className="size-10 rounded-full bg-slate-100" />
                        <div className={cn(
                          "absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white dark:border-slate-900",
                          student.isOnline ? "bg-emerald-500" : "bg-slate-300"
                        )} />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-semibold text-slate-900 dark:text-white leading-tight">
                          {student.name}
                        </h4>
                        <p className="text-[12px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                          ID: {student.id}0429
                        </p>
                      </div>
                    </div>

                    {/* Group & Stream */}
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Группа</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{student.group}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Поток</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{student.stream}</p>
                      </div>
                    </div>

                    {/* Performance Column */}
                    <div className="w-[120px]">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Успеваемость</p>
                      <div className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-[12px] font-black text-white bg-gradient-to-r",
                        getPerformanceColor(student.performance)
                      )}>
                        {student.performance}/100
                      </div>
                    </div>

                    {/* Progress Sparkline */}
                    <div className="w-[120px] h-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={student.gradesHistory}>
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={student.performance >= 90 ? "#10b981" : student.performance >= 75 ? "#f59e0b" : "#ef4444"} 
                            strokeWidth={2} 
                            dot={false} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Status */}
                    <div className="w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "size-1.5 rounded-full",
                          student.status === 'Active' ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                        <span className="text-[12px] font-bold text-slate-600 dark:text-slate-400">
                          {student.status}
                        </span>
                      </div>
                    </div>

                    {/* Action Column */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="rounded-xl hover:text-brand-600 hover:bg-brand-50">
                        <MessageSquare size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-xl hover:text-brand-600 hover:bg-brand-50">
                        <BookOpen size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-xl hover:text-brand-600 hover:bg-brand-50">
                        <UserCog size={18} />
                      </Button>
                      <div className="ml-2 text-slate-300">
                        {expandedId === student.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Expansion */}
                  <AnimatePresence>
                    {expandedId === student.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-slate-50/50 dark:bg-slate-800/30 mx-4 p-6 rounded-b-xl border-x border-b border-slate-100 dark:border-slate-800 space-y-4">
                          <h5 className="text-[12px] font-black text-slate-400 uppercase tracking-widest">История последних оценок</h5>
                          <div className="flex gap-4">
                            {student.gradesHistory.map((grade, idx) => (
                              <div key={idx} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex-1 text-center">
                                <p className="text-[10px] font-bold text-slate-400 mb-1">Занятие {idx + 1}</p>
                                <p className={cn(
                                  "text-lg font-black",
                                  grade.value >= 90 ? "text-emerald-600" : grade.value >= 75 ? "text-amber-600" : "text-rose-600"
                                )}>
                                  {grade.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
