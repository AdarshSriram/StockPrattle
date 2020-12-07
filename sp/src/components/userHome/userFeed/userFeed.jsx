import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from "../post.jsx"

export default class UserFeed extends Component{
    constructor(props){
        super(props);
    }

    render(){
    return (
        <div style={userFeedStyle.centerDiv}>
            <Post text="Feed is coming soon!" logo={true}/>
        </div>
        )
    }
}

const userFeedStyle= { centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.6)",
        overflow: "scroll",
        borderRadius: "10px"
    }
}
