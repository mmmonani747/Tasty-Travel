// BookTable.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import '../css/BookTable.css';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('your-stripe-publishable-key');

function BookTable() {
    const [timeSlot, setTimeSlot] = useState('');
    const [meal, setMeal] = useState('Lunch');
    const [date, setDate] = useState('Today');
    const [numGuests, setNumGuests] = useState(1);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [availableTables, setAvailableTables] = useState([1, 2, 3]);
    
    const handlePayment = async () => {
        // Calculate amount based on guests or any other criteria
        const amount = numGuests * 1000; // $10 per guest, adjust as needed

        // Request payment intent from backend
        const response = await fetch('http://localhost:3001/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount }),
        });
        
        const { clientSecret } = await response.json();

        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            clientReferenceId: `booking_${Date.now()}`, // Unique ID for the booking
            lineItems: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Table Booking for ${numGuests} Guests`,
                            description: `${meal} on ${date} at ${timeSlot}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/cancel`,
        });

        if (error) {
            console.error("Stripe Checkout Error:", error.message);
        }
    };

    return (
        <div className="full-page-center">
            <div className="book-table-container">
                <h2 className="title">Book a Table</h2>

                <div className="select-group">
                    <label className="guest-label">Select Number of Guests:</label>
                    <select
                        value={numGuests}
                        onChange={(e) => setNumGuests(e.target.value)}
                        className="guest-select"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                                {num} Guest{num > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="select-group">
                    <label>Select Date:</label>
                    <div className="date-options">
                        <button
                            className={`date-btn ${date === 'Today' ? 'active' : ''}`}
                            onClick={() => setDate('Today')}
                        >
                            Today
                        </button>
                        <button
                            className={`date-btn ${date === 'Tomorrow' ? 'active' : ''}`}
                            onClick={() => setDate('Tomorrow')}
                        >
                            Tomorrow
                        </button>
                        <button
                            className={`date-btn ${date === 'Saturday' ? 'active' : ''}`}
                            onClick={() => setDate('Saturday')}
                        >
                            Saturday
                        </button>
                    </div>
                </div>

                <div className="select-group">
                    <label>Select Meal:</label>
                    <div className="meal-options">
                        <button
                            className={`meal-btn ${meal === 'Lunch' ? 'active' : ''}`}
                            onClick={() => { setMeal('Lunch'); setTimeSlot(''); }}
                        >
                            Lunch
                        </button>
                        <button
                            className={`meal-btn ${meal === 'Dinner' ? 'active' : ''}`}
                            onClick={() => { setMeal('Dinner'); setTimeSlot(''); }}
                        >
                            Dinner
                        </button>
                    </div>
                </div>

                <div className="select-group">
                    <label>Select Time Slot:</label>
                    <div className="time-options">
                        {['12:00 PM', '12:15 PM', '12:30 PM', '1:00 PM', '6:00 PM', '6:30 PM', '7:00 PM'].map((slot) => (
                            <button
                                key={slot}
                                className={`time-btn ${timeSlot === slot ? 'active' : ''}`}
                                onClick={() => setTimeSlot(slot)}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="proceed-btn" onClick={handlePayment}>
                    Proceed to Payment
                </button>

                {bookingSuccess && (
                    <div className="alert-success">
                        Booking Successful! Available Tables: {availableTables.join(', ')}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookTable;
