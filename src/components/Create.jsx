import React, { useState } from 'react';
import axios from 'axios';

export default function Create() {
    const [label, setLabel] = useState("");
    const [image, setImage] = useState("");
    const [uploadedImage, setUploadedImage] = useState("");

    const uploadImage= (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', uploadedImage);
        formData.append('label', label);
        formData.append('upload_preset', "jessStorage");
        console.log(uploadedImage);

      axios.post('/upload', formData).then((result)=>{
          console.log(result);
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
            <button id="cancelBtn" onClick={()=>{props.toggle===false}} >Cancel</button>
            <button id="submitBtn"  onClick={uploadImage}>Submit</button>
            </form>
        </div>
    )
}
