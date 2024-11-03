import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import square from '../assets/square.png';
import star from '../assets/star.png'
import circle1 from '../assets/circle-1.png'
import circle2 from '../assets/circle-2.png'
import circle3 from '../assets/circle-3.png'


function SelectCropsPage(){
    const { id } = useParams();
    const navigate = useNavigate()

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
        axios.get(`http://127.0.0.1:5000/api/present-plants/${id}`)
        .then(response => {
            setSpecifics(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the specifics!", error)
        });
    }

    const handleCheckboxChange = (event, commonName) =>{
        const checkedId = event.target.value;

        setSelectedCrops(prevSelectedCrops => {
            if (event.target.checked) {
                // Add the new crop
                return [...prevSelectedCrops, { id: checkedId, name: commonName }];
            } else {
                // Remove the crop
                return prevSelectedCrops.filter(id => id !== checkedId);
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        for(let i = 0; i < selectedCrops.length; i++){

            const cropData = {
                garden_id: id,
                crop_id: selectedCrops[i].id,
                crop_name: selectedCrops[i].name
            }

            try {
                const response = await fetch('http://localhost:5000/api/crop', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cropData) 
                });
    
                if (response.ok) {
                    const data = await response.json(); 
                    console.log('Crop added'); 
                    navigate('/gardens');
                    
                } else {
                    const errorData = await response.json();
                    console.error('Error adding crops:', errorData.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

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

            <div className="select-crop-page">
                <ul className='select-crop-list'>
                    {plants.map(plant => (
                        <li key={plant.id} className='crop-selection-item'>
                            <label>
                                <input 
                                    type="checkbox" 
                                    value={plant.id}
                                    onChange={(event) => handleCheckboxChange(event, plant.common_name)}
                                ></input>
                                <Link className="crop-selection-link" to={`/crop/${plant.id}`}>{plant.common_name}</Link>
                            </label>
                            
                            <div>
                                {matching_plants.includes(parseInt(`${plant.id}`)) && 
                                    <img className="symbol" src={star}/>
                                }
                                
                                {recommended_crops.includes(parseInt(`${plant.id}`)) && 
                                    <img className="symbol"  src={square}/>
                                }

                                {maintain_categories.Low.includes(parseInt(`${plant.id}`)) && 
                                    <img className="symbol"  src={circle1}/>
                                }

                                {maintain_categories.Moderate.includes(parseInt(`${plant.id}`)) && 
                                    <img className="symbol"  src={circle2}/>
                                }

                                {maintain_categories.High.includes(parseInt(`${plant.id}`)) && 
                                    <img className="symbol"  src={circle3}/>
                                }  
                            </div>
                        </li>
                    ))
                    }
                </ul>

                <div>
                    <div className='symbol-legend'>
                        <h2>Symbol Legend</h2>
                    
                        <div className="legend-key">
                            <img className="symbol"  src={square}/>
                            <span>Matches Garden Size</span>
                        </div>
                        <div className="legend-key">
                            <img className="symbol" src={star}/>
                            <span>Matches Region</span>
                        </div>
                        <div className="legend-key">
                            <img className="symbol"  src={circle1}/>
                            <span>Low Maintenance Level</span>
                        </div>
                        <div className="legend-key">
                            <img className="symbol"  src={circle2}/>
                            <span>Medium Maintenance Level</span>
                        </div>
                        <div className="legend-key">
                            <img className="symbol"  src={circle3}/>
                            <span>High Maintenance Level</span>
                        </div>
                    </div>
                    <button className="submit" onClick={handleSubmit}>Add to Garden</button>
                </div>
            </div>
        </div>
    )
}

export default SelectCropsPage;