import React, { Component } from 'react'
import List from './List.jsx'
import Create from './Create.jsx';
import axios from 'axios';
import '../index.css'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            toggle: false
        }
        this.fetchData= this.fetchData.bind(this);
    }

    componentDidMount(){
        this.fetchData()
        setInterval(this.fetchData, 100)
    }

    fetchData(){
        axios.get('/data').then(result => {
            this.setState({items: result.data})
            console.log(this.state.items);
        })
    }


    render() {
    const {items, toggle} = this.state
    return (
        <div className="app" >
            <div>
                <button className="addBtn" onClick={()=>{this.setState({toggle:!toggle})} } > Add a photo </button>            
            </div>
            <List items={items} />
                {
                    toggle? <Create handleClick={()=>{this.setState({toggle:!toggle})}}/>: null
                } 
        </div>
        )
    }
}

