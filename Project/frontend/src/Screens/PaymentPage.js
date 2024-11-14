import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import '../css/PaymentPage.css';

function PaymentPage() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [paymentError, setPaymentError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const { meal, date, timeSlot, numGuests, paymentMethod } = JSON.parse(localStorage.getItem('bookingDetails'));
        
        setIsProcessing(true);

        // Assuming you already have a backend setup to create payment intent
        const response = await fetch('http://localhost:3001/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 5000 }), // Example amount in cents ($50.00)
        });

        const { clientSecret } = await response.json();

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        setIsProcessing(false);

        if (error) {
            setPaymentError(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            navigate('/confirm-booking');
        }
    };

    return (
        <div className="payment-container">
            <h2>Enter Credit Card Details</h2>

            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={isProcessing || !stripe} className="payment-btn">
                    {isProcessing ? 'Processing...' : 'Confirm Payment'}
                </button>
            </form>

            {paymentError && <div className="error-message">{paymentError}</div>}
        </div>
    );
}

export default PaymentPage;
