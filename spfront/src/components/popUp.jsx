import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { config } from '../utils/config'
import { admin, db } from '../utils/admin'

firebase.initializeApp(config)

export default class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { type: props.type, func: props.func }
        //this.done = this.done.bind(this);
    }

    handleSignUp(userInfo) {
        firebase.auth().
            createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.doc(`/user/${newUser.username}`).set(userInfo)
                    .then(() => {
                        console.log('successfully signed up')
                    })
                    .catch((err) => console.log(err))
            })
            .catch(function (error) {
                console.log(error.code)
                console.log(error.message)
            });
    }

    handleSignIn() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('how did u do this')
            } else {
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .catch(function (error) {
                        console.log(error.code)
                        cosnole.log(error.message)
                    });
            }
        });
    }

    subMouseIn(but) {
        but.target.style.textDecoration = "underline";
    }

    subMouseOut(but) {
        but.target.style.textDecoration = "none";
    }

    render() {
        var ls = []; var txt;
        if (this.state.type === "Login") {
            ls.push(<input id="emailField" type="email" placeholder={"Email"} style={popUpStyle.inputs} />)
            ls.push(<input id="passwordField" type="password" minLength={8}
                placeholder={"Password"} style={popUpStyle.inputs} />)
        } else {

        }
        return (
            <div style={popUpStyle.wholeScreen}>
                <div id="popUpBox" style={popUpStyle.popUpBox}>
                    <form id="popUpForm" onSubmit={(event) => {
                        event.preventDefault();
                        this.state.func();
                    }}
                        style={popUpStyle.form}>
                        {ls.map(item => (item))}
                        <input id="submitButton" type="submit" style={popUpStyle.submitButton} value={this.state.type} />
                    </form>
                    <div id="subLayer" style={popUpStyle.subLayer}>
                        <p id="subText" style={popUpStyle.subText}>Already have an account?</p>
                        <button id="subButton" style={popUpStyle.subButton} onMouseOver={this.subMouseIn}
                            onMouseLeave={this.subMouseOut} >{this.state.type === "Login" ? "Sign Up" : "Login"}</button>
                    </div>
                </div>
            </div>
        )
    }
}

const popUpStyle = {
    wholeScreen: {
        position: "absolute",
        display: "flex",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }, popUpBox: {
        width: "500px",
        height: "600px",
        backgroundColor: "#FFFFFF",
        border: "2px solid rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        justifyContent: "center",
        alignItems: "center",
    }, form: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
    }, inputs: {
        width: "404px",
        height: "45px",
        paddingLeft: "10px",
        background: "rgba(0, 177, 64, 0.05)",
        border: "1px solid #00B140",
        boxSizing: "border-box",
        borderRadius: "22.5px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "18px",
        outline: "none"
    }, submitButton: {
        width: "150px",
        height: "50px",
        background: "#00B140",
        borderRadius: "10px",
        borderWidth: "0px",
        color: "#FFFFFF",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "24px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
        outline: "none"
    }, subLayer: {
        width: "100%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "0px",
        marginTop: "50px"
    }, subText: {
        color: "#949494",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        margin: "0px"
    }, subButton: {
        background: "none",
        borderRadius: "10px",
        borderWidth: "0px",
        margin: "0px",
        color: "#00B140",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none"
    }
}
