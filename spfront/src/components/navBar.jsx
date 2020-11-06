import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {bellSvg, settingsSvg} from './svgs.jsx';

export default class NavBar extends Component{
    constructor(props){
        super(props);
    }

    mouseIn(but){
        but.target.style.background = '#00B140';
        but.target.style.color = '#FFFFFF';
    }

    mouseOut(but){
        but.target.style.background = 'none';
        but.target.style.color = '#00B140';
    }

    render(){
    return (
        <div id="header" style={navBarStyle.header}>
        <div id="logoDiv" style={navBarStyle.logoDiv}>
            <img src={require("./LogoGreen.jpeg")} alt="Stock Prattle Logo" style={navBarStyle.logo}/>
        </div>
        <div id="headerFunction" style={navBarStyle.headerFunction}>
            <div id="otherHeaderStuff" style={navBarStyle.otherHeaderStuff}>
                <div id="searchDiv" style={navBarStyle.searchDiv}>
                    <input id="searchBar" type="text" placeholder = {"Search"} style={navBarStyle.searchBar}/>
                </div>
                <button style={navBarStyle.button}>
                    {bellSvg}
                </button>
                <button style={navBarStyle.button}>
                    {settingsSvg}
                </button>
                <button id="accountButton" style={navBarStyle.button} onMouseOver={this.mouseIn}
                onMouseLeave={this.mouseOut} onClick={this.accountClick}>Help</button>
                <button id="accountButton" style={navBarStyle.button} onMouseOver={this.mouseIn}
                onMouseLeave={this.mouseOut} onClick={this.accountClick}>Contact Us</button>
                <div id="dropDown"/>
            </div>
        <div id="stockBar" style={navBarStyle.stockBar}/>
        </div>
        </div>
        )
    }
}

const navBarStyle= { header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "140px",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll",
        // border: "thick solid black",
    }, headerFunction: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        height: "100%",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        marginRight: "10px",
        overflow: "scroll"
    }, stockBar: {
        height: "50px",
        marginBottom: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        backgroundColor: "rgba(229, 229, 229, 0.6)",
        borderRadius: "20px",
    },otherHeaderStuff: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    },searchDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }, logoDiv: {
        height: "150px",
        width: "190px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    },logo: {
        height: "133.75px",
        width: "138.75px"
    }, searchBar:{
        width: "600px",
        height: "40px",
        // paddingLeft: "10px",
        background: "rgba(0, 177, 64, 0.05)",
        border: "1px solid #00B140",
        boxSizing: "border-box",
        borderRadius: "50px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
        outline: "none",
        // margin: "0px"
    }, button: {
        background: "none",
        width: "130px",
        height: "45px",
        marginRight: "30px",
        borderRadius: "30px",
        borderWidth: "0px",
        color: "#00B140",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        cursor: "pointer",
        // border: "thick solid black",
    }
}
