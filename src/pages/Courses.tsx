import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  MoreVertical, 
  AlarmClock, 
  BookOpen, 
  Layers, 
  CheckSquare, 
  FileText,
  LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { toast } from 'sonner';
import CollapsibleSection from '@/components/CollapsibleSection';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Courses() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleOpenCourse = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  const courses = [
    {
      id: 1,
      title: 'Алгоритмы и структуры данных',
      department: 'ВТПО',
      teacher: 'Абдикерим Н.Б.',
      students: 48,
      progress: 65,
      modules: 5,
      tasks: 12,
      deadlines: 2,
      accentColor: '#8B0000',
      gradient: 'from-[#8B0000]/10 to-transparent',
    },
    {
      id: 2,
      title: 'Базы данных',
      department: 'ИС',
      teacher: 'Мухамедиев Р.И.',
      students: 52,
      progress: 82,
      modules: 6,
      tasks: 10,
      deadlines: 0,
      accentColor: '#10B981',
      gradient: 'from-[#10B981]/10 to-transparent',
    },
    {
      id: 3,
      title: 'Мобильная разработка',
      department: 'ВТПО',
      teacher: 'Сарсенбай А.К.',
      students: 38,
      progress: 45,
      modules: 4,
      tasks: 8,
      deadlines: 1,
      accentColor: '#8B5CF6',
      gradient: 'from-[#8B5CF6]/10 to-transparent',
    }
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F0F2F5] dark:bg-slate-950">
      <Header 
        userName={role === 'teacher' ? "Абдикерим Н. Б." : "Иванов А. Б."} 
        userGroup={role === 'teacher' ? "Преподаватель" : "CS-2104K"} 
        userAvatar={role === 'teacher' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Almat"} 
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1440px] mx-auto p-8 lg:p-12 space-y-12">
          
          {/* Hero Section */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-[#0F172A] dark:text-white">
                  {role === 'teacher' ? 'Мои учебные курсы' : 'Мои курсы'}
                </h2>
                <p className="text-[#64748B] dark:text-slate-400 mt-2 text-base font-medium">
                  {role === 'teacher' ? 'Управление учебным процессом и материалами' : 'Осенний семестр 2025-2026 • 3 активных курса'}
                </p>
              </div>
              <div className="hidden lg:flex gap-3">
                <Button variant="outline" className="rounded-xl border-slate-200 bg-white shadow-sm font-bold">Архив</Button>
                <Button className="rounded-xl bg-[#1A1A1A] hover:bg-black text-white font-bold shadow-lg">Создать курс</Button>
              </div>
            </div>

            {/* Control Bar (Glassmorphism) */}
            <div className="glass p-2 rounded-2xl flex flex-wrap items-center gap-2 shadow-sm border-white/40">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder={role === 'teacher' ? "Поиск по названию курса" : "Поиск по названию курса или преподавателю"} 
                  className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border-none rounded-xl text-sm outline-none focus:bg-white transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="gap-2 h-11 px-4 rounded-xl hover:bg-white/80 font-bold text-slate-600">
                  <LayoutGrid size={18} />
                  Кафедра
                  <ChevronDown size={14} />
                </Button>
                <Button variant="ghost" className="gap-2 h-11 px-4 rounded-xl hover:bg-white/80 font-bold text-slate-600">
                  <Filter size={18} />
                  Статус
                  <ChevronDown size={14} />
                </Button>
              </div>
            </div>
          </motion.header>

          {/* Course Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="layered-card group cursor-pointer flex flex-col h-full"
                  onClick={() => handleOpenCourse(course.id)}
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Card Header with Gradient */}
                    <div className={cn("p-8 rounded-t-[24px] relative overflow-hidden bg-gradient-to-br", course.gradient)}>
                      <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full" style={{ backgroundColor: course.accentColor }}></div>
                      <div className="flex justify-between items-start mb-6">
                        <Badge className="bg-white/80 backdrop-blur-sm text-slate-900 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                          {course.department}
                        </Badge>
                        <Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-white/50" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical size={18} className="text-slate-400" />
                        </Button>
                      </div>
                      <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-white leading-tight mb-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full border-2 border-white shadow-sm overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher${course.id}`} alt="Teacher" />
                        </div>
                        <span className="text-[13px] text-[#64748B] font-medium">
                          {role === 'teacher' ? `${course.students} студентов` : course.teacher}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 pt-6 flex flex-col flex-1 space-y-8">
                      {/* Glass Progress UI */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black uppercase tracking-widest text-[#64748B]">
                            {role === 'teacher' ? 'Успеваемость' : 'Прогресс'}
                          </span>
                          <span className="text-sm font-black" style={{ color: course.accentColor }}>{course.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                            className="h-full rounded-full shadow-lg"
                            style={{ backgroundColor: course.accentColor }}
                          />
                        </div>
                      </div>

                      {/* Stats with Micro-icons */}
                      <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-50 dark:border-slate-800">
                        <div className="flex flex-col items-center gap-1.5">
                          <Layers size={16} className="text-slate-400" />
                          <span className="text-sm font-bold text-[#0F172A] dark:text-white">{course.modules}</span>
                          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-tighter">Модулей</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 border-x border-slate-50 dark:border-slate-800">
                          <CheckSquare size={16} className="text-slate-400" />
                          <span className="text-sm font-bold text-[#0F172A] dark:text-white">{course.tasks}</span>
                          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-tighter">Заданий</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5">
                          <FileText size={16} className={cn("text-slate-400", course.deadlines > 0 && "text-rose-500")} />
                          <span className={cn("text-sm font-bold", course.deadlines > 0 ? "text-rose-500" : "text-[#0F172A] dark:text-white")}>
                            {course.deadlines}
                          </span>
                          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-tighter">
                            {role === 'teacher' ? 'Проверки' : 'Дедлайна'}
                          </span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-[#1A1A1A] hover:bg-black text-white font-bold rounded-xl h-12 shadow-sm transition-all active:scale-95 mt-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCourse(course.id);
                        }}
                      >
                        {role === 'teacher' ? 'Управление курсом' : 'Открыть курс'}
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              ))}
            </AnimatePresence>
          </section>

          {/* Pending Tasks Section */}
          <CollapsibleSection 
            title={role === 'teacher' ? "Работы ожидающие проверки" : "Ближайшие дедлайны"} 
            className="layered-card border-none" 
            headerClassName="px-8 py-6" 
            contentClassName="p-8 pt-0"
            rightElement={<Button variant="link" className="text-[#8B0000] font-bold">Смотреть все</Button>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="group flex items-start gap-5 p-6 bg-[#F8F9FB] dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-white dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative mt-1">
                    <div className="size-12 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-600">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Student${i}`} alt="Student" />
                    </div>
                    <div className="absolute -top-1 -right-1 size-4 bg-rose-500 border-2 border-white dark:border-slate-800 rounded-full pulsate"></div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-bold text-base text-[#0F172A] dark:text-white">
                          {role === 'teacher' ? `Студент ${i}: Лаб. №5` : `Лабораторная работа №${i+4}`}
                        </h4>
                        <p className="text-[13px] text-[#64748B] font-medium">Алгоритмы и структуры данных</p>
                      </div>
                      <Badge className="bg-rose-50 text-rose-600 border-none font-black text-[10px] uppercase tracking-widest">Новое</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#64748B] uppercase tracking-wider bg-white dark:bg-slate-700 px-2 py-1 rounded-lg shadow-sm">
                        <AlarmClock size={14} className="text-rose-500" />
                        {i === 1 ? '2 часа назад' : '5 часов назад'}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#64748B] uppercase tracking-wider bg-white dark:bg-slate-700 px-2 py-1 rounded-lg shadow-sm">
                        <Layers size={14} />
                        Приоритет: Высокий
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

        </div>
      </div>
    </div>
  );
}
