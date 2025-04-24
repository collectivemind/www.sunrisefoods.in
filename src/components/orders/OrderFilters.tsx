import React from 'react';
import { Filter, Calendar, CheckCircle } from 'lucide-react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { OrderFilter, OrderStatus } from '../../types';

interface OrderFiltersProps {
  filters: OrderFilter;
  onFilterChange: (filters: OrderFilter) => void;
  onReset: () => void;
}

export const OrderFilters: React.FC<OrderFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'loaf', label: 'Loaves' },
    { value: 'roll', label: 'Rolls' },
    { value: 'pastry', label: 'Pastries' },
    { value: 'specialty', label: 'Specialty' },
  ];

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filters,
      status: value as OrderStatus | 'all',
    });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({
      ...filters,
      productCategory: value || null,
    });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        start: e.target.value || null,
      },
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        end: e.target.value || null,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900 flex items-center">
          <Filter size={18} className="mr-2" />
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Select
            label="Order Status"
            options={statusOptions}
            value={filters.status}
            onChange={handleStatusChange}
          />
        </div>
        
        <div>
          <Select
            label="Product Category"
            options={categoryOptions}
            value={filters.productCategory || ''}
            onChange={handleCategoryChange}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              From Date
            </span>
          </label>
          <input
            type="date"
            value={filters.dateRange.start || ''}
            onChange={handleStartDateChange}
            className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm shadow-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center">
              <CheckCircle size={14} className="mr-1" />
              To Date
            </span>
          </label>
          <input
            type="date"
            value={filters.dateRange.end || ''}
            onChange={handleEndDateChange}
            className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm shadow-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>
    </div>
  );
};