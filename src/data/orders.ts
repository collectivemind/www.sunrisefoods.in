import { Order } from '../types';

// Helper to create ISO date strings for the past X days
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// Helper to create delivery dates in the future
const daysFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const orders: Order[] = [
  {
    id: 'ORD-2023-001',
    customer: {
      id: 'CUST-001',
      name: 'Cafe Morning Brew',
      email: 'orders@morningbrew.com',
      phone: '(555) 123-4567'
    },
    items: [
      {
        product: {
          id: 'PRD-001',
          name: 'Sourdough Loaf',
          price: 6.50,
          category: 'loaf'
        },
        quantity: 20
      },
      {
        product: {
          id: 'PRD-002',
          name: 'Ciabatta Rolls',
          price: 4.25,
          category: 'roll'
        },
        quantity: 30
      }
    ],
    status: 'pending',
    createdAt: daysAgo(0),
    deliveryDate: daysFromNow(1),
    total: 257.50,
    paymentMethod: 'card',
    notes: 'Please deliver before 7 AM'
  },
  {
    id: 'ORD-2023-002',
    customer: {
      id: 'CUST-002',
      name: 'Harmony Bistro',
      email: 'kitchen@harmonybistro.com',
      phone: '(555) 234-5678'
    },
    items: [
      {
        product: {
          id: 'PRD-003',
          name: 'Whole Wheat Bread',
          price: 5.75,
          category: 'loaf'
        },
        quantity: 15
      },
      {
        product: {
          id: 'PRD-004',
          name: 'Croissants',
          price: 2.95,
          category: 'pastry'
        },
        quantity: 40
      }
    ],
    status: 'preparing',
    createdAt: daysAgo(1),
    deliveryDate: daysFromNow(1),
    total: 204.25,
    paymentMethod: 'online'
  },
  {
    id: 'ORD-2023-003',
    customer: {
      id: 'CUST-003',
      name: 'Green Market Grocery',
      email: 'orders@greenmarket.com',
      phone: '(555) 345-6789'
    },
    items: [
      {
        product: {
          id: 'PRD-005',
          name: 'Multigrain Loaf',
          price: 7.25,
          category: 'loaf'
        },
        quantity: 25
      },
      {
        product: {
          id: 'PRD-006',
          name: 'Baguettes',
          price: 3.50,
          category: 'specialty'
        },
        quantity: 30
      },
      {
        product: {
          id: 'PRD-007',
          name: 'Dinner Rolls',
          price: 4.00,
          category: 'roll'
        },
        quantity: 60
      }
    ],
    status: 'ready',
    createdAt: daysAgo(2),
    deliveryDate: daysFromNow(0),
    total: 501.25,
    paymentMethod: 'card'
  },
  {
    id: 'ORD-2023-004',
    customer: {
      id: 'CUST-004',
      name: 'Sunset Restaurant',
      email: 'chef@sunsetrestaurant.com',
      phone: '(555) 456-7890'
    },
    items: [
      {
        product: {
          id: 'PRD-008',
          name: 'Focaccia',
          price: 8.50,
          category: 'specialty'
        },
        quantity: 10
      },
      {
        product: {
          id: 'PRD-009',
          name: 'Brioche Buns',
          price: 5.25,
          category: 'roll'
        },
        quantity: 24
      }
    ],
    status: 'delivered',
    createdAt: daysAgo(3),
    deliveryDate: daysAgo(1),
    total: 211.00,
    paymentMethod: 'online'
  },
  {
    id: 'ORD-2023-005',
    customer: {
      id: 'CUST-005',
      name: 'Urban Eats Catering',
      email: 'events@urbaneats.com',
      phone: '(555) 567-8901'
    },
    items: [
      {
        product: {
          id: 'PRD-010',
          name: 'Rye Bread',
          price: 6.75,
          category: 'loaf'
        },
        quantity: 12
      },
      {
        product: {
          id: 'PRD-011',
          name: 'Pain au Chocolat',
          price: 3.25,
          category: 'pastry'
        },
        quantity: 50
      }
    ],
    status: 'cancelled',
    createdAt: daysAgo(4),
    deliveryDate: daysAgo(1),
    total: 243.50,
    paymentMethod: 'card',
    notes: 'Customer cancelled due to event reschedule'
  },
  {
    id: 'ORD-2023-006',
    customer: {
      id: 'CUST-006',
      name: 'Sunrise Hotel',
      email: 'kitchen@sunrisehotel.com',
      phone: '(555) 678-9012'
    },
    items: [
      {
        product: {
          id: 'PRD-012',
          name: 'French Bread',
          price: 4.95,
          category: 'loaf'
        },
        quantity: 35
      },
      {
        product: {
          id: 'PRD-013',
          name: 'Cinnamon Rolls',
          price: 3.75,
          category: 'pastry'
        },
        quantity: 40
      }
    ],
    status: 'pending',
    createdAt: daysAgo(0),
    deliveryDate: daysFromNow(2),
    total: 323.25,
    paymentMethod: 'online'
  },
  {
    id: 'ORD-2023-007',
    customer: {
      id: 'CUST-007',
      name: 'Fresh Start Deli',
      email: 'manager@freshstartdeli.com',
      phone: '(555) 789-0123'
    },
    items: [
      {
        product: {
          id: 'PRD-014',
          name: 'Sandwich Bread',
          price: 5.50,
          category: 'loaf'
        },
        quantity: 45
      }
    ],
    status: 'preparing',
    createdAt: daysAgo(1),
    deliveryDate: daysFromNow(1),
    total: 247.50,
    paymentMethod: 'card'
  },
  {
    id: 'ORD-2023-008',
    customer: {
      id: 'CUST-008',
      name: 'Corner Coffee Shop',
      email: 'orders@cornercoffee.com',
      phone: '(555) 890-1234'
    },
    items: [
      {
        product: {
          id: 'PRD-015',
          name: 'Blueberry Muffins',
          price: 3.50,
          category: 'pastry'
        },
        quantity: 60
      },
      {
        product: {
          id: 'PRD-016',
          name: 'Bagels',
          price: 2.75,
          category: 'roll'
        },
        quantity: 48
      }
    ],
    status: 'ready',
    createdAt: daysAgo(2),
    deliveryDate: daysFromNow(0),
    total: 342.00,
    paymentMethod: 'online'
  },
  {
    id: 'ORD-2023-009',
    customer: {
      id: 'CUST-009',
      name: 'Riverside Restaurant',
      email: 'chef@riversiderest.com',
      phone: '(555) 901-2345'
    },
    items: [
      {
        product: {
          id: 'PRD-017',
          name: 'Rustic Italian Loaf',
          price: 7.95,
          category: 'loaf'
        },
        quantity: 18
      },
      {
        product: {
          id: 'PRD-018',
          name: 'Pretzel Buns',
          price: 4.50,
          category: 'roll'
        },
        quantity: 30
      }
    ],
    status: 'delivered',
    createdAt: daysAgo(5),
    deliveryDate: daysAgo(2),
    total: 278.10,
    paymentMethod: 'card'
  },
  {
    id: 'ORD-2023-010',
    customer: {
      id: 'CUST-010',
      name: 'Community Center',
      email: 'events@communitycenter.org',
      phone: '(555) 012-3456'
    },
    items: [
      {
        product: {
          id: 'PRD-019',
          name: 'Challah',
          price: 8.25,
          category: 'specialty'
        },
        quantity: 10
      },
      {
        product: {
          id: 'PRD-020',
          name: 'Assorted Rolls',
          price: 5.00,
          category: 'roll'
        },
        quantity: 100
      }
    ],
    status: 'pending',
    createdAt: daysAgo(0),
    deliveryDate: daysFromNow(3),
    total: 582.50,
    paymentMethod: 'online',
    notes: 'For community fundraiser event'
  }
];