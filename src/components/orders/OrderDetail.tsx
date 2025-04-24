import React from 'react';
import { Order } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { X, ShoppingBag, Calendar, CreditCard, Clock, Phone, Mail, Edit, Truck } from 'lucide-react';

interface OrderDetailProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: string) => void;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose, onUpdateStatus }) => {
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  // Get next status based on current status
  const getNextStatus = (): { status: string; label: string } | null => {
    switch (order.status) {
      case 'pending':
        return { status: 'preparing', label: 'Start Preparing' };
      case 'preparing':
        return { status: 'ready', label: 'Mark as Ready' };
      case 'ready':
        return { status: 'delivered', label: 'Mark as Delivered' };
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="px-6 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900 mr-3">{order.id}</h3>
                <Badge status={order.status} />
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>Created: {formatDate(order.createdAt)}</span>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0">
              {nextStatus && (
                <Button 
                  variant="primary"
                  icon={order.status === 'ready' ? <Truck size={16} /> : <Edit size={16} />}
                  onClick={() => onUpdateStatus(order.id, nextStatus.status)}
                >
                  {nextStatus.label}
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-amber-50 rounded-lg p-4">
              <h4 className="font-medium text-amber-900 flex items-center mb-3">
                <ShoppingBag size={18} className="mr-2" />
                Customer Information
              </h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{order.customer.name}</span>
                </p>
                <p className="text-sm flex items-center text-gray-700">
                  <Mail size={14} className="mr-1.5 text-gray-500" />
                  {order.customer.email}
                </p>
                {order.customer.phone && (
                  <p className="text-sm flex items-center text-gray-700">
                    <Phone size={14} className="mr-1.5 text-gray-500" />
                    {order.customer.phone}
                  </p>
                )}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 flex items-center mb-3">
                <Calendar size={18} className="mr-2" />
                Delivery Information
              </h4>
              <div className="space-y-2">
                <p className="text-sm flex items-center text-gray-700">
                  <Clock size={14} className="mr-1.5 text-gray-500" />
                  <span className="text-gray-600">Delivery Date:</span>
                  <span className="ml-1 font-medium">{formatDate(order.deliveryDate)}</span>
                </p>
                <p className="text-sm flex items-center text-gray-700">
                  <CreditCard size={14} className="mr-1.5 text-gray-500" />
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="ml-1 font-medium capitalize">{order.paymentMethod}</span>
                </p>
                {order.notes && (
                  <div className="text-sm mt-2">
                    <span className="text-gray-600">Notes:</span>
                    <p className="mt-1 text-gray-700 bg-white p-2 rounded border border-blue-100">
                      {order.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            <h4 className="font-medium text-gray-900 p-4 bg-gray-50 border-b border-gray-200">
              Order Items
            </h4>
            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <div key={index} className="p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{item.product.name}</h5>
                    <p className="text-sm text-gray-500 capitalize">{item.product.category}</p>
                    {item.notes && (
                      <p className="text-sm text-gray-500 mt-1">{item.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-8">
                      <span className="block text-gray-700">${item.product.price.toFixed(2)} each</span>
                      <span className="block text-sm text-gray-500">x{item.quantity}</span>
                    </div>
                    <div className="text-right font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
              <div className="font-medium text-lg">
                Total: <span className="text-amber-800">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {nextStatus && (
              <Button 
                variant="primary"
                onClick={() => {
                  onUpdateStatus(order.id, nextStatus.status);
                  onClose();
                }}
              >
                {nextStatus.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};