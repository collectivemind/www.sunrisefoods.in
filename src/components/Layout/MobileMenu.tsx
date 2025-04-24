import React from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from './menuItems';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 lg:hidden">
        <div className="p-6 bg-amber-50 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center" onClick={onClose}>
            <div className="w-10 h-10 rounded-lg bg-amber-700 flex items-center justify-center text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7H18V6C18 4.9 17.1 4 16 4H8C6.9 4 6 4.9 6 6V7H5C3.9 7 3 7.9 3 9V14C3 15.1 3.9 16 5 16H6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V16H19C20.1 16 21 15.1 21 14V9C21 7.9 20.1 7 19 7ZM8 6H16V7H8V6ZM16 18H8V14H16V18ZM19 14H18V12C18 10.9 17.1 10 16 10H8C6.9 10 6 10.9 6 12V14H5V9H19V14Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="ml-3">
              <h2 className="font-bold text-gray-900">Sunrise Foods</h2>
              <p className="text-xs text-gray-600">Logged in as Admin</p>
            </div>
          </Link>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md group transition-colors ${
                  isActive
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={onClose}
              >
                <span className={`mr-3 ${isActive ? 'text-amber-700' : 'text-gray-500 group-hover:text-gray-700'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-amber-200 text-amber-800 py-0.5 px-2 rounded-full text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-amber-50 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-amber-800">Production Summary</h3>
            <p className="text-xs text-amber-700 mt-1">Today's target: 247 items</p>
            <div className="mt-2 h-2 bg-amber-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-600 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">65% completed</p>
          </div>
        </div>
      </div>
    </>
  );
};