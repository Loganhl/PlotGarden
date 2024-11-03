import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const placeholderImage = "/logo.png"

function GardensPage() {
    const [gardens, setGardens] = useState([]);
    const { user, isLoading } = useAuth0();

    useEffect(() => {
        let isMounted = true;
    
        const fetchGardens = async () => {
            if (!isLoading && user) {
                const user_id = user.sub.slice(-9);
                console.log("Fetching gardens for user_id:", user_id);
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/api/gardens/${user_id}`);
                    if (isMounted) {
                        setGardens(response.data);
                    }
                } catch (error) {
                    if (isMounted) {
                        console.error("There was an error fetching the garden data!", error);
                    }
                }
            }
        };
    
        fetchGardens();
    
        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, [user, isLoading]);
    
    const GardenCard = ({ garden }) => {
        return (
            <div className="garden-card">
                <Link to={`/garden/${garden.garden_id}`} style={{ textDecoration: 'none' }}>
                    <img src={garden.image_link || placeholderImage} alt="Garden Image" />
                    <h3 className="garden-name">{garden.garden_name}</h3>
                </Link>
            </div>
        );
    };

    return(
        <div className="garden-grid">
            <Link to="/add-garden" className="add-garden-card" style={{ textDecoration: 'none' }}>
                <div>
                    <h2>+</h2>
                    <h3>Add New Garden</h3>
                </div>
            </Link>

            {gardens.map(garden => (
                <GardenCard key={garden.garden_id} garden={garden} />
            ))}
        </div>
    )
}

export default GardensPage; 