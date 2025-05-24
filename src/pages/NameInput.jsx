import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NameInput = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name.trim()) return;
    localStorage.setItem('userName', name);
    navigate('/menu');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Stacked's Burgers</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border p-2 mb-4 rounded"
      />
      <button onClick={handleSubmit} className="bg-red-500 text-white px-4 py-2 rounded">
        Start Order
      </button>
    </div>
  );
};

export default NameInput;