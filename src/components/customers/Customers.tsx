import React, { useState } from 'react';
import { 
  Users,
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  ShoppingBag,
  Edit,
  Trash2,
  ArrowUpDown,
  MapPin
} from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/SearchInput';
import { Select } from '../ui/Select';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'retail' | 'wholesale' | 'corporate';
  address: string;
  totalOrders: number;
  lastOrder: string;
  status: 'active' | 'inactive';
  joinedDate: string;
}

const sampleCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Cafe Morning Brew',
    email: 'orders@morningbrew.com',
    phone: '(555) 123-4567',
    type: 'wholesale',
    address: '123 Coffee Lane, Brewtown, BT 12345',
    totalOrders: 156,
    lastOrder: '2024-03-15',
    status: 'active',
    joinedDate: '2023-01-15'
  },
  {
    id: 'CUST-002',
    name: 'Harmony Bistro',
    email: 'kitchen@harmonybistro.com',
    phone: '(555) 234-5678',
    type: 'wholesale',
    address: '456 Restaurant Row, Foodville, FV 67890',
    totalOrders: 89,
    lastOrder: '2024-03-14',
    status: 'active',
    joinedDate: '2023-03-20'
  },
  {
    id: 'CUST-003',
    name: 'Green Market Grocery',
    email: 'orders@greenmarket.com',
    phone: '(555) 345-6789',
    type: 'corporate',
    address: '789 Market Street, Freshtown, FT 34567',
    totalOrders: 234,
    lastOrder: '2024-03-16',
    status: 'active',
    joinedDate: '2023-02-10'
  },
  {
    id: 'CUST-004',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 456-7890',
    type: 'retail',
    address: '321 Residential Ave, Hometown, HT 89012',
    totalOrders: 12,
    lastOrder: '2024-03-10',
    status: 'active',
    joinedDate: '2023-06-05'
  },
  {
    id: 'CUST-005',
    name: 'City Center Hotel',
    email: 'kitchen@cityhotel.com',
    phone: '(555) 567-8901',
    type: 'corporate',
    address: '555 Hotel Plaza, Metropolitan, MT 45678',
    totalOrders: 178,
    lastOrder: '2024-03-13',
    status: 'inactive',
    joinedDate: '2023-04-15'
  }
];

export const Customers: React.FC = () => {
  const [customers] = useState<Customer[]>(sampleCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<keyof Customer>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'retail', label: 'Retail' },
    { value: 'wholesale', label: 'Wholesale' },
    { value: 'corporate', label: 'Corporate' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'totalOrders', label: 'Total Orders' },
    { value: 'lastOrder', label: 'Last Order' },
    { value: 'joinedDate', label: 'Join Date' }
  ];

  // Filter and sort customers
  const filteredCustomers = customers
    .filter(customer => 
      (selectedType === 'all' || customer.type === selectedType) &&
      (selectedStatus === 'all' || customer.status === selectedStatus) &&
      (customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
       customer.phone.includes(searchQuery))
    )
    .sort((a, b) => {
      let compareValue = 0;
      if (sortBy === 'name' || sortBy === 'email') {
        compareValue = a[sortBy].localeCompare(b[sortBy]);
      } else if (sortBy === 'totalOrders') {
        compareValue = a.totalOrders - b.totalOrders;
      } else if (sortBy === 'lastOrder' || sortBy === 'joinedDate') {
        compareValue = new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
      }
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users size={24} className="mr-2 text-amber-700" />
              Customers
            </h1>
            <p className="text-gray-600 mt-1">Manage your customer relationships</p>
          </div>
          <Button
            variant="primary"
            icon={<Plus size={16} />}
          >
            Add Customer
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search customers..."
            />
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <Select
                label="Type"
                options={typeOptions}
                value={selectedType}
                onChange={setSelectedType}
              />
            </div>
            <div className="w-40">
              <Select
                label="Status"
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
              />
            </div>
            <div className="w-40">
              <Select
                label="Sort By"
                options={sortOptions}
                value={sortBy}
                onChange={(value) => setSortBy(value as keyof Customer)}
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

      {/* Customers List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 p-6">
          {filteredCustomers.map(customer => (
            <div 
              key={customer.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-amber-200 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-semibold text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          customer.type === 'wholesale' ? 'bg-blue-100 text-blue-800' :
                          customer.type === 'corporate' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        } capitalize`}>
                          {customer.type}
                        </span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                          customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        } capitalize`}>
                          {customer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <ShoppingBag size={16} className="mr-1" />
                    <span>{customer.totalOrders} orders</span>
                    <span className="mx-2">•</span>
                    <span>Last order: {formatDate(customer.lastOrder)}</span>
                  </div>
                  <div className="flex space-x-2">
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
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-2" />
                  <a href={`mailto:${customer.email}`} className="hover:text-amber-700">
                    {customer.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={16} className="mr-2" />
                  <a href={`tel:${customer.phone}`} className="hover:text-amber-700">
                    {customer.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>{customer.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};