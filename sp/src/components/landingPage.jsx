import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from "react-router-dom";
import PopUp from './popUp.jsx';

function buttonPress(type = null) {
    var elem = document.getElementById("popUpContainer");
    ReactDOM.render(<PopUp type={type} />, elem);
    document.getElementById("wholeScreen").addEventListener('click', reversePress);
    document.getElementById("header").style.filter = "blur(4px)";
    document.getElementById("footer").style.filter = "blur(4px)";
    document.getElementById("centerDiv").style.filter = "blur(4px)";
}

function reversePress(event) {
    const exclusions = ["emailField", "passwordField", "cfmPasswordField", "popUpBox", "popUpForm",
        "submitButton", "subLayer", "subText", "subButton", "usernameField", "fullnameField",
        "altLayer", "googleButton", "facebookButton", "googleSvg", "facebookSvg",
        "orText", "altText", "googlePath", "facebookPath", "facebookRect"];
    if (exclusions.includes(event.target.id)) { return; }
    ReactDOM.unmountComponentAtNode(document.getElementById("popUpContainer"))
    document.getElementById("wholeScreen").removeEventListener('click', reversePress);
    document.getElementById("header").style.filter = "none";
    document.getElementById("footer").style.filter = "none";
    document.getElementById("centerDiv").style.filter = "none";
}

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
    }

    loginMouseIn(but) {
        but.target.style.textDecoration = "underline";
    }

    loginMouseOut(but) {
        but.target.style.textDecoration = "none";
    }

    joinMouseIn(but) {
        but.target.style.background = 'lightgray';
    }

    joinMouseOut(but) {
        but.target.style.background = "#FFFFFF";
    }

    render() {
        var ls = []; var baseRadius = 100; var numCircles = 20;
        for (var i = 1; i <= numCircles; i++) {
            ls.push(
                <div style={{
                    position: 'absolute',
                    top: "" + window.innerHeight / 2 - baseRadius / 2 * i + "px",
                    left: "" + window.innerWidth / 2 - baseRadius / 2 * i + "px",
                    width: "" + baseRadius * i + "px",
                    height: "" + baseRadius * i + "px",
                    borderColor: "rgba(120, 202, 210, 0.2)",
                    borderStyle: "solid",
                    borderWidth: "10px",
                    borderRadius: "50%",
                    boxSizing: "border-box",
                }} />
            )
        }
        return (
            <div id="containerDiv" style={startStyle.container}>
                <ul id="ellipseList" style={startStyle.ellipseList}>
                    {ls.map(item => (<li key={ls.indexOf(item)}>{item}</li>))}
                </ul>
                <div id="wholeScreen" style={startStyle.mainDiv}>
                    <div id="header" style={startStyle.header}>
                        <button style={startStyle.loginButton} onMouseOver={this.loginMouseIn}
                            onMouseLeave={this.loginMouseOut} onClick={(event) => { buttonPress("Login") }}>Login</button>
                        <button style={startStyle.joinButtonTwo} onMouseOver={this.joinMouseIn}
                            onMouseLeave={this.joinMouseOut} onClick={(event) => { buttonPress("Join Now") }}>Join Now</button>
                    </div>
                    <div id="centerDiv" style={startStyle.centerDiv}>
                        <div style={startStyle.textDiv}>
                            <img src={require("../images/Logo.png")} alt="Stock Prattle Logo" style={startStyle.image} />
                        </div>
                        <div style={startStyle.textDiv}>
                            <p style={startStyle.text}>India’s Stock Community Platform</p>
                            <p style={startStyle.subText}>Invest Better. Every Rupee Counts.</p>
                            <p style={startStyle.subText}>Pre-register Now!</p>
                            <div style={{ width: "100%", marginTop: "20px" }}>
                                <button style={startStyle.joinButton} onMouseOver={this.joinMouseIn}
                                    onMouseLeave={this.joinMouseOut} onClick={(event) => { buttonPress("Join Now") }}>Join Now</button>
                            </div>
                        </div>
                    </div>
                    <div id="footer" style={startStyle.footer}>
                        <button style={startStyle.loginButton} onMouseOver={this.loginMouseIn}
                            onMouseLeave={this.loginMouseOut}>FAQ</button>
                        <button style={startStyle.loginButton} onMouseOver={this.loginMouseIn}
                            onMouseLeave={this.loginMouseOut}>About</button>
                        <button style={startStyle.loginButton} onMouseOver={this.loginMouseIn}
                            onMouseLeave={this.loginMouseOut}>Support</button>
                        <button style={startStyle.loginButton} onMouseOver={this.loginMouseIn}
                            onMouseLeave={this.loginMouseOut}>Feedback</button>
                    </div>
                    <div id="popUpContainer" style={{ top: "100%", left: "100%" }} />
                </div>
            </div>
        );
    }
}

const startStyle = {
    container: {
        width: "100vw",
        height: "100vh",
        overflow: "none",
        backgroundColor: "#00B140",
    }, mainDiv: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        overflow: "none",
        background: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black"
    }, centerDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }, header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        height: "100px",
        boxSizing: "border-box",
        background: "none"
    }, footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100px",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }, textDiv: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }, image: {
        marginLeft: "200px",
        height: "300px"
    }, text: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "80px",
        lineHeight: "121px",
        margin: "0px",
        color: "#FFFFFF",
        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        //border: "thick solid black",
    }, subText: {
        width: "100%",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        margin: "0px",
        fontSize: "32px",
        lineHeight: "61px",
        color: "#FFFFFF",
        //border: "thick solid black",
    }, joinButton: {
        width: "150px",
        height: "50px",
        backgroundColor: "#FFFFFF",
        borderRadius: "40px",
        borderWidth: "0px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "24px",
        color: "#00B140",
        outline: "none",
        cursor: "pointer"
    }, joinButtonTwo: {
        width: "100px",
        height: "50px",
        marginRight: "30px",
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        borderWidth: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "18px",
        color: "#00B140",
        outline: "none",
        cursor: "pointer"
    }, loginButton: {
        background: "none",
        width: "100px",
        height: "50px",
        marginRight: "30px",
        borderRadius: "10px",
        borderWidth: "0px",
        color: "#FFFFFF",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "18px",
        outline: "none",
        cursor: "pointer"
    }, ellipseList: {
        position: 'relative',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0"
    }
}
