import React from 'react';


const Scroll = (props) => {
    return (
<div style={{ overflow: 'auto', border: '1px solid black',borderRadius:'7px', height: '900px'}}>
{props.children}

</div>

    );
};


export default Scroll ;