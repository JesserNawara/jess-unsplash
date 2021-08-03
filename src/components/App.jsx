import React, { Component } from 'react'
import List from './List.jsx'
import '../index.css'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }


    render() {
        const {items} = this.state
        return (
            <div>
                <div>
                    <input className="searchBar" type="text" placeholder="Search by name"/>
                    <button className="addBtn"> Add a photo </button>
                </div>
                <List items={items} />  
            </div>
        )
    }
}

