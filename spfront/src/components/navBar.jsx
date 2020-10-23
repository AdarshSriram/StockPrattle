import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
                </button>
                <button style={navBarStyle.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></g></svg>
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
        width: window.innerWidth+"px",
        height: "150px",
        boxSizing: "border-box",
        background: "none",
        //border: "thick solid black",
    }, headerFunction: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        height: "100%",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }, stockBar: {
        height: "50px",
        marginBottom: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //border: "thin solid gray",
        boxSizing: "border-box",
        backgroundColor: "rgba(229, 229, 229, 0.6)",
        borderRadius: "20px",
        marginRight: "10px"
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
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }, logoDiv: {
        height: "100%",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    },logo: {
        height: "107px",
        width: "111px"
    }, searchBar:{
        width: "400px",
        height: "40px",
        paddingLeft: "10px",
        background: "rgba(0, 177, 64, 0.05)",
        border: "1px solid #00B140",
        boxSizing: "border-box",
        borderRadius: "50px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
        outline: "none"
    }, button: {
        background: "none",
        width: "150px",
        height: "45px",
        marginRight: "30px",
        borderRadius: "30px",
        borderWidth: "0px",
        color: "#00B140",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none"
    }, dropDownDiv: {
        position: "absolute",
        top: "75px",
        left: window.innerWidth-130+"px",
        width: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #00B140",
        boxSizing: "border-box",
        background: "#FFFFFF"
    },dropDownButton: {
        background: "none",
        width: "100px",
        height: "45px",
        borderWidth: "0px",
        color: "black",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        display: "block",
        outline: "none"
    }
}
