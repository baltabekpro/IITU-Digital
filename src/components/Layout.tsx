import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

export default function Layout({ role }: { role: 'student' | 'teacher' | 'admin' }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Sidebar role={role} />
      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
