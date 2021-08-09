import React, { useState } from 'react';
import axios from 'axios';

export default function Create(props) {
    const [label, setLabel] = useState("");
    const [uploadedImage, setUploadedImage] = useState("");

    const uploadImage= ()=>{
        const formData = new FormData();
        formData.append('image', uploadedImage);
        formData.append('label', label);
        formData.append('upload_preset', "jessStorage");

      axios.post('/upload', formData).then((res)=>{
        console.log(res, "uploaded !");
    })
    }

    return (
        <div className="modalBackground" >
            <form className="createForm" >
            <h3 id="addphoto" >Add a new photo</h3>
            <label className="label" >Label</label> <br />
            <input className="input" type="text" placeholder="Suspendisse elit massa" 
            onChange={(e)=>{setLabel(e.target.value)}}
            /> <br />
            <input id="file" type="file"  onChange={(event)=>{setUploadedImage(event.target.files[0])}}/>
            <br />
            <span id="cancelBtn" onClick={props.handleClick} >Cancel</span>
            <button id="submitBtn"  onClick={uploadImage}>Submit</button>
            </form>
        </div>
    )
}
