import React, { useEffect } from 'react';
import '../css/ReviewForm.css'; // Ensure this path is correct

function ReviewForm() {
  useEffect(() => {
    const handleScroll = () => {
      const leftSection = document.querySelector('.review-left');
      const rightSection = document.querySelector('.review-right');

      if (!leftSection || !rightSection) return;

      const triggerHeight = window.innerHeight / 1.2;

      const leftTop = leftSection.getBoundingClientRect().top;
      const rightTop = rightSection.getBoundingClientRect().top;

      if (leftTop < triggerHeight) {
        leftSection.classList.add('animate-left');
      } else {
        leftSection.classList.remove('animate-left');
      }

      if (rightTop < triggerHeight) {
        rightSection.classList.add('animate-right');
      } else {
        rightSection.classList.remove('animate-right');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="review-section">
      <div className="divider" />
      <div className="review-container">
        <div className="review-left">
          <img className="review-image" src="path_to_your_image.png" alt="Reviewer" />
          <h2>Give us your invaluable Review.</h2>
          <p>Your feedback helps us improve our services and serve you better.</p>
        </div>
        <div className="review-right">
          <form className="review-form">
            <div>
              <label>First Name</label>
              <input type="text" placeholder="Enter your First Name" />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" placeholder="Enter your Last Name" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" placeholder="Enter a valid email address" />
            </div>
            <div>
              <label>Phone</label>
              <input type="tel" placeholder="Enter your phone (e.g. +14155552675)" />
            </div>
            <div>
              <label>Message</label>
              <textarea placeholder="Enter your message"></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReviewForm;
