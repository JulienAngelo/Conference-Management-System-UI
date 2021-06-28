import React, {useState} from "react";
import EditorSideNav from "../Navbar/EditorSideNav";
import axios from "axios";

export default function AddKeyNoteSpeaker(props) {

    const [data, setData] = useState({
        name: "",
        designation: "",
        description: "",
        imageURL: ""
    })

    function submit(e) {
        e.preventDefault();
        axios.post("https://icaf-backend.herokuapp.com/keynote-speakers/save", data).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/keynote-speakers");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if(err.response.data.designation !== undefined) {
                alert(err.response.data.designation);
            } else if(err.response.data.imageURL !== undefined) {
                alert(err.response.data.imageURL);
            } else {
                alert(err);
            }
        })
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    return(
        <div className="main">
            <EditorSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1000px'
            }}>
                <br/>
                <div className="card" style={{width : '70%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Keynote Speaker</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => submit(e)}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => handle(e)} className="form-control" id="name" placeholder="Enter Name" value={data.name} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="designation" className="col-sm-3">Designation</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => handle(e)} className="form-control" id="designation" placeholder="Enter Designation" value={data.designation} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3">Description</label>
                                <div className="col-sm-5">
                                    <textarea onChange={(e) => handle(e)} className="form-control" id="description" cols="30" rows="6" placeholder="Enter Description" value={data.description} />
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="imageURL" className="col-sm-3">Image</label>
                                <div className="col-sm-5">
                                    <input type="text" onChange={(e) => handle(e)} className="form-control" id="imageURL" placeholder="Enter Image" value={data.imageURL} required/>
                                </div>
                            </div><br/>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}