﻿import React, { useEffect, useState } from "react";

const MyFunctionalComponent = (props) => { 

    function componentMount() {
        alert("Component render");
    }
function componentUnmount() {
    alert("Leaving the Component");
}

useEffect(() => {
    componentMount();
    return() => {
        componentUnmount();
    }
}, [])

    /* STATE */
    const [age, setAge] = useState(20);

    return (
        <div>
            <h2>
                MyFunctional Component
                {/* PROPS */ }
                
            </h2>
            <h4>Name: <b>{props.name ? props.name : "Fred"} </b></h4>

            {/* STATE */}
            <hr />
            <h4>State</h4>
            <span>
                <b>Age: </b>{age}
                <button onClick={() => setAge(age + 1)}>+</button>
                <button onClick={() => setAge(age - 1)}>-</button>
            </span>

        </div>
        )
} 

export default MyFunctionalComponent;