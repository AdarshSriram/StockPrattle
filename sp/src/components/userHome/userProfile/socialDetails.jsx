import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { followUser, unfollowUser } from "./../../../firebase_functions"

export default class SocialDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { following: props.following }
        this.followMouseIn = this.followMouseIn.bind(this)
        this.followMouseOut = this.followMouseOut.bind(this)
        this.followUnfollow = this.followUnfollow.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.following != this.props.following || prevProps.user != this.props.user) {
            this.setState({ following: this.props.following })
        }
    }

    mouseIn(event) {
        event.target.style.textDecoration = "underline"
    }

    mouseOut(event) {
        event.target.style.textDecoration = "none"
    }

    followMouseIn(but) {
        if (this.state.following) {
            but.target.style.background = "#00B140";
            but.target.style.color = "#FFFFFF";
        } else {
            but.target.style.background = "#009435";
        }
    }

    followMouseOut(but) {
        if (this.state.following) {
            but.target.style.background = "#FFFFFF";
            but.target.style.color = "#00B140";
        } else {
            but.target.style.background = "#00B140";
        }
    }

    followUnfollow() {
        if (this.state.follow) { unfollowUser(email).then(() => console.log("Unfollowed")) }
        else {
            const uname = this.props.user.username
            followUser(email, uname).then(() => console.log("Followed"))
        }
        this.setState({ following: !this.state.following })
    }

    render() {
        return (
            <div style={{
                height: "100%",
                width: "100%",
                gap: (this.props.user == null) ? "20px" : "10px",
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
                >{(this.props.user == null) ? "Stocks You Follow" : "Stocks " + this.props.name.split(" ")[0] + " Follows"}</button>
                <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
                >{(this.props.user == null) ? "People You Follow" : "People " + this.props.name.split(" ")[0] + " Follows"}</button>
                <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
                >{(this.props.user == null) ? "People Who Follow You" : "People Who Follow " + this.props.name.split(" ")[0]}</button>
                {(this.props.user == null) ? null : <button style={{
                    background: (this.state.following) ? "#FFFFFF" : "#00B140",
                    width: "80px",
                    height: "35px",
                    borderRadius: "15px",
                    border: (this.state.following) ? "1px dashed #00B140" : "0px dashed #FFFFFF",
                    color: (this.state.following) ? "#00B140" : "#FFFFFF",
                    fontFamily: "Dosis",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "18px",
                    outline: "none",
                    cursor: "pointer"
                }} onClick={this.followUnfollow}
                    onMouseOver={this.followMouseIn} onMouseLeave={this.followMouseOut}>{(this.state.following) ? "Unfollow" : "Follow"}</button>}
            </div>
        )
    }
}

const socialStyle = {
    button: {
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
    }
}
