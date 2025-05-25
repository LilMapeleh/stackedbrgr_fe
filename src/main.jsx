import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NameInput from './pages/NameInput';
import Menu from './pages/Menu';
import OpenOrders from './pages/OpenOrders';
import ChatInput from './pages/ChatInput';
import MyOpenOrders from './pages/MyOpenOrders';
import BurgerHomePage from './pages/BrgrHomePage';
import PlayPage from "./pages/PlayPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameInput />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<OpenOrders />} />
        <Route path="/myorders" element={<MyOpenOrders />} />
        <Route path="/stacked" element={<ChatInput />} />
        <Route path="/stackedbrgrs" element={<BurgerHomePage />} />
        <Route path="/play" element={<PlayPage />} />

      </Routes>
    </Router>
  );
}

export default App;
