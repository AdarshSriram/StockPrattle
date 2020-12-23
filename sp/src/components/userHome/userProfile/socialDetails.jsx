import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class SocialDetails extends Component{
    constructor(props){
        super(props);
    }

    mouseIn(event){
        event.target.style.textDecoration = "underline"
    }

    mouseOut(event){
        event.target.style.textDecoration = "none"
    }

    followMouseIn(but) {
        but.target.style.background = "#009435";
    }

    followMouseOut(but) {
        but.target.style.background = "#00B140";
    }

    render(){
        return(
        <div style={{
                height: "100%",
                width: "100%",
                gap: (this.props.name == null) ? "20px" : "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "thin solid lightGray",
                borderWidth: "0 0 0 1px",
                boxSizing: "border-box",
                background: "none",
                // overflow: "scroll"
            }}>
            <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
            >{(this.props.name == null) ? "Stocks You Follow" : "Stocks "+this.props.name.split(" ")[0]+" Follows"}</button>
            <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
            >{(this.props.name == null) ? "People You Follow" : "People "+this.props.name.split(" ")[0]+" Follows"}</button>
            <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
            >{(this.props.name == null) ? "People Who Follow You" : "People Who Follow "+this.props.name.split(" ")[0]}</button>
            {(this.props.name == null) ? null : <button style={socialStyle.followButton} onMouseOver={this.followMouseIn} onMouseLeave={this.followMouseOut}>{"Follow"}</button>}
        </div>
        )
    }
}

const socialStyle = {button: {
        background: "none",
        height: "32px",
        borderRadius: "30px",
        borderWidth: "0px",
        color: "#00B140",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        cursor: "pointer"
    }, followButton: {
        background: "#00B140",
        width: "75px",
        height: "35px",
        borderRadius: "15px",
        borderWidth: "0px",
        color: "#FFFFFF",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        cursor: "pointer"
    }
}
