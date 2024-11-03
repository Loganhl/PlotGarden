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
        <div className="background">
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
                            {plant.cycle && <li>Cycle: {plant.cycle}</li>}
                            {plant.watering && <li>Watering: {plant.watering}</li>}
                            {plant.watering_period && <li>Watering Period: {plant.watering_period}</li>}
                            {plant.watering_general_benchmark && <li>Watering Benchmark: {plant.watering_general_benchmark}</li>}
                            {plant.sunlight && <li>Sunlight Requirements: {plant.sunlight}</li>}
                            {plant.hardiness && <li>Hardiness Zone: {plant.hardiness}</li>}
                            {plant.attracts && <li>Attracts: {plant.attracts}</li>}
                            {plant.propagation && <li>Propagation: {plant.propagation}</li>}
                            {plant.flowers !== undefined && <li>Flowers: {plant.flowers ? 'Yes' : 'No'}</li>}
                            {plant.flowering_season && <li>Flowering Season: {plant.flowering_season}</li>}
                            {plant.soil && <li>Soil: {plant.soil}</li>}
                            {plant.fruits !== undefined && <li>Fruits: {plant.fruits ? 'Yes' : 'No'}</li>}
                            {plant.edible_fruit !== undefined && <li>Edible Fruits: {plant.edible_fruit ? 'Yes' : 'No'}</li>}
                            {plant.harvest_season && <li>Harvest Season: {plant.harvest_season}</li>}
                            {plant.leaf !== undefined && <li>Leaf: {plant.leaf ? 'Yes' : 'No'}</li>}
                            {plant.edible_leaf !== undefined && <li>Edible Leaf: {plant.edible_leaf ? 'Yes' : 'No'}</li>}
                            {plant.growth_rate && <li>Growth Rate: {plant.growth_rate}</li>}
                            {plant.maintenance && <li>Maintenance: {plant.maintenance}</li>}
                            {plant.poisonous_to_pets !== undefined && <li>Poisonous to Pets: {plant.poisonous_to_pets ? 'Yes' : 'No'}</li>}
                            {plant.care_level && <li>Care Level: {plant.care_level}</li>}
                        </ul>
                    </div>
                </div>
                <div className = "description-container">
                    <h4>Description: </h4>
                    <p>{plant.description}</p>
                </div>
            </div>
        </div>
    );
}

export default CropPage;