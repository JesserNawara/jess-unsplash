import React, {useState} from 'react';
import axios from 'axios';

export default function Create() {
    const [photo, setPhoto] = useState("");
    const [label, setLabel] = useState("");

    
    const addPhoto= (e)=>{
        axios.post('/addPhoto', {photo, label})
        .then(result => {
         console.log(result.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    return (
        <div>
            <form className="createForm" >
            <h3 id="addphoto" >Add a new photo</h3>
            <label className="label" >Label</label> <br />
            <input className="input" type="text" placeholder="Suspendisse elit massa" 
            onChange={(e)=>{setLabel(e.target.value)}}
            /> <br />
            <label className="label" >Photo URL</label> <br />
            <input className="input" type="text" placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
            onChange={(e)=>{setPhoto(e.target.value)}}
            /> <br />
            <button id="cancelBtn" onClick={()=>{props.toggle===false}} >Cancel</button>
            <button id="submitBtn" type="submit" onClick={addPhoto}>Submit</button>
            </form>
        </div>
    )
}
