import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { penSvg, tickSvg } from "../svgs.jsx"

export default class EditableText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false, user: props.user, setUser: this.props.setUser,
            type: props.type.split(" ").join("").toLowerCase()
        }
        this.handleIn = this.handleIn.bind(this)
        this.beginEdit = this.beginEdit.bind(this)
        this.handleOut = this.handleOut.bind(this)
    }

    componentDidUpdate(prevProps){
        if (this.state.type === "username"){
            // console.log(this.props.user.username)
            if (this.props.user.username != String(document.getElementById("username").innerHTML.substring(1))){
                this.setState({user: this.props.user})
            }
        }
    }

    beginEdit(event) {
        const elem = document.getElementById(this.state.type)
        if (this.state.editing) {
            elem.contentEditable = false
            elem.style.border = "none"
            if (this.state.type==="username"){
                if (String(elem.innerHTML).includes("@")){
                    this.state.user[this.state.type]= String(elem.innerHTML).substring(1)
                } else {
                    this.state.user[this.state.type]= String(elem.innerHTML)
                    elem.innerHTML = "@"+String(elem.innerHTML)
                }
            } else {
                this.state.user[this.state.type]= String(elem.innerHTML)
            }
            this.setState({editing: false })
            this.state.setUser(this.state.user)
        } else {
            elem.contentEditable = true
            elem.style.border = "thin solid gray"
            this.setState({ editing: true })
        }
    }

    handleIn(event) {
        const elem = document.getElementsByName(this.state.type)[0]
        elem.style.visibility = "visible"
    }

    handleOut(event) {
        const elem = document.getElementsByName(this.state.type)[0]
        elem.style.visibility = "hidden"
    }

    editIn(event) {
        var elems = document.getElementsByName("penSvg"); var elem;
        for (elem of elems) {
            elem.style.fill = "#00B140"
        }
        elems = document.getElementsByName("tickSvg"); var elem;
        for (elem of elems) {
            elem.style.fill = "#00B140"
        }
    }

    editOut(event) {
        var elems = document.getElementsByName("penSvg"); var elem;
        for (elem of elems) {
            elem.style.fill = "black"
        }
        elems = document.getElementsByName("tickSvg"); var elem;
        for (elem of elems) {
            elem.style.fill = "black"
        }
    }

    render() {
        var text;
        if (this.state.user == null) {
            text = this.props.type
        } else if (this.state.type == "username") {
            text = "@" + this.state.user[this.state.type]
        } else {
            text = this.state.user[this.state.type] == null ? this.props.type : this.state.user[this.state.type]
        }
        return (
            <div style={editStyle.editableTextDiv} onMouseOver={this.handleIn} onMouseLeave={this.handleOut}>
                <label style={editStyle.label}>{this.props.type + ": "}</label>
                <p id={this.state.type} style={editStyle.textStyle}>{text}</p>
                <button name={this.state.type} style={editStyle.editButton} onClick={this.beginEdit}
                    onMouseOver={this.editIn} onMouseLeave={this.editOut}>
                    {(this.state.editing) ? tickSvg : penSvg}
                </button>
            </div>
        )
    }
}

const editStyle = {
    editableTextDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll"
    }, textStyle: {
        // border: "thick solid black",
        padding: "2px",
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px"
    }, editButton: {
        visibility: "hidden",
        background: "#FFFFFF",
        borderWidth: "0px",
        outline: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }, label: {
        // border: "thick solid black",
        padding: "2px",
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px"
    }
}