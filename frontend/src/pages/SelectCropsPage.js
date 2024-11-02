import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SelectCropsPage(){
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        console.log("useEffect is running");
        axios.get('http://127.0.0.1:5000/api/plants')
            .then(response => {
                console.log(response.data);
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
                    <li key={plant.id}>{plant.common_name}</li>
                ))}
            </ul>
        </div>
    )
}

export default SelectCropsPage;