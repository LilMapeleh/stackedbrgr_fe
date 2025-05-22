// src/pages/ChatInput.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === 'navean') {
      navigate('/orders'); // Make sure this matches your route
    } else {
      alert('Incorrect input. Try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Enter Secret Code:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
          style={{ padding: '10px', width: '250px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
