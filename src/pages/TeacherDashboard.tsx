import React from 'react';
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Calendar,
  ArrowRight,
  MoreVertical,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import CollapsibleSection from '@/components/CollapsibleSection';
import { Button } from '@/components/ui/button';

export default function TeacherDashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        userName="Абдикерим Н. Б." 
        userGroup="Преподаватель" 
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" 
      />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-sm bg-brand-600 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-brand-100 text-xs font-bold uppercase tracking-wider mb-1">Всего студентов</p>
                    <h3 className="text-3xl font-black">124</h3>
                  </div>
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Users size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-100">
                  <TrendingUp size={14} />
                  <span>+5 в этом семестре</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Активные курсы</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">3</h3>
                  </div>
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                    <BookOpen size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <CheckCircle size={14} />
                  <span>Все по графику</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">На проверку</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">18</h3>
                  </div>
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                    <Clock size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-amber-600">
                  <AlertCircle size={14} />
                  <span>Дедлайн завтра</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Средний балл</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">84.5</h3>
                  </div>
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                    <GraduationCap size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-600">
                  <TrendingUp size={14} />
                  <span>+2.1% к прошлому году</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Upcoming Classes */}
              <CollapsibleSection 
                title="Ближайшие занятия" 
                rightElement={<Button variant="ghost" size="sm" className="text-brand-600 font-bold">Весь календарь</Button>}
              >
                <div className="space-y-4">
                  {[
                    { time: '09:50', title: 'Алгоритмы и структуры данных', type: 'Лекция', room: '302 каб.', students: 45 },
                    { time: '11:40', title: 'Базы данных', type: 'Практика', room: 'Онлайн', students: 28 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl group hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors">
                      <div className="text-center min-w-[60px]">
                        <p className="text-lg font-black text-slate-900 dark:text-white">{item.time}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Сегодня</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-[10px] uppercase font-bold">{item.type}</Badge>
                          <span className="text-xs text-slate-400 font-medium">• {item.room}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{item.students} студ.</p>
                        <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Course Performance */}
              <CollapsibleSection title="Успеваемость по курсам">
                <div className="space-y-6">
                  {[
                    { title: 'Алгоритмы и структуры данных', progress: 78, students: 45, avg: 88 },
                    { title: 'Базы данных', progress: 62, students: 32, avg: 76 },
                    { title: 'Мобильная разработка', progress: 45, students: 47, avg: 82 },
                  ].map((course, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{course.title}</h4>
                          <p className="text-xs text-slate-500">{course.students} студентов • Средний балл: {course.avg}%</p>
                        </div>
                        <span className="text-sm font-bold text-brand-600">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" indicatorColor="bg-brand-600" />
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Pending Grading */}
              <CollapsibleSection title="На проверку" rightElement={<Badge className="bg-amber-500">18</Badge>}>
                <div className="space-y-4">
                  {[
                    { student: 'Иванов А.', task: 'Лаб. №5: Графы', date: '2 часа назад' },
                    { student: 'Петров С.', task: 'Лаб. №5: Графы', date: '5 часов назад' },
                    { student: 'Ахметов М.', task: 'Тест: SQL', date: 'Вчера' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="size-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.student}`} alt="Student" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.student}</p>
                        <p className="text-xs text-slate-500 truncate">{item.task}</p>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase shrink-0">{item.date}</p>
                    </div>
                  ))}
                  <Button className="w-full font-bold" variant="outline">Проверить все</Button>
                </div>
              </CollapsibleSection>

              {/* Recent Activity */}
              <CollapsibleSection title="Активность">
                <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                  {[
                    { icon: <CheckCircle size={14} />, color: 'bg-emerald-500', text: 'Вы проверили 5 работ по курсу "Базы данных"', time: '10:30' },
                    { icon: <Calendar size={14} />, color: 'bg-brand-500', text: 'Изменено расписание на пятницу', time: 'Вчера' },
                    { icon: <AlertCircle size={14} />, color: 'bg-amber-500', text: '3 студента пропустили дедлайн', time: 'Вчера' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`size-8 rounded-full ${item.color} text-white flex items-center justify-center shrink-0 z-10 shadow-sm`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-tight">{item.text}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
