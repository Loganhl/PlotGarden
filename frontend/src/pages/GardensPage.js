import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function GardensPage() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [gardens, setGardens] = useState([]);
    const [loading, setLoading] = useState(true); // To manage loading state

    useEffect(() => {
        const fetchGardens = async () => {
            if (isAuthenticated && user) {
                setLoading(true);
                try {
                    const token = await getAccessTokenSilently();
                    const response = await fetch(`/api/gardens?userId=${user.sub}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    setGardens(data);
                } catch (error) {
                    console.error("Error fetching gardens:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchGardens();
    }, [isAuthenticated, user, getAccessTokenSilently]);

    const handleAddGarden = () => {
        console.log("Add garden")
    };

    return(
        <div>
            <h1>Gardens</h1>
            {isAuthenticated ? (
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {gardens.length > 0 ? (
                            gardens.map((garden) => (
                                <div key={garden.id} className="garden-card">
                                    <h2>Garden ID: {garden.id}</h2>
                                    <p>Name: {garden.name}</p>
                                </div>
                            ))
                        ) : (
                            <p>No gardens found</p>
                        )}
                        <button onClick={handleAddGarden}>Add Garden</button>
                    </div>
                )
            ) : (
                <p>Please log in to view your gardens.</p>
            )}
        </div>
    )
}

export default GardensPage; 