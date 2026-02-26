import { useState } from 'react';
import { Users, GraduationCap, BookOpen, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [applications, setApplications] = useState([
    { id: 1, name: 'Сыздыков А.М.', type: 'Справка с места учебы', date: 'Сегодня, 10:23', status: 'Ожидает' },
    { id: 2, name: 'Ким В.С.', type: 'Академический отпуск', date: 'Вчера, 15:45', status: 'В обработке' },
    { id: 3, name: 'Оспанов Д.К.', type: 'Перевод на другой факультет', date: '12 Окт, 09:15', status: 'Ожидает' },
  ]);

  const handleApprove = (id: number) => {
    setApplications(apps => apps.map(app => app.id === id ? { ...app, status: 'Одобрено' } : app));
    toast.success('Заявление одобрено');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header 
        userName="Администратор" 
        userGroup="Деканат ФИТ" 
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
      />

      <div className="p-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">Всего студентов</p>
                <div className="bg-brand-50 text-brand-600 p-2 rounded-lg">
                  <Users size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold">4,250</p>
              <div className="mt-4 flex items-center text-xs text-green-600 font-medium">
                <TrendingUp size={14} className="mr-1" />
                <span>+120 в этом году</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">Преподаватели</p>
                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                  <GraduationCap size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold">342</p>
              <div className="mt-4 flex items-center text-xs text-slate-500 font-medium">
                <span>Штат укомплектован на 98%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">Активные курсы</p>
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg">
                  <BookOpen size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold">128</p>
              <div className="mt-4 flex items-center text-xs text-slate-500 font-medium">
                <span>Осенний семестр 2025</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">Финансовые задолженности</p>
                <div className="bg-red-50 text-red-600 p-2 rounded-lg">
                  <DollarSign size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold">12.5M ₸</p>
              <div className="mt-4 flex items-center text-xs text-red-600 font-medium">
                <AlertTriangle size={14} className="mr-1" />
                <span>У 45 студентов</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <Card>
            <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold">Новые заявления</CardTitle>
              <a href="#" className="text-sm font-semibold text-brand-600 hover:underline">Все заявления</a>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {applications.map((app) => (
                  <div key={app.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div>
                      <p className="font-bold text-sm">{app.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{app.type}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        app.status === 'Ожидает' ? 'bg-amber-50 text-amber-600' : 
                        app.status === 'Одобрено' ? 'bg-green-50 text-green-600' :
                        'bg-brand-50 text-brand-600'
                      }`}>
                        {app.status}
                      </span>
                      <p className="text-[10px] text-slate-400">{app.date}</p>
                      {app.status !== 'Одобрено' && (
                        <button 
                          onClick={() => handleApprove(app.id)}
                          className="mt-2 text-[10px] font-bold text-brand-600 hover:text-brand-700 uppercase tracking-wider"
                        >
                          Одобрить
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg font-bold">Статус систем</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>LMS (Moodle)</span>
                  <span className="text-green-600">99.9% Uptime</span>
                </div>
                <Progress value={99.9} className="h-2 bg-slate-100" indicatorColor="bg-green-500" />
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Platonus (Оценки)</span>
                  <span className="text-green-600">100% Uptime</span>
                </div>
                <Progress value={100} className="h-2 bg-slate-100" indicatorColor="bg-green-500" />
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Почтовый сервер</span>
                  <span className="text-amber-500">Задержки (95%)</span>
                </div>
                <Progress value={95} className="h-2 bg-slate-100" indicatorColor="bg-amber-500" />
              </div>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-start gap-4">
                  <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-bold">Внимание</h4>
                    <p className="text-xs text-slate-500 mt-1">Запланированы технические работы на сервере баз данных в субботу с 02:00 до 04:00.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
