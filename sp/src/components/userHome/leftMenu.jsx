import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from '../../utils/config.js';
import { getHeadlines } from './news.js'

export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
    }

    componentDidMount(){
        getHeadlines().then(res=>console.log(res))
    }

    mouseIn(but) {
        but.target.style.background = '#00B140';
        but.target.style.color = '#FFFFFF';
    }

    mouseOut(but) {
        if (!but.target.id.includes(this.props.pageState)) {
            but.target.style.background = 'none';
            but.target.style.color = '#00B140';
        }
    }

    logOut() {
        if (window.confirm("Are you sure you want to log out?")) {
            fire.auth().signOut();
        }
    }

    render() {
        return (
            <div style={leftMenuStyle.mainDiv}>
                <div style={leftMenuStyle.buttonDiv}>
                    <button id="profileButton" style={leftMenuStyle.button} onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.props.buttonClickFunctions[0]}>Profile</button>
                    <button id="feedButton" style={leftMenuStyle.button} onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.props.buttonClickFunctions[1]}>Feed</button>
                    <button id="exploreButton" style={leftMenuStyle.button} onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.props.buttonClickFunctions[2]}>Explore</button>
                    <button id="messagesButton" style={leftMenuStyle.button} onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.props.buttonClickFunctions[3]}>Messages</button>
                </div>
                <div style={leftMenuStyle.newsDiv}>
                    <p style={leftMenuStyle.newsText}>News</p>
                </div>
                <button style={leftMenuStyle.logOutButton} onClick={this.logOut}>Log Out</button>
            </div>
        )
    }
}

const leftMenuStyle = {
    mainDiv: {
        height: "100%",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        marginLeft: "10px",
    }, buttonDiv: {
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }, newsDiv: {
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "10px",
        overflow: "scroll",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        background: "none",
        border: "1px solid rgba(0, 177, 64, 0.6)",
        borderRadius: "10px"
    }, button: {
        background: "none",
        width: "100px",
        height: "45px",
        borderRadius: "30px",
        borderWidth: "0px",
        color: "#00B140",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        cursor: "pointer"
    }, logOutButton: {
        marginTop: "5px",
        background: "none",
        width: "100px",
        height: "45px",
        borderRadius: "30px",
        borderWidth: "0px",
        color: "gray",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "15px",
        outline: "none",
        cursor: "pointer"
    }, newsText: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        textDecoration: "underline",
        margin: "0px"
    }
}
