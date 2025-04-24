import React, { useState, useMemo } from 'react';
import { Order, OrderFilter, OrderStatus } from '../../types';
import { orders as mockOrders } from '../../data/orders';
import { OrderCard } from './OrderCard';
import { OrderDetail } from './OrderDetail';
import { OrderFilters } from './OrderFilters';
import { SearchInput } from '../ui/SearchInput';
import { Button } from '../ui/Button';
import { Pagination } from '../ui/Pagination';
import { Heading as Bread, Filter as FilterIcon, ArrowUpDown, Plus } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export const OrdersList: React.FC = () => {
  // State for orders data
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  
  // State for selected order
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // State for filters
  const [filters, setFilters] = useState<OrderFilter>({
    status: 'all',
    dateRange: {
      start: null,
      end: null,
    },
    searchQuery: '',
    productCategory: null,
  });
  
  // State for filter visibility on mobile
  const [showFilters, setShowFilters] = useState(false);
  
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for sort field and direction
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order | 'customerName' | 'totalItems';
    direction: 'asc' | 'desc';
  }>({
    key: 'createdAt',
    direction: 'desc',
  });

  // Handle viewing order details
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  // Handle closing order details
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  // Handle updating order status
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as OrderStatus } 
        : order
    ));
    
    // Also update the selected order if it's open
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus as OrderStatus
      });
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: OrderFilter) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      dateRange: {
        start: null,
        end: null,
      },
      searchQuery: '',
      productCategory: null,
    });
    setCurrentPage(1); // Reset to first page when filters are reset
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setFilters({
      ...filters,
      searchQuery: value,
    });
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Handle sort change
  const handleSort = (key: keyof Order | 'customerName' | 'totalItems') => {
    setSortConfig({
      key,
      direction: 
        sortConfig.key === key && sortConfig.direction === 'asc' 
          ? 'desc' 
          : 'asc',
    });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Apply filters and sorting
  const filteredAndSortedOrders = useMemo(() => {
    // First apply filters
    let result = [...orders];
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(order => order.status === filters.status);
    }
    
    // Filter by date range
    if (filters.dateRange.start) {
      const startDate = new Date(filters.dateRange.start);
      result = result.filter(order => new Date(order.createdAt) >= startDate);
    }
    
    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59, 999); // End of day
      result = result.filter(order => new Date(order.createdAt) <= endDate);
    }
    
    // Filter by product category
    if (filters.productCategory) {
      result = result.filter(order => 
        order.items.some(item => item.product.category === filters.productCategory)
      );
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query) ||
        order.items.some(item => 
          item.product.name.toLowerCase().includes(query)
        )
      );
    }
    
    // Then apply sorting
    result.sort((a, b) => {
      let valueA, valueB;
      
      // Handle special sort keys
      switch (sortConfig.key) {
        case 'customerName':
          valueA = a.customer.name;
          valueB = b.customer.name;
          break;
        case 'totalItems':
          valueA = a.items.reduce((sum, item) => sum + item.quantity, 0);
          valueB = b.items.reduce((sum, item) => sum + item.quantity, 0);
          break;
        default:
          valueA = a[sortConfig.key];
          valueB = b[sortConfig.key];
      }
      
      // For dates
      if (sortConfig.key === 'createdAt' || sortConfig.key === 'deliveryDate') {
        valueA = new Date(valueA as string).getTime();
        valueB = new Date(valueB as string).getTime();
      }
      
      // For strings
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfig.direction === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      // For numbers and dates
      return sortConfig.direction === 'asc' 
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
    
    return result;
  }, [orders, filters, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredAndSortedOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Bread size={24} className="mr-2 text-amber-700" />
            Orders Management
          </h1>
          <p className="text-gray-600 mt-1">Manage and track orders</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            icon={<FilterIcon size={16} />}
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            Filters
          </Button>
          <Button
            variant="primary"
            icon={<Plus size={16} />}
          >
            New Order
          </Button>
        </div>
      </div>
      
      {/* Search and filter bar */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <SearchInput
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by order ID, customer, or product..."
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              icon={<ArrowUpDown size={16} />}
              onClick={() => handleSort('createdAt')}
            >
              {sortConfig.key === 'createdAt' 
                ? `Date ${sortConfig.direction === 'asc' ? '↑' : '↓'}`
                : 'Sort by Date'}
            </Button>
            <Button
              variant="outline"
              icon={<FilterIcon size={16} />}
              onClick={() => setShowFilters(!showFilters)}
              className="hidden md:flex"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="mb-6 transition-all duration-300 ease-in-out">
          <OrderFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>
      )}
      
      {/* Orders grid */}
      {filteredAndSortedOrders.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            {paginatedOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {filters.searchQuery || filters.status !== 'all' || filters.dateRange.start || filters.dateRange.end || filters.productCategory
              ? 'Try adjusting your filters to see more results'
              : 'No orders have been placed yet'}
          </p>
          <Button variant="primary" className="mt-4">Create New Order</Button>
        </div>
      )}
      
      {/* Order details modal */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={handleCloseDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};