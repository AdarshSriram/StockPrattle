import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {nopicSvg, thumbsupSvg, sendSvg, replySvg, shareSvg} from '../svgs.jsx'

export default class Card extends Component{
    constructor(props){
        super(props);
        this.mouseIn = this.mouseIn.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.cardClick = this.cardClick.bind(this);
    }

    mouseIn(){
        document.getElementById(this.props.heading).style.textDecoration = "underline"
        document.getElementById(this.props.text).style.width = "205px"
        document.getElementById(this.props.text).style.height = "305px"
    }

    mouseOut(){
        document.getElementById(this.props.heading).style.textDecoration = "none"
        document.getElementById(this.props.text).style.width = "200px"
        document.getElementById(this.props.text).style.height = "300px"
    }

    cardClick(){
        this.props.onCardClick("Sample Stock")
    }

    render(){
        var img = require("../../../images/LogoGreen.jpeg");
        var topBarStyle = {...cardStyle.topBar}
        var imageStyle = {...cardStyle.image}
        if (this.props.heading == "Stock Prattle Team"){
            img = require("../../../images/Logo.png")
            topBarStyle.backgroundColor = "#00B140"
            imageStyle.maxWidth = "80%"
            imageStyle.maxHeight = "80%"
        }
    return (
        <div id={this.props.text} style={cardStyle.mainDiv} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
        onClick={this.cardClick}>
            <div style={topBarStyle}>
                <img src={img} alt="Stock Prattle Logo" style={imageStyle}/>
            </div>
            <div style={cardStyle.contentDiv}>
                <p id={this.props.heading} style={cardStyle.headingStyle}>{this.props.heading}</p>
                <p style={cardStyle.textStyle}>{this.props.text}</p>
            </div>
        </div>
        )
    }
}

const cardStyle= {mainDiv: {
        width: "200px",
        height: "300px",
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        cursor: "pointer"
    }, topBar: {
        width: "100%",
        height: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "thin solid lightGray",
        borderWidth: "0 0 1px 0",
        boxSizing: "border-box",
        backgroundColor: "#FFFFFF",
        overflow: "none"
    }, contentDiv: {
        width: "100%",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        padding: "5px 5px 0 5px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        border: "thin solid lightGray",
        borderWidth: "0 0 1px 0",
        boxSizing: "border-box",
        background: "none",
        overflow: "none"
    }, headingStyle: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        margin: "0 0 5px 0",
    }, textStyle: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "14px",
        outline: "none",
        margin: "0px"
    }, image: {
        maxWidth: "100%",
        maxHeight: "100%",
        display: "block",
        borderRadius: "10px"
    }
}
