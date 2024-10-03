import React from 'react';

function HomePage() {
  return (
    <div className="homepage" >
      <header className="header">
        <div className="logo">
          <img src="images/icon.png" alt="Logo" />
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/createuser">Sign Up</a></li>
          </ul>
        </nav>
        <form className="search-form">
          <input type="search" placeholder="Search" />
          <button type="submit">Search</button>
        </form>
      </header>

      <section className="hero">
        <img src="images/istockphoto-1457979959-1024x1024.jpg" alt="Hero Image" />
        <div className="hero-content">
          <h1>Find The Real Taste</h1>
          <p>Platform where you find the taste that matches with your expectations.</p>
          <button>Contact Us</button>
        </div>
        <div className="services">
          <div className="service">
            <img src="images/ilbzgbfY7truGAjoy6cwj6+V6WHzYw720Z0agdqLwmWw9qGJuDZsx60vUHL86SsL70xLlh6bJOyOHnGjtfdBlpAw=.jpeg" alt="Cooking Coaching" />
            <h4>Cooking Coaching</h4>
          </div>
          {/* Other services */}
        </div>
      </section>

      <section className="restaurants">
        <h2>Restaurants Near You</h2>
        <ul className="restaurant-list">
          <li>
            <img src="images/download.jpeg" alt="Restaurant 1" />
            <h4>Restaurant 1</h4>
          </li>
          {/* Other restaurants */}
        </ul>
        <p>Images from Freepik</p>
      </section>

      <section className="nutrition">
        <h2>Here's How Our Nutrition Works</h2>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
        <div className="nutrition-steps">
          <div className="step">
            <h4>Schedule an appointment</h4>
            <p>Sample text.</p>
            <button>More</button>
          </div>
          {/* Other steps */}
        </div>
      </section>

      <footer className="footer">
        <p>Tasty Travel 2024 Copyright</p>
      </footer>
    </div>
  );
}

export default HomePage;