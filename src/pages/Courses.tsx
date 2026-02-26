import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Filter, MoreVertical, AlarmClock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { toast } from 'sonner';
import CollapsibleSection from '@/components/CollapsibleSection';
import { useAuth } from '@/contexts/AuthContext';

export default function Courses() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

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
      color: 'from-brand-500 to-brand-700',
      badgeColor: 'bg-brand-50 text-brand-600 hover:bg-brand-100',
      progressColor: 'bg-brand-600',
      progressText: 'text-brand-600',
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
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
      progressColor: 'bg-emerald-500',
      progressText: 'text-emerald-500',
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
      color: 'from-purple-500 to-pink-600',
      badgeColor: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
      progressColor: 'bg-purple-500',
      progressText: 'text-purple-500',
    }
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        userName={role === 'teacher' ? "Абдикерим Н. Б." : "Иванов А. Б."} 
        userGroup={role === 'teacher' ? "Преподаватель" : "CS-2104K"} 
        userAvatar={role === 'teacher' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Almat"} 
      />
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <header className="flex flex-col gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {role === 'teacher' ? 'Мои учебные курсы' : 'Мои курсы — Осенний семестр 2025-2026'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {role === 'teacher' ? 'Управление учебным процессом и материалами' : 'Добро пожаловать в учебный портал МУИТ'}
            </p>
          </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder={role === 'teacher' ? "Поиск по названию курса" : "Поиск по названию курса или преподавателю"} 
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border-none rounded-xl shadow-sm focus:ring-2 focus:ring-brand-500/50 text-sm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="secondary" className="gap-2 h-11 px-4 rounded-xl">
            Все кафедры <ChevronDown size={16} className="text-slate-400" />
          </Button>
          <Button variant="secondary" className="gap-2 h-11 px-4 rounded-xl">
            Статус: Активен <Filter size={16} className="text-slate-400" />
          </Button>
        </div>
      </header>

      {/* Course Grid */}
      <CollapsibleSection title={role === 'teacher' ? "Курсы под моим руководством" : "Мои курсы"} className="mb-12 border-none bg-transparent shadow-none" headerClassName="px-0 py-4 hover:bg-transparent" contentClassName="px-0 pt-0">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card 
              key={course.id} 
              className="rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow border-none shadow-sm cursor-pointer"
              onClick={() => handleOpenCourse(course.id)}
            >
              <div className={`h-3 bg-gradient-to-r ${course.color}`}></div>
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className={course.badgeColor}>{course.department}</Badge>
                  <div onClick={(e) => e.stopPropagation()}>
                    <MoreVertical size={20} className="text-slate-300 hover:text-brand-600 cursor-pointer" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 leading-tight">{course.title}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <div className="size-6 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher${course.id}`} alt="Teacher" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm text-slate-500">{role === 'teacher' ? `${course.students || 45} студентов` : course.teacher}</span>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-500">{role === 'teacher' ? 'Общая успеваемость' : 'Прогресс обучения'}</span>
                    <span className={course.progressText}>{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`${course.progressColor} h-full rounded-full`} style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 dark:border-slate-700 mb-6">
                  <div className="text-center">
                    <p className="text-xs font-bold">{course.modules}</p>
                    <p className="text-[10px] text-slate-400 uppercase">Модулей</p>
                  </div>
                  <div className="text-center border-x border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-bold">{course.tasks}</p>
                    <p className="text-[10px] text-slate-400 uppercase">Заданий</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-bold ${course.deadlines > 0 ? 'text-red-500' : 'text-slate-500'}`}>{course.deadlines}</p>
                    <p className="text-[10px] text-slate-400 uppercase">{role === 'teacher' ? 'На проверку' : 'Дедлайна'}</p>
                  </div>
                </div>

                <Button 
                  className="w-full mt-auto font-bold rounded-xl" 
                  size="lg" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenCourse(course.id);
                  }}
                >
                  {role === 'teacher' ? 'Управление курсом' : 'Открыть курс'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </CollapsibleSection>

      {/* Assignments Section */}
      <CollapsibleSection title={role === 'teacher' ? "Работы ожидающие проверки" : "Задания с ближайшими дедлайнами"} className="border-none bg-transparent shadow-none" headerClassName="px-0 py-4 hover:bg-transparent" contentClassName="px-0 pt-0" rightElement={<a href="#" className="text-sm font-semibold text-brand-600 hover:underline">Смотреть все</a>}>
        <section>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {role === 'teacher' ? (
              <>
                <div className="min-w-[300px] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded uppercase">Новое</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">Лаб. №5</span>
                  </div>
                  <h4 className="font-bold text-sm mb-4 line-clamp-1">Иванов Алмат: Графы</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-amber-600 font-medium">
                      <AlarmClock size={16} />
                      <span>2 часа назад</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>Алгоритмы</span>
                    </div>
                  </div>
                </div>
                <div className="min-w-[300px] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded uppercase">Новое</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">Лаб. №5</span>
                  </div>
                  <h4 className="font-bold text-sm mb-4 line-clamp-1">Петров Сергей: Графы</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-amber-600 font-medium">
                      <AlarmClock size={16} />
                      <span>5 часов назад</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>Алгоритмы</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="min-w-[300px] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded uppercase">Срочно</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">Не сдано</span>
                  </div>
                  <h4 className="font-bold text-sm mb-4 line-clamp-1">Лабораторная работа №5: Графы</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-red-500 font-medium">
                      <AlarmClock size={16} />
                      <span>До 12 Окт, 23:59</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>Алгоритмы</span>
                    </div>
                  </div>
                </div>
                <div className="min-w-[300px] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded uppercase">2 дня осталось</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded uppercase">Сдано</span>
                  </div>
                  <h4 className="font-bold text-sm mb-4 line-clamp-1">SQL Query Optimization Quiz</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-medium">
                      <AlarmClock size={16} />
                      <span>До 14 Окт, 18:00</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>Базы данных</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </CollapsibleSection>
      </div>
    </div>
  );
}
