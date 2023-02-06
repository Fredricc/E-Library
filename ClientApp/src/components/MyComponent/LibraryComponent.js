﻿import React, { useState } from "react";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

const LibraryComponent = (props) => {

    /* LIST LIBRARIES */
    const [librariesList, setLibrariesList] = useState([]);

    /* SEARCH */
    const [searchParameterName, setSearchParameterName] = useState('');
    const handleInputChange = (event) => {
        setSearchParameterName(event.target.value.toString());
    }
    const searchItem = () => {
        let URL = searchParameterName !== "" ? ("https://localhost:7010/api/Library/Search?prName=" + searchParameterName) : "https://localhost:7010/api/Library/GetAll";
        axios.get(URL).then(response => {
            response.data.map(item => { item.isEditing = false; })
            setLibrariesList(response.data);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setShowAlertError(true);
        });
    }

    /* UPDATE */
    const handleLibraryInputChange = (prLibrary, prInput) => {
        let librariesNewReference = [...librariesList]; //Create a copy of the object with new reference (new space in memory)
        const Index = librariesNewReference.findIndex((item) => item.name === prLibrary.name);
        const { name, value } = prInput.target;// Get the NAME and VALUE of the property changed
        librariesNewReference[Index] = { ...prLibrary, [name]: value }; // Update just the specific property keeping the others
        setLibrariesList(librariesNewReference);
    }
    const updateEditingStatus = (prLibrary, prFlag) => {
        try {
            let librariesNewReference = [...librariesList]; //Create a copy of the object with new reference (new space in memory)
            const Index = librariesNewReference.findIndex((item) => item.name === prLibrary.name);
            librariesNewReference[Index].isEditing = prFlag;
            setLibrariesList(librariesNewReference);
        }
        catch (error) {
            setAlertErrorMessage(error.message);
            setShowAlertError(true);
           };
    }
    const confirmUpdate = (prLibrary) => {
        axios.put("https://localhost:7010/api/Library/update", prLibrary).then(response => {
            let librariesNewReference = [...librariesList]; 
            const Index = librariesNewReference.findIndex((item) => item.name === prLibrary.name);
            librariesNewReference[Index] = prLibrary;
            librariesNewReference[Index].isEditing = false;
            setLibrariesList(librariesNewReference);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setShowAlertError(true);
        });
    }

    /* INSERT */
    const [libraryToAdd, setLibraryToAdd] = useState({ name: '', address: '', telephone: '' });
    const handleLibraryToAddInputChange = (prInput) => {
        const { name, value } = prInput.target;
        let librariesNewReference = { ...libraryToAdd, [name]: value };
        setLibraryToAdd(librariesNewReference);
    }

    const confirmNewLibrary = () => {
        axios.post("https://localhost:7010/api/Library/Save", libraryToAdd).then(response => {
            let librariesNewReference = [...librariesList]; 
            librariesNewReference.push(response.data)
            setLibrariesList(librariesNewReference);
            setLibraryToAdd({ name: '', address: '', telephone: '' }); // Clear the state
            setShowAlertNewLibrary(true);
        }).catch(error => {
            setAlertErrorMessage(error.message);
            setShowAlertError(true);
        });
    }
    /* DELETE */
    const deleteLibrary = (prLibrary) => {
        axios.delete("https://localhost:7010/api/Library/Delete", { data: prLibrary }).then(response => {
            let librariesNewReference = [...librariesList];
            const index = librariesNewReference.findIndex((item) => item.name === prLibrary.name);
            librariesNewReference.splice(index, 1); //Remove item from list
            setLibrariesList(librariesNewReference);
        });
    }

    /* ALERT */
    const [showAlertNewLibrary, setShowAlertNewLibrary] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [alertErrorMessage, setAlertErrorMessage] = useState('');

    return (
        <div>
            <hr />
            <h2>Library</h2>
            <hr />
            <div className="row">
                {/* SEARCH LIBRARY*/}
                <div className="col-md-4">
                <div className="card border border-secondary shadow-0">
                    <div className="card-header bg-secondary text-white"><b>Search</b> Library <span className="glyphicon glyphicon-search"></span></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-7">
                                <label className="form-label">Name</label>
                                    <input className="form-control" placeholder="Enter Name" name="name" type="text" value={searchParameterName} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">&nbsp;</label>
                                <div className="btn-toolbar">
                                        <button type="button" className="btn btn-primary form-control" onClick={searchItem.bind(this)}>Search</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* NEW LIBRARY */}
                <div className="col-md-8">
                    <div className="card border border-secondary shadow-0">
                        <div className="card-header bg-secondary text-white"><b>New</b> Library</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="form-label">Name</label>
                                    <input className="form-control" placeholder="Enter Name" name="name" value={libraryToAdd.name} onChange={handleLibraryToAddInputChange.bind(this)} type="text" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Address</label>
                                    <input className="form-control" placeholder="Enter Address" name="address" value={libraryToAdd.address} onChange={handleLibraryToAddInputChange.bind(this)} type="text" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Telephone</label>
                                    <input className="form-control" placeholder="Enter Telephone" name="telephone" value={libraryToAdd.telephone} onChange={handleLibraryToAddInputChange.bind(this)} type="text" />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">&nbsp;</label>
                                    <buttom type="button" className="btn btn-success form-control" onClick={confirmNewLibrary.bind(this) }>Save</buttom>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {/*DISPLAY LIBRARIES*/}
            <div className="card border border-secondary shadow-0">
                <div className="card-header bg-secondary text-white"><b>Display</b> Libraries</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Telephone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {librariesList.map(item =>
                                <tr key={item.name}>
                                    <td><input className="form-control" value={item.name} onChange={handleLibraryInputChange.bind(this, item) } name="name" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.address} onChange={handleLibraryInputChange.bind(this, item)} name="address" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.telephone} onChange={handleLibraryInputChange.bind(this, item)} name="telephone" disabled={!item.isEditing} /></td>
                                    <td>
                                        <div className="btn-toolbar">
                                            <button className="btn btn-info m-1 mb-0 mt-0" type="button" onClick={updateEditingStatus.bind(this, item, true)} style={{ display: item.isEditing ? 'none' : 'block' }}>Edit</button>
                                            <button className="btn btn-warning m-1 mb-0 mt-0" type="button" onClick={updateEditingStatus.bind(this, item, false)} style={{ display: item.isEditing ? 'block' : 'none' }}>Cancel</button>
                                            <button className="btn btn-success m-1 mb-0 mt-0" type="button" onClick={confirmUpdate.bind(this, item) } style={{ display: item.isEditing ? 'block' : 'none' }}>Save</button>
                                            <button className="btn btn-danger m-1 mb-0 mt-0" type="button" onClick={deleteLibrary.bind(this, item) }>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                )}
                           
                        </tbody>
                    </table>
                </div>
               
            </div>
            <hr />
            {/* ALERT LIBRARY ADDED*/}
            { showAlertNewLibrary &&
            <SweetAlert success
                confirmBtnText="Ok"
                confirmBtnBsStyle="success"
                title="Library successfully added"
                onConfirm={() => setShowAlertNewLibrary(false)}>
                Please click "Ok" to close
            </SweetAlert>
            }
            {/* ALERT ERROR*/}
            {showAlertError &&
                <SweetAlert danger
                    confirmBtnText="Ok"
                    confirmBtnBsStyle="success"
                    title="Something went wrong"
                    onConfirm={() => setShowAlertNewLibrary(false)}>
                    {alertErrorMessage }
                </SweetAlert>
            }
        </div>
        )
}

export default LibraryComponent;