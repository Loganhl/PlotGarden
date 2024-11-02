import { useState, useContext } from 'react';


function AddGardenPage(){

    const [state, setState] = useState({
        gardenName: '',
        gardenLocation: '',
        gardenDescription: '',
        gardenImage: '',
        gardenLength: '',
        gardenWidth: '',
        zipCode: ''
    });

    const updateState = event => setState({
        ...state,
        [event.target.name]: event.target.value
    });

    const handleSubmit = event => {
        event.preventDefault();
       //Post to Backend
    }

    return(
        <div className="container">
            <h1>Add Garden</h1>

            <form className="form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label for="garden_name">Name:</label>
                    <input
                        type = "text"
                        name="garden_name"
                        value={state.gardenName}
                        onChange={updateState}
                    />
                </div>

                
                <div className="form-group">
                    <label for="garden_location">Location:</label>
                    <input
                        type = "text"
                        name="garden_location"
                        value={state.gardenLocation}
                        onChange={updateState}
                    />
                </div>

                
                <div className="form-group">
                    <label for="garden_description">Description:</label>
                    <input
                        type = "text"
                        name="garden_description"
                        value={state.gardenDescription}
                        onChange={updateState}
                    />
                </div>

                
                <div className="form-group">
                    <label for="garden_image">Image Link:</label>
                    <input
                        type = "text"
                        name="garden_image"
                        value={state.gardenImage}
                        onChange={updateState}
                    />
                </div>
    
                <div className="form-group">
                    <label for="garden-size">Garden Size: </label>
                    <input 
                        type="text"
                        name="gardenLength"
                        value={state.gardenLength}
                        onChange={updateState}
                    />
                    <inline>ft x </inline>
                    <input 
                        type="text"
                        name="gardenWidth"
                        value={state.gardenWidth}
                        onChange={updateState}
                    />
                    <inline>ft</inline>
                </div>

                <div className="form-group">
                    <label for="zipCode">Zip Code: </label>
                    <input 
                        type="text"
                        name="region"
                        value={state.region}
                        onChange={updateState}
                    />
                </div>

                <button className="next">Next</button>

            </form>
        </div>
    )
}

export default AddGardenPage;