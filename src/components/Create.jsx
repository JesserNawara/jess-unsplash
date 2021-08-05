import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Create() {
    const [label, setLabel] = useState("");
    const [image, setImage] = useState("");
    const [uploadedImage, setUploadedImage] = useState("");
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState('');
    const [confirmColor, setConfirmColor] = useState('');

    useEffect(()=> {
        confirmMsg()
    })

    const addItem= ()=>{
        axios.post('/add/item', {image, label})
        .then(result => {
         console.log(result.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const confirmMsg = ()=>{
        if( checked === true ){
            setMessage('check complete!')
            setConfirmColor('green');
        } else if( checked === false ){
            setMessage('confirm picture please')
            setConfirmColor('red');
        }
    }

    const uploadImage= (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', uploadedImage);
        formData.append('upload_preset', "jessStorage");
     
        axios.post("https://api.cloudinary.com/v1_1/jessssss/image/upload",
        formData, {headers:{
            "content-type": "multipart/form-data"
        }}
        ).then(response => {
            setImage(response.data.secure_url)
            setChecked(true)
        }).catch(error => {
            console.log(error);
            setChecked(false);
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
            <button id="checkBtn" style={{"backgroundColor":confirmColor}} onClick={uploadImage}> {message} </button> 
            <br />
            <button id="cancelBtn" onClick={()=>{props.toggle===false}} >Cancel</button>
            <button id="submitBtn"  onClick={()=>{
                if(checked === true) {
                    addItem()
                } else {
                    alert("please confirm your image!")
                }
            }}>Submit</button>
            </form>
        </div>
    )
}
