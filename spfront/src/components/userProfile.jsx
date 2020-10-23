import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class UserProfile extends Component{
    constructor(props){
        super(props);
    }

    render(){
    return (
        <div style={userProfileStyle.centerDiv}>
        Profile
        </div>
        )
    }
}

const userProfileStyle= { centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        overflow: "scroll"
    }
}
