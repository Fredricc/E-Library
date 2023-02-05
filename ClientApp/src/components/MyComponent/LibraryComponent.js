import React, { useState } from "react";
import axios from "axios"

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
            response.data.map(item => { item.isEditing = false;})
            setLibrariesList(response.data);
        })
    }

    /* UPDATE */
    const handleLibraryInputChange = (prLibrary, prInput) => {
        let librariesNewReference = [...librariesList]; //Create a copy of the object with new reference (new space in memory)
        const Index = librariesNewReference.findIndex((item) => item.name === prLibrary.name);
        const { name, value } = prInput.target;// Get the NAME and VALUE of the property changed
        librariesNewReference[Index] = { ...prLibrary, [name]: value }; // Update just the specific property keeping the others
        setLibrariesList(librariesNewReference);
    }
    const editLibrary = (prLibrary) => {
        let librariesNewReference = [...librariesList]; //Create a copy of the object with new reference (new space in memory)
        const Index = librariesNewReference.findIndex((item) => item.name === prLibrary.name);
        librariesNewReference[Index].isEditing = true;
        setLibrariesList(librariesNewReference);
    }
    const confirmUpdate = (prLibrary) => {
        axios.put("https://localhost:7010/api/Library/update", prLibrary).then(response => {
            let librariesNewReference = [...librariesList]; 
            const Index = librariesNewReference.findIndex((item) => item.name === prLibrary.name);
            librariesNewReference[Index] = prLibrary;
            librariesNewReference[Index].isEditing = false;
            setLibrariesList(librariesNewReference);
        })
    }

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
                                    <input className="form-control" placeholder="Enter Name" name="name" type="text" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Address</label>
                                    <input className="form-control" placeholder="Enter Address" name="address" type="text" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Telephone</label>
                                    <input className="form-control" placeholder="Enter Telephone" name="telephone" type="text" />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">&nbsp;</label>
                                    <buttom type="button" className="btn btn-success form-control">Save</buttom>
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
                                            <button className="btn btn-info m-1 mb-0 mt-0" type="button" onClick={editLibrary.bind(this, item) } style={{ display: item.isEditing ? 'none' : 'block' }}>Edit</button>
                                            <button className="btn btn-success m-1 mb-0 mt-0" type="button" onClick={confirmUpdate.bind(this, item) } style={{ display: item.isEditing ? 'block' : 'none' }}>Save</button>
                                         
                                        </div>
                                    </td>
                                </tr>
                                )}
                            <tr>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
               
            </div>
            <hr />
        </div>
        )
}

export default LibraryComponent;