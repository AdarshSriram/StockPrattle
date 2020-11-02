import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { penSvg } from '../svgs.jsx';
import EditableText from './editableText.jsx';
import MyPosts from './myPosts.jsx';
import ProfilePic from './profilePic.jsx';
import SocialDetails from './socialDetails.jsx'

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {user: props.user, setUser: props.setUser}
        this.updateProfile = this.updateProfile.bind(this)
    }

    updateProfile(obj){
        this.state.setUser(obj)
    }

    render() {
        return (
            <div style={userProfileStyle.centerDiv}>
                <div id="top" style={userProfileStyle.topDiv}>
                    <ProfilePic image={null} />
                    <div style={userProfileStyle.details}>
                        <EditableText type={'Username'} setUser={this.updateProfile} user={this.state.user}/>
                        <EditableText type={'Full Name'} setUser={this.updateProfile} user={this.state.user}/>
                        <EditableText type={'Birthday'} setUser={this.updateProfile} user={this.state.user}/>
                    </div>
                    <div style={userProfileStyle.details}>
                        <EditableText type={'Title'} setUser={this.updateProfile} user={this.state.user}/>
                        <EditableText type={'Industry'} setUser={this.updateProfile} user={this.state.user}/>
                        <EditableText type={'Education'} setUser={this.updateProfile} user={this.state.user}/>
                    </div>
                    <SocialDetails />
                </div>
                <MyPosts />
            </div>
        )
    }
}


const userProfileStyle = {
    centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        overflow: "scroll",
        margin: "10px",
        background: "rgba(229, 229, 229, 0.6)",
        borderRadius: "10px"
    }, topDiv: {
        height: "150px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "thin solid lightGray",
        boxSizing: "border-box",
        background: "#FFFFFF",
        borderRadius: "10px"
        // overflow: "scroll"
    }, bottomDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll"
    }, details: {
        height: "100%",
        width: "100%",
        gap: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll"
    }
}
