import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { penSvg, tickSvg } from "../svgs.jsx"

export default class EditableText extends Component {
    constructor(props) {
        super(props);
        this.state = { text: props.text, editing: false, onSubmit: this.props.onSubmit }
        this.handleIn = this.handleIn.bind(this)
        this.beginEdit = this.beginEdit.bind(this)
        this.handleOut = this.handleOut.bind(this)

    }

    beginEdit(event) {
        const elem = document.getElementById(this.state.text)
        if (this.state.editing) {
            elem.contentEditable = false
            elem.style.border = "none"
            this.setState({ text: String(elem.innerHTML), editing: false })
            this.state.onSubmit.func(this.state.onSubmit.field, this.state.text)
        } else {
            elem.contentEditable = true
            elem.style.border = "thin solid gray"
            this.setState({ editing: true })
        }
    }

    handleIn(event) {
        const elem = document.getElementsByName(this.state.text)[0]
        elem.style.visibility = "visible"
        elem.enable = true
    }

    handleOut(event) {
        const elem = document.getElementsByName(this.state.text)[0]
        elem.style.visibility = "hidden"
        elem.enable = false
    }

    editIn(event) {
        event.target.style.background = "#FFFFFF"
    }

    editOut(event) {
        event.target.style.background = "#FFFFFF"
    }

    render() {
        return (
            <div style={editStyle.editableTextDiv} onMouseOver={this.handleIn} onMouseLeave={this.handleOut}>
                <p id={this.state.text} style={editStyle.textStyle}>{this.state.text}</p>
                <button name={this.state.text} style={editStyle.editButton} enable={false} onClick={this.beginEdit}
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
        borderRadius: "5px"
    }
}
