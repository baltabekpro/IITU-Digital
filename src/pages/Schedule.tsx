import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Video, Calendar as CalendarIcon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { toast } from 'sonner';
import CollapsibleSection from '@/components/CollapsibleSection';
import { useAuth } from '@/contexts/AuthContext';

type ViewMode = 'day' | 'week' | 'month';

export default function Schedule() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const { role } = useAuth();

  const handleExport = () => {
    toast.success('Расписание экспортировано в Google Calendar');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        userName={role === 'teacher' ? "Абдикерим Н. Б." : "Иванов А. Б."} 
        userGroup={role === 'teacher' ? "Преподаватель" : "CS-2104K"} 
        userAvatar={role === 'teacher' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Almat"} 
      />
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-950">
          {/* Header */}
          <header className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {role === 'teacher' ? 'Расписание занятий' : 'Расписание'}
            </h2>
            <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('week')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${viewMode === 'week' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Неделя
              </button>
              <button 
                onClick={() => setViewMode('month')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${viewMode === 'month' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Месяц
              </button>
            </div>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all">
                <ChevronLeft size={18} />
              </button>
              <span className="px-3 text-sm font-bold">Пн 17 фев – Вс 23 фев</span>
              <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
            <Button variant="secondary" className="font-bold" onClick={() => setViewMode('day')}>Сегодня</Button>
          </div>
        </header>

        {/* Timetable */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-[1000px]">
            {/* Days Header */}
            <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 sticky top-0 z-10">
              <div className="p-4"></div>
              {['Пн 17', 'Вт 18', 'Ср 19', 'Чт 20', 'Пт 21', 'Сб 22'].map((day, i) => {
                const [d, n] = day.split(' ');
                const isToday = i === 1;
                return (
                  <div key={i} className={`p-4 text-center border-l border-slate-200 dark:border-slate-800 ${isToday ? 'bg-brand-50/50 dark:bg-brand-900/10' : ''}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${isToday ? 'text-brand-600' : 'text-slate-400'}`}>{d}</p>
                    <p className={`text-lg font-bold ${isToday ? 'text-brand-600' : ''}`}>{n}</p>
                  </div>
                );
              })}
            </div>

            {/* Grid Rows */}
            <div className="grid grid-cols-[80px_repeat(6,1fr)] border-l border-slate-200 dark:border-slate-800">
              {['08:00', '09:50', '11:40', '13:30', '15:20'].map((time, i) => (
                <div key={i} className="contents">
                  <div className="h-[100px] flex items-start justify-center pt-2 text-xs text-slate-500 border-r border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    {time}
                  </div>
                  {/* Empty cells for 6 days */}
                  {[0, 1, 2, 3, 4, 5].map(day => (
                    <div key={day} className={`border-r border-b border-slate-200 dark:border-slate-800 p-2 ${day === 1 ? 'bg-brand-50/20 dark:bg-brand-900/5' : ''}`}>
                      {/* Sample Classes */}
                      {time === '08:00' && day === 0 && (
                        <div className="h-full bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-2 rounded-r-lg group cursor-pointer hover:shadow-md transition-all">
                          <span className="inline-block px-1.5 py-0.5 bg-brand-500 text-[10px] font-bold text-white rounded mb-1">ЛЕКЦИЯ</span>
                          <h4 className="text-xs font-bold leading-tight mb-1">Математический анализ II</h4>
                          <p className="text-[10px] text-slate-500 mb-1">Иванов А.С.</p>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <MapPin size={12} />
                            <span>302 каб.</span>
                          </div>
                        </div>
                      )}
                      {time === '09:50' && day === 1 && (
                        <div className="h-full bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-2 rounded-r-lg ring-2 ring-brand-600 ring-inset group cursor-pointer hover:shadow-md transition-all relative">
                          <div className="flex justify-between items-start mb-1">
                            <span className="inline-block px-1.5 py-0.5 bg-amber-500 text-[10px] font-bold text-white rounded">ПРАКТИКА</span>
                            <span className="flex items-center gap-0.5 text-brand-600 text-[10px] font-bold uppercase">
                              <Video size={12} /> Онлайн
                            </span>
                          </div>
                          <h4 className="text-xs font-bold leading-tight mb-1">Разработка интерфейсов</h4>
                          <p className="text-[10px] text-slate-500 mb-1">Козлов М.В.</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Details Sidebar */}
      <aside className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
        <div className="flex-1 overflow-y-auto">
          <CollapsibleSection title="Детали занятия" className="border-none rounded-none shadow-none" headerClassName="px-6 py-6" contentClassName="px-6 pb-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-500 text-[10px] font-bold text-white rounded">ПРАКТИКА</span>
                  <span className="px-2 py-0.5 bg-brand-100 text-brand-600 text-[10px] font-bold rounded">ОНЛАЙН</span>
                </div>
                <h4 className="text-xl font-black leading-tight">Разработка интерфейсов (UI/UX Design)</h4>
                
                <div className="flex items-center gap-3 py-4 border-y border-slate-100 dark:border-slate-800">
                  <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kozlov" alt="Teacher" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Преподаватель</p>
                    <p className="text-sm font-bold">Козлов Михаил Викторович</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                    <CalendarIcon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Время</p>
                    <p className="text-sm font-semibold">09:50 – 11:20 (90 мин)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Местоположение</p>
                    <p className="text-sm font-semibold">Главный корпус, 5 этаж</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Описание</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  На занятии мы рассмотрим современные тренды в UI дизайне, изучим принципы типографики и цветовые палитры для веб-приложений. Разбор домашних работ в Figma.
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full font-bold" size="lg">
                  <Video className="mr-2" size={18} /> Открыть Zoom
                </Button>
                <Button variant="secondary" className="w-full font-bold" size="lg">
                  <CalendarIcon className="mr-2" size={18} /> Материалы курса
                </Button>
              </div>
            </div>
          </CollapsibleSection>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" className="w-full text-xs font-semibold text-slate-600" onClick={handleExport}>
            <CalendarIcon className="mr-2" size={14} /> Экспорт в Google Calendar
          </Button>
        </div>
      </aside>
      </div>
    </div>
  );
}
