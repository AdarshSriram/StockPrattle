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

    componentDidMount(){
        const elem = document.getElementById(this.state.type)
        var text;
        if (this.state.user == null) {
            text = null
        } else if (this.state.type == "username") {
            text = "@" + this.state.user[this.state.type]
        } else {
            text = this.state.user[this.state.type]
        }
        if (!text){text=null}
        elem.value = text
        elem.disabled = true
        elem.style.color = "black"
        elem.style.background = "none"
    }

    componentDidUpdate(prevProps){
        if (this.state.type === "username"){
            if (this.props.user.username != prevProps.user.username){
                const elem = document.getElementById(this.state.type)
                elem.value = "@"+this.props.user.username
                this.setState({user: this.props.user})
            }
        }
    }

    beginEdit(event) {
        const elem = document.getElementById(this.state.type)
        if (this.state.editing) {
            elem.disabled = true
            elem.style.border = "none"
            elem.style.color = "black"
            elem.style.background = "none"
            if (this.state.type=="birthday"){
                var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                if (!regex.test(String(elem.value))){
                    alert("Input is not a valid date in dd/mm/yyyy format.")
                    if (this.state.user.birthday){elem.value = this.state.user.birthday}
                    else {elem.value = null}
                    this.setState({editing: false })
                    return
                }
            }
            else if (this.state.type==="username"){
                elem.value = elem.value.replace(/ /g,'')
                if (String(elem.value).includes("@")){
                    if (elem.value.length<=5){
                        alert("Username must be atleast 5 characters long.")
                        elem.value = "@"+this.state.user.username
                        this.setState({editing: false })
                        return
                    }
                    this.state.user[this.state.type]= String(elem.value).substring(1)
                } else {
                    if (elem.value.length<=4){
                        alert("Username must be atleast 5 characters long.")
                        elem.value = "@"+this.state.user.username
                        this.setState({editing: false })
                        return
                    }
                    this.state.user[this.state.type]= String(elem.value)
                    elem.value = "@"+String(elem.value)
                }
            } else if (this.state.type==="fullname"){
                if ([null, ""].includes(elem.value)){
                    alert("Name cannot be empty.")
                    elem.value = this.state.user.fullname
                    this.setState({editing: false })
                    return
                }
            } else {
                this.state.user[this.state.type]= String(elem.value)
            }
            this.setState({editing: false })
            this.state.setUser(this.state.user)
        } else {
            elem.disabled = false
            elem.style.border = "thin solid gray"
            this.setState({editing: true})
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
        return (
            <div style={editStyle.editableTextDiv} onMouseOver={this.handleIn} onMouseLeave={this.handleOut}>
                <label style={editStyle.label}>{this.props.type + ": "}</label>
                <input id={this.state.type} style={editStyle.textStyle} type="text"
                placeholder={this.state.type === "birthday" ? "DD/MM/YYYY" : "Add "+this.props.type}
                minLength={1}/>
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
        padding: "2px",
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px",
        border: "none"
    }, editButton: {
        visibility: "hidden",
        background: "#FFFFFF",
        borderWidth: "0px",
        outline: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }, label: {
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
