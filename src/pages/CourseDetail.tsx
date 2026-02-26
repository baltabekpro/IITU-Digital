import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, CheckCircle, Clock, 
  FileText, PlayCircle, Download, MoreVertical,
  ChevronRight, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock data for the specific course
  const courseData = {
    id: courseId,
    title: courseId === '1' ? 'Алгоритмы и структуры данных' : courseId === '2' ? 'Базы данных' : 'Мобильная разработка',
    teacher: courseId === '1' ? 'Абдикерим Н.Б.' : courseId === '2' ? 'Мухамедиев Р.И.' : 'Сарсенбай А.К.',
    progress: 65,
    grade: 'A-',
    gpa: 3.67,
    modules: [
      {
        id: 1,
        title: 'Введение в алгоритмы',
        completed: true,
        lessons: [
          { id: 1, title: 'Понятие алгоритма', type: 'video', duration: '15:00', completed: true },
          { id: 2, title: 'Свойства алгоритмов', type: 'reading', duration: '10 min', completed: true },
        ],
        assignments: [
          { id: 1, title: 'Тест: Основы', status: 'graded', grade: 95, deadline: 'Passed' }
        ]
      },
      {
        id: 2,
        title: 'Асимптотический анализ',
        completed: true,
        lessons: [
          { id: 3, title: 'Big O нотация', type: 'video', duration: '25:00', completed: true },
          { id: 4, title: 'Примеры анализа сложности', type: 'reading', duration: '15 min', completed: true },
        ],
        assignments: [
          { id: 2, title: 'Лабораторная №1', status: 'graded', grade: 88, deadline: 'Passed' }
        ]
      },
      {
        id: 3,
        title: 'Структуры данных: Массивы и Списки',
        completed: false,
        lessons: [
          { id: 5, title: 'Динамические массивы', type: 'video', duration: '20:00', completed: true },
          { id: 6, title: 'Связные списки', type: 'video', duration: '30:00', completed: false },
        ],
        assignments: [
          { id: 3, title: 'Лабораторная №2', status: 'pending', grade: null, deadline: '28 Окт, 23:59' }
        ]
      }
    ]
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        userName="Иванов А. Б." 
        userGroup="CS-2104K" 
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Almat" 
      />
      <div className="flex-1 p-8 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        {/* Back Button & Title */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-white dark:bg-slate-800 shadow-sm"
            onClick={() => navigate('/courses')}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold border-brand-200 text-brand-600">В процессе</Badge>
              <span className="text-xs text-slate-400 font-medium">• 5 Кредитов</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{courseData.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Modules List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <BookOpen size={20} className="text-brand-600" />
                Учебные модули
              </h3>
              
              {courseData.modules.map((module) => (
                <CollapsibleSection 
                  key={module.id} 
                  title={module.title}
                  className="border-none shadow-sm"
                  headerClassName="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-4"
                  contentClassName="p-0"
                  rightElement={
                    <div className={`size-8 rounded-lg flex items-center justify-center ${module.completed ? 'bg-green-100 text-green-600' : 'bg-brand-50 text-brand-600'}`}>
                      {module.completed ? <CheckCircle size={18} /> : <span className="text-sm font-bold">{module.id}</span>}
                    </div>
                  }
                >
                  <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <div className="flex items-center gap-3">
                          {lesson.type === 'video' ? <PlayCircle size={18} className="text-slate-400" /> : <FileText size={18} className="text-slate-400" />}
                          <div>
                            <p className={`text-sm font-medium ${lesson.completed ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-slate-100'}`}>
                              {lesson.title}
                            </p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">{lesson.duration}</p>
                          </div>
                        </div>
                        {lesson.completed && <CheckCircle size={16} className="text-green-500" />}
                      </div>
                    ))}
                    
                    {module.assignments.map((assignment) => (
                      <div key={assignment.id} className="p-4 bg-brand-50/30 dark:bg-brand-900/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Star size={18} className="text-brand-500" />
                          <div>
                            <p className="text-sm font-bold text-brand-900 dark:text-brand-100">{assignment.title}</p>
                            <p className="text-[10px] text-brand-600 uppercase font-bold">Задание • {assignment.deadline}</p>
                          </div>
                        </div>
                        {assignment.status === 'graded' ? (
                          <Badge className="bg-brand-600 text-white font-bold">{assignment.grade}%</Badge>
                        ) : (
                          <Button size="sm" className="h-8 text-xs font-bold rounded-lg">Сдать</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Course Progress */}
            <CollapsibleSection title="Ваш прогресс" className="border-none shadow-sm">
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-black text-brand-600">{courseData.progress}%</span>
                <span className="text-sm text-slate-400 mb-1 font-medium">завершено</span>
              </div>
              <Progress value={courseData.progress} className="h-2 bg-slate-100" indicatorColor="bg-brand-600" />
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Оценка</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{courseData.grade}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">GPA</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{courseData.gpa}</p>
                </div>
              </div>
            </CollapsibleSection>

            {/* Teacher Info */}
            <CollapsibleSection title="Преподаватель" className="border-none shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-slate-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher${courseId}`} alt="Teacher" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{courseData.teacher}</p>
                  <p className="text-xs text-slate-500">Кафедра ВТПО</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl font-bold border-slate-200">Связаться</Button>
            </CollapsibleSection>

            {/* Resources */}
            <CollapsibleSection title="Ресурсы курса" className="border-none shadow-sm">
              <div className="space-y-3">
                {[
                  { name: 'Syllabus_2025.pdf', size: '1.2 MB' },
                  { name: 'Lecture_Notes_Week1-4.zip', size: '15.5 MB' },
                  { name: 'Reading_List.docx', size: '450 KB' }
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group cursor-pointer hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-slate-400 group-hover:text-brand-500" />
                      <div>
                        <p className="text-xs font-bold truncate max-w-[150px]">{file.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase">{file.size}</p>
                      </div>
                    </div>
                    <Download size={16} className="text-slate-300 group-hover:text-brand-500" />
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </div>
  );
}
