import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Video, 
  Calendar as CalendarIcon, 
  User,
  Clock,
  ExternalLink,
  FileText,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

type ViewMode = 'day' | 'week' | 'month';

interface ScheduleEvent {
  id: number;
  title: string;
  type: 'LECTURE' | 'PRACTICE';
  isOnline: boolean;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  day: number; // 0-5 (Mon-Sat)
  color: string;
  description: string;
}

export default function Schedule() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { role } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleExport = () => {
    toast.success('Расписание экспортировано в Google Calendar');
  };

  const events: ScheduleEvent[] = [
    {
      id: 1,
      title: 'Математический анализ II',
      type: 'LECTURE',
      isOnline: false,
      teacher: 'Иванов А.С.',
      room: '302 каб.',
      startTime: '08:00',
      endTime: '09:30',
      day: 0,
      color: '#FDA4AF', // Dusty Rose
      description: 'Продолжение изучения интегрального исчисления. Разбор кратных интегралов и их приложений.'
    },
    {
      id: 2,
      title: 'Разработка интерфейсов',
      type: 'PRACTICE',
      isOnline: true,
      teacher: 'Козлов Михаил Викторович',
      room: 'Онлайн (Zoom)',
      startTime: '09:50',
      endTime: '11:20',
      day: 1,
      color: '#FDE68A', // Soft Amber
      description: 'На занятии мы рассмотрим современные тренды в UI дизайне, изучим принципы типографики и цветовые палитры для веб-приложений. Разбор домашних работ в Figma.'
    },
    {
      id: 3,
      title: 'Базы данных',
      type: 'LECTURE',
      isOnline: false,
      teacher: 'Мухамедиев Р.И.',
      room: '405 каб.',
      startTime: '11:40',
      endTime: '13:10',
      day: 2,
      color: '#A7F3D0', // Soft Emerald
      description: 'Проектирование реляционных баз данных. Нормализация и SQL запросы.'
    }
  ];

  const timeSlots = ['08:00', '09:50', '11:40', '13:30', '15:20'];
  
  // Calculate current time indicator position
  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    // Start of grid is 08:00 (480 mins)
    // End of grid is 17:00 (1020 mins) approx
    const startMins = 8 * 60;
    const endMins = 17 * 60;
    
    if (totalMinutes < startMins || totalMinutes > endMins) return null;
    
    const percentage = ((totalMinutes - startMins) / (endMins - startMins)) * 100;
    return percentage;
  };

  const timePos = getCurrentTimePosition();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FB] dark:bg-slate-950">
      <Header 
        userName={role === 'teacher' ? "Абдикерим Н. Б." : "Иванов А. Б."} 
        userGroup={role === 'teacher' ? "Преподаватель" : "CS-2104K"} 
        userAvatar={role === 'teacher' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Almat"} 
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="px-10 py-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="text-[28px] font-[800] tracking-tight text-[#0F172A] dark:text-white">
                {role === 'teacher' ? 'Расписание занятий' : 'Моё расписание'}
              </h2>
              <p className="text-sm text-[#64748B] font-medium mt-1">Февраль 2026 • 2-я учебная неделя</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Segmented Control */}
              <div className="bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl flex relative">
                <motion.div 
                  className="absolute bg-white dark:bg-slate-700 shadow-sm rounded-lg h-[calc(100%-8px)] top-1"
                  initial={false}
                  animate={{ 
                    x: viewMode === 'week' ? 0 : viewMode === 'month' ? 84 : 0,
                    width: viewMode === 'week' ? 80 : 80
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button 
                  onClick={() => setViewMode('week')}
                  className={cn(
                    "relative z-10 px-4 py-1.5 text-sm font-bold transition-colors w-20",
                    viewMode === 'week' ? 'text-[#0F172A] dark:text-white' : 'text-[#64748B]'
                  )}
                >
                  Неделя
                </button>
                <button 
                  onClick={() => setViewMode('month')}
                  className={cn(
                    "relative z-10 px-4 py-1.5 text-sm font-bold transition-colors w-20",
                    viewMode === 'month' ? 'text-[#0F172A] dark:text-white' : 'text-[#64748B]'
                  )}
                >
                  Месяц
                </button>
              </div>

              <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-100 dark:border-slate-700">
                <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all text-[#64748B]">
                  <ChevronLeft size={18} />
                </button>
                <span className="px-4 text-sm font-bold text-[#0F172A] dark:text-white">17 – 23 Февраля</span>
                <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all text-[#64748B]">
                  <ChevronRight size={18} />
                </button>
              </div>
              
              <Button variant="outline" className="rounded-xl border-slate-200 bg-white shadow-sm font-bold h-11" onClick={() => setViewMode('day')}>Сегодня</Button>
            </div>
          </header>

          {/* Timetable Grid */}
          <div className="flex-1 overflow-auto px-10 pb-10">
            <div className="min-w-[1000px] bg-white dark:bg-slate-900 rounded-[24px] shadow-diffuse border border-slate-100 dark:border-slate-800 overflow-hidden relative">
              
              {/* Days Header */}
              <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-slate-100 dark:border-slate-800">
                <div className="p-6"></div>
                {['Пн 17', 'Вт 18', 'Ср 19', 'Чт 20', 'Пт 21', 'Сб 22'].map((day, i) => {
                  const [d, n] = day.split(' ');
                  const isToday = i === 1; // Mocking Tuesday as today
                  return (
                    <div key={i} className={cn(
                      "p-6 text-center border-l border-slate-100 dark:border-slate-800 transition-colors",
                      isToday && "bg-[#FDA4AF]/5"
                    )}>
                      <p className={cn("text-[11px] font-black uppercase tracking-[0.15em] mb-1", isToday ? "text-[#E11D48]" : "text-[#94A3B8]")}>{d}</p>
                      <p className={cn("text-xl font-black", isToday ? "text-[#0F172A] dark:text-white" : "text-[#0F172A] dark:text-white")}>{n}</p>
                    </div>
                  );
                })}
              </div>

              {/* Grid Body */}
              <div className="relative">
                {/* Current Time Indicator */}
                {timePos !== null && (
                  <div 
                    className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
                    style={{ top: `${timePos}%` }}
                  >
                    <div className="size-2.5 bg-[#E11D48] rounded-full -ml-[5px] shadow-[0_0_8px_rgba(225,29,72,0.5)]" />
                    <div className="h-[1px] flex-1 bg-[#E11D48] opacity-50" />
                  </div>
                )}

                <div className="grid grid-cols-[100px_repeat(6,1fr)]">
                  {timeSlots.map((time, i) => (
                    <div key={i} className="contents">
                      <div className="h-[140px] flex items-start justify-center pt-6 text-[11px] font-bold text-[#94A3B8] border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50">
                        {time}
                      </div>
                      {[0, 1, 2, 3, 4, 5].map(day => {
                        const event = events.find(e => e.startTime === time && e.day === day);
                        const isToday = day === 1;
                        return (
                          <div key={day} className={cn(
                            "border-l border-b border-slate-50 dark:border-slate-800 p-3 relative group transition-colors",
                            isToday && "bg-[#FDA4AF]/5",
                            "hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                          )}>
                            {event && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02, zIndex: 10 }}
                                onClick={() => setSelectedEvent(event)}
                                className={cn(
                                  "h-full rounded-xl p-3 cursor-pointer transition-all shadow-sm border-l-4",
                                  "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                                  selectedEvent?.id === event.id ? "ring-2 ring-offset-2 ring-[#E11D48] dark:ring-offset-slate-900" : "hover:shadow-md"
                                )}
                                style={{ borderLeftColor: event.color }}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    {event.type}
                                  </span>
                                  {event.isOnline && <Video size={12} className="text-[#E11D48]" />}
                                </div>
                                <h4 className="text-[11px] font-bold text-[#0F172A] dark:text-white leading-tight mb-1 line-clamp-2">
                                  {event.title}
                                </h4>
                                <p className="text-[10px] text-[#64748B] font-medium truncate">{event.teacher}</p>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Details Sidebar */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.aside 
              initial={{ x: 380, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 380, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-[380px] bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 flex flex-col shrink-0 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] z-30"
            >
              <div className="p-8 flex-1 overflow-y-auto space-y-10">
                {/* Sidebar Header */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge className="frosted-glass text-[#0F172A] dark:text-white border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {selectedEvent.type}
                      </Badge>
                      {selectedEvent.isOnline && (
                        <Badge className="bg-[#E11D48]/10 text-[#E11D48] border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                          ОНЛАЙН
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSelectedEvent(null)}>
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                  <h3 className="text-2xl font-black text-[#0F172A] dark:text-white leading-tight">
                    {selectedEvent.title}
                  </h3>
                </div>

                {/* Instructor Card (Inset) */}
                <div className="bg-[#F8FAFC] dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="size-12 rounded-full border-2 border-white dark:border-slate-700 shadow-sm overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedEvent.teacher}`} alt="Teacher" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-widest mb-0.5">Преподаватель</p>
                    <p className="text-sm font-bold text-[#0F172A] dark:text-white">{selectedEvent.teacher}</p>
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700 text-[#94A3B8]">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-widest mb-1">Время занятия</p>
                      <p className="text-sm font-bold text-[#0F172A] dark:text-white">
                        {selectedEvent.startTime} – {selectedEvent.endTime} <span className="text-[#64748B] font-medium ml-1">(90 мин)</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700 text-[#94A3B8]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-widest mb-1">Локация</p>
                      <p className="text-sm font-bold text-[#0F172A] dark:text-white">{selectedEvent.room}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700 text-[#94A3B8]">
                      <Info size={20} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-widest mb-1">Описание</p>
                      <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed font-medium">
                        {selectedEvent.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 space-y-4">
                  <Button 
                    className="w-full h-14 rounded-xl font-black text-white shadow-lg shadow-[#E11D48]/20 transition-all hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)' }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Video className="mr-2" size={20} />
                    Присоединиться к Zoom
                  </Button>
                  <Button variant="outline" className="w-full h-14 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50">
                    <FileText className="mr-2" size={20} />
                    Материалы курса
                  </Button>
                </div>
              </div>

              <div className="p-8 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" className="w-full text-xs font-bold text-[#94A3B8] hover:text-[#E11D48]" onClick={handleExport}>
                  <ExternalLink className="mr-2" size={14} />
                  Экспорт в iCal / Google
                </Button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
