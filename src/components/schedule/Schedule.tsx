import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  AlertTriangle,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'production' | 'delivery' | 'maintenance' | 'meeting';
  startTime: string;
  endTime: string;
  assignedTo: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
}

const sampleEvents: ScheduleEvent[] = [
  {
    id: 'EVT-001',
    title: 'Morning Bread Production',
    type: 'production',
    startTime: '05:00 AM',
    endTime: '09:00 AM',
    assignedTo: ['John Baker', 'Sarah Miller'],
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'EVT-002',
    title: 'Downtown Deliveries',
    type: 'delivery',
    startTime: '09:30 AM',
    endTime: '11:30 AM',
    assignedTo: ['Mike Wilson'],
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 'EVT-003',
    title: 'Oven Maintenance',
    type: 'maintenance',
    startTime: '12:00 PM',
    endTime: '02:00 PM',
    assignedTo: ['Tech Team'],
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 'EVT-004',
    title: 'Staff Meeting',
    type: 'meeting',
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    assignedTo: ['All Staff'],
    status: 'scheduled',
    priority: 'low'
  }
];

export const Schedule: React.FC = () => {
  const [events] = useState<ScheduleEvent[]>(sampleEvents);
  const [currentDate] = useState(new Date());

  const getEventTypeStyles = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'production':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivery':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'meeting':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <CalendarIcon size={24} className="mr-2 text-amber-700" />
              Schedule
            </h1>
            <p className="text-gray-600 mt-1">View and manage daily operations</p>
          </div>
          <Button
            variant="primary"
            icon={<Plus size={16} />}
          >
            Add Event
          </Button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            icon={<ChevronLeft size={16} />}
          >
            Previous Day
          </Button>
          <h2 className="text-lg font-semibold text-gray-900">
            {formatDate(currentDate)}
          </h2>
          <Button
            variant="outline"
            size="sm"
            icon={<ChevronRight size={16} />}
          >
            Next Day
          </Button>
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-6">
            {events.map((event) => (
              <div 
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-amber-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{event.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getEventTypeStyles(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center">
                    <Users size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      {event.assignedTo.join(', ')}
                    </span>
                  </div>
                  {event.priority === 'high' && (
                    <div className="flex items-center">
                      <AlertTriangle size={16} className="text-red-500 mr-2" />
                      <span className="text-sm text-red-600 font-medium">
                        High Priority
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};