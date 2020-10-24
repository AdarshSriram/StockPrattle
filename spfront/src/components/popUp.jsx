import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from '../utils/config.js';

const userCollection = fire.firestore().collection('user')

export default class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { type: props.type }
        //this.done = this.done.bind(this);
    }

    handleSignUp() {
        const inputs = document.getElementsByName("inputs"); var params = []; var val;
        for (var obj of inputs) {
            val = obj.value;
            if (val === '') { val = null }
            params.push(val);
        }
        fire.auth().
            createUserWithEmailAndPassword(params[0], params[1])
            .then(() => {
                userCollection.doc(params[1])
                    .get()
                    .then((doc) => {
                        if (!doc.exists) {
                            userCollection.doc(params[2])
                                .set({
                                    username: params[2],
                                    email: params[0],
                                    fullName: params[3]
                                })
                                .then(() => console.log(`User signed up successfully`))
                                .catch((err) => console.log(err))
                        }
                        else {
                            console.log('User with this username already exists')
                        }
                    })
            })
            .catch(function (error) {
                console.log(error.code)
                console.log(error.message)
            });
    }

    handleSignIn() {
        const inputs = document.getElementsByName("inputs"); var params = []; var val;
        for (var obj of inputs) {
            val = obj.value;
            if (val === '') { val = null }
            params.push(val);
        }
        fire.auth().signInWithEmailAndPassword(params[0], params[1])
            .catch(function (error) {
                console.log(error.code)
                console.log(error.message)
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
            ls.push(<input name="inputs" id="emailField" type="email" placeholder={"Email"} style={popUpStyle.inputs} />)
            ls.push(<input name="inputs" id="passwordField" type="password" minLength={8}
                placeholder={"Password"} style={popUpStyle.inputs} />)
        } else {
            ls.push(<input name="inputs" id="emailField" type="email" placeholder={"Email"} style={popUpStyle.inputs} />)
            ls.push(<input name="inputs" id="passwordField" type="password" minLength={8}
                placeholder={"Password"} style={popUpStyle.inputs} />)
            ls.push(<input name="inputs" id="userNameField" type="text" placeholder={"Unique User Name"} style={popUpStyle.inputs} />)
            ls.push(<input name="inputs" id="fullNameField" type="text" placeholder={"Full Name"} style={popUpStyle.inputs} />)
        }
        return (
            <div style={popUpStyle.wholeScreen}>
                <div id="popUpBox" style={popUpStyle.popUpBox}>
                    <form id="popUpForm" onSubmit={(event) => {
                        event.preventDefault();
                        if (this.state.type === 'Login') {
                            this.handleSignIn();
                        }
                        else {
                            this.handleSignUp()
                        }
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
