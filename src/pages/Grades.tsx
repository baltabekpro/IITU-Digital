import { useState, useMemo } from 'react';
import { 
  Search, 
  TrendingUp, 
  Download, 
  Info, 
  Users, 
  ChevronRight, 
  Filter,
  MoreHorizontal,
  Edit2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

interface StudentGrade {
  id: number;
  name: string;
  idNum: string;
  group: string;
  avatar: string;
  rk1: number;
  rk2: number;
  exam: number | null;
  total: number;
  grade: string;
  attendance: number;
}

const RADAR_DATA = [
  { subject: 'Theory', A: 85, fullMark: 100 },
  { subject: 'Code', A: 92, fullMark: 100 },
  { subject: 'Logic', A: 78, fullMark: 100 },
  { subject: 'Design', A: 65, fullMark: 100 },
  { subject: 'Soft Skills', A: 88, fullMark: 100 },
];

const GPA_DATA = [
  { name: '1/24', gpa: 3.2 },
  { name: '2/24', gpa: 3.4 },
  { name: '1/25', gpa: 3.55 },
  { name: '2/25', gpa: 3.75 },
];

export default function Grades() {
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAttendance, setFilterAttendance] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('Алгоритмы и структуры данных');

  const students: StudentGrade[] = [
    { id: 1, name: 'Иванов Алмат', idNum: '29402', group: 'CS-2104K', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Almat', rk1: 95, rk2: 88, exam: 90, total: 91, grade: 'A-', attendance: 98 },
    { id: 2, name: 'Петров Сергей', idNum: '29405', group: 'CS-2104K', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey', rk1: 82, rk2: 75, exam: 80, total: 79, grade: 'B+', attendance: 85 },
    { id: 3, name: 'Ахметов Мурат', idNum: '29410', group: 'CS-2104K', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Murat', rk1: 90, rk2: 92, exam: 85, total: 89, grade: 'A-', attendance: 92 },
    { id: 4, name: 'Сидорова Анна', idNum: '29415', group: 'CS-2104K', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', rk1: 100, rk2: 95, exam: 98, total: 97, grade: 'A', attendance: 100 },
    { id: 5, name: 'Кузнецов Олег', idNum: '29420', group: 'CS-2104K', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oleg', rk1: 70, rk2: 80, exam: 75, total: 75, grade: 'B', attendance: 70 },
  ];

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.idNum.includes(searchQuery);
      const matchesAttendance = filterAttendance ? s.attendance < 90 : true;
      return matchesSearch && matchesAttendance;
    });
  }, [searchQuery, filterAttendance]);

  const handleGradeChange = (studentName: string) => {
    toast.success(`Оценка для ${studentName} успешно сохранена`, {
      icon: <CheckCircle2 className="text-emerald-500" size={18} />
    });
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (grade.startsWith('B')) return 'bg-amber-50 text-amber-700 border-amber-100';
    return 'bg-slate-50 text-slate-700 border-slate-100';
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FB] dark:bg-slate-950">
      <Header 
        userName={role === 'teacher' ? "Абдикерим Н. Б." : "Иванов А. Б."} 
        userGroup={role === 'teacher' ? "Преподаватель" : "CS-2104K"} 
        userAvatar={role === 'teacher' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Almat"} 
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-10 max-w-[1600px] mx-auto space-y-10">
          
          {/* Analytics Scoreboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -4 }}
              className="glass p-6 rounded-2xl border border-white/20 shadow-diffuse flex items-center justify-between"
            >
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Средний балл</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">84.2</h3>
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                    <TrendingUp size={14} /> +2.4%
                  </span>
                </div>
              </div>
              <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                <TrendingUp size={24} />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              onClick={() => setFilterAttendance(!filterAttendance)}
              className={cn(
                "glass p-6 rounded-2xl border border-white/20 shadow-diffuse flex items-center justify-between cursor-pointer transition-all",
                filterAttendance && "ring-2 ring-brand-500 bg-brand-50/10"
              )}
            >
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Посещаемость</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">92%</h3>
                  <span className="text-[10px] font-bold text-slate-400">Нажмите для фильтра</span>
                </div>
              </div>
              <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                <Clock size={24} />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="glass p-6 rounded-2xl border border-white/20 shadow-diffuse flex items-center justify-between"
            >
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Активность</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">45</h3>
                  <span className="text-[10px] font-bold text-slate-400">Студентов в группе</span>
                </div>
              </div>
              <div className="size-12 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600">
                <Users size={24} />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Gradebook */}
            <div className="lg:col-span-8 space-y-6">
              {/* Action Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 relative max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    placeholder="Поиск студента по имени или ID..." 
                    className="pl-11 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <select 
                    className="h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-bold focus:outline-none shadow-sm"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option>Алгоритмы и структуры данных</option>
                    <option>Базы данных</option>
                    <option>Мобильная разработка</option>
                  </select>
                  <Button variant="ghost" className="h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold gap-2">
                    <Download size={18} />
                    Ведомость
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-diffuse overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                      <th className="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-widest">Студент</th>
                      <th className="px-4 py-4 text-center text-[11px] font-black text-slate-500 uppercase tracking-widest">РК1</th>
                      <th className="px-4 py-4 text-center text-[11px] font-black text-slate-500 uppercase tracking-widest">РК2</th>
                      <th className="px-4 py-4 text-center text-[11px] font-black text-slate-500 uppercase tracking-widest">Экз.</th>
                      <th className="px-4 py-4 text-center text-[11px] font-black text-slate-500 uppercase tracking-widest">Итог</th>
                      <th className="px-4 py-4 text-center text-[11px] font-black text-slate-500 uppercase tracking-widest">Оценка</th>
                      <th className="px-8 py-4 text-right text-[11px] font-black text-slate-500 uppercase tracking-widest">Действие</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    <AnimatePresence mode="popLayout">
                      {filteredStudents.map((student) => (
                        <motion.tr 
                          key={student.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-4">
                              <img src={student.avatar} alt={student.name} className="size-10 rounded-full bg-slate-100" />
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{student.name}</h4>
                                <p className="text-[11px] text-slate-400 font-medium mt-0.5">ID: {student.idNum} • {student.group}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="inline-flex items-center justify-center size-10 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                              {student.rk1}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="inline-flex items-center justify-center size-10 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                              {student.rk2}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="inline-flex items-center justify-center size-10 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer font-bold text-slate-400">
                              {student.exam || '—'}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center font-black text-brand-600">
                            {student.total}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <Badge className={cn(
                              "px-3 py-1 rounded-lg border font-black text-[12px] shadow-sm",
                              getGradeColor(student.grade)
                            )}>
                              {student.grade}
                            </Badge>
                          </td>
                          <td className="px-8 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="rounded-xl hover:text-brand-600 hover:bg-brand-50" onClick={() => handleGradeChange(student.name)}>
                                <Edit2 size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="rounded-xl">
                                <MoreHorizontal size={16} />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytical Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Competency Radar */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-diffuse">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Баланс компетенций</h4>
                  <Info size={16} className="text-slate-300" />
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                      <PolarGrid stroke="#E2E8F0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }} />
                      <Radar
                        name="Student"
                        dataKey="A"
                        stroke="#E11D48"
                        fill="#E11D48"
                        fillOpacity={0.2}
                        dot={{ r: 4, fill: '#E11D48', strokeWidth: 2, stroke: '#fff' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-center text-[11px] text-slate-400 font-medium mt-4 leading-relaxed px-4">
                  Анализ успеваемости по ключевым направлениям курса на основе текущих оценок
                </p>
              </div>

              {/* GPA Dynamics */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-diffuse">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Динамика GPA</h4>
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[10px]">+0.12</Badge>
                </div>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={GPA_DATA}>
                      <defs>
                        <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E11D48" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#E11D48" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" hide />
                      <YAxis hide domain={[0, 4]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontWeight: 800, color: '#E11D48' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="gpa" 
                        stroke="#E11D48" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorGpa)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between mt-4">
                  {GPA_DATA.map((d, i) => (
                    <span key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.name}</span>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="bg-slate-900 p-8 rounded-[24px] text-white space-y-6">
                <h4 className="text-[12px] font-black uppercase tracking-widest opacity-60">Быстрые фильтры</h4>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <span className="text-sm font-bold">Успеваемость &lt; 70%</span>
                    <ChevronRight size={16} className="opacity-40" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <span className="text-sm font-bold">Пропуски &gt; 3</span>
                    <ChevronRight size={16} className="opacity-40" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
