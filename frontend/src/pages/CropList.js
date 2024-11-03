import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const placeholderImage = "/logo.png"

function SelectCropsPage(){
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/plants')
            .then(response => {
                setPlants(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the plant data!", error)
        });
    }, []);


    return(
        <div className="background">
            <h1 className="title">Plant Library</h1>
            <div className="plant-grid">
                {plants.map(plant => (
                    <div key={plant.id} className="plant-card">
                            <Link to={`/crop/${plant.id}`} style={{textDecoration: 'none'}}>
                                <img
                                    src={plant.default_image || placeholderImage}
                                    alt={plant.common_name}
                                    className="plant-image" />

                                <p className="plant-name">{plant.common_name}</p>
                            </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectCropsPage;