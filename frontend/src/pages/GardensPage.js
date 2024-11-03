import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

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

    const handleAddGarden = () => {
        console.log("Add garden")
    };
    console.log(gardens);

    return(
        <div>
            <h1>Gardens</h1>
            {gardens.length > 0 ? (
                <ul>
                    {gardens.map(garden => (
                        <li key={garden.garden_id}>
                            <img src={garden.image_link} alt="garden image" />
                            <h2>{garden.garden_name}</h2>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No gardens found.</p>
            )}
        </div>
    )
}

export default GardensPage; 