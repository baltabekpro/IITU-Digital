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
  GraduationCap,
  Activity
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import CollapsibleSection from '@/components/CollapsibleSection';
import { Button } from '@/components/ui/button';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const sparklineData = [
  { value: 40 }, { value: 35 }, { value: 55 }, { value: 45 }, { value: 60 }, { value: 50 }, { value: 75 }
];

const Sparkline = () => (
  <div className="h-8 w-16">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={sparklineData}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#8B0000" 
          strokeWidth={2} 
          dot={false} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default function TeacherDashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FB] dark:bg-slate-950">
      <Header 
        userName="Абдикерим Н. Б." 
        userGroup="Преподаватель" 
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" 
      />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
          {/* Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bento-card group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Всего студентов</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-4xl font-black text-[#8B0000]">124</h3>
                      <Sparkline />
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#8B0000]/10 rounded-xl text-[#8B0000]">
                    <Users size={20} fill="currentColor" fillOpacity={0.1} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-500">
                  <span className="text-[#8B0000]">+5</span>
                  <span>в этом семестре</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bento-card group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Активные курсы</p>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">3</h3>
                  </div>
                  <div className="p-2.5 bg-brand-500/10 rounded-xl text-brand-600">
                    <BookOpen size={20} fill="currentColor" fillOpacity={0.1} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <CheckCircle size={14} />
                  <span>Все по графику</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bento-card group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">На проверку</p>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">18</h3>
                  </div>
                  <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600">
                    <Clock size={20} fill="currentColor" fillOpacity={0.1} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600">
                  <AlertCircle size={14} />
                  <span>Дедлайн завтра</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bento-card group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Средний балл</p>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">84.5</h3>
                  </div>
                  <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600">
                    <GraduationCap size={20} fill="currentColor" fillOpacity={0.1} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#8B0000]">
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
                className="bento-card overflow-hidden"
                headerClassName="px-6 py-5 border-b border-slate-100 dark:border-slate-800"
                contentClassName="p-0"
                rightElement={<Button variant="ghost" size="sm" className="text-[#8B0000] font-bold hover:bg-[#8B0000]/5">Весь календарь</Button>}
              >
                <div className="divide-y divide-transparent">
                  {[
                    { time: '09:50', title: 'Алгоритмы и структуры данных', type: 'Лекция', room: '302 каб.', students: 45, typeColor: 'bg-blue-50 text-blue-600' },
                    { time: '11:40', title: 'Базы данных', type: 'Практика', room: 'Онлайн', students: 28, typeColor: 'bg-purple-50 text-purple-600' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                      <div className="text-center min-w-[70px]">
                        <p className="text-xl font-bold text-slate-700 dark:text-slate-300">{item.time}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Сегодня</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant="secondary" className={`text-[10px] uppercase font-bold rounded-full px-3 py-0.5 border-none ${item.typeColor}`}>{item.type}</Badge>
                          <span className="text-xs text-slate-400 font-medium tracking-wide">• {item.room}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">{item.title}</h4>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{item.students}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Студентов</p>
                        </div>
                        <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <ArrowRight size={16} className="text-slate-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Course Performance */}
              <CollapsibleSection title="Успеваемость по курсам" className="bento-card" headerClassName="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-6 space-y-8">
                  {[
                    { title: 'Алгоритмы и структуры данных', progress: 78, students: 45, avg: 88 },
                    { title: 'Базы данных', progress: 62, students: 32, avg: 76 },
                    { title: 'Мобильная разработка', progress: 45, students: 47, avg: 82 },
                  ].map((course, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-base">{course.title}</h4>
                          <p className="text-xs text-slate-500 font-medium">{course.students} студентов • Средний балл: {course.avg}%</p>
                        </div>
                        <span className="text-sm font-bold text-[#8B0000]">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full crimson-gradient transition-all duration-1000" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Pending Grading */}
              <CollapsibleSection 
                title="На проверку" 
                className="bento-card"
                headerClassName="px-6 py-5 border-b border-slate-100 dark:border-slate-800 glass sticky top-0 z-10"
                rightElement={<Badge className="bg-[#8B0000] text-white rounded-full px-2.5">18</Badge>}
              >
                <div className="p-6 space-y-5">
                  {[
                    { student: 'Иванов А.', task: 'Лаб. №5: Графы', date: '2 часа назад' },
                    { student: 'Петров С.', task: 'Лаб. №5: Графы', date: '5 часов назад' },
                    { student: 'Ахметов М.', task: 'Тест: SQL', date: 'Вчера' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative">
                        <div className="size-11 rounded-full border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden shrink-0">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.student}`} alt="Student" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#8B0000] transition-colors">{item.student}</p>
                        <p className="text-xs text-slate-500 truncate font-medium">{item.task}</p>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase shrink-0 tracking-wider">{item.date}</p>
                    </div>
                  ))}
                  <Button className="w-full font-bold rounded-xl mt-2 bg-[#8B0000] hover:bg-[#700000] text-white" size="lg">Проверить все</Button>
                </div>
              </CollapsibleSection>

              {/* Recent Activity */}
              <CollapsibleSection title="Активность" className="bento-card" headerClassName="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-6 space-y-8 relative">
                  <div className="absolute left-[35px] top-10 bottom-10 w-px bg-slate-100 dark:bg-slate-800"></div>
                  {[
                    { icon: <CheckCircle size={14} />, color: 'bg-emerald-500', text: 'Вы проверили 5 работ по курсу "Базы данных"', time: '10:30' },
                    { icon: <Calendar size={14} />, color: 'bg-[#8B0000]', text: 'Изменено расписание на пятницу', time: 'Вчера' },
                    { icon: <Activity size={14} />, color: 'bg-blue-500', text: '3 студента пропустили дедлайн', time: 'Вчера' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 relative">
                      <div className={`size-[18px] rounded-full ${item.color} text-white flex items-center justify-center shrink-0 z-10 mt-1 ring-4 ring-white dark:ring-slate-900`}>
                        {/* Dot style activity */}
                        <div className="size-1 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.text}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 tracking-widest">{item.time}</p>
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
