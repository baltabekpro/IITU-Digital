import { useState } from 'react';
import { Search, Bell, Settings, TrendingUp, Download, Info, CheckCircle, AlertTriangle, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { toast } from 'sonner';
import CollapsibleSection from '@/components/CollapsibleSection';
import { useAuth } from '@/contexts/AuthContext';

export default function Grades() {
  const [semester, setSemester] = useState('2025-2026, Осенний семестр');
  const { role } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('Алгоритмы и структуры данных');

  const handleDownload = () => {
    toast.success(role === 'teacher' ? 'Ведомость скачивается...' : 'Транскрипт скачивается...');
  };

  const gradesData: Record<string, any[]> = {
    '2025-2026, Осенний семестр': [
      { id: 1, name: 'Алгоритмы и структуры данных', credits: 5, rk1: 95, rk2: 88, exam: 90, total: 91, grade: 'A-' },
      { id: 2, name: 'Базы данных', credits: 6, rk1: 82, rk2: 75, exam: 80, total: 79, grade: 'B+' },
      { id: 3, name: 'Мобильная разработка', credits: 4, rk1: 90, rk2: 92, exam: 85, total: 89, grade: 'A-' },
      { id: 4, name: 'Английский язык', credits: 3, rk1: 100, rk2: 95, exam: 98, total: 97, grade: 'A' },
      { id: 5, name: 'Философия', credits: 2, rk1: 70, rk2: 80, exam: 75, total: 75, grade: 'B' },
    ],
  };

  const studentGrades = [
    { id: 1, name: 'Иванов Алмат', idNum: '29402', rk1: 95, rk2: 88, exam: 90, total: 91, grade: 'A-' },
    { id: 2, name: 'Петров Сергей', idNum: '29405', rk1: 82, rk2: 75, exam: 80, total: 79, grade: 'B+' },
    { id: 3, name: 'Ахметов Мурат', idNum: '29410', rk1: 90, rk2: 92, exam: 85, total: 89, grade: 'A-' },
    { id: 4, name: 'Сидорова Анна', idNum: '29415', rk1: 100, rk2: 95, exam: 98, total: 97, grade: 'A' },
    { id: 5, name: 'Кузнецов Олег', idNum: '29420', rk1: 70, rk2: 80, exam: 75, total: 75, grade: 'B' },
  ];

  const currentGrades = gradesData[semester] || [];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        userName={role === 'teacher' ? "Абдикерим Н. Б." : "Иванов А. Б."} 
        userGroup={role === 'teacher' ? "Преподаватель" : "CS-2104K"} 
        userAvatar={role === 'teacher' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Almat"} 
      />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto space-y-8 w-full">
          {/* Page Title and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {role === 'teacher' ? 'Электронный журнал' : 'Оценки и успеваемость'}
              </h2>
              <p className="text-slate-500 mt-1">
                {role === 'teacher' ? 'Выставление оценок и мониторинг успеваемости студентов' : 'Просмотр текущих достижений и академического прогресса'}
              </p>
            </div>
          <div className="flex items-center gap-3">
            {role === 'teacher' && (
              <select 
                className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option>Алгоритмы и структуры данных</option>
                <option>Базы данных</option>
                <option>Мобильная разработка</option>
              </select>
            )}
            <select 
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option>2025-2026, Осенний семестр</option>
              <option>2024-2025, Весенний семестр</option>
            </select>
            <Button className="gap-2 font-semibold shadow-lg shadow-brand-500/20" onClick={handleDownload}>
              <Download size={18} /> {role === 'teacher' ? 'Скачать ведомость' : 'Скачать транскрипт'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-between h-full">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {role === 'teacher' ? 'Средний балл группы' : 'Текущий GPA'}
                </p>
                <div className="flex items-baseline gap-3 mt-2">
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white">{role === 'teacher' ? '84.2' : '3.75'}</h3>
                  <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-xs font-bold">
                    {role === 'teacher' ? 'Хорошо' : 'A- (Excellent)'}
                  </span>
                </div>
              </div>
              <div className="size-14 rounded-full bg-brand-50 flex items-center justify-center">
                <TrendingUp className="text-brand-600" size={28} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                {role === 'teacher' ? 'Посещаемость' : 'Накоплено кредитов'}
              </p>
              <div className="mt-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-2xl font-bold">{role === 'teacher' ? '92%' : '87 / 240'}</span>
                  <span className="text-sm font-semibold text-brand-600">{role === 'teacher' ? '+2%' : '36%'}</span>
                </div>
                <Progress value={role === 'teacher' ? 92 : 36} className="h-3 bg-slate-100" indicatorColor="bg-brand-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-6 h-full">
              <div className={`size-16 rounded-xl ${role === 'teacher' ? 'bg-brand-500/10' : 'bg-amber-500/10'} flex items-center justify-center shrink-0`}>
                {role === 'teacher' ? <Users className="text-brand-600" size={32} /> : <AlertTriangle className="text-amber-500" size={32} />}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {role === 'teacher' ? 'Студентов' : 'Долги'}
                </p>
                <h3 className="text-2xl font-bold mt-1">{role === 'teacher' ? '45 человек' : '0 Дисциплин'}</h3>
                <p className={`text-xs font-medium flex items-center mt-1 ${role === 'teacher' ? 'text-brand-600' : 'text-green-600'}`}>
                  <CheckCircle size={14} className="mr-1" /> {role === 'teacher' ? 'Все активны' : 'Все вовремя'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Grades Table */}
          <CollapsibleSection 
            title={role === 'teacher' ? `Журнал: ${selectedCourse}` : "Результаты текущего семестра"} 
            className="lg:col-span-8" 
            contentClassName="p-0 overflow-x-auto"
            rightElement={
              <a href="#" className="text-brand-600 text-sm font-semibold hover:underline flex items-center gap-1">
                {role === 'teacher' ? 'Настройка критериев' : 'История оценок'} <ArrowRight size={14} />
              </a>
            }
          >
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">{role === 'teacher' ? 'Студент' : 'Дисциплина'}</th>
                  <th className="px-4 py-4 font-semibold text-center">{role === 'teacher' ? 'ID' : 'Кред.'}</th>
                  <th className="px-4 py-4 font-semibold">РК1</th>
                  <th className="px-4 py-4 font-semibold">РК2</th>
                  <th className="px-4 py-4 font-semibold">Экз.</th>
                  <th className="px-4 py-4 font-semibold text-right">Итог %</th>
                  <th className="px-4 py-4 font-semibold text-center">Буква</th>
                  <th className="px-6 py-4 font-semibold text-center">Действие</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {(role === 'teacher' ? studentGrades : currentGrades).map((item) => (
                  <tr key={item.id} className={item.grade.startsWith('A') ? 'bg-green-50/30' : item.grade.startsWith('B') ? 'bg-yellow-50/30' : ''}>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-slate-500">{role === 'teacher' ? 'CS-2104K' : 'Преподаватель'}</p>
                    </td>
                    <td className="px-4 py-4 text-center font-medium">{role === 'teacher' ? item.idNum : item.credits}</td>
                    <td className="px-4 py-4 font-semibold">{item.rk1}</td>
                    <td className="px-4 py-4 font-semibold">{item.rk2}</td>
                    <td className="px-4 py-4 font-semibold text-slate-400">{item.exam || '—'}</td>
                    <td className="px-4 py-4 text-right font-bold text-brand-600">{item.total}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-md font-black ${item.grade.startsWith('A') ? 'bg-green-100 text-green-700' : item.grade.startsWith('B') ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-700'}`}>
                        {item.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="sm" className="font-bold text-brand-600">
                        {role === 'teacher' ? 'Изменить' : 'Детали'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CollapsibleSection>

          {/* Right Sidebar Charts */}
          <div className="lg:col-span-4 space-y-8">
            <CollapsibleSection 
              title="Баланс компетенций" 
              rightElement={<Info size={16} className="text-slate-400 cursor-help" />}
            >
              <div className="flex flex-col items-center">
                <div className="aspect-square w-full relative flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg overflow-hidden p-4">
                  <svg className="w-full h-full p-4 overflow-visible" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" className="text-slate-300 dark:text-slate-700"></circle>
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" className="text-slate-300 dark:text-slate-700"></circle>
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" className="text-slate-300 dark:text-slate-700"></circle>
                    <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-700"></path>
                    <path d="M50 15 L80 45 L55 85 L20 55 Z" fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" strokeWidth="2"></path>
                    <text x="50" y="8" textAnchor="middle" className="text-[4px] fill-slate-500 font-bold uppercase">Theory</text>
                    <text x="96" y="52" textAnchor="start" className="text-[4px] fill-slate-500 font-bold uppercase">Code</text>
                    <text x="50" y="96" textAnchor="middle" className="text-[4px] fill-slate-500 font-bold uppercase">Logic</text>
                    <text x="4" y="52" textAnchor="end" className="text-[4px] fill-slate-500 font-bold uppercase">Design</text>
                  </svg>
                </div>
                <p className="mt-4 text-xs text-slate-500 text-center">Анализ успеваемости по ключевым направлениям курса</p>
              </div>
            </CollapsibleSection>

            <CollapsibleSection 
              title="Динамика GPA" 
              rightElement={<span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">+0.12%</span>}
            >
              <div className="h-32 flex items-end justify-between gap-1 px-2">
                <div className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-brand-100 rounded-t-sm h-[65%] group-hover:bg-brand-200 transition-colors"></div>
                  <span className="text-[10px] text-slate-400 mt-2 font-bold">1/24</span>
                </div>
                <div className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-brand-100 rounded-t-sm h-[72%] group-hover:bg-brand-200 transition-colors"></div>
                  <span className="text-[10px] text-slate-400 mt-2 font-bold">2/24</span>
                </div>
                <div className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-brand-100 rounded-t-sm h-[85%] group-hover:bg-brand-200 transition-colors"></div>
                  <span className="text-[10px] text-slate-400 mt-2 font-bold">1/25</span>
                </div>
                <div className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-brand-600 rounded-t-sm h-[94%] shadow-lg shadow-brand-500/30"></div>
                  <span className="text-[10px] text-brand-600 mt-2 font-extrabold uppercase">Текущ</span>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
