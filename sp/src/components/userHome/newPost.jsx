import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class NewPostPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { stocks: ["NIFTY", "SENSEX"] }
    }

    mainMouseIn(but) {
        but.target.style.background = "#009435";
    }

    mainMouseOut(but) {
        but.target.style.background = "#00B140";
    }

    addPost() {
        const inputs = document.getElementsByName("inputs"); var params = []; var val;
        for (var obj of inputs) {
            val = obj.value;
            if (val === '') { val = null }
            params.push(val);
        }
        this.props.addPost(params)
    }

    render() {
        return (
            <div style={newPostStyle.wholeScreen}>
                <div id="popUpBox" style={newPostStyle.popUpBox}>
                    <form id="popUpForm" onSubmit={(event) => {
                        event.preventDefault();
                        this.addPost()
                    }} style={newPostStyle.form}>
                        <input name="inputs" id="stockInput" placeholder="Select Stock" list="stocks" style={newPostStyle.inputs} required />
                        <datalist id="stocks">
                            {this.state.stocks.map(item => (<option id={item} value={item} />))}
                        </datalist>
                        <input name="inputs" id="postText" type="text" placeholder={"Post Text"} style={newPostStyle.inputs} />
                        <input id="submitButton" type="submit" style={newPostStyle.submitButton} value="Create Post"
                            onMouseOver={this.mainMouseIn} onMouseLeave={this.mainMouseOut} />
                    </form>
                </div>
            </div>
        )
    }
}

const newPostStyle = {
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
        margin: "0px"
    }, altText: {
        color: "black",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "24px",
        margin: "0px"
    }
}
