import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class SocialDetails extends Component{
    constructor(props){
        super(props);
    }

    mouseIn(event){
        event.target.style.textDecoration = "underline"
    }

    mouseOut(event){
        event.target.style.textDecoration = "none"
    }

    render(){
        return(
        <div style={socialStyle.mainDiv}>
            <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
            >Stocks You Follow</button>
            <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
            >People You Follow</button>
            <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
            >People Who Follow You</button>
        </div>
        )
    }
}

const socialStyle = {mainDiv: {
        height: "100%",
        width: "100%",
        gap: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll"
    }, button: {
        background: "none",
        height: "32px",
        borderRadius: "30px",
        borderWidth: "0px",
        color: "#00B140",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        cursor: "pointer"
    }
}
