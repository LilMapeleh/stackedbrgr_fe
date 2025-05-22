import React, { useEffect, useState } from 'react';

const MyOpenOrders = () => {
  const [orders, setOrders] = useState([]);
  const name = localStorage.getItem('userName');

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const myOrders = storedOrders.filter(order => order.name === name && order.status === 'open');
    setOrders(myOrders);
  }, [name]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Open Orders</h1>
      {orders.length === 0 ? (
        <p>No open orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="bg-white p-4 rounded shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Burgers:</strong> {order.items.join(', ')}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOpenOrders;
