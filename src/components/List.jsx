import React, {useState} from 'react'

export default function List(props) {
    const [searchedItem, setSearchedItem] =useState('');
    const searchedItems = [];
    const search = ()=>{
        props.items.filter((val)=>{
            if(searchedItem===""){
                return val
            } else if(val.label.toLowerCase().includes(searchedItem.toLowerCase())){
                return val
            }
        })
    }
    return (
        <div >
            <input className="searchBar" type="text" placeholder="Search by name"
            onChange={(e)=>setSearchedItem(e.target.value)}
            />
            {}
            <div className="item">
            {props.items.map((item, key) => 
                <div  key={key} >
                    <img src={item.photo}  />
                    <div className="label"> {item.label} </div>
                </div>
            )}
            </div>
        </div>
    )
}
