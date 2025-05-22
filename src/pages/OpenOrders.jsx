import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OpenOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders?status=open');
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-8 bg-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Open Orders</h1>
      <ul>
        {orders.map((order, idx) => (
          <li key={idx} className="mb-2 p-4 bg-white rounded shadow">
            <strong>{order.name}</strong>: {order.items.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpenOrders;