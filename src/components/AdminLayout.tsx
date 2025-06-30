
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Settings as SettingsIcon,
  Search, 
  Bell, 
  ChevronDown,
  Menu,
  X,
  User,
  Activity,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/courses', icon: BookOpen, hasSubmenu: true },
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'SEO Settings', href: '/seo-settings', icon: SettingsIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <img 
            src="https://themegenix.com/demo/lexend-wp/assets/images/landing/logo.svg" 
            alt="Lexend" 
            className="h-8"
          />
        </div>

        <nav className="mt-8 px-4">
          {sidebarItems.map((item) => (
            <div key={item.name} className="mb-2">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
                {item.hasSubmenu && (
                  <ChevronDown className="ml-auto h-4 w-4" />
                )}
              </NavLink>
              
              {item.hasSubmenu && item.name === 'Courses' && (
                <div className="ml-8 mt-2 space-y-1">
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Categories
                  </NavLink>
                  <NavLink
                    to="/courses"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    Course List
                  </NavLink>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search anything"
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">🇺🇸</span>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-600 text-white text-sm">
                          {user?.name?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-gray-900">Administrator</p>
                        <p className="text-xs text-gray-500">{user?.name}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Account Setting</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Login Activity</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
