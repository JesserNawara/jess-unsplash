import React, {useState} from 'react';
import axios from 'axios';

export default function Create() {
    const [label, setLabel] = useState("");
    const [image, setImage] = useState("")
    
    const addLabel= (e)=>{
        e.preventDefault()
        axios.post('/addlabel', { label})
        .then(result => {
         console.log(result.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const uploadImage= (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', "fcyhh7ha");

        axios.post("https://api.cloudinary.com/v1_v/jessssss/image/upload",
        formData
        ).then(response => {
            console.log(response);
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
            <input type="file" onChange={(event)=>{setImage(event.target.files[0])}}/>
            <br />
            <button id="cancelBtn" onClick={()=>{props.toggle===false}} >Cancel</button>
            <button id="submitBtn" type="submit" onClick={()=>{
                addLabel();
                uploadImage();
            }}>Submit</button>
            </form>
        </div>
    )
}
