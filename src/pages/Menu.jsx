import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Menu = () => {
  const [selectedBurger, setSelectedBurger] = useState('Classic Burger');
  const navigate = useNavigate();
  const name = localStorage.getItem('userName');

  const handleOrder = async () => {
    const newOrder = {
      id: uuidv4(),
      name,
      items: [selectedBurger],
      status: 'open',
      createdAt: new Date().toISOString()
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Send order to backend
    try {
        const response = await fetch('http://127.0.0.1:5000/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
          });

      if (!response.ok) {
        throw new Error('Failed to send order');
      }

      const result = await response.json();
      console.log('Server response:', result);

      // Navigate after successful post
      navigate('/myorders');
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <h1 className="text-2xl font-bold mb-4">Hi {name}, select your burger:</h1>
      <select
        className="p-2 border rounded mb-4"
        value={selectedBurger}
        onChange={(e) => setSelectedBurger(e.target.value)}
      >
        <option>Classic Burger</option>
        <option>Cheese Burger</option>
        <option>Veggie Burger</option>
        <option>Spicy Chicken Burger</option>
      </select>
      <button onClick={handleOrder} className="bg-green-500 text-white px-4 py-2 rounded">
        Checkout
      </button>
    </div>
  );
};

export default Menu;
