import React, { useEffect } from "react";

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
},[])

    return (
        <div>
            <h2>
                MyFunctional Component
                {/* PROPS */ }
                
            </h2>
            <h4>Name: <b>{ props.name ? props.name : "Fred"} </b></h4>
        </div>
        )
} 

export default MyFunctionalComponent;