import { useState } from 'react';
import { 
  User, 
  BookOpen, 
  Settings, 
  Shield, 
  Award, 
  BarChart3, 
  Clock, 
  Star, 
  Mail, 
  Globe, 
  Linkedin, 
  Github, 
  Lock, 
  Bell, 
  CheckCircle2,
  Edit3,
  ExternalLink,
  ChevronRight,
  Save,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const CITATION_DATA = [
  { year: '2020', count: 120 },
  { year: '2021', count: 180 },
  { year: '2022', count: 250 },
  { year: '2023', count: 420 },
  { year: '2024', count: 580 },
  { year: '2025', count: 750 },
];

export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    toast.success('Профиль успешно обновлен', {
      icon: <CheckCircle2 className="text-emerald-500" size={18} />
    });
    setIsEditing(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FB] dark:bg-slate-950">
      <Header 
        userName="Абдикерим Н. Б." 
        userGroup="Преподаватель" 
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" 
      />
      
      <div className="flex-1 overflow-y-auto">
        {/* Profile Hero Header */}
        <div className="relative h-64 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.1),transparent_50%)]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-10 h-full flex items-end pb-10 relative z-10">
            <div className="flex items-end gap-8">
              <div className="relative group">
                <div className="size-32 rounded-3xl border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden bg-white">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" 
                    alt="Profile" 
                    className="size-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 size-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center text-slate-600 hover:text-brand-600 transition-colors border border-slate-100 dark:border-slate-700">
                  <Edit3 size={18} />
                </button>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black text-white tracking-tight">Абдикерим Нурлан Болатович</h1>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 gap-1.5 py-1 px-3">
                    <Shield size={14} />
                    Verified Professor
                  </Badge>
                </div>
                <p className="text-slate-400 font-medium text-lg">Кандидат технических наук • Кафедра Информационных Технологий</p>
              </div>
            </div>
            
            <div className="ml-auto flex gap-3 mb-2">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl gap-2 h-12 px-6"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Settings size={18} />
                {isEditing ? 'Отменить' : 'Редактировать профиль'}
              </Button>
              {isEditing && (
                <Button 
                  className="crimson-gradient text-white rounded-xl gap-2 h-12 px-6 shadow-lg shadow-brand-500/20"
                  onClick={handleSave}
                >
                  <Save size={18} />
                  Сохранить
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Sidebar Info */}
            <div className="lg:col-span-4 space-y-8">
                <Card className="rounded-[24px] border-slate-200/60 dark:border-slate-800 shadow-diffuse overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Заполнение профиля</CardTitle>
                    <span className="text-sm font-black text-brand-600">85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-slate-100 dark:bg-slate-800" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-500 leading-relaxed">Добавьте информацию о ваших последних публикациях, чтобы достичь 100%.</p>
                </CardContent>
              </Card>

              {/* Skills & Competencies */}
              <Card className="rounded-[24px] border-slate-200/60 dark:border-slate-800 shadow-diffuse overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Компетенции</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {['Algorithms', 'Data Structures', 'Machine Learning', 'Big Data', 'Python', 'C++', 'Academic Writing'].map((skill) => (
                    <Badge key={skill} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none px-3 py-1 rounded-lg font-bold text-[11px]">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>

              {/* Integrations */}
              <Card className="rounded-[24px] border-slate-200/60 dark:border-slate-800 shadow-diffuse overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Связанные аккаунты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                        <Globe size={20} />
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Google Scholar</span>
                    </div>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-sky-600">
                        <Linkedin size={20} />
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">LinkedIn</span>
                    </div>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900">
                        <Github size={20} />
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">GitHub</span>
                    </div>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </button>
                </CardContent>
              </Card>

              {/* Security Quick Access */}
              <div className="bg-slate-900 rounded-[24px] p-8 text-white space-y-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Shield className="text-emerald-400" size={20} />
                  </div>
                  <h3 className="text-lg font-bold">Безопасность</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">Двухфакторная аутентификация активна. Последний вход: сегодня, 09:15.</p>
                <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl h-12 font-bold">
                  Настройки доступа
                </Button>
              </div>
            </div>

            {/* Right Column: Main Content */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Achievement Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 rounded-[24px] border-slate-200/60 dark:border-slate-800 shadow-diffuse overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Индекс цитируемости</CardTitle>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">1,240</h3>
                    </div>
                    <div className="size-12 rounded-2xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600">
                      <BarChart3 size={24} />
                    </div>
                  </CardHeader>
                  <CardContent className="h-[140px] w-full p-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CITATION_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorCitation" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E11D48" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#E11D48" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="count" 
                          stroke="#E11D48" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorCitation)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="rounded-[24px] border-slate-200/60 dark:border-slate-800 shadow-diffuse">
                    <CardContent className="p-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Публикации</p>
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">48</h3>
                        <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                          <BookOpen size={20} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-[24px] border-slate-200/60 dark:border-slate-800 shadow-diffuse">
                    <CardContent className="p-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Часы преподавания</p>
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">1,420</h3>
                        <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                          <Clock size={20} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="md:col-span-3 rounded-[24px] border-slate-200/60 dark:border-slate-800 shadow-diffuse">
                  <CardContent className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Рейтинг студентов</p>
                        <div className="flex items-center gap-2">
                          <h3 className="text-4xl font-black text-slate-900 dark:text-white">4.9</h3>
                          <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} fill="currentColor" />)}
                          </div>
                        </div>
                      </div>
                      <div className="h-12 w-px bg-slate-100 dark:bg-slate-800"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">"Отличный преподаватель, материал подается доступно."</p>
                        <p className="text-xs text-slate-400">— Студент 3 курса, ИТ</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="rounded-xl font-bold text-brand-600 gap-2">
                      Все отзывы
                      <ChevronRight size={16} />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Information Blocks (Tabs) */}
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="bg-transparent border-b border-slate-200 dark:border-slate-800 w-full justify-start rounded-none h-auto p-0 mb-8">
                  <TabsTrigger value="personal" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-600 data-[state=active]:bg-transparent px-8 py-4 font-bold text-slate-500 data-[state=active]:text-brand-600">
                    Личные данные
                  </TabsTrigger>
                  <TabsTrigger value="scientific" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-600 data-[state=active]:bg-transparent px-8 py-4 font-bold text-slate-500 data-[state=active]:text-brand-600">
                    Научная деятельность
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-600 data-[state=active]:bg-transparent px-8 py-4 font-bold text-slate-500 data-[state=active]:text-brand-600">
                    Уведомления
                  </TabsTrigger>
                  <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-600 data-[state=active]:bg-transparent px-8 py-4 font-bold text-slate-500 data-[state=active]:text-brand-600">
                    Безопасность
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-0 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Фамилия Имя Отчество</label>
                      <Input 
                        defaultValue="Абдикерим Нурлан Болатович" 
                        disabled={!isEditing}
                        className="h-14 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 px-6 font-bold focus:ring-4 focus:ring-brand-500/5 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Электронная почта</label>
                      <Input 
                        defaultValue="n.abdikerim@university.edu" 
                        disabled={!isEditing}
                        className="h-14 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 px-6 font-bold focus:ring-4 focus:ring-brand-500/5 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Ученая степень</label>
                      <Input 
                        defaultValue="Кандидат технических наук" 
                        disabled={!isEditing}
                        className="h-14 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 px-6 font-bold focus:ring-4 focus:ring-brand-500/5 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Должность</label>
                      <Input 
                        defaultValue="Старший преподаватель" 
                        disabled={!isEditing}
                        className="h-14 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 px-6 font-bold focus:ring-4 focus:ring-brand-500/5 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-lg font-bold mb-6">Приватность данных</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">Публичный профиль</p>
                          <p className="text-sm text-slate-500">Ваш профиль будет виден всем пользователям платформы</p>
                        </div>
                        <div className="size-12 rounded-full bg-brand-600 flex items-center justify-center cursor-pointer">
                          <div className="size-6 rounded-full bg-white translate-x-2"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">Отображать рейтинг</p>
                          <p className="text-sm text-slate-500">Показывать среднюю оценку студентов в профиле</p>
                        </div>
                        <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center cursor-pointer">
                          <div className="size-6 rounded-full bg-white -translate-x-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="scientific" className="mt-0 space-y-8">
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold">Последние публикации</h4>
                    <div className="space-y-4">
                      {[
                        { title: 'Deep Learning in Educational Systems', journal: 'IEEE Transactions on Education', year: '2024' },
                        { title: 'Big Data Analytics for Student Performance Prediction', journal: 'Journal of Learning Analytics', year: '2023' },
                        { title: 'Cloud Computing Infrastructure for Modern Universities', journal: 'International Journal of Computer Science', year: '2023' }
                      ].map((pub, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-brand-200 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600">
                              <FileText size={24} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">{pub.title}</p>
                              <p className="text-sm text-slate-500">{pub.journal} • {pub.year}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="rounded-xl">
                            <ExternalLink size={18} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-dashed border-2">
                      Добавить публикацию
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="mt-0 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="rounded-[24px] border-slate-200/60 dark:border-slate-800 shadow-diffuse">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                          <Lock size={20} className="text-brand-600" />
                          Смена пароля
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Текущий пароль</label>
                          <Input type="password" placeholder="••••••••" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Новый пароль</label>
                          <Input type="password" placeholder="••••••••" className="rounded-xl h-12" />
                        </div>
                        <Button className="w-full crimson-gradient text-white rounded-xl h-12 font-bold mt-4">Обновить пароль</Button>
                      </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-200/60 dark:border-slate-800 shadow-diffuse">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                          <Shield size={20} className="text-emerald-500" />
                          Двухфакторная аутентификация
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-slate-500 leading-relaxed">Добавьте дополнительный уровень защиты вашему аккаунту с помощью 2FA.</p>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-3">
                          <CheckCircle2 className="text-emerald-500" size={20} />
                          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Статус: Активно</span>
                        </div>
                        <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-slate-200 dark:border-slate-800">Настроить</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
