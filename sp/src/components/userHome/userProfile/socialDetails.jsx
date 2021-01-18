import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FollowPopUp from './followPopUp.jsx'
import { followUser, unfollowUser, getFollowing } from "./../../../firebase_functions"

function buttonPress(data) {
    var elem = document.getElementById("popUpContainer");
    ReactDOM.render(<FollowPopUp data={data}/>, elem);
    document.getElementById("wholeScreen").addEventListener('click', reversePress);
    document.getElementById("body").style.filter = "blur(4px)";
    document.getElementById("header").style.filter = "blur(4px)";
}

function reversePress(event) {
    const exclusions = ["popUpBox", "listUsername", "listImageDiv", "listDiv", "listProPic", "smallnopicSvg"];
    if (exclusions.includes(event.target.id) || exclusions.includes(event.target.getAttribute('name'))) { return; }
    ReactDOM.unmountComponentAtNode(document.getElementById("popUpContainer"))
    document.getElementById("wholeScreen").removeEventListener('click', reversePress);
    document.getElementById("body").style.filter = "none";
    document.getElementById("header").style.filter = "none";
}

export default class SocialDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { following: props.following, followingList: props.followingList}
        this.followMouseIn = this.followMouseIn.bind(this)
        this.followMouseOut = this.followMouseOut.bind(this)
        this.followUnfollow = this.followUnfollow.bind(this)
    }

    componentDidMount(){
        if (this.props.user != null) {
            getFollowing(this.props.user.email).then(res=>{
                getFollowing(this.props.user.email, false).then(restwo=>{
                    this.setState({followingList: res, followerList: restwo})
                })
            })
        } else {
            getFollowing().then(res=>{
                getFollowing(null, false).then(restwo=>{
                    this.setState({followingList: res, followerList: restwo})
                })
            })
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.following)
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
        const email = this.props.user.email
        if (this.state.following) { unfollowUser(email).then(() => console.log("Unfollowed")) }
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
                <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut} onClick={()=>buttonPress(this.state.followingList)}>{(this.props.user == null) ? "People You Follow" : "People " + this.props.name.split(" ")[0] + " Follows"}</button>
                <button style={socialStyle.button} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
                onClick={()=>buttonPress(this.state.followerList)}>{(this.props.user == null) ? "People Who Follow You" : "People Who Follow " + this.props.name.split(" ")[0]}</button>
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
