import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from '../utils/config.js';
import { SignIn, SignUp, signUpExt, signInExt, setCurrentUserInfo } from '../firebase_functions'
import { googleSvg, facebookSvg } from './userHome/svgs.jsx';
import firebase from '../utils/config';


export default class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { type: props.type }
        this.switchState = this.switchState.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handlePasswordChange() {
        const pass = String(document.getElementById("passwordField").value)
        const cfm = String(document.getElementById("cfmPasswordField").value)
        const fullname = String(document.getElementById("fullnameField").value)
        const uname = String(document.getElementById("usernameField").value)
        if (cfm !== pass) {
            alert("Passwords do not match!");
            return;
        }
        const user = firebase.auth().currentUser
        const userdb = this.props.user
        const upd = this.props.func
        user.updatePassword(pass).then(() => {
            userdb.passwordChange = false
            userdb.fullname = fullname
            userdb.username = uname
            upd(userdb)
            ReactDOM.unmountComponentAtNode(document.getElementById("popUpContainer"))
            document.getElementById("header").style.filter = "none";
            document.getElementById("body").style.filter = "none";
            console.log("signed up")
            }).catch(function (error) {
                console.log(error)
                alert("Sorry passwords couldn't be updated.")
            });
    }

    handleSignUp() {
        this.setState({type: "verificationSending"})
        SignUp(document.getElementById("emailField").value).then(res=>{
            if (res) this.setState({type: "verificationSent"})
            else {
                alert("An error occured. Please try again")
                this.setState({type: "Join Now"})
            }
        })
    }

    handleSignIn() {
        const inputs = document.getElementsByName("inputs"); var params = []; var val;
        for (var obj of inputs) {
            val = obj.value;
            if (val === '') { val = null }
            params.push(val);
        }
        SignIn(params)
    }

    subMouseIn(but) {
        but.target.style.textDecoration = "underline";
    }

    subMouseOut(but) {
        but.target.style.textDecoration = "none";
    }

    gMouseIn(but) {
        document.getElementById("googleSvg").style.fill = "#00B140"
    }

    gMouseOut(but) {
        document.getElementById("googleSvg").style.fill = "black"
    }

    fMouseIn(but) {
        document.getElementById("facebookSvg").style.fill = "#00B140"
    }

    fMouseOut(but) {
        document.getElementById("facebookSvg").style.fill = "black"
    }

    mainMouseIn(but) {
        but.target.style.background = "#009435";
    }

    mainMouseOut(but) {
        but.target.style.background = "#00B140";
    }

    switchState() {
        var ty = this.state.type === "Login" ? "Sign Up" : "Login"
        this.setState({ type: ty })
    }

    render() {
        if (this.state.type=="verificationSending"){
            return (<div style={popUpStyle.wholeScreen}>
                    <div id="popUpBox" style={popUpStyle.popUpBox}>
                        <p id={"orText"} style={popUpStyle.orText}>Sending verification email...</p>
                    </div>
                </div>)
        }
        if (this.state.type=="verificationSent"){
            return (<div style={popUpStyle.wholeScreen}>
                    <div id="popUpBox" style={popUpStyle.popUpBox}>
                        <p id={"orText"} style={popUpStyle.orText}>A verification email has been sent to your account!</p>
                    </div>
                </div>)
        }
        var ls = []; var txt;
        if (this.state.type === "Login") {
            ls.push(<input name="inputs" id="emailField" type="text" placeholder={"Username or Email"} style={popUpStyle.inputs} required />)
            ls.push(<input name="inputs" id="passwordField" type="password" minLength={8}
                placeholder={"Password"} style={popUpStyle.inputs} required />)
        } else if (this.state.type === "Set Password") {
            ls.push(<input name="inputs" id="usernameField" type="text" placeholder={"Username"} style={popUpStyle.inputs}
                required />)
            ls.push(<input name="inputs" id="fullnameField" type="text" placeholder={"Full Name"} style={popUpStyle.inputs}
                required />)
            ls.push(<input name="inputs" id="passwordField" type="password" minLength={8}
                placeholder={"Password"} style={popUpStyle.inputs} required />)
            ls.push(<input name="inputs" id="cfmPasswordField" type="password" minLength={8}
                placeholder={"Confirm Password"} style={popUpStyle.inputs} required />)
        } else {
            ls.push(<input name="inputs" id="emailField" type="email" placeholder={"Email"} style={popUpStyle.inputs}
                required />)
        }
        return (
            <div style={popUpStyle.wholeScreen}>
                <div id="popUpBox" style={popUpStyle.popUpBox}>
                    {(this.state.type === "Set Password") ? null : <p id="subText" style={popUpStyle.topText}>
                        {this.state.type === "Login" ? "For Beta Users Only" : "Pre-register to be part of the SP community now!"}
                    </p>}
                    <form id="popUpForm" onSubmit={(event) => {
                        event.preventDefault();
                        if (this.state.type === 'Login') {
                            this.handleSignIn();
                        } else if (this.state.type === 'Set Password') {
                            this.handlePasswordChange()
                        } else {
                            this.handleSignUp()
                        }
                    }}
                        style={popUpStyle.form}>
                        {ls.map(item => (item))}
                        <input id="submitButton" type="submit" style={popUpStyle.submitButton}
                            value={this.state.type === "Set Password" ? "Create Profile" : this.state.type}
                            onMouseOver={this.mainMouseIn} onMouseLeave={this.mainMouseOut} />
                    </form>
                    {(this.state.type === "Set Password") ? null : (
                        <p id={"orText"} style={popUpStyle.orText}>---------- Or ----------</p>
                    )}
                    {(this.state.type === "Set Password") ? null : (
                        <div id="altLayer" style={popUpStyle.alternativeLayer}>
                            <p id="altText" style={popUpStyle.altText}>
                                {(this.state.type === "Login") ? "Sign In With: " : "Sign Up With: "}
                            </p>
                            <button id="googleButton" style={popUpStyle.subButton} onMouseOver={this.gMouseIn}
                                onMouseLeave={this.gMouseOut}
                                onClick={() => (this.state.type === "Login") ? signInExt(true) : signUpExt(true)}>
                                {googleSvg}
                            </button>
                            <button id="facebookButton" style={popUpStyle.subButton} onMouseOver={this.fMouseIn}
                                onMouseLeave={this.fMouseOut}
                                onClick={() => (this.state.type === "Login") ? signInExt(false) : signUpExt(false)}>
                                {facebookSvg}
                            </button>
                        </div>
                    )}
                    {(this.state.type === "Set Password") ? null : (<div id="subLayer" style={popUpStyle.subLayer}>
                        <p id="subText" style={popUpStyle.subText}>
                            {this.state.type === "Login" ? "Don't have an account?" : "Already have an account?"}
                        </p>
                        <button id="subButton" style={popUpStyle.subButton} onMouseOver={this.subMouseIn}
                            onMouseLeave={this.subMouseOut} onClick={this.switchState}>
                            {this.state.type === "Login" ? "Sign Up" : "Login"}
                        </button>
                    </div>)}

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
        border: "0px solid rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px"
    }, form: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        margin: "0px"
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
        outline: "none",
        cursor: "pointer"
    }, subLayer: {
        width: "100%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "0px",
        margin: "0px"
    }, alternativeLayer: {
        width: "100%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        margin: "0 0 20px 0"
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
        outline: "none",
        cursor: "pointer"
    }, orText: {
        color: "#949494",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "30px",
        textAlign: "center",
        margin: "0px"
    }, altText: {
        color: "black",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "24px",
        margin: "0px"
    }, topText: {
        width: "100%",
        padding: "10px",
        // color: "#00B140",
        // background: "rgba(0, 177, 64, 0.08)",
        background: "#00B140",
        color: "#FFFFFF",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "22px",
        textAlign: "center"
    }
}
