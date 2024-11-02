import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CropPage() {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/crop/${id}`);
                if (!response.ok) {
                    throw new Error('Plant not found');
                }
                const data = await response.json();
                setPlant(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlant();
    }, [id]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="plant-container">
            <div className="name-container">
                <h1>{plant.common_name}</h1>
                <h2>{plant.scientific_name}</h2>
            </div>
            <div className = "content-container">
                <div className="image-container">
                    <img src={plant.default_image} alt={plant.common_name} />
                </div>
                <div className = "info-container">
                    <ul>
                        <li>Cycle: {plant.cycle}</li>
                    </ul>
                </div>
            </div>
            <div className = "description-container">
                <h4>Description: </h4>
                <p>{plant.description}</p>
            </div>
            </div>

    );
}

export default CropPage;