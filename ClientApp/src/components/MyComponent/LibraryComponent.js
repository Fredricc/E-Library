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
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.telephone}</td>
                                    <td>
                                        <div className="btn-toolbar">
                                            <button className="btn btn-info m-1 mb-0 mt-0" type="button" style={{ display: item.isEditing ? 'none' : 'block' }}>Edit</button>
                                            {/*<button className="btn btn-success m-1 mb-0 mt-0">Save</button>*/}
                                            {/*<button className="btn btn-danger m-1 mb-0 mt-0">Delete</button>*/}
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