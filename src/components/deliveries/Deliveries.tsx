import React, { useState } from 'react';
import { 
  Truck,
  MapPin,
  Calendar,
  Clock,
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ArrowUpDown,
  CheckCircle,
  AlertTriangle,
  Navigation
} from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/SearchInput';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { orders } from '../../data/orders';

interface DeliveryRoute {
  id: string;
  name: string;
  driver: string;
  vehicle: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  startTime: string;
  estimatedDuration: string;
  stops: number;
  distance: string;
  orders: string[];
}

const sampleRoutes: DeliveryRoute[] = [
  {
    id: 'ROUTE-001',
    name: 'Downtown Morning Route',
    driver: 'John Smith',
    vehicle: 'Van 1 (XYZ-123)',
    status: 'in-progress',
    startTime: '06:00 AM',
    estimatedDuration: '2.5 hours',
    stops: 8,
    distance: '12.5 miles',
    orders: ['ORD-2023-001', 'ORD-2023-002', 'ORD-2023-003']
  },
  {
    id: 'ROUTE-002',
    name: 'Westside Afternoon Route',
    driver: 'Sarah Johnson',
    vehicle: 'Van 2 (ABC-789)',
    status: 'pending',
    startTime: '02:00 PM',
    estimatedDuration: '3 hours',
    stops: 10,
    distance: '15.8 miles',
    orders: ['ORD-2023-006', 'ORD-2023-007']
  },
  {
    id: 'ROUTE-003',
    name: 'Eastside Morning Route',
    driver: 'Mike Wilson',
    vehicle: 'Van 3 (DEF-456)',
    status: 'completed',
    startTime: '07:00 AM',
    estimatedDuration: '2 hours',
    stops: 6,
    distance: '9.3 miles',
    orders: ['ORD-2023-004', 'ORD-2023-005']
  },
  {
    id: 'ROUTE-004',
    name: 'Suburban Route',
    driver: 'Emily Davis',
    vehicle: 'Van 4 (GHI-789)',
    status: 'delayed',
    startTime: '08:30 AM',
    estimatedDuration: '4 hours',
    stops: 12,
    distance: '22.4 miles',
    orders: ['ORD-2023-008', 'ORD-2023-009', 'ORD-2023-010']
  }
];

export const Deliveries: React.FC = () => {
  const [routes] = useState<DeliveryRoute[]>(sampleRoutes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'startTime' | 'stops'>('startTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'delayed', label: 'Delayed' }
  ];

  const sortOptions = [
    { value: 'startTime', label: 'Start Time' },
    { value: 'stops', label: 'Number of Stops' }
  ];

  const getStatusColor = (status: DeliveryRoute['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and sort routes
  const filteredRoutes = routes
    .filter(route => 
      (selectedStatus === 'all' || route.status === selectedStatus) &&
      (route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       route.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
       route.id.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'startTime') {
        return sortOrder === 'asc' 
          ? a.startTime.localeCompare(b.startTime)
          : b.startTime.localeCompare(a.startTime);
      } else {
        return sortOrder === 'asc'
          ? a.stops - b.stops
          : b.stops - a.stops;
      }
    });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Truck size={24} className="mr-2 text-amber-700" />
              Deliveries
            </h1>
            <p className="text-gray-600 mt-1">Manage delivery routes and schedules</p>
          </div>
          <Button
            variant="primary"
            icon={<Plus size={16} />}
          >
            Create Route
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Today</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">12</h3>
          <p className="text-gray-600 text-sm">Active Routes</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">Today</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">45</h3>
          <p className="text-gray-600 text-sm">Deliveries</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Navigation className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-amber-600">Average</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">15.2</h3>
          <p className="text-gray-600 text-sm">Miles per Route</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">Average</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">98%</h3>
          <p className="text-gray-600 text-sm">On-Time Delivery</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search routes, drivers..."
            />
          </div>
          <div className="flex gap-2">
            <div className="w-48">
              <Select
                label="Status"
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
              />
            </div>
            <div className="w-48">
              <Select
                label="Sort By"
                options={sortOptions}
                value={sortBy}
                onChange={(value) => setSortBy(value as 'startTime' | 'stops')}
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                size="md"
                icon={<ArrowUpDown size={16} />}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {filteredRoutes.map(route => (
          <div 
            key={route.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-amber-200 transition-colors"
          >
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 mr-3">{route.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(route.status)}`}>
                    {route.status.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>Start: {route.startTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>Duration: {route.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{route.stops} stops • {route.distance}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Truck size={16} className="mr-2" />
                    <span>{route.vehicle}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col lg:items-end">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-semibold">
                    {route.driver.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">{route.driver}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit size={14} />}
                  >
                    Edit Route
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
            </div>

            {/* Orders in Route */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Orders in Route</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {route.orders.map(orderId => {
                  const order = orders.find(o => o.id === orderId);
                  return order ? (
                    <div key={order.id} className="flex items-center justify-between bg-gray-50 rounded p-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">{order.id}</span>
                        <p className="text-gray-600">{order.customer.name}</p>
                      </div>
                      <Badge status={order.status} />
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};