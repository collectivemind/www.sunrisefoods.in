import { 
  ShoppingBag, 
  Clipboard, 
  Users, 
  Settings, 
  TrendingUp, 
  CakeSlice,
  Truck,
  Calendar
} from 'lucide-react';
import React from 'react';

export const menuItems = [
  {
    label: 'Dashboard',
    icon: <TrendingUp size={20} />,
    path: '/dashboard',
  },
  {
    label: 'Orders',
    icon: <ShoppingBag size={20} />,
    path: '/orders',
    badge: 3,
  },
  {
    label: 'Products',
    icon: <CakeSlice size={20} />,
    path: '/products',
  },
  {
    label: 'Customers',
    icon: <Users size={20} />,
    path: '/customers',
  },
  {
    label: 'Production',
    icon: <Clipboard size={20} />,
    path: '/production',
  },
  {
    label: 'Deliveries',
    icon: <Truck size={20} />,
    path: '/deliveries',
  },
  {
    label: 'Schedule',
    icon: <Calendar size={20} />,
    path: '/schedule',
  },
  {
    label: 'Settings',
    icon: <Settings size={20} />,
    path: '/settings',
  },
];