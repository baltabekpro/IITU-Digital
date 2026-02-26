import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, role: authRole } = useAuth();
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');

  React.useEffect(() => {
    if (isAuthenticated) {
      if (authRole === 'admin') navigate('/admin');
      else if (authRole === 'teacher') navigate('/teacher');
      else navigate('/');
    }
  }, [isAuthenticated, authRole, navigate]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: role === 'student' ? '29402@iitu.edu.kz' : role === 'teacher' ? 'teacher@iitu.edu.kz' : 'admin@iitu.edu.kz',
      password: 'password123',
    },
  });

  // Update default values when role changes
  React.useEffect(() => {
    reset({
      email: role === 'student' ? '29402@iitu.edu.kz' : role === 'teacher' ? 'teacher@iitu.edu.kz' : 'admin@iitu.edu.kz',
      password: 'password123',
    });
  }, [role, reset]);

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login data:', data);
    login(role);
    toast.success('Успешный вход');
    if (role === 'student') {
      navigate('/');
    } else if (role === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-brand-600 text-white shadow-xl shadow-brand-600/20 mb-6">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">IITU Digital</h1>
          <p className="text-slate-500 mt-2 font-medium">Единый портал университета</p>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">Вход в систему</CardTitle>
            <CardDescription className="text-center">
              Выберите роль для входа в демо-версию
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
              <button 
                onClick={() => setRole('student')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'student' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Студент
              </button>
              <button 
                onClick={() => setRole('teacher')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'teacher' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Преподаватель
              </button>
              <button 
                onClick={() => setRole('admin')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'admin' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Админ
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="email" 
                    placeholder="Корпоративная почта (@iitu.edu.kz)" 
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} rounded-xl text-sm focus:ring-2 focus:ring-brand-500/50 outline-none transition-all`}
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="password" 
                    placeholder="Пароль" 
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border ${errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} rounded-xl text-sm focus:ring-2 focus:ring-brand-500/50 outline-none transition-all`}
                    {...register('password')}
                  />
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                <div className="flex justify-end">
                  <a href="#" className="text-xs font-semibold text-brand-600 hover:underline">Забыли пароль?</a>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 font-bold text-base rounded-xl mt-6 shadow-lg shadow-brand-600/20">
                Войти <ArrowRight className="ml-2" size={20} />
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-500 mt-8">
          © {new Date().getFullYear()} Международный университет информационных технологий
        </p>
      </div>
    </div>
  );
}
