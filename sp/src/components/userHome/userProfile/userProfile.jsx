import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { penSvg } from '../svgs.jsx';
import EditableText from './editableText.jsx';
import UserFeed from '../userFeed.jsx';
import ProfilePic from './profilePic.jsx';
import SocialDetails from './socialDetails.jsx'

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {user: props.user, setUser: props.setUser, following: props.following, data: props.userFeedData}
        this.updateProfile = this.updateProfile.bind(this)
    }

    componentDidUpdate(prevProps){
        if (this.props.user.username != prevProps.user.username || this.props.following != prevProps.following || this.props.userFeedData !== prevProps.userFeedData){
            this.setState({user: this.props.user, following: this.props.following, data:this.props.userFeedData})
        }
    }

    updateProfile(obj){
        this.state.setUser(obj)
    }

    render() {
        if (this.state.setUser != null){
            return(
            <div style={userProfileStyle.centerDiv}>
                <div id="top" style={userProfileStyle.topDiv}>
                    <ProfilePic user={this.state.user} editable={true}/>
                    <div style={userProfileStyle.details}>
                        <EditableText type={'Username'} setUser={this.updateProfile} user={this.state.user} />
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
                <UserFeed user={this.state.user} data={this.state.data}/>
            </div>
        )} else {
            return(
            <div style={userProfileStyle.centerDiv}>
                <div id="top" style={userProfileStyle.topDiv}>
                    <ProfilePic user={this.state.user} editable={false}/>
                    <div style={userProfileStyle.details}>
                        <div style={userProfileStyle.editableTextDiv}>
                            <label style={userProfileStyle.label}>{"Username: "}</label>
                            <p style={userProfileStyle.textStyle}>{
                                (this.state.user.username == null) ? "" : "@"+this.state.user.username
                            }</p>
                        </div>
                        <div style={userProfileStyle.editableTextDiv}>
                            <label style={userProfileStyle.label}>{"Full Name: "}</label>
                            <p style={userProfileStyle.textStyle}>{
                                (this.state.user.fullname == null) ? "" : this.state.user.fullname
                            }</p>
                        </div>
                        <div style={userProfileStyle.editableTextDiv}>
                            <label style={userProfileStyle.label}>{"Birthday: "}</label>
                            <p style={userProfileStyle.textStyle}>{
                                (this.state.user.birthday == null) ? "" : this.state.user.birthday
                            }</p>
                        </div>
                    </div>
                    <div style={userProfileStyle.details}>
                        <div style={userProfileStyle.editableTextDiv}>
                            <label style={userProfileStyle.label}>{"Title: "}</label>
                            <p style={userProfileStyle.textStyle}>{
                            (this.state.user.title == null) ? "" : this.state.user.title
                            }</p>
                        </div>
                        <div style={userProfileStyle.editableTextDiv}>
                            <label style={userProfileStyle.label}>{"Industry: "}</label>
                            <p style={userProfileStyle.textStyle}>{
                                (this.state.user.industry == null) ? "" : this.state.user.industry
                            }</p>
                        </div>
                        <div style={userProfileStyle.editableTextDiv}>
                            <label style={userProfileStyle.label}>{"Education: "}</label>
                            <p style={userProfileStyle.textStyle}>{
                                (this.state.user.education == null) ? "" : this.state.user.education
                            }</p>
                        </div>
                    </div>
                    <SocialDetails user={this.props.user} name={this.state.user.fullname} following={this.state.following.includes(this.state.user.email)}/>
                </div>
                <UserFeed user={this.state.user}/>
            </div>
        )
        }
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
        background: "none",
        borderRadius: "10px"
    }, topDiv: {
        height: "170px",
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
        alignItems: "flex-start",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll"
    }, label: {
        padding: "2px",
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px"
    }, textStyle: {
        padding: "2px",
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px",
        border: "none",
    }, editableTextDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll"
    }
}
