import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function OrderDetails() {
    const [userLocation, setUserLocation] = useState({ lat: 28.7041, lng: 77.1025 }); // Fallback location
    const [restaurantLocation] = useState({ lat: 28.6139, lng: 77.2090 });
    const [directions, setDirections] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        // Fetch user's saved location from the backend
        const fetchUserLocation = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/location', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setUserLocation(response.data.location);
            } catch (error) {
                console.error("Error fetching user location:", error);
            }
        };

        fetchUserLocation();
        loadGoogleMapsScript();
    }, []);

    const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
        script.async = true;
        document.body.appendChild(script);
        window.initMap = initMap;
    };

    const initMap = () => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: userLocation,
            zoom: 13,
        });

        new window.google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Your Location',
        });

        new window.google.maps.Marker({
            position: restaurantLocation,
            map: map,
            title: 'Restaurant Location',
        });

        fetchDirections(map);
    };

    const fetchDirections = async (map) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.lat},${userLocation.lng}&destination=${restaurantLocation.lat},${restaurantLocation.lng}&key=YOUR_GOOGLE_MAPS_API_KEY`);
            const route = response.data.routes[0].legs[0];
            setDirections(route);

            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(response.data);
        } catch (error) {
            console.error("Error fetching directions: ", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Order Confirmed!</h1>
            <div className="map-container mt-5">
                <h3>Path to Restaurant:</h3>
                <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
                {directions && (
                    <div className="mt-3">
                        <h4>Distance: {directions.distance.text}</h4>
                        <h4>Duration: {directions.duration.text}</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderDetails;
