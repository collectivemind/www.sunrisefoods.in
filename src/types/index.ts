export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface BreadProduct {
  id: string;
  name: string;
  price: number;
  category: 'loaf' | 'roll' | 'pastry' | 'specialty';
  imageUrl?: string;
}

export interface OrderItem {
  product: BreadProduct;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  deliveryDate: string;
  total: number;
  paymentMethod: 'card' | 'cash' | 'online';
  notes?: string;
}

export interface OrderFilter {
  status: OrderStatus | 'all';
  dateRange: {
    start: string | null;
    end: string | null;
  };
  searchQuery: string;
  productCategory: string | null;
}