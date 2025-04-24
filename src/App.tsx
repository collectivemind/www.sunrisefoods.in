import React from 'react';
import { Layout } from './components/Layout/Layout';
import { OrdersList } from './components/orders/OrdersList';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/dashboard/Dashboard';
import { Products } from './components/products/Products';
import { Customers } from './components/customers/Customers';
import { Production } from './components/production/Production';
import { Deliveries } from './components/deliveries/Deliveries';
import { Schedule } from './components/schedule/Schedule';
import { Settings } from './components/settings/Settings';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/production" element={<Production />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;