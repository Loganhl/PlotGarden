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

    const [specifics, setSpecifics] = useState([]);

    const [selectedCrops, setSelectedCrops] = useState([]);

    const getPlants = () => {
        axios.get('http://127.0.0.1:5000/api/plants')
            .then(response => {
                setPlants(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the garden data!", error)
        });
    }

    const getSpecifics = () =>{
        axios.get('http://127.0.0.1:5000/api/present-plants/1')
        .then(response => {
            setSpecifics(response.data);
    })
    .catch(error => {
        console.error("There was an error fetching the specifics!", error)
    });
    }

    const handleCheckboxChange = (event) =>{
        const checkedId = event.target.value;
        console.log(checkedId);
        console.log(event.target.checked);


        setSelectedCrops(prevSelectedCrops => {
            if (event.target.checked) {
                // Add the new crop
                return [...prevSelectedCrops, checkedId];
            } else {
                // Remove the crop
                return prevSelectedCrops.filter(id => id !== checkedId);
            }
        });
    
        console.log(selectedCrops);
    }

    useEffect(() => {
        getPlants();
        getSpecifics();
    }, []);

    //Star
    let matching_plants = specifics.matching_plants || [];
    //Square
    let recommended_crops = specifics.recommended_crops || [];
    //Maintenance Level
    let maintain_categories = specifics.maintain_categories || { Low: [], Moderate: [], High: [] };
    return(
        <div>
            <h1>Select Crops</h1>

            <ul>
                {plants.map(plant => (
                    <li key={plant.id}>
                        <label>
                            <input 
                                type="checkbox" 
                                value={plant.id}
                                onChange={(event) => handleCheckboxChange(event)}
                            ></input>
                            <Link to={`/crop/${plant.id}`}>{plant.common_name}</Link>
                        </label>
                        
                        {matching_plants.includes(parseInt(`${plant.id}`)) && 
                            <img src={star} height={10} width={10} />
                        }
                        
                        {recommended_crops.includes(parseInt(`${plant.id}`)) && 
                            <img src={square} height={10} width={10} />
                        }

                        {maintain_categories.Low.includes(parseInt(`${plant.id}`)) && 
                            <img src={circle1} height={10} width={10} />
                        }

                        {maintain_categories.Moderate.includes(parseInt(`${plant.id}`)) && 
                            <img src={circle2} height={10} width={10} />
                        }

                        {maintain_categories.High.includes(parseInt(`${plant.id}`)) && 
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
                    <span>Matches Garden Size</span>
                </div>
                <div>
                     <img src={star} height={10} width={10} />
                    <span>Matches Region</span>
                </div>
                <div>
                     <img src={circle1} height={10} width={10} />
                    <span>Low Maintenance Level</span>
                </div>
                <div>
                     <img src={circle2} height={10} width={10} />
                    <span>Medium Maintenance Level</span>
                </div>
                <div>
                     <img src={circle3} height={10} width={10} />
                    <span>High Maintenance Level</span>
                </div>
            </div>
        </div>
    )
}

export default SelectCropsPage;