import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Footer.css';

function Footer() {
    return (
        <footer className="footer py-4 bg-light border-top">
            <div className="container">
                {/* Separation Line */}
                <hr className="footer-line" />
                
                {/* Footer Content */}
                <div className="d-flex justify-content-between align-items-center footer-content">
                    <span className="text-muted">© 2024 Tasty Travel, Inc</span>
                    <div>
                        <a href="/about" className="me-3">About Us</a>
                        <a href="/contact" className="me-3">Contact</a>
                        <a href="/ReviewForm" className="me-3">Feedback</a>
                    </div>
                    <div>
                        <a href="https://facebook.com" className="me-2" aria-label="Facebook">
                            <i className="ri-facebook-fill"></i>
                        </a>
                        <a href="https://twitter.com" className="me-2" aria-label="Twitter">
                            <i className="ri-twitter-fill"></i>
                        </a>
                        <a href="https://www.instagram.com/traveltastyy/" className="me-2" aria-label="Instagram">
                            <i className="ri-instagram-fill"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
