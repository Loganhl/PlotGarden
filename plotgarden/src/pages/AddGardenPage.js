import { useState, useContext } from 'react';


function AddGardenPage(){

    const [state, setState] = useState({
        gardenLength: '',
        gardenWidth: '',
        region: ''
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
        <div>
            <h1>Add Garden Page</h1>

            <form onSubmit={handleSubmit}>
    
                <div>
                    <label for="garden-size">Garden Size</label>
                    <input 
                        type="text"
                        name="gardenLength"
                        value={state.gardenLength}
                        onChange={updateState}
                    />
                    <inline>ft</inline>
                    <input 
                        type="text"
                        name="gardenWidth"
                        value={state.gardenWidth}
                        onChange={updateState}
                    />
                    <inline>ft</inline>
                </div>

                <div>
                    <label for="region">Region</label>
                    <input 
                        type="text"
                        name="region"
                        value={state.region}
                        onChange={updateState}
                    />

                </div>

                <button>Submit</button>

            </form>
        </div>
    )
}

export default AddGardenPage;