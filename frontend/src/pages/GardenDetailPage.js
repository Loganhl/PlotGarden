import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GardenDetailPage(){
    const { id } = useParams();
    const [garden, setGarden] = useState(null);
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGarden = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/garden/${id}`)
                if (!response.ok) {
                    throw new Error('Garden not found');
                }
                const data = await response.json();
                setGarden(data);

                await fetchCrops(data.garden_id);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchCrops = async (gardenId) => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/crops/${gardenId}`);
                if (!response.ok) {
                    throw new Error('Crops not found');
                }
                const data = await response.json();
                setCrops(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        }

        fetchGarden();


    }, [id]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    const uniqueCrops = [...new Set(crops.map(crop => crop.crop_name))];

    return(
        <div>
            <h1>{garden.garden_name}</h1>

            <h2>Crops</h2>
            <div>
                <ul>
                    {uniqueCrops.length > 0 ? (
                        uniqueCrops.map(cropName => (
                            <li key={cropName}>{cropName}</li>
                        ))
                    ) : (
                        <li>No crops found.</li>
                    )}
                </ul>
            </div>
            <div>
                
            </div>
            <div>
                <p>{garden.description}</p>
                <p></p>
            </div>
        </div>
    )
}

export default GardenDetailPage;