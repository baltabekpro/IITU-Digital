import { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MoreVertical, 
  Smile, 
  Send, 
  Paperclip, 
  Mic, 
  FileText, 
  Download, 
  Info, 
  Users, 
  Link as LinkIcon, 
  CheckCheck,
  Plus,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: number;
  text?: string;
  sender: 'me' | 'other';
  time: string;
  isFile?: boolean;
  fileName?: string;
  fileSize?: string;
  isRead?: boolean;
}

interface ChatItem {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  type: 'group' | 'direct';
}

export default function Chat() {
  const { role } = useAuth();
  const [message, setMessage] = useState('');
  const [showContext, setShowContext] = useState(false);
  const [activeChat, setActiveChat] = useState<number>(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chats: ChatItem[] = [
    { id: 1, name: 'Артем Иванов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivanov', lastMessage: 'Добрый день! Я проверил вашу лабораторную...', time: '14:20', unreadCount: 0, isOnline: true, type: 'direct' },
    { id: 2, name: 'CS-2104K (Группа)', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Group', lastMessage: 'Марат: Скиньте расписание на завтра...', time: '12:45', unreadCount: 3, isOnline: false, type: 'group' },
    { id: 3, name: 'Динара М.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dinara', lastMessage: 'Спасибо, увидимся в универе!', time: 'Пн', unreadCount: 0, isOnline: false, type: 'direct' },
    { id: 4, name: 'Базы данных (Лекция)', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DB', lastMessage: 'Преподаватель: Ссылка на Zoom...', time: 'Вс', unreadCount: 1, isOnline: false, type: 'group' },
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Добрый день! Я проверил вашу лабораторную работу №3. Есть несколько замечаний по сложности алгоритма сортировки.', sender: 'other', time: '14:20', isRead: true },
    { id: 2, isFile: true, fileName: 'Feedback_Lab3.pdf', fileSize: '2.4 MB', sender: 'other', time: '14:20', isRead: true },
    { id: 3, text: 'Здравствуйте, Артем Сергеевич! Спасибо за фидбек. Я ознакомлюсь с файлом и внесу правки до завтрашнего вечера.', sender: 'me', time: '14:30', isRead: true },
    { id: 4, text: 'Можно будет сдать исправленный вариант в LMS?', sender: 'me', time: '14:31', isRead: false }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate typing indicator
    setTimeout(() => {
      toast.info('Артем Иванов печатает...', { duration: 2000 });
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FB] dark:bg-slate-950">
      <Header 
        userName={role === 'teacher' ? "Абдикерим Н. Б." : "Иванов А. Б."} 
        userGroup={role === 'teacher' ? "Преподаватель" : "CS-2104K"} 
        userAvatar={role === 'teacher' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Almat"} 
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Chat List (Glass Sidebar) */}
        <aside className="w-80 glass-sidebar flex flex-col shrink-0 z-10">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Сообщения</h1>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                <Plus size={20} />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Поиск..." 
                className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 space-y-6 pb-6">
            {/* Study Groups */}
            <div>
              <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Учебные группы</h3>
              <div className="space-y-1">
                {chats.filter(c => c.type === 'group').map(chat => (
                  <button 
                    key={chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-2xl transition-all group",
                      activeChat === chat.id 
                        ? "crimson-gradient text-white shadow-lg shadow-brand-500/20" 
                        : "hover:bg-white/50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-brand-600 font-black text-sm shrink-0 overflow-hidden">
                      {chat.avatar ? <img src={chat.avatar} alt="" className="size-full object-cover" /> : chat.name.substring(0, 2)}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span className={cn("text-sm font-bold truncate", activeChat === chat.id ? "text-white" : "text-slate-900 dark:text-white")}>{chat.name}</span>
                        <span className={cn("text-[10px] font-bold", activeChat === chat.id ? "text-white/60" : "text-slate-400")}>{chat.time}</span>
                      </div>
                      <p className={cn("text-xs truncate mt-0.5", activeChat === chat.id ? "text-white/80" : "text-slate-500")}>{chat.lastMessage}</p>
                    </div>
                    {chat.unreadCount > 0 && activeChat !== chat.id && (
                      <div className="size-5 rounded-full bg-[#E11D48] flex items-center justify-center text-[10px] font-black text-white">
                        {chat.unreadCount}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Messages */}
            <div>
              <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Личные сообщения</h3>
              <div className="space-y-1">
                {chats.filter(c => c.type === 'direct').map(chat => (
                  <button 
                    key={chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-2xl transition-all group",
                      activeChat === chat.id 
                        ? "crimson-gradient text-white shadow-lg shadow-brand-500/20" 
                        : "hover:bg-white/50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <div className="relative shrink-0">
                      <img src={chat.avatar} alt="" className="size-12 rounded-2xl object-cover bg-slate-100 dark:bg-slate-700" />
                      {chat.isOnline && (
                        <span className="absolute -bottom-1 -right-1 size-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span className={cn("text-sm font-bold truncate", activeChat === chat.id ? "text-white" : "text-slate-900 dark:text-white")}>{chat.name}</span>
                        <span className={cn("text-[10px] font-bold", activeChat === chat.id ? "text-white/60" : "text-slate-400")}>{chat.time}</span>
                      </div>
                      <p className={cn("text-xs truncate mt-0.5", activeChat === chat.id ? "text-white/80" : "text-slate-500")}>{chat.lastMessage}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Column 2: Message Area (Main View) */}
        <main className="flex-1 flex flex-col bg-white dark:bg-slate-950 relative">
          {/* Header */}
          <header className="h-20 px-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ivanov" alt="" className="size-10 rounded-xl object-cover bg-slate-100" />
                <span className="absolute -bottom-1 -right-1 size-3 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white leading-tight">Артем Иванов</h2>
                <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">В сети</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="rounded-xl font-bold text-xs uppercase tracking-widest gap-2 text-slate-500 hover:text-brand-600">
                <BookOpen size={16} />
                Материалы курса
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl text-slate-400" onClick={() => setShowContext(!showContext)}>
                <Info size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl text-slate-400">
                <MoreVertical size={20} />
              </Button>
            </div>
          </header>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
            <div className="flex justify-center">
              <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-900 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] rounded-full">Сегодня</span>
            </div>

            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "flex items-end gap-3 max-w-[75%]",
                    msg.sender === 'me' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  {msg.sender === 'other' && (
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ivanov" alt="" className="size-8 rounded-lg bg-slate-100 shrink-0" />
                  )}
                  <div className={cn("flex flex-col gap-1.5", msg.sender === 'me' ? "items-end" : "items-start")}>
                    {msg.isFile ? (
                      <div className="bg-[#F1F5F9] dark:bg-slate-900 p-4 rounded-2xl rounded-bl-[2px] border border-slate-200/50 dark:border-slate-800 flex items-center gap-4 group cursor-pointer hover:bg-slate-200/50 transition-colors">
                        <div className="size-10 crimson-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                          <FileText size={20} />
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{msg.fileName}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{msg.fileSize} • PDF</p>
                        </div>
                        <Button variant="ghost" size="icon" className="size-8 rounded-lg text-slate-400 group-hover:text-brand-600">
                          <Download size={16} />
                        </Button>
                      </div>
                    ) : (
                      <div className={cn(
                        "p-4 shadow-sm",
                        msg.sender === 'me' 
                          ? "crimson-gradient text-white message-bubble-me shadow-brand-500/10" 
                          : "bg-[#F1F5F9] dark:bg-slate-900 text-slate-800 dark:text-slate-200 message-bubble-other"
                      )}>
                        <p className="text-sm leading-relaxed font-medium">
                          {msg.text}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{msg.time}</span>
                      {msg.sender === 'me' && (
                        <CheckCheck size={14} className={cn(msg.isRead ? "text-emerald-500" : "text-slate-300")} />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="px-8 pb-8 pt-4 shrink-0">
            <div className="max-w-4xl mx-auto relative">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-2 pl-4 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm focus-within:ring-4 focus-within:ring-brand-500/5 transition-all">
                <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-brand-600">
                  <Paperclip size={20} />
                </Button>
                <input 
                  type="text" 
                  placeholder="Напишите сообщение..." 
                  className="flex-1 bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-slate-400 outline-none py-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-brand-600">
                    <Smile size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-brand-600">
                    <Mic size={20} />
                  </Button>
                  <Button 
                    className="size-11 rounded-full crimson-gradient text-white shadow-lg shadow-brand-500/30 hover:scale-105 transition-transform"
                    onClick={handleSendMessage}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Column 3: Context Sidebar (Optional) */}
        <AnimatePresence>
          {showContext && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 overflow-hidden"
            >
              <div className="p-8 flex flex-col items-center text-center gap-6 border-b border-slate-50 dark:border-slate-800">
                <div className="relative">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ivanov" alt="" className="size-24 rounded-[32px] object-cover shadow-2xl bg-slate-100" />
                  <span className="absolute -bottom-2 -right-2 size-6 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Артем Иванов</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Преподаватель IT</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Media & Files */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Медиа и файлы</h3>
                    <Button variant="ghost" className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Все</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                        <img src={`https://picsum.photos/seed/${i + 10}/200/200`} alt="" className="size-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <LinkIcon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">LMS Assignment</p>
                        <p className="text-[10px] text-slate-400 truncate">lms.iitu.edu.kz/...</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Participants */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Участники (32)</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ivanov" alt="" className="size-8 rounded-lg bg-slate-100" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Артем Иванов</span>
                      <Badge className="ml-auto bg-brand-50 text-brand-600 border-brand-100 text-[8px] font-black">ADMIN</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Almat" alt="" className="size-8 rounded-lg bg-slate-100" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Вы</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-50 dark:border-slate-800">
                <Button variant="outline" className="w-full rounded-xl border-slate-200 dark:border-slate-800 font-black text-[10px] uppercase tracking-widest text-slate-500">
                  Открыть журнал курса
                </Button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
