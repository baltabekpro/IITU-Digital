import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  rightElement?: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = true,
  className,
  headerClassName,
  contentClassName,
  rightElement
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden", className)}>
      <div 
        className={cn(
          "flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
          headerClassName
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {typeof title === 'string' ? (
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          ) : (
            title
          )}
        </div>
        <div className="flex items-center gap-4">
          {rightElement && <div onClick={(e) => e.stopPropagation()}>{rightElement}</div>}
          <div className="text-slate-400">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={cn("p-6 pt-0 border-t border-slate-50 dark:border-slate-800/50", contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
