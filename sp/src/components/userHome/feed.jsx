import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserFeed from './userFeed.jsx'
import NewPostPopUp from './newPost.jsx'

function buttonPress(type = null) {
    var elem = document.getElementById("popUpContainer");
    ReactDOM.render(<NewPostPopUp type={type} />, elem);
    document.getElementById("wholeScreen").addEventListener('click', reversePress);
    document.getElementById("body").style.filter = "blur(4px)";
    document.getElementById("header").style.filter = "blur(4px)";
}

function reversePress(event) {
    const exclusions = ["stockInput", "popUpBox", "popUpForm",
        "submitButton", "postText"];
    if (exclusions.includes(event.target.id)) { return; }
    ReactDOM.unmountComponentAtNode(document.getElementById("popUpContainer"))
    document.getElementById("wholeScreen").removeEventListener('click', reversePress);
    document.getElementById("body").style.filter = "none";
    document.getElementById("header").style.filter = "none";
}

export default class Feed extends Component{
    constructor(props){
        super(props);
        this.state = {data: props.data}
    }

    mouseIn(event) {
        event.target.style.backgroundColor = "#00B140"
        event.target.style.color = "#FFFFFF"
    }

    mouseOut(event) {
        event.target.style.backgroundColor = "#FFFFFF"
        event.target.style.color = "#00B140"
    }

    render(){
        return (
        <div style={feedStyle.centerDiv}>
            <div style={feedStyle.topDiv}>
                <button style={feedStyle.newPostButton} onMouseOver={this.mouseIn}
                    onMouseLeave={this.mouseOut} onClick={(event) => { buttonPress("Login") }}>+</button>
            </div>
            {(this.state.data == null) ? (<div style={feedStyle.loadingDiv}>
                <p>Loading...</p>
            </div>) : <UserFeed data={this.state.data}/>}
        </div>
    )}
}

const feedStyle = {centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        overflow: "scroll",
        margin: "10px",
        background: "none",
        borderRadius: "10px"
    }, topDiv: {
        height: "40px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        overflow: "none",
        borderRadius: "10px"
    }, newPostButton: {
        background: "#FFFFFF",
        width: "40px",
        height: "40px",
        marginRight: "10px",
        borderRadius: "25px",
        border: "1px dashed #00B140",
        color: "#00B140",
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "30px",
        outline: "none",
        cursor: "pointer"
    }, loadingDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.3)",
        overflow: "scroll",
        margin: "10px",
        borderRadius: "10px"
    }
}
