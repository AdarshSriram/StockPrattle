import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class PopUp extends Component{
    constructor(props){
        super(props);
        this.state = {type: props.type, func: props.func}
        //this.done = this.done.bind(this);
    }
    //
    // done(){
    //     if(this.props.type==="changeDetails"){
    //         var inputs = document.getElementsByName("inputField"); var obj; var params = []; var val;
    //         var inp;
    //         for (obj of inputs){
    //             val = obj.value;
    //             if (val === ''){inp = null}
    //             else {
    //                 inp = isNaN(val) ? String(val) : Number(val);
    //                 if (typeof(inp)== "number" && inp<=0){return;}
    //             }
    //             params.push(inp);
    //         }
    //         this.state.func(params[0], params[1], params[2], params[3]);
    //         document.getElementById("navBar").style.filter = "none";
    //         document.getElementById("restDisplay").style.filter = "none";
    //         document.getElementById("GUIButtonList").style.filter = "none";
    //         document.getElementById("restButtonList").style.filter = "none";
    //     } else {
    //         var inputs = document.getElementsByName("inputField"); var obj; var params = [];
    //         var typeInput = document.getElementById("inputType"); var inp;
    //         for (obj of inputs){
    //             if (obj.value === ''){return;}
    //             inp = isNaN(obj.value) ? String(obj.value) : Number(obj.value);
    //             if (typeof(inp)== "number" && inp<=0){return;}
    //             params.push(inp);
    //         }
    //         if (typeInput != null){params.push(typeInput.value);}
    //         if (this.props.type==="addChairs"){
    //             this.state.func(params[0],params[1],params[2],params[3])
    //             document.getElementById("navBar").style.filter = "none";
    //             document.getElementById("restDisplay").style.filter = "none";
    //             document.getElementById("GUIButtonList").style.filter = "none";
    //             document.getElementById("restButtonList").style.filter = "none";
    //             document.getElementById("rightDiv").style.filter = "none";
    //             document.getElementById("leftDiv").style.filter = "none";
    //         } else if(this.props.type==="addTables"){
    //             this.state.func(params[0],params[1],params[2],params[3], params[4])
    //             document.getElementById("navBar").style.filter = "none";
    //             document.getElementById("restDisplay").style.filter = "none";
    //             document.getElementById("GUIButtonList").style.filter = "none";
    //             document.getElementById("restButtonList").style.filter = "none";
    //             document.getElementById("rightDiv").style.filter = "none";
    //             document.getElementById("leftDiv").style.filter = "none";
    //         } else if(this.props.type==="changePassword"){
    //             if (params[0]!==this.state.details){alert("Current Password is Incorrect!"); return;}
    //             if (params[1]!==params[2]){alert("Passwords don't match!"); return;}
    //             this.state.func(params[1])
    //             document.getElementById("navBar").style.filter = "none";
    //             document.getElementById("restDisplay").style.filter = "none";
    //             document.getElementById("GUIButtonList").style.filter = "none";
    //             document.getElementById("restButtonList").style.filter = "none";
    //             document.getElementById("rightDiv").style.filter = "none";
    //             document.getElementById("leftDiv").style.filter = "none";
    //         } else if(this.props.type==="handleWalkIn"){
    //             if (!(9999999999>=params[2] && params[2]>=1000000000)){alert("Mobile Number is Invalid!"); return;}
    //             this.state.func(params[0], params[1], params[2])
    //             document.getElementById("navBar").style.filter = "none";
    //             document.getElementById("restDisplay").style.filter = "none";
    //             document.getElementById("GUIButtonList").style.filter = "none";
    //             document.getElementById("restButtonList").style.filter = "none";
    //             document.getElementById("rightDiv").style.filter = "none";
    //             document.getElementById("leftDiv").style.filter = "none";
    //         } else if(this.props.type==="login"){
    //             this.state.func(params[0],params[1])
    //             document.getElementById("rightDiv").style.filter = "none";
    //             document.getElementById("leftDiv").style.filter = "none";
    //         } else if(this.props.type==="createRest"){
    //             this.state.func(params[0], params[1], params[2], params[3])
    //             document.getElementById("rightDiv").style.filter = "none";
    //             document.getElementById("leftDiv").style.filter = "none";
    //         }
    //     }
    //     ReactDOM.unmountComponentAtNode(document.getElementById("popUpContainer"))
    //     document.getElementById("wholeScreen").removeEventListener('click', reversePress);
    // }

    subMouseIn(but){
        but.target.style.textDecoration = "underline";
    }

    subMouseOut(but){
        but.target.style.textDecoration = "none";
    }

    render(){
        var ls = []; var txt;
        if (this.state.type==="Login"){
            ls.push(<input id="emailField" type="email" placeholder = {"Email"} style={popUpStyle.inputs}/>)
            ls.push(<input id="passwordField" type="password" minLength={8}
                    placeholder = {"Password"} style={popUpStyle.inputs}/>)
        } else {

        }
        return (
            <div style={popUpStyle.wholeScreen}>
            <div id="popUpBox" style={popUpStyle.popUpBox}>
            <form id="popUpForm" onSubmit={(event)=>{
                event.preventDefault();
                this.state.func();
            }}
            style={popUpStyle.form}>
                {ls.map(item => (item))}
                <input id="submitButton" type="submit" style={popUpStyle.submitButton} value={this.state.type}/>
            </form>
            <div id="subLayer" style={popUpStyle.subLayer}>
                <p id="subText" style={popUpStyle.subText}>Already have an account?</p>
                <button id="subButton" style={popUpStyle.subButton} onMouseOver={this.subMouseIn}
                onMouseLeave={this.subMouseOut} >{this.state.type==="Login" ? "Sign Up" : "Login"}</button>
            </div>
            </div>
            </div>
        )
    }
}

const popUpStyle = {wholeScreen:{
        position: "absolute",
        display:"flex",
        top:"0",
        left:"0",
        height: "100%",
        width:"100%",
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
        display:'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
    }, inputs:{
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
        display:'flex',
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
