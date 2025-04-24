import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Building2,
  Users,
  Bell,
  Shield,
  Printer,
  Mail,
  CreditCard,
  Save,
  Factory
} from 'lucide-react';
import { Button } from '../ui/Button';

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [selectedFactory, setSelectedFactory] = useState('main');

  const factories = [
    { id: 'main', name: 'Main Factory', address: '123 Baker Street' },
    { id: 'downtown', name: 'Downtown Location', address: '456 Market Ave' },
    { id: 'eastside', name: 'Eastside Facility', address: '789 Production Rd' }
  ];

  const sections: SettingsSection[] = [
    {
      id: 'general',
      label: 'General Settings',
      icon: <Building2 size={20} />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Factory Location</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Active Factory
                </label>
                <select
                  value={selectedFactory}
                  onChange={(e) => setSelectedFactory(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                >
                  {factories.map(factory => (
                    <option key={factory.id} value={factory.id}>
                      {factory.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Factory className="h-8 w-8 text-amber-600" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      {factories.find(f => f.id === selectedFactory)?.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {factories.find(f => f.id === selectedFactory)?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  defaultValue="Sunrise Foods"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="contact@sunrisefoods.com"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="(555) 123-4567"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'users',
      label: 'Users & Permissions',
      icon: <Users size={20} />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Management</h3>
            <p className="text-sm text-gray-500 mb-4">
              Manage user access and permissions for the system.
            </p>
            {/* User management content */}
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell size={20} />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Order Notifications</h4>
                  <p className="text-sm text-gray-500">Receive notifications for new orders</p>
                </div>
                <button
                  type="button"
                  className="bg-amber-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  role="switch"
                  aria-checked="true"
                >
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Production Alerts</h4>
                  <p className="text-sm text-gray-500">Get alerts for production status changes</p>
                </div>
                <button
                  type="button"
                  className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  role="switch"
                  aria-checked="false"
                >
                  <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Shield size={20} />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Two-Factor Authentication
                </label>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: <Printer size={20} />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Services</h3>
            <div className="space-y-4">
              {/* Integration settings content */}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <SettingsIcon size={24} className="mr-2 text-amber-700" />
          Settings
        </h1>
        <p className="text-gray-600 mt-1">Configure system settings and preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Settings Navigation */}
          <nav className="p-4 border-r border-gray-200 lg:p-6">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-amber-100 text-amber-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`mr-3 ${
                      activeSection === section.id ? 'text-amber-700' : 'text-gray-500'
                    }`}>
                      {section.icon}
                    </span>
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Settings Content */}
          <div className="col-span-3 p-6">
            {sections.find(section => section.id === activeSection)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};