import React from 'react';
// import someArray from './someArray';

//Requires that the prop passed in is an Array of Object's and has a propety called name

const ArrayNameMap = props => (
    <ul>
        {props.array.map(index => (
            <li>
                {index.name}
            </li>
        ))}
    </ul>
);

export default ArrayNameMap;





