import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import square from '../assets/square.png';
import star from '../assets/star.png'
import circle1 from '../assets/circle-1.png'
import circle2 from '../assets/circle-2.png'
import circle3 from '../assets/circle-3.png'


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
                        <label>
                            <input type="checkbox"></input>
                            <Link to={`/crop/${plant.id}`}>{plant.common_name}</Link>
                        </label>
                        <img src={square} height={10} width={10} />
                        <img src={star} height={10} width={10} />
                        <img src={circle1} height={10} width={10} />

                    </li>
                ))}
            </ul>

            <div>
                Symbol Legend
            
                <div>
                    <img src={square} height={10} width={10} />
                    <inline>Matches Garden Size</inline>
                </div>
                <div>
                     <img src={star} height={10} width={10} />
                </div>
                <div>
                     <img src={circle1} height={10} width={10} />
                </div>
            </div>
        </div>
    )
}

export default SelectCropsPage;