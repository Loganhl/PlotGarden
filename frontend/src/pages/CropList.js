import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SelectCropsPage(){
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/plants')
            .then(response => {
                setPlants(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the garden data!", error)
        });
    }, []);


    return(
        <div>
            <h1>Select Crops</h1>
            <ul>
                {plants.map(plant => (
                    <li key={plant.id}>
                        <Link to={`/crop/${plant.id}`}>{plant.common_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SelectCropsPage;