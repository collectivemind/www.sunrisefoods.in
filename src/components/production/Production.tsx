import React, { useState } from 'react';
import { 
  Clipboard, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Users,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ProductionItem {
  id: string;
  product: string;
  quantity: number;
  status: 'pending' | 'in-progress' | 'completed';
  startTime: string;
  endTime: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
}

const sampleProduction: ProductionItem[] = [
  {
    id: 'PROD-001',
    product: 'Sourdough Loaf',
    quantity: 50,
    status: 'in-progress',
    startTime: '07:00 AM',
    endTime: '10:00 AM',
    assignedTo: 'John Baker',
    priority: 'high'
  },
  {
    id: 'PROD-002',
    product: 'Croissants',
    quantity: 120,
    status: 'pending',
    startTime: '08:00 AM',
    endTime: '11:00 AM',
    assignedTo: 'Sarah Miller',
    priority: 'medium'
  },
  {
    id: 'PROD-003',
    product: 'Baguettes',
    quantity: 75,
    status: 'completed',
    startTime: '06:00 AM',
    endTime: '09:00 AM',
    assignedTo: 'Mike Wilson',
    priority: 'high'
  }
];

export const Production: React.FC = () => {
  const [productionItems] = useState<ProductionItem[]>(sampleProduction);

  const getStatusColor = (status: ProductionItem['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: ProductionItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Clipboard size={24} className="mr-2 text-amber-700" />
              Production
            </h1>
            <p className="text-gray-600 mt-1">Track and manage production schedules</p>
          </div>
          <Button
            variant="primary"
            icon={<Plus size={16} />}
          >
            New Production Task
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">8</h3>
          <p className="text-gray-600 text-sm">Active Production</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">12</h3>
          <p className="text-gray-600 text-sm">Completed Today</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-amber-100 p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">85%</h3>
          <p className="text-gray-600 text-sm">Efficiency Rate</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">6</h3>
          <p className="text-gray-600 text-sm">Active Staff</p>
        </div>
      </div>

      {/* Production List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Production</h2>
          <div className="space-y-4">
            {productionItems.map((item) => (
              <div 
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-amber-200 transition-colors"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{item.product}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Quantity: <span className="font-medium">{item.quantity}</span>
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit size={14} />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Trash2 size={14} />}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>{item.startTime} - {item.endTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2" />
                    <span>{item.assignedTo}</span>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle size={16} className={`mr-2 ${getPriorityColor(item.priority)}`} />
                    <span className={`capitalize ${getPriorityColor(item.priority)}`}>
                      {item.priority} Priority
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};