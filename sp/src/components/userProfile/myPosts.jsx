import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from '../post.jsx';

export default class MyPosts extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div style={myPostsStyle.mainDiv}>
            <Post user={this.props.user} text="Hi! I just joined Stock Prattle!"/>
        </div>
        )
    }
}

const myPostsStyle= { mainDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        overflow: "none"
    }
}
