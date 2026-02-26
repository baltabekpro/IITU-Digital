import { TrendingUp, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        userName="Иванов А. Б." 
        userGroup="CS-2104K" 
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Almat" 
      />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-slate-500">Текущий GPA</p>
                  <div className="bg-brand-50 text-brand-600 p-2 rounded-lg">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-brand-600">3.75</p>
                <div className="mt-4 flex items-center text-xs text-green-600 font-medium">
                  <TrendingUp size={14} className="mr-1" />
                  <span>+0.12 с прошлого семестра</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-slate-500">Кредиты</p>
                  <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                    <BookOpen size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold">87<span className="text-lg text-slate-400 font-normal"> / 240</span></p>
                <Progress value={36} className="mt-4 h-1.5 bg-slate-100" indicatorColor="bg-green-500" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-slate-500">Посещаемость</p>
                  <div className="bg-orange-50 text-orange-500 p-2 rounded-lg">
                    <CheckCircle size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold">92%</p>
                <p className="mt-4 text-xs text-slate-500">Пропусков: 4 занятия</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-slate-500">Финансовый долг</p>
                  <div className="bg-slate-100 text-slate-500 p-2 rounded-lg">
                    <Clock size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold">0 ₸</p>
                <div className="mt-4 flex items-center text-xs text-slate-500">
                  <CheckCircle size={14} className="mr-1 text-green-500" />
                  <span>Оплачено до конца года</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Schedule */}
              <CollapsibleSection 
                title="Расписание сегодня" 
                rightElement={<Link to="/schedule" className="text-brand-600 text-sm font-semibold hover:underline">На неделю</Link>}
                contentClassName="p-0"
              >
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { time: '09:00', title: 'Алгоритмы и структуры данных', teacher: 'Смагулов А.Б.', room: 'Кабинет 405', type: 'Лекция', color: 'brand' },
                    { time: '11:00', title: 'Базы данных SQL/NoSQL', teacher: 'Касенова Г.Е.', room: 'Кабинет 302', type: 'Лаб', color: 'purple' },
                    { time: '14:00', title: 'Разработка веб-приложений', teacher: 'Омаров Д.К.', room: 'Online MS Teams', type: 'Семинар', color: 'green' },
                  ].map((item, i) => (
                    <div key={i} className="p-6 flex items-start gap-4">
                      <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-3 min-w-[80px]">
                        <span className="text-xs font-bold text-slate-400 uppercase">Start</span>
                        <span className="text-lg font-bold text-brand-600 leading-none mt-1">{item.time}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                          {item.teacher} <span className="mx-2 text-slate-300">|</span> {item.room}
                        </p>
                      </div>
                      <Badge variant="outline" className={`bg-${item.color}-50 text-${item.color}-600 border-${item.color}-100 uppercase tracking-wider`}>
                        {item.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Deadlines */}
              <CollapsibleSection title="Ближайшие дедлайны">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-xl flex items-center gap-4">
                    <div className="size-10 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-900 dark:text-red-100 text-sm">Лабораторная №4</h4>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">Сегодня, до 23:59</p>
                    </div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-4 rounded-xl flex items-center gap-4">
                    <div className="size-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-orange-900 dark:text-orange-100 text-sm">Эссе по культурологии</h4>
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-0.5">Завтра, до 18:00</p>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* GPA Visualization */}
              <CollapsibleSection title="Прогресс GPA">
                <div className="flex flex-col items-center">
                  <div className="relative size-40">
                    <svg className="size-full" viewBox="0 0 36 36">
                      <path className="stroke-slate-100 dark:stroke-slate-800 fill-none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeWidth="3"></path>
                      <path className="stroke-brand-600 fill-none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray="93, 100" strokeLinecap="round" strokeWidth="3"></path>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">3.75</span>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">GPA</span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between w-full text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-brand-600"></span> Выполнено</div>
                    <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-slate-200 dark:bg-slate-800"></span> Осталось</div>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Grades Table */}
              <CollapsibleSection title="Последние оценки" contentClassName="p-0">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="px-6 py-3">Курс</th>
                      <th className="px-6 py-3 text-center">Балл</th>
                      <th className="px-6 py-3 text-right">Оценка</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="px-6 py-4 font-medium truncate max-w-[120px]">Математический анализ</td>
                      <td className="px-6 py-4 text-center font-bold">92</td>
                      <td className="px-6 py-4 text-right"><span className="text-green-600 font-bold">A</span></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium truncate max-w-[120px]">Java Development</td>
                      <td className="px-6 py-4 text-center font-bold">88</td>
                      <td className="px-6 py-4 text-right"><span className="text-brand-600 font-bold">B+</span></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium truncate max-w-[120px]">Философия</td>
                      <td className="px-6 py-4 text-center font-bold">95</td>
                      <td className="px-6 py-4 text-right"><span className="text-green-600 font-bold">A</span></td>
                    </tr>
                  </tbody>
                </table>
                <Link to="/grades" className="block w-full py-4 text-center text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors uppercase tracking-widest border-t border-slate-100 dark:border-slate-800">
                  Показать все оценки
                </Link>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
