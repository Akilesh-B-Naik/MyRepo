import React from 'react';

const Options = (props) => 
{
     return (
                <div>
                    <h3>Your Options</h3> 
                    <button onClick={props.removeall}>Remove All</button>
                </div>
            )
}

export default Options;