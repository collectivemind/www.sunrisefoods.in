import React from 'react';
import { Order } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Eye, CheckCircle, Clock } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails, onUpdateStatus }) => {
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Sum up total items in the order
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  // Get primary item name for display
  const primaryItem = order.items[0]?.product.name || '';
  const hasMultipleItems = order.items.length > 1;

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{order.id}</h3>
            <p className="text-sm text-gray-600">{order.customer.name}</p>
          </div>
          <Badge status={order.status} />
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="text-sm">
            <span className="text-gray-500">Items:</span>{' '}
            <span className="font-medium">
              {primaryItem}
              {hasMultipleItems && ` +${order.items.length - 1} more`}
            </span>
          </div>
          
          <div className="flex space-x-4 text-sm">
            <div>
              <span className="text-gray-500">Quantity:</span>{' '}
              <span className="font-medium">{totalItems} items</span>
            </div>
            <div>
              <span className="text-gray-500">Total:</span>{' '}
              <span className="font-medium">${order.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <Clock size={14} className="inline mr-1 text-gray-500" />
              <span className="text-gray-500">Created:</span>{' '}
              <span className="ml-1 font-medium">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={14} className="inline mr-1 text-gray-500" />
              <span className="text-gray-500">Delivery:</span>{' '}
              <span className="ml-1 font-medium">{formatDate(order.deliveryDate)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 pt-3 border-t border-gray-100">
          <Button 
            size="sm"
            variant="outline"
            icon={<Eye size={16} />}
            onClick={() => onViewDetails(order)}
            className="flex-1"
          >
            Details
          </Button>
          
          {order.status === 'pending' && (
            <Button 
              size="sm"
              variant="secondary"
              onClick={() => onUpdateStatus(order.id, 'preparing')}
              className="flex-1"
            >
              Start Preparing
            </Button>
          )}
          
          {order.status === 'preparing' && (
            <Button 
              size="sm"
              variant="secondary"
              onClick={() => onUpdateStatus(order.id, 'ready')}
              className="flex-1"
            >
              Mark Ready
            </Button>
          )}
          
          {order.status === 'ready' && (
            <Button 
              size="sm"
              variant="secondary"
              onClick={() => onUpdateStatus(order.id, 'delivered')}
              className="flex-1"
            >
              Mark Delivered
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};