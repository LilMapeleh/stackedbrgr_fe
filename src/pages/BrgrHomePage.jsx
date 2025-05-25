import React from "react";
import './BrgrHomepage.css';
import heroImage from './burger-hero-image.png'; // adjust if path is different
import exampleBrgr from './brgrDisplay.jpg'; // adjust if path is different


const BurgerHomePage = () => {
  return (
    <div className="font-serif text-[#2f1b0c] bg-[#fcebd5]">
      {/* Header */}
      <header className="bg-[#2f1b0c] text-white flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold">Burger Haven</div>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Menu
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
        </nav>
        <a
          href="#"
          className="bg-[#a93e22] text-white px-4 py-2 rounded hover:bg-[#922f17]"
        >
          Order Online
        </a>
      </header>

      <img src={heroImage} alt="hero test" style={{ width: '100%', height: 'auto' }} />

      {/* Hero */}
      <div
        className="h-96 w-full flex items-center justify-center text-white text-4xl font-bold text-center"
        style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',             // THIS is key!
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#2f1b0c',
          }}
      >
      </div>
        {/* Menu + About Us Section (side by side) */}
        <section className="menu-about-wrapper">
        {/* Left Side: Menu and About */}
        <div className="menu-and-about">
            <div className="menu-section">
            <h2>Our Menu</h2>
            <div className="menu-item">
                <span>Classic Burger</span>
                <span>$8.99</span>
            </div>
            <div className="menu-item">
                <span>Cheeseburger</span>
                <span>$9.99</span>
            </div>
            <div className="menu-item">
                <span>Bacon Burger</span>
                <span>$10.99</span>
            </div>
            </div>

            <div className="about-section">
            <h2>About Us</h2>
            <p>
                Welcome to our burger haven! We pride ourselves on crafting the juiciest,
                most flavorful burgers using only the freshest ingredients.
            </p>
            <a href="#" className="find-us-button">FIND US</a>
            </div>
        </div>

        {/* Right Side: Image Only */}
        <div className="fries-image-container">
            <img src={exampleBrgr} alt="fries" className="about-image" />
        </div>
        </section>

      {/* Footer */}
      <footer className="bg-[#2f1b0c] text-white text-center py-10">
        <h2 className="text-2xl mb-4">Play a game while waiting!</h2>
        <a
            href="/play"
            className="inline-block bg-[#a93e22] px-4 py-2 rounded hover:bg-[#922f17] font-bold"
        >
            🍔 Play Ping Pong
        </a>
        </footer>
    </div>
  );
};

export default BurgerHomePage;
