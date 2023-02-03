import React, { useEffect, useState } from "react";

const MyFunctionalComponent = (props) => { 

    function componentMount() {
        alert("Component render");
    }
function componentUnmount() {
    alert("Leaving the Component");
}

//useEffect(() => {
//    componentMount();
//    return() => {
//        componentUnmount();
//    }
//}, [])

    /* STATE */
    const [age, setAge] = useState(20);

    /*EVENT HANDLING */
    const onChangeAgeInput = (event) => {
        alert("Age has changed");
        setAge(parseInt(event.target.value));
    }
    const showDetails = (prTelephone) => {
        alert(`Name: ${props.name ? props.name : 'Fred'} | Age: ${age} | Telephone: ${prTelephone}`);
    }

    /*CONDITIONAL RENDERING */
    let FredAge = () => {
        if (age > 25)
            return (<p>Fred has more than 25 years</p>)
        else
            return (<p>Fred has 25 years or less</p>)

    }

    /* ITERATION */
    let users = [
        {name: 'Fred', age: 20 },
        {name: 'Hellen', age: 21 },
        {name: 'Jack', age: 35 },
        { name: 'Peter', age: 45 }
    ]

    /*FORM */
    const [userName, setUserName] = useState("Jack");
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }
    const handleSubmit = (event) => {
        alert("Form submitted. Value: " + userName)
    }


    //ITERATION EXAMPLE
    let userList = users.map((user) =>
        <li key={user.name}> Name: {user.name} -Age: {user.age}</li>
    );

    return (
        <div>
            <h2>
                My Functional Component
                {/* PROPS */ }
                
            </h2>
            <h4>Name: <b>{props.name ? props.name : "Fred"} </b></h4>

            {/* STATE */}
            <hr />
            <h4>State</h4>
            <span>
                <b>Age: </b><input type="number" value={age} onChange={onChangeAgeInput} />
                <button onClick={() => setAge(age + 1)}>+</button>
                <button onClick={() => setAge(age - 1)}>-</button>
            </span>

            {/* EVENT HANDLING*/}
            <hr />
            <h4>Event Handling </h4>
            <button onClick={showDetails.bind(this, 234578843)}>Show Details</button>
            <hr />

            {/* EXAMPLE 1 IF/ELSE */}
            {FredAge()}

            {/*EXAMPLE 2 - TERNARY OPERATOR */}
            <p>{age > 25 ? 'Fred has more than 25 years' : 'Fred has 25 years or less'} </p>

            {/*EXAMPLE 3 - short-circuit OPERATOR */}
            {age > 25 && <p>Fred has more than 25 years</p> }
            {age <= 25 && <p>Fred has 25 years or less </p>}

            {/*EXAMPLE 4 - IMMEDIATELY INVOKED FUNCTION */}
            {
                (() => {
                    switch (age) {
                        case 25: return <p>Fred has 25 years</p>;
                        case 26: return <p>Fred has over 25 years</p>;
                        case 30: return <p>Fred is in his 30s</p>;
                        case 18: return <p>Fred is under 18 years</p>;
                        default: return <p>Fred has less than 25 years</p>;
                    }
                })()
            }

            {/*ITERATION */}
            <hr />
            <h4>ITERATION</h4>
            <hr />
            <ul>
                {/* EXAMPLE 1 */ }
                {userList}

                {/* EXAMPLE 2 */}
                <hr />
                {users.map((user) => <li key={user.name}> Name: {user.name} - Age: {user.age}</li>) 
                }
            </ul>
            {/* FORMS*/}
            <hr />
            <h4>Form</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: 
                    <input type="text" value={userName} onChange={handleUserNameChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>


        </div>
        )
} 

export default MyFunctionalComponent;