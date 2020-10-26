import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {penSvg, nopicSvg} from '../svgs.jsx';

export default class ProfilePic extends Component{
    constructor(props){
        super(props);
        this.state = {image: props.image}
    }

    handleIn(event){
        const elem = document.getElementById("ProfilePicEdit")
        elem.style.visibility = "visible"
        elem.enable = true
    }

    handleOut(event){
        const elem = document.getElementById("ProfilePicEdit")
        elem.style.visibility = "hidden"
        elem.enable = false
    }

    editIn(event){
        event.target.style.background = "lightGray"
    }

    editOut(event){
        event.target.style.background = "#FFFFFF"
    }

    render(){
        return(
        <div style={propicStyle.mainDiv} onMouseOver={this.handleIn} onMouseLeave={this.handleOut}>
            {nopicSvg}
            <button id="ProfilePicEdit" style={propicStyle.editButton} enable={false} onClick={this.beginEdit}
            onMouseOver={this.editIn} onMouseLeave={this.editOut}>
                {penSvg}
            </button>
        </div>
        )
    }
}

const propicStyle = {mainDiv: {
        width: "200px",
        height: "100%",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        // overflow: "scroll"
    }, editButton: {
        visibility: "hidden",
        background: "#FFFFFF",
        borderWidth: "0px",
        outline: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }
}
