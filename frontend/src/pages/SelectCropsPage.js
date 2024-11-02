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

    //Star
    let matching_plants = [410, 663, 665, 667, 671, 682, 685, 688, 689, 691, 693, 694, 697, 862, 958, 978, 984, 1026, 1144, 1273, 1316, 1320, 1321, 1324, 1325, 1327, 1328, 1332, 1333, 1605, 1836, 1885, 2098, 2251, 2252, 2255, 2795, 3013, 3062, 8065];

    //Square
    let recommended_crops = [693, 862, 978, 984, 1144, 1596, 1598, 1599, 1602, 1836, 2098, 2280, 2795, 3234, 3387, 5535, 6539, 6963, 7109, 7405];

    //Maintenance Level
    let maintain_categories = {
        'Low': [682, 685, 688, 689, 691, 693, 694, 731, 958, 1026, 1273, 1316, 1320, 1321, 1324, 1325, 1327, 1328, 1595, 1598, 1602, 1605, 1836, 2098, 2283, 3387, 4302, 5498, 5533, 5535, 6236, 7833, 7843, 8489], 
        'Moderate': [410, 663, 665, 667, 671, 697, 862, 978, 984, 1144, 1332, 1333, 1596, 1599, 1600, 1885, 2251, 2252, 2280, 2795, 3234, 4463, 4626, 5021, 5022, 5023, 5024, 5841, 6169, 6539, 6766, 6950, 6952, 6963, 7109, 7405, 7409, 8039, 8062, 8065, 8658], 
        'High': [791, 2255, 3013, 3024, 3025, 8759]
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/plants')
            .then(response => {
                setPlants(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the garden data!", error)
        });
    }, []);

    console.log(plants);
    

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
                        
                        {matching_plants.includes(parseInt(`${plant.id}`)) && 
                            <img src={star} height={10} width={10} />
                        }
                        
                        {recommended_crops.includes(parseInt(`${plant.id}`)) && 
                            <img src={square} height={10} width={10} />
                        }

                        {maintain_categories['Low'].includes(parseInt(`${plant.id}`)) && 
                            <img src={circle1} height={10} width={10} />
                        }

                        {maintain_categories['Moderate'].includes(parseInt(`${plant.id}`)) && 
                            <img src={circle2} height={10} width={10} />
                        }

                        {maintain_categories['High'].includes(parseInt(`${plant.id}`)) && 
                            <img src={circle3} height={10} width={10} />
                        }

                    </li>
                ))
                }
            </ul>

            <div>
                Symbol Legend
            
                <div>
                    <img src={square} height={10} width={10} />
                    <inline>Matches Garden Size</inline>
                </div>
                <div>
                     <img src={star} height={10} width={10} />
                    <inline>Matches Region</inline>
                </div>
                <div>
                     <img src={circle1} height={10} width={10} />
                    <inline>Low Maintenance Level</inline>
                </div>
                <div>
                     <img src={circle2} height={10} width={10} />
                    <inline>Medium Maintenance Level</inline>
                </div>
                <div>
                     <img src={circle3} height={10} width={10} />
                    <inline>High Maintenance Level</inline>
                </div>
            </div>
        </div>
    )
}

export default SelectCropsPage;