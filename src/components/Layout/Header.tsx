import React, { useState } from 'react';
import { Menu, ChevronDown, User, LogOut, Settings, Building2 } from 'lucide-react';
import { NotificationDropdown } from '../notifications/NotificationDropdown';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showFactoryDropdown, setShowFactoryDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const factories = [
    { id: 'main', name: 'Main Factory', address: '123 Baker Street' },
    { id: 'downtown', name: 'Downtown Location', address: '456 Market Ave' },
    { id: 'eastside', name: 'Eastside Facility', address: '789 Production Rd' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="lg:hidden p-2 mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center">
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-amber-700"
            >
              <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z" fill="currentColor"/>
              <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M18 5L13.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h1 className="ml-2 text-xl font-semibold text-gray-900">Sunrise Foods.</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={() => setShowFactoryDropdown(!showFactoryDropdown)}
              >
                <Building2 size={16} className="mr-1" />
                <span>Factory</span>
                <ChevronDown size={16} className="ml-1" />
              </button>

              {showFactoryDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  {factories.map(factory => (
                    <button
                      key={factory.id}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => setShowFactoryDropdown(false)}
                    >
                      <div className="flex items-center">
                        <Building2 size={16} className="text-gray-500" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{factory.name}</p>
                          <p className="text-xs text-gray-500">{factory.address}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <NotificationDropdown />
            
            <div className="border-l border-gray-200 h-6 mx-2"></div>
            
            <div className="relative">
              <button
                className="flex items-center text-sm focus:outline-none"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-medium">
                  <User size={18} />
                </div>
                <span className="ml-2 font-medium text-gray-700 hidden md:block">Admin</span>
                <ChevronDown size={16} className="ml-1 hidden md:block" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <Settings size={16} className="mr-3 text-gray-500" />
                    Settings
                  </Link>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <LogOut size={16} className="mr-3 text-gray-500" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};