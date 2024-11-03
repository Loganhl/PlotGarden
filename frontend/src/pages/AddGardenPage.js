import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function AddGardenPage(){
    const { user } = useAuth0();
    const [state, setState] = useState({
        garden_name: '',
        location: '',
        description: '',
        image_link: '',
        garden_len: '',
        garden_wid: '',
        user_id: user ? user.sub : ''
    });

    const [errors, setErrors] = useState({});

    const updateState = event => setState({
        ...state,
        [event.target.name]: event.target.value
    });

    const validateForm = () => {
        const newErrors = {};

        if (!state.garden_name) {
            newErrors.garden_name = "Garden name is required";
        }
        if (!state.location) {
            newErrors.location = "Location is required";
        }
        if (!state.garden_len || !state.garden_wid) {
            newErrors.garden_size = "Garden size (length and width) is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const gardenData = {
            garden_name: state.garden_name,
            location: state.location,
            description: state.description,
            image_link: state.image_link,
            garden_len: state.garden_len,
            garden_wid: state.garden_wid,
            user_id: state.user_id
        };

        try {
            const response = await fetch('http://localhost:5000/api/gardens', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gardenData) 
            });

            if (response.ok) {
                const data = await response.json(); 
                console.log('Garden added with ID:', data.garden_id); 
                
            } else {
                const errorData = await response.json();
                console.error('Error adding garden:', errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <div className="container">

            <form className="form" onSubmit={handleSubmit}>
                <h1>Add Garden</h1>

                <div className="form-group">
                    <label for="garden_name">Name:</label>
                    <input
                        type = "text"
                        name="garden_name"
                        value={state.garden_name}
                        onChange={updateState}
                    />
                    {errors.garden_name && <div className="error">{errors.garden_name}</div>}
                </div>

            
                <div className="form-group">
                    <label for="garden_description">Description:</label>
                    <textarea
                        name="description"
                        value={state.description}
                        onChange={updateState}
                        rows="5"
                        cols="40"
                    />
                </div>

                
                <div className="form-group">
                    <label for="garden_image">Image Link:</label>
                    <input
                        type = "text"
                        name="image_link"
                        value={state.image_link}
                        onChange={updateState}
                    />
                </div>
    
                <div className="form-group">
                    <label for="garden-size">Garden Size: </label>
                    <div className="garden-size-inputs">
                    <input 
                        type="text"
                        name="garden_len"
                        value={state.garden_len}
                        onChange={updateState}
                    />
                    <span>ft x</span>
                    <input 
                        type="text"
                        name="garden_wid"
                        value={state.garden_wid}
                        onChange={updateState}
                    />
                    <span>ft</span>
                </div>
                    {errors.garden_size && <div className="error">{errors.garden_size}</div>}
                </div>

                <div className="form-group" id="location">
                    <label for="zipCode">Zip Code: </label>
                    <input 
                        type="text"
                        name="location"
                        value={state.location}
                        onChange={updateState}
                    />
                    {errors.location && <div className="error">{errors.location}</div>}
                </div>

                <button type="submit" className="submit">Next</button>

            </form>
        </div>
    )
}

export default AddGardenPage;