import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { orders } from '../../data/orders';
import { Badge } from '../ui/Badge';

export const Dashboard: React.FC = () => {
  // Calculate metrics from orders
  const todayOrders = orders.filter(order => 
    new Date(order.createdAt).toDateString() === new Date().toDateString()
  );
  
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);
  
  // Get recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <TrendingUp size={24} className="mr-2 text-amber-700" />
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Overview of your Sunrise Foods operations</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated:</span>
          <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-green-600 flex items-center text-sm font-medium">
              +12.5%
              <ArrowUpRight size={16} className="ml-1" />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">{todayOrders.length}</h3>
          <p className="text-gray-600 text-sm">Today's Orders</p>
        </div>

        {/* Pending Production */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-red-600 flex items-center text-sm font-medium">
              +18.2%
              <ArrowUpRight size={16} className="ml-1" />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">
            {pendingOrders.length + preparingOrders.length}
          </h3>
          <p className="text-gray-600 text-sm">Pending Production</p>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-green-600 flex items-center text-sm font-medium">
              +8.1%
              <ArrowUpRight size={16} className="ml-1" />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">
            ${todayRevenue.toFixed(2)}
          </h3>
          <p className="text-gray-600 text-sm">Today's Revenue</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-red-600 flex items-center text-sm font-medium">
              -2.3%
              <ArrowDownRight size={16} className="ml-1" />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">
            ${totalRevenue.toFixed(2)}
          </h3>
          <p className="text-gray-600 text-sm">Total Revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link 
                to="/orders" 
                className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center"
              >
                View All
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <Badge status={order.status} />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.customer.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Production Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Production Status</h2>
              <Link 
                to="/production" 
                className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center"
              >
                View Details
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Sourdough Production */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Sourdough Loaves</span>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              {/* Ciabatta Production */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Ciabatta Rolls</span>
                  <span className="text-sm text-gray-600">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              {/* Croissants Production */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Croissants</span>
                  <span className="text-sm text-gray-600">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              {/* Alerts Section */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Production Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-amber-700 bg-amber-50 p-3 rounded-lg">
                    <AlertTriangle size={18} className="mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Low Inventory Alert</p>
                      <p className="text-sm">Wheat flour stock below 20%</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-blue-700 bg-blue-50 p-3 rounded-lg">
                    <Clock size={18} className="mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Maintenance Scheduled</p>
                      <p className="text-sm">Oven 2 maintenance at 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};