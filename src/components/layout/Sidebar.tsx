
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Home,
  BookOpen,
  Calendar,
  MessageCircle,
  FileText,
  Settings,
  BarChart3,
  PlusCircle,
  Clock,
  User
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const studentMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Live Classes', path: '/live' },
    { icon: BookOpen, label: 'Resources', path: '/resources' },
    { icon: MessageCircle, label: 'AI Assistant', path: '/chatbot' },
    { icon: FileText, label: 'Notes', path: '/notes' },
    { icon: BarChart3, label: 'Quizzes', path: '/quizzes' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const teacherMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: PlusCircle, label: 'Create Content', path: '/create' },
    { icon: Clock, label: 'Schedule Class', path: '/schedule' },
    { icon: MessageCircle, label: 'AI Assistant', path: '/chatbot' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const menuItems = user.role === 'student' ? studentMenuItems : teacherMenuItems;

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">LearnAI</span>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              {user.role === 'student' ? 'Student' : 'Teacher'}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {user.email}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
