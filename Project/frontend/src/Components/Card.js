import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Card.css';

function Card({ name, description, imageUrl, orderLink, bookTableLink }) {
    return (
        <div className="col-md-4 mb-4"> {/* Updated to use col-md-4 for 3 cards per row */}
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <a href={orderLink} className="btnn btn-primary">Order Now</a>
                    <a href={bookTableLink} className="btnn btn-secondary">Book Table</a>
                </div>
            </div>
        </div>
    );
}

export default Card;
