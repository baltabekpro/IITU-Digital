import { useState } from 'react';
import { Search, Edit, Video, Phone, MoreVertical, PlusCircle, Smile, Send, Mail, User, Link as LinkIcon, FileText, Plus, Ban, Copy, Trash2, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Добрый день! Я проверил вашу лабораторную работу №3. Есть несколько замечаний по сложности алгоритма сортировки.', sender: 'other', time: '14:20' },
    { id: 2, isFile: true, name: 'Feedback_Lab3.pdf', size: '2.4 MB', sender: 'other', time: '14:20' },
    { id: 3, text: 'Здравствуйте, Артем Сергеевич! Спасибо за фидбек. Я ознакомлюсь с файлом и внесу правки до завтрашнего вечера.', sender: 'me', time: '14:30' },
    { id: 4, text: 'Можно будет сдать исправленный вариант в LMS?', sender: 'me', time: '14:31' }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        userName="Иванов А. Б." 
        userGroup="CS-2104K" 
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Almat" 
      />
      <div className="flex-1 flex overflow-hidden bg-white dark:bg-slate-950">
        {/* Column 1: Conversations List */}
        <section className="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Мои чаты</h1>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
              <Edit size={20} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Поиск в сообщениях..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-brand-500/50 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1">
          {/* Active Chat */}
          <div className="flex items-center gap-3 px-4 py-4 bg-brand-50 dark:bg-brand-900/10 border-r-4 border-brand-600 cursor-pointer transition-colors">
            <div className="relative flex-shrink-0">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ivanov" alt="User" className="size-12 rounded-full object-cover shadow-sm bg-slate-200" />
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">Иванов А.</h3>
                <span className="text-[11px] text-slate-400 font-medium">14:30</span>
              </div>
              <p className="text-xs text-brand-600 font-medium truncate">Проверьте задание...</p>
            </div>
          </div>

          {/* Group Chat */}
          <div className="flex items-center gap-3 px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
            <div className="size-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 font-bold text-sm shadow-sm shrink-0">CS</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">CS-2101 (Группа)</h3>
                <span className="text-[11px] text-slate-400 font-medium">12:45</span>
              </div>
              <p className="text-xs text-slate-500 truncate">Марат: Скиньте расписание на за...</p>
            </div>
            <div className="bg-brand-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</div>
          </div>

          {/* Other Chat */}
          <div className="flex items-center gap-3 px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors opacity-70">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dinara" alt="User" className="size-12 rounded-full object-cover bg-slate-200 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">Динара М.</h3>
                <span className="text-[11px] text-slate-400 font-medium">Пн</span>
              </div>
              <p className="text-xs text-slate-500 truncate">Спасибо, увидимся в универе!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Column 2: Active Conversation Window */}
      <section className="flex-1 bg-slate-50 dark:bg-slate-950 flex flex-col relative">
        {/* Chat Header */}
        <header className="h-16 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Иванов А. — Алгоритмы и структуры данных</h2>
              <div className="flex items-center gap-1.5">
                <span className="size-2 bg-green-500 rounded-full"></span>
                <span className="text-xs text-slate-500 font-medium">Онлайн</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
              <Video size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
              <Phone size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
              <Search size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
              <MoreVertical size={20} />
            </button>
          </div>
        </header>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Сегодня</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 max-w-[80%] group ${msg.sender === 'me' ? 'justify-end ml-auto' : ''}`}>
              {msg.sender === 'other' && (
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ivanov" alt="User" className="size-8 rounded-full bg-slate-200 shrink-0" />
              )}
              
              <div className={`flex flex-col gap-1 relative ${msg.sender === 'me' ? 'items-end' : ''}`}>
                {/* Context Menu Trigger */}
                <div className={`absolute top-0 ${msg.sender === 'me' ? '-left-10' : '-right-10'} opacity-0 group-hover:opacity-100 transition-opacity z-10`}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={msg.sender === 'me' ? 'end' : 'start'} className="w-48">
                      <DropdownMenuItem 
                        className="gap-2 cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(msg.text || msg.name || '');
                          toast.success('Скопировано в буфер обмена');
                        }}
                      >
                        <Copy size={14} />
                        <span>Копировать</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="gap-2 cursor-pointer"
                        onClick={() => toast.info('Помечено как непрочитанное')}
                      >
                        <EyeOff size={14} />
                        <span>Пометить как непрочитанное</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                        onClick={() => {
                          setMessages(messages.filter(m => m.id !== msg.id));
                          toast.success('Сообщение удалено');
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Удалить</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {msg.isFile ? (
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <div className="size-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600">
                      <FileText size={24} />
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{msg.name}</p>
                      <p className="text-xs text-slate-500">{msg.size} • PDF документ</p>
                    </div>
                    <button className="p-1.5 text-slate-400 hover:text-brand-600 transition-colors">
                      <DownloadIcon />
                    </button>
                  </div>
                ) : (
                  <div className={`${msg.sender === 'me' ? 'bg-brand-600 shadow-md rounded-br-none' : 'bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-bl-none'} p-3 rounded-2xl`}>
                    <p className={`text-sm leading-relaxed ${msg.sender === 'me' ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                      {msg.text}
                    </p>
                  </div>
                )}
                
                <div className={`flex items-center gap-1 px-1 ${msg.sender === 'other' ? 'justify-start' : ''}`}>
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                  {msg.sender === 'me' && <CheckDoubleIcon />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
            <button className="p-2 text-slate-500 hover:text-brand-600 transition-colors">
              <PlusCircle size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Напишите сообщение..." 
              className="flex-1 bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-400 outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="p-2 text-slate-500 hover:text-brand-600 transition-colors">
              <Smile size={20} />
            </button>
            <button 
              className="p-2 bg-brand-600 text-white rounded-lg shadow-lg shadow-brand-600/30 hover:bg-brand-700 transition-all"
              onClick={handleSendMessage}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Column 3: Profile/Group Info Sidebar */}
      <section className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col hidden xl:flex shrink-0">
        <div className="p-6 flex flex-col items-center text-center gap-4 border-b border-slate-100 dark:border-slate-800">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ivanov" alt="User" className="size-24 rounded-2xl object-cover shadow-xl border-4 border-white dark:border-slate-800 bg-slate-200" />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Артем Иванов</h2>
            <p className="text-sm text-slate-500">Преподаватель кафедры IT</p>
          </div>
          <div className="flex gap-2 w-full">
            <button className="flex-1 flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200 dark:border-slate-700">
              <Mail className="text-brand-600 mb-1" size={20} />
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Почта</span>
            </button>
            <button className="flex-1 flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200 dark:border-slate-700">
              <User className="text-brand-600 mb-1" size={20} />
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Профиль</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Section: Participants */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Участники (32)</h3>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                <div className="size-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 font-bold text-[10px]">АИ</div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Артем Иванов</span>
                <span className="ml-auto text-[10px] font-bold text-brand-600 bg-brand-100 dark:bg-brand-900/30 px-1.5 py-0.5 rounded">ADMIN</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Almat" alt="User" className="size-8 rounded-full bg-slate-200" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Вы</span>
              </div>
            </div>
          </div>

          {/* Section: Media & Files */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Файлы и ссылки</h3>
              <button className="text-xs font-bold text-brand-600">Все</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden relative group cursor-pointer">
                <img src="https://picsum.photos/seed/code/200/200" alt="File" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden relative group cursor-pointer">
                <img src="https://picsum.photos/seed/laptop/200/200" alt="File" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Plus className="text-slate-400" size={24} />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors border border-slate-100 dark:border-slate-800">
                <LinkIcon className="text-brand-600 shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">LMS Assignment Link</p>
                  <p className="text-[10px] text-slate-400 truncate">lms.iitu.edu.kz/course/view...</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors border border-slate-100 dark:border-slate-800">
                <FileText className="text-red-500 shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">Syllabus_2024.pdf</p>
                  <p className="text-[10px] text-slate-400 truncate">1.2 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 shrink-0">
          <Button variant="outline" className="w-full bg-red-50 dark:bg-red-900/10 text-red-600 border-red-200 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/30 font-bold text-xs uppercase tracking-wider">
            <Ban size={16} className="mr-2" /> Заблокировать
          </Button>
        </div>
      </section>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  );
}

function CheckDoubleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
      <path d="M18 6 7 17l-5-5"/>
      <path d="m22 10-7.5 7.5L13 16"/>
    </svg>
  );
}
