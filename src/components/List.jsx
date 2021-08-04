import React, {useState} from 'react'
import axios from 'axios';

export default function List(props) {
    const [searchedItem, setSearchedItem] =useState('');
    const filteredItems = props.items.filter((item) =>{
        return item.label.toLowerCase().includes(searchedItem.toLowerCase())
    })

    const deleteItem= (id)=>{
        axios.delete(`/item/delete${id}`).then((result)=>{
            location.reload()
        })
    }

    return (
        <div className="items">
            <input className="searchBar" type="text" placeholder="Search by name"
            onChange={(e)=>setSearchedItem(e.target.value)}
            />
            <div className="item">
            {filteredItems.map((item, key) => 
                <div  key={key} >
                    <div className="details">
                    {/* <img id="itemimg" src={item.photo}  /> */}
                    <div id="itemlabel" > {item.label} </div>
                    <button id="deleteBtn" onClick={(id)=>{deleteItem(item.id)}} >delete</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}
