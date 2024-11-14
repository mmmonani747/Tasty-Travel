import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/Body.css';
import img from '../assets/body.jpg';
import Card from './Card';

// Sample restaurant data with real image URLs (from Google)
const restaurants = [
  {
    name: 'Manek Chowk',
    description: 'A popular street food market in Ahmedabad, known for its local delicacies.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Manek_Chowk_-_Ahmedabad_%28cropped%29.jpg/640px-Manek_Chowk_-_Ahmedabad_%28cropped%29.jpg',
    orderLink: '/order',
    bookTableLink: '/booktable'
  },
  {
    name: 'Agashiye',
    description: 'A traditional Gujarati restaurant offering a fine dining experience.',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/10/45/30/ea/agashiye-the-heritage-restaurant.jpg',
    orderLink: '/order',
    bookTableLink: '/booktable'
  },
  {
    name: 'The Green House',
    description: 'A vegetarian restaurant offering organic and healthy food options.',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/16/94/26/d7/the-green-house.jpg',
    orderLink: '/order',
    bookTableLink: '/booktable'
  },
  {
    name: 'Law Garden Food Street',
    description: 'Known for its vibrant food stalls and local treats.',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/10/f2/9f/22/law-garden-food-street.jpg',
    orderLink: '/order',
    bookTableLink: '/booktable'
  },
  {
    name: 'Patang Restaurant',
    description: 'Famous rooftop restaurant with a great view of city.',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/17/50/4b/26/patang-restaurant.jpg',
    orderLink: '/order',
    bookTableLink: '/booktable'
  },
  {
    name: 'Bhadra Fort Food Market',
    description: 'A food market with traditional dishes and street food.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bhadra_Fort_Ahmedabad.jpg/640px-Bhadra_Fort_Ahmedabad.jpg',
    orderLink: '/order',
    bookTableLink: '/booktable'
  }
];

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);
  const [textAnimate, setTextAnimate] = useState(false);
  const [restaurantsAnimate, setRestaurantsAnimate] = useState(false);
  const textRef = useRef(null);
  const restaurantsRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  useEffect(() => {
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTextAnimate(true);
          } else {
            setTextAnimate(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      textObserver.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        textObserver.unobserve(textRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRestaurantsAnimate(true);
          } else {
            setRestaurantsAnimate(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (restaurantsRef.current) {
      observer.observe(restaurantsRef.current);
    }

    return () => {
      if (restaurantsRef.current) {
        observer.unobserve(restaurantsRef.current);
      }
    };
  }, []);

  // Function to handle "Contact Us" button click
  const handleContactClick = () => {
    navigate('/Contact'); // Redirect to the Contact page
  };

  // Function to handle "Restaurants Near You" button click
  const handleRestaurantClick = () => {
    navigate('/restaurantlist'); // Redirect to the Restaurant List page
  };

  return (
    <div>
      <section
        className={`hero-section ${animate ? 'animate' : ''}`}
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="overlay">
          <div className={`content ${textAnimate ? 'text-animate' : ''}`} ref={textRef}>
            <h1 className="title">Find The Real Taste.</h1>
            <p className="subtitle">
              Platform where you find the taste that matches with your expectations.
            </p>
            <button className="contact-btn" onClick={handleContactClick}>Contact Us</button>
          </div>
        </div>
      </section>

      <section
        className={`restaurants-section ${restaurantsAnimate ? 'restaurants-section-animate' : ''}`}
        ref={restaurantsRef}
      >
        <h2 className="section-title">Explore Famous Restaurants in Ahmedabad</h2>
        <button className="restaurants-btn" onClick={handleRestaurantClick}>
          View Restaurants Near You
        </button>
        <div className="container">
          <div className="row">
            {restaurants.map((restaurant, index) => (
              <Card
                key={index}
                name={restaurant.name}
                description={restaurant.description}
                imageUrl={restaurant.imageUrl}
                orderLink={restaurant.orderLink}
                bookTableLink={restaurant.bookTableLink}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
