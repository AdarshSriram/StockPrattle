import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card.jsx';

export default class ExploreFeed extends Component{
    constructor(props){
        super(props);
    }

    goToPage(){}

    render(){
    return (
        <div style={exploreStyle.centerDiv}>
            <Card heading={"Stock Prattle Team"}
                text={"Explore is coming soon!"}
                redirect={this.goToPage}
                />
        </div>
        )
    }
}

const exploreStyle= { centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        padding: "20px",
        gap: "20px",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.6)",
        overflow: "scroll",
        margin: "10px",
        borderRadius: "10px"
    }
}
